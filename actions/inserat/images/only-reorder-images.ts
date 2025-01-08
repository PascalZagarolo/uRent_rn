import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { images, inserat } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function onlyReorderImages (values) {
    "use server";

    try{

        const findCurrentUser = await getCurrentUser(values?.token);

        if(!findCurrentUser) {
            throw new Error("You are not authenticated!");
        }

        const findInserat = await db.query.inserat.findFirst({
            where : eq(inserat.id, values?.inseratId)
        })

        if(!findInserat || findInserat.userId !== findCurrentUser.id) {
            throw new Error("Inserat not found!");
        }

        const returnedArray = [];

        for (const pImage of values?.reorderedImages) {
            const updatedImage = await db.update(images).set({
                //@ts-ignore
            position: pImage.position
            }).where(
                and(
                    eq(images?.url, pImage.url),
                    eq(images?.inseratId, values?.inseratId)
                )
            ).returning();

            returnedArray.push({ url: updatedImage[0].url, position: updatedImage[0].position });
        }
        
        returnedArray.sort((a, b) => a.position - b.position);
        console.log(returnedArray);
        return returnedArray;

    } catch(e : any) {
        console.log(e);
        throw new Error(e.message);
    }
}