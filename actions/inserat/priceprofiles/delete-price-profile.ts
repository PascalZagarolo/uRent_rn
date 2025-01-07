import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { priceprofile } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deletePriceprofile = async (values) => {
    "use server"
    try {
        const { token, profileId } = values;

        const currentUser = await getCurrentUser(token);

        if(!currentUser) {
            return { error : "Nutzer nicht gefunden"};
        }

        const findExisting = await db.query.priceprofile.findFirst({
            where : eq(
                priceprofile.id,
                profileId
            ), with : {
                inserat : true
            }
        })

        if(!findExisting) {
            return { error : "Preisprofil nicht gefunden"};
        }

        //@ts-ignore
        if(findExisting.inserat.userId !== currentUser.id) {
            return { error : "Nicht autorisiert"};
        }

        const deleted = await db.delete(priceprofile).where(eq(priceprofile.id, profileId));

        return { success : true, data : deleted };

    } catch(e : any)  {
        console.log(e);
        return;
    }
}