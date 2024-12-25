import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { businessAddress } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteLocationBusiness (id : string, authToken : string)  {
    "use server"
    try {

        const currentUser = await getCurrentUser(authToken);

        if(!currentUser || !currentUser.isBusiness) {
            console.log("Nicht autorisiert");
            
            return new Error("Nicht autorisiert");
        }

        const findLocation = await db.query.businessAddress.findFirst({
            where : eq(
                businessAddress.id, id
            )
        })


        if(!findLocation) {
            console.log("Standort nicht gefunden");
            return new Error("Standort nicht gefunden");
        }

        if(findLocation?.businessId !== currentUser.businessId) {
            console.log("Nicht autorisiert");
            return new Error("Nicht autorisiert");
        }

        const [deletedBusiness] = await db.delete(businessAddress).where(eq(businessAddress.id, id)).returning();
    
        return deletedBusiness;
    } catch(e : any) {
        console.log(e);
        return null;
    }
}