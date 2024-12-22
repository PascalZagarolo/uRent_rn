

import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { business, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const editBusinessDescription = async (description, authToken) => {
    try {
        "use server";
        const currentUser = await getCurrentUser(authToken);
        console.log(description)
        if(!currentUser || !currentUser.business) {
            return new Error("Nicht autorisiert");
        }

        const patchedBusiness = await db.update(business).set({ description: description }).where(eq(business.userId, currentUser.id)).returning()
        console.log("geschafft!", patchedBusiness[0])
        return patchedBusiness;

    } catch(e : any) {
        console.log(e)
    }
}