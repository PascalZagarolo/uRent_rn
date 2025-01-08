import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat, priceprofile } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updatePriceProfiles (values) {
    "use server";
    try {

        const currentUser = await getCurrentUser(values.token);

        if(!currentUser) {
            throw new Error("User not found");
        }

        const findInserat = await db.query.inserat.findFirst({
            where : eq(
                inserat.id, values.inseratId
            )
        })

        if(!findInserat || findInserat.userId !== currentUser.id) {
            throw new Error("Inserat not found");
        }
        
        const findPriceProfiles = await db.query.priceprofile.findMany({
            where : eq(priceprofile.inseratId, values.inseratId)
        })

        let index = findPriceProfiles?.length ? findPriceProfiles.length : 0;

        const insertedPriceProfiles = [];

        for (const pPriceprofile of values?.priceProfiles) {
            const inserted = await db.insert(priceprofile).values({
                inseratId : values.inseratId,
                title : pPriceprofile.title,
                description : pPriceprofile.description,
                price : pPriceprofile.price,
                freeMiles : pPriceprofile.freeMiles,
                extraCost : pPriceprofile.extraCost,
                position : pPriceprofile?.position ? pPriceprofile?.position : index

            }).returning();

            insertedPriceProfiles.push(inserted[0]);
            index = index + 1;
        }

        return insertedPriceProfiles;
    } catch(e : any) {
        console.log(e);
        throw new Error("Error updating price profiles");
    }
}