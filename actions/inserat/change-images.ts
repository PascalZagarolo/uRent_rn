'use server';
'use strict';

import db from "@/db/drizzle";
import { getCurrentUser } from "../getCurrentUser";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";

export const changeImages = async (values) => {
    try {

        const { inseratId, token } = values;
        const sentImages: any = values.images;

        if(!sentImages || !inseratId) {
            return { error : "Fehlerhafte Anfrage." };
        }

        if(!token) {
            return { error : "Nicht eingeloggt." };
        }

        const currentUser = await getCurrentUser(token);

        if(!currentUser) {
            return { error : "Nicht eingeloggt." };
        }

        const deleteExistingImages = await db.delete(images).where(eq(images.inseratId, inseratId));

        for(const pImage of sentImages) {
            await db.insert(images).values(
                {
                    url : pImage.url,
                    inseratId : inseratId,
                    position : pImage.position
                }
            )
        }

        return { success : true, returnedImages : sentImages };

    } catch(e : any) {
        console.log(e);
        return { error : e.message };
    }
}