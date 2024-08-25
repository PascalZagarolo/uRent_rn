import db from "@/db/drizzle";
import { getCurrentUser } from "../getCurrentUser";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function changeUser(values, authToken) {
    try {

        const currentUser : any = await getCurrentUser(authToken);

        if(currentUser) {
            return new Error("Nicht autorisiert");
        }

        const patchedUser = await db.update(userTable).set({
            ...values
        }).where(eq(userTable.id, currentUser.id))

        return patchedUser;

    } catch(e : any) {
        console.log(e);
    }
}