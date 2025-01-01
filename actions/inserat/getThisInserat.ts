


import db from "@/db/drizzle";
import { inserat, priceprofile } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getThisInserat = async (id : string) => {
    'use server'
    try {
        const thisInserat = await db.query.inserat.findFirst({
            where : eq(
                inserat.id, id
            ),
            with : {
                priceprofiles : true
            }
        })

        return thisInserat;

    } catch(e : any) {
        return { error : e.message }
        return null;
    }
}