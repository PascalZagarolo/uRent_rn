import db from "@/db/drizzle";
import { favourite, userTable } from "@/db/schema";
import { getCurrentUser } from "../getCurrentUser";
import { checkRateLimit } from "@/lib/api-rate-limiter";

export async function addFavourite(authToken : string, inseratId : string) {
    "use server";

    try {

        const isAllowed = await checkRateLimit();
        if(!isAllowed) {
            console.log("Zu viele Anfragen..");
            return { error : "Zu viele Anfragen"}
        } 

        const findUser  = await getCurrentUser(authToken);

        
        if(!findUser || !findUser?.id) throw new Error("User not found");

        const addFavourite = await db.insert(favourite).values({
            inseratId : inseratId,
            userId : findUser.id
        })
        console.log("kam durch!");
        return addFavourite;
    } catch(e : any) {
        console.log(e);
        throw new Error("Failed to add favourite");
    }
}