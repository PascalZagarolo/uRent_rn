import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat, trailerAttribute } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function changeTrailerAttributes(pValues) {
    try {
        console.log("funct changeTrailerAttributes");
        const { token, inseratId, ...values } = pValues;

        const currentUser = await getCurrentUser(token);

        if(!currentUser) throw new Error("Nutzer nicht gefunden");

        const findInserat = await db.query.inserat.findFirst({
            where: eq(inserat.id, inseratId)
        })

        const findLkwAttribute = await db.query.trailerAttribute.findFirst({
            where : eq(trailerAttribute.inseratId, inseratId)
        })

        if(!findLkwAttribute) {
            
            const createPkwAttribute = await db.insert(trailerAttribute).values({
                inseratId : inseratId,
                ...values
            }).returning();
            
            console.log(createPkwAttribute[0] + "!!!!");

            const connectInserat = await db.update(inserat).set({
                trailerId : createPkwAttribute[0].id
            }).where(eq(inserat.id, findInserat.id))
            
            return createPkwAttribute[0];

        } else {

            const updatePkwAttribute = await db.update(trailerAttribute).set({
                ...values
            }).where(
                and(
                    eq(trailerAttribute.id, findLkwAttribute.id),
                    eq(trailerAttribute.inseratId, inseratId)
                )
            ).returning();
            
            return updatePkwAttribute[0];
        }

    } catch(e : any) {
        console.log(e);
        throw new Error("Fehler beim Ändern der PKW-Attribute");
    }
}