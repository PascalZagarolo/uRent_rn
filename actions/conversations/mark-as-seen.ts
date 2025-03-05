import db from "@/db/drizzle";
import { message } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const markAsSeen = async (values) : Promise<{ error? : string, success? : string }> => {
    "use server";
    try {

        if(!values?.otherUserId || !values?.conversationId) {
            return {
                error : "Unzureichende Daten."
            }
        };

        const updateMessages = await db.update(message).set({
            seen : true
            }).where(and(
            eq(
                message.conversationId, values?.conversationId
            ),
            eq(
                message.senderId, values?.otherUserId
            )
        ))
        
        return { success : "Erfolgreich gesehen."}
    } catch(e : any) {
        console.log(e);
    }
}