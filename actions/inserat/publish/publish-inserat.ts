import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat, userSubscription } from "@/db/schema";
import { isAfter } from "date-fns";
import { and, eq } from "drizzle-orm";

export async function publishInserat (values) {
    "use server";
    try {

        //find User
        //check if user can release inserat 1.) has valid subscription 2.) has enough credits

        const { token, inseratId } = values;

        const currentUser = await getCurrentUser(token);

        if(!currentUser) {
            throw new Error("User not found");
        }   

        const findSubscription = await db.query.userSubscription.findFirst({
            where : eq(userSubscription.userId, currentUser.id)
        })

        if(!findSubscription) {
            throw new Error("User has no subscription");
        }

        const currentDate = new Date();

        if(isAfter(currentDate, findSubscription.stripe_current_period_end)) {
            throw new Error("Subscription has expired");
        }

        const findReleasedInserate = await db.query.inserat.findMany({
            where : and(
                eq(inserat.userId, currentUser.id),
                eq(inserat.isPublished, true)
            )
        })

        if(findReleasedInserate.length >= findSubscription.amount) {
            throw new Error("Inserat limit reached");
        }

        const findRelasingInserat = await db.query.inserat.findFirst({
            where : eq(inserat.id, inseratId)
        })

        if(!findRelasingInserat || findRelasingInserat.userId !== currentUser.id) {
            throw new Error("Inserat not found");
        }

        const updateInserat = await db.update(inserat).set({
            isPublished : true
        }).where(eq(inserat.id, inseratId)).returning();

        return updateInserat[0];
        

    } catch(e : any) {
        console.log(e);
        throw new Error(e.message);
    }
}