import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { business, businessImages } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function editBanner (newUrl : string, authToken : string) {
    "use server"
    try {

        const currentUser = await getCurrentUser(authToken);

        if(!currentUser || !currentUser.isBusiness) {
            throw new Error("User not found")
        }

        const findBusiness = await db.query.business.findFirst({
            where : eq(
                business.userId, currentUser.id
            )
        })

        if(!findBusiness) throw new Error("Business not found")
        
        await db.delete(businessImages).where(eq(businessImages.businessId, findBusiness.id))

        const updatedImages = await db.insert(businessImages).values({
            position : 0,
            url : newUrl,
            businessId : findBusiness.id
        })

        return updatedImages;

    } catch(e : any) {
        console.log(e);
        throw new Error
    }
}