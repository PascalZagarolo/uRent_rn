

import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { business, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const editUserDescription = async (description, authToken) => {
    "use server";
    try {
        
        const currentUser = await getCurrentUser(authToken);
        console.log(description)
        if(!currentUser) {
            return new Error("Nicht autorisiert");
        }
        console.log("currentUser", currentUser?.id)
        const patchedBusiness = await db.update(userTable).set({ description : description }).where(eq(userTable.id, currentUser.id)).returning()
        console.log("geschafft!", patchedBusiness[0])
        return patchedBusiness;

    } catch(e : any) {
        console.log(e)
    }
}