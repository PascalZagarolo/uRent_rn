import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function privateInserat (value) {
    "use server"
    try {

        const { token, inseratId } = value;

        const currentUser = await getCurrentUser(token);

        if(!currentUser) {
            return new Error("User not found");
        }

        const findInserat = await db.query.inserat.findFirst({
            where : eq(inserat.id, inseratId)
        })

        if(!findInserat || findInserat.userId !== currentUser.id) {
            return new Error("Inserat not found");
        }

        if(!findInserat.isPublished) {
            return new Error("Inserat is already private");
        }
        const updateInserat = await db.update(inserat).set({
            isPublished : false,
        }).where(eq(inserat.id, inseratId)).returning();

        return updateInserat[0];

    } catch(e : any) {
        console.log(e);
        throw new Error(e.message);
    }
}