import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { businessAddress } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function editLocationBusiness (values, locationId, authToken) {
    try {

        const findUser = await getCurrentUser(authToken);

        if(!findUser || !findUser.isBusiness) {
            console.log("Nicht autorisiert");
            return new Error("401: Nicht autorisiert");
        }

        const findBusinessLocation = await db.query.businessAddress.findFirst({
            where : and(
                eq(businessAddress.businessId, findUser.businessId),
                eq(businessAddress.id, locationId)
            )
        })

        if(!findBusinessLocation) {
            console.log("Standort nicht gefunden");
            return new Error("404: Standort nicht gefunden");
        }   

        const [updateValues] = await db.update(businessAddress).set({
            ...values
        }).where(eq(businessAddress.id, locationId)).returning();
        console.log(updateValues);
        return updateValues;


    } catch(e : any) {
        console.log(e);
        return new Error("Etwas ist schief gelaufe");
    }
}