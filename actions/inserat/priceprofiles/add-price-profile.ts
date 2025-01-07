import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat, priceprofile } from "@/db/schema";
import { and, count, eq } from "drizzle-orm";
import { posix } from "path";

export const addPriceProfile = async (values) => {
    "use server"
    try {
        const { title, description, price, freemiles, extraCost,
        inseratId, token
        } = values;

        if(!title || !price) {
            return {error : "Fehlende Angeben."}
        }

        const currentUser = await getCurrentUser(token);

        if(!currentUser) {
            return { error : "Nutzer nicht gefunden."}
        }

        const findInserat = await db.query.inserat.findFirst({
            where : and(
                eq(
                    inserat.id,
                    inseratId
                ),
                eq(
                    inserat.userId,
                    currentUser?.id
                )
            )
        })

        if(!findInserat) {
            return { error : "Inserat nicht gefunden."}
        }

        const [findExisting] = await db.select({ count: count() }).from(priceprofile).where(eq(priceprofile.inseratId, inseratId));

        const newPosition = findExisting.count !== 0 ? findExisting.count + 1 : 0;

        const newPriceProfile = await db.insert(priceprofile).values({
            title,
            description,
            price,
            freeMiles : freemiles,
            extraCost,
            inseratId : inseratId,
            position : newPosition
        }).returning();
        console.log("1")
        return { success : true, data : newPriceProfile[0] };

    } catch(e : any) {
        console.log(e);
        return;
    }
}