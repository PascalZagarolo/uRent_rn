


import db from "@/db/drizzle";
import { images, inserat, priceprofile } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getThisInserat = async (id : string) => {
    'use server'
    try {
        const thisInserat = await db.query.inserat.findFirst({
            where : eq(
                inserat.id, id
            ),
            with : {
                priceprofiles : true,
                images: {
                    orderBy: (created_at, { asc }) => [asc(images.position)],
                },
                address: true,
            }
        })

        return thisInserat;

    } catch(e : any) {
        return { error : e.message }
        return null;
    }
}