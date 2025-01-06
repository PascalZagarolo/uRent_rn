import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { images, inserat } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function addImagesInserat(addedImages : { url : string, position : string | number }[], inseratId : string, authToken) {
    "use server";
    try {

        const currentUser = await getCurrentUser(authToken);
        if (!currentUser) {
            throw new Error("User not found");
        }

        const findInserat = await db.query.inserat.findFirst({
            where : eq(inserat.id, inseratId)
        })

        if (!findInserat || !findInserat.userId) {
            throw new Error("Inserat not found");
        }

        const deleteExisting = await db.delete(images).where(eq(images.inseratId, inseratId));

        const imagePromises = addedImages.map(async (pImage) => {
            return db.insert(images).values({
                position: pImage.position,
                url: pImage.url,
                inseratId: inseratId
            });
        });
        await Promise.all(imagePromises);

        return imagePromises;
    } catch(e : any) {
        console.error(e);
    }
}