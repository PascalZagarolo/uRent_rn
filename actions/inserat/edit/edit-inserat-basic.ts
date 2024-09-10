'use server'

import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { eq } from "drizzle-orm";

export const editInseratBasic = async (values) => {
    try {
        console.log(3)
        const { inseratId, token, ...pValues } = values;
        console.log(inseratId)
        const currentUser = await getCurrentUser(token);

        if(!currentUser) {
            return { error : "User not found" }
        }
        console.log(2)
        const findInserat = await db.query.inserat.findFirst({
            where : eq(inserat.id, inseratId)
        })
        
        console.log(findInserat?.userId + "!");
        if(!findInserat || findInserat.userId !== currentUser.id) {
            return { error : "Inserat not found" }
        }
        console.log(1)
        const patchInserat = await db.update(inserat).set({
            ...pValues
        }).where(eq(inserat.id, inseratId));
        
        return { success : true }

    } catch(e : any) {
        console.log(e);
        return null;
    }
}