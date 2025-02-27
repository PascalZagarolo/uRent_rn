import db from "@/db/drizzle";
import { giftCode,  userGifts,  userSubscription, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { addMonths } from 'date-fns';

export async function redeemGiftCode(
    inputToken : string,
    userId : string
): Promise<{ error? : string, success? : string }> {
    'use server';

    //check if user has / had subscription
    const findExistingSubscription = await db.query.userSubscription.findFirst({
        where : eq(userSubscription.userId, userId)
    })

    //return if user has a existing Subscription
    if(findExistingSubscription) {
        return { error : "Nutzer hat bereits ein Abo."};
    }

    //check if code is valid
    const findCode = await db.query.giftCode.findFirst({
        where : eq(giftCode.name, inputToken)
    })
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