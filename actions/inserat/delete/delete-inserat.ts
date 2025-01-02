import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function deleteInserat(thisInseratId : string, authToken : string) {
    "use server";
    try {

        const findUser = await getCurrentUser(authToken);

        if(!findUser) throw new Error("User not found");

        const findInserat = await db.query.inserat.findFirst({
            where : eq(
                inserat.id, thisInseratId
            )
        })

        if(!findInserat) throw new Error("Inserat not found");
        if(findInserat.userId !== findUser.id) throw new Error("Unauthorized");

        const deleteInserat = await db.delete(inserat).where(
            and(
                eq(inserat.id, thisInseratId),
                eq(inserat.userId, findUser.id)
            )
        ). returning()
        
        return deleteInserat[0];

    } catch(e : any) {
        console.log(e);
        throw new Error("Error deleting inserat");
    }
}