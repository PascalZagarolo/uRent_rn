import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { userTable } from "@/db/schema";

export async function editProfilePic (imageUrl : string, authToken : string) {
    "use server"
    try {

        const currentUser = await getCurrentUser(authToken);

        if(!currentUser) {
            throw new Error("User not found");
        }

        const updateImage = await db.update(userTable).set({
            image : imageUrl
        }).returning();

        return updateImage;
    } catch (e : any) {
        console.log(e);
        throw e;
    }
}