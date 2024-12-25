import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { business } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function editImprintBusiness (newImprint : string, authToken : string) {
    'use server'
    try {
        if(!authToken) {
            console.log("Nicht autorisiert");
            return new Error("401: Nicht autorisiert");
        }

        const findUser = await getCurrentUser(authToken);

        if(!findUser || !findUser.isBusiness) {
            console.log("Nicht autorisiert");
            return new Error("401: Nicht autorisiert");
        }

        const patchValues = await db.update(business).set({
            impressum : newImprint
        }).where(eq(business.userId, findUser.id )).returning();

        return patchValues;
    } catch(e : any) {
        console.log(e);
        return new Error("Etwas ist schief gelaufen");
    }
}