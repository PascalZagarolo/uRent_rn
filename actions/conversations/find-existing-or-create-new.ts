import db from "@/db/drizzle";
import { conversation } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";

export async function getExistingOrCreateNewConversation (user1Id : string, user2Id : string) {
    "use server";
    try {

        const findConversation = await db.query.conversation.findFirst({
            where: (
                or(
                    and(
                        eq(conversation.user1Id, user1Id),
                        eq(conversation.user2Id, user2Id)
                    ),
                    and(
                        eq(conversation.user1Id, user2Id),
                        eq(conversation.user2Id, user1Id)
                    )
                )
            )
        })

        if(!findConversation) {
            const createConversation = await db.insert(conversation).values({
                user1Id : user1Id,
                user2Id : user2Id
            }).returning();

            return createConversation[0];
        }

        return findConversation;


    } catch(e : any) {
        console.log(e);
        throw new Error("Fehler beim Erstellen oder Finden der Konversation.");
    }
}