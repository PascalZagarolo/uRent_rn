import db from "@/db/drizzle";
import { favourite, userTable } from "@/db/schema";
import { getCurrentUser } from "../getCurrentUser";
import { and, eq } from "drizzle-orm";
import { checkRateLimit } from "@/lib/api-rate-limiter";

export async function deleteFavourite(authToken : string, inseratId : string) {
    "use server";

    try {
        
        const isAllowed = await checkRateLimit();
        if(!isAllowed) {
            console.log("Zu viele Anfragen..");
            return { error : "Zu viele Anfragen"}
        } 


        const findUser  = await getCurrentUser(authToken);

        
        if(!findUser || !findUser?.id) throw new Error("User not found");

        const deleteFavourite = await db.delete(favourite)
            .where(and(
                eq(favourite.inseratId, inseratId),
                eq(favourite.userId, findUser.id)
            ))
            console.log("kam durch!");
        return deleteFavourite;
    } catch(e : any) {
        console.log(e);
        throw new Error("Failed to delete favourite");
    }
}