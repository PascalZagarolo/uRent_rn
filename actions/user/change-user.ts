import db from "@/db/drizzle";
import { getCurrentUser } from "../getCurrentUser";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function changeUser(values, authToken) {
    try {
        console.log("200000")
        const currentUser = await getCurrentUser(authToken as string);

        if(!currentUser) {
            
            return new Error("Nicht autorisiert");
        }
        console.log("fast")
        const patchedUser = await db.update(userTable).set({
            ...values
        }).where(eq(userTable.id, currentUser.id))

        return patchedUser;

    } catch(e : any) {
        console.log(e);
    }
}