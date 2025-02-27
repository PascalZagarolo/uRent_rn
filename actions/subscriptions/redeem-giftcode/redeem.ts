import db from "@/db/drizzle";
import { giftCode,  userGifts,  userSubscription, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { addMonths } from 'date-fns';
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function redeemGiftCode(
    inputToken : string,
    userId : string,
    authToken : string
): Promise<{ error? : string, success? : string }> {
    'use server';

    if(!authToken) {
        return { error : "Nicht authentifiziert."}
    };

    const currentUser = await getCurrentUser(authToken);

    if(!currentUser) {
        return { error : "Du musst dafür eingeloggt sein."}
    };

    //check if user has / had subscription
    const findExistingSubscription = await db.query.userSubscription.findFirst({
        where : eq(userSubscription.userId, userId)
    })

    //return if user has a existing Subscription
    if(findExistingSubscription) {
        return { error : "Du hast bereits ein Abo."};
    }

    //check if code is valid
    const findCode = await db.query.giftCode.findFirst({
        where : eq(giftCode.name, inputToken)
    })

    if(findCode) {
        return {error: "Unngültiger Code."}
    };
    
    //createuserGifts
    const creatUserGifts = await db.insert(userGifts).values({
        userId : userId,
        giftCodeId : findCode.id
    })

    const periodEnd = new Date(addMonths(new Date(), 3));

    //create Subscription
    const [createSubscription] = await db.insert(userSubscription).values({
        userId : userId,
        amount : 500,
        stripe_current_period_end : periodEnd,
        isGift : true
    }).returning()

    //connect to account
    const findUser = await db.update(userTable).set({
        subscriptionId : createSubscription.id
    }).where(
        eq(userTable.userId, userId)
    )


    return {success : ""};
}