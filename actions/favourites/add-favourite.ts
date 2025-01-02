import db from "@/db/drizzle";
import { favourite, userTable } from "@/db/schema";
import { getCurrentUser } from "../getCurrentUser";

export async function addFavourite(authToken : string, inseratId : string) {
    "use server";

    try {

        const findUser  = await getCurrentUser(authToken);

        console.log(findUser);
        if(!findUser || !findUser?.id) throw new Error("User not found");

        const addFavourite = await db.insert(favourite).values({
            inseratId : inseratId,
            userId : findUser.id
        })

        return addFavourite;
    } catch(e : any) {
        console.log(e);
        throw new Error("Failed to add favourite");
    }
}