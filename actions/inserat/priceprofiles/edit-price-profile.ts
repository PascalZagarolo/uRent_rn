import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { priceprofile } from "@/db/schema";
import { eq } from "drizzle-orm";

export const editPriceProfile = async (values) => {
    "use server"
    try {
        const { title, description, price, freemiles, extraCost,
            profileId, token
            } = values;

            if(!title || !price) {
                return {error : "Fehlende Angeben."}
            }
    
            const currentUser = await getCurrentUser(token);
    
            if(!currentUser) {
                return { error : "Nutzer nicht gefunden."}
            }

            const findProfile = await db.query.priceprofile.findFirst({
                where : eq(
                    priceprofile.id,
                    profileId
                ), with : {
                    inserat : true
                }
            })

            if(!findProfile) {
                return { error : "Profil nicht gefunden."}
            }

            //@ts-ignore
            if(findProfile.inserat.userId !== currentUser.id) {
                return { error : "Nicht berechtigt."}
            }

            const patchedProfile = await db.update(priceprofile).set({
                title : title,
                description : description,
                price : price,
                freeMiles : freemiles,
                extraCost : extraCost
            })

            return { success : true, data : patchedProfile[0] };

    } catch(e : any) {
        console.log(e);
        return;
    }
}