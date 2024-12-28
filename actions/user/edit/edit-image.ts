import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function editProfilePic (imageUrl : string, authToken : string) {
    "use server"
    try {

        const currentUser = await getCurrentUser(authToken);

        if(!currentUser) {
            throw new Error("User not found");
        }

        const updateImage = await db.update(userTable).set({
            image : imageUrl
        }).where(eq(userTable.id, currentUser.id))

        return updateImage;
    } catch (e : any) {
        console.log(e);
        throw e;
    }
}