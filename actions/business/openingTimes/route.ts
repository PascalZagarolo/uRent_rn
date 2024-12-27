import { getCurrentUser } from "@/actions/getCurrentUser";
import { business, openingTimes, userTable } from '../../../db/schema';
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function editOpeningTimes (values, authToken : string) {
    "use server";

    try {
        
        const user = await getCurrentUser(authToken);
        console.log("...")
        if(!user || !user.isBusiness) {
            throw new Error("You are not authorized to edit opening times");
        }

        const findBusiness = await db.query.business.findFirst({
            where : (eq(business.userId, user.id)), with : {
                openingTimes : true
            }
        })
        console.log("...")
        if(!findBusiness) {
            throw new Error("Business not found");
        }

        if(findBusiness.openingTimes) {
            const [updatedOpeningTimes] = await db.update(openingTimes).set({
                ...values
            }).where(eq(openingTimes.businessId, findBusiness.id)).returning()
            return updatedOpeningTimes;
        } else {
            const [createdOpeningTimes] = await db.insert(openingTimes).values({
                ...values,
                businessId : findBusiness.id
            }).returning()

            return createdOpeningTimes;
        }

    } catch(e : any) {
        console.log(e);
    }
}