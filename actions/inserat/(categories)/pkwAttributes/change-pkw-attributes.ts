import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat, pkwAttribute } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function changePkwAttributes(pValues) {
    try {

        const { token, inseratId, ...values } = pValues;

        const currentUser = await getCurrentUser(token);

        if(!currentUser) throw new Error("Nutzer nicht gefunden");

        const findInserat = await db.query.inserat.findFirst({
            where: eq(inserat.id, inseratId)
        })

        const findPkwAttribute = await db.query.pkwAttribute.findFirst({
            where : eq(pkwAttribute.inseratId, inseratId)
        })

        if(!findPkwAttribute) {
            console.log("!!!")
            const createPkwAttribute = await db.insert(pkwAttribute).values({
                inseratId : inseratId,
                ...values
            }).returning();
            console.log("!!!")
            console.log(createPkwAttribute[0] + "!!!!");

            const connectInserat = await db.update(inserat).set({
                pkwId : createPkwAttribute[0].id
            }).where(eq(inserat.id, findInserat.id))
            console.log("!!!")
            return createPkwAttribute[0];

        } else {

            const updatePkwAttribute = await db.update(pkwAttribute).set({
                ...values
            }).where(
                and(
                    eq(pkwAttribute.id, findPkwAttribute.id),
                    eq(pkwAttribute.inseratId, inseratId)
                )
            ).returning();
            
            return updatePkwAttribute[0];
        }

    } catch(e : any) {
        console.log(e);
        throw new Error("Fehler beim Ändern der PKW-Attribute");
    }
}