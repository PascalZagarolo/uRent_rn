import db from "@/db/drizzle";
import { conversation } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";

export async function getExistingOrCreateNewConversation(user1Id: string, user2Id: string, inseratId?: string) {
    "use server";
    try {

        let findConversation;

        if(inseratId) {
            findConversation = await db.query.conversation.findFirst({
                where: (
                    or(
                        and(
                            eq(conversation.user1Id, user1Id),
                            eq(conversation.user2Id, user2Id),
                            eq(conversation.inseratId, inseratId)
                        ),
                        and(
                            eq(conversation.user1Id, user2Id),
                            eq(conversation.user2Id, user1Id),
                            eq(conversation.inseratId, inseratId)
                        )
                    )
                )
            })
        } else {
            findConversation = await db.query.conversation.findFirst({
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
        }

        if (!findConversation) {
            let createConversation;

            if(inseratId) {
                createConversation = await db.insert(conversation).values({
                    user1Id: user1Id,
                    user2Id: user2Id,
                    inseratId : inseratId
                }).returning();
            } else {
                createConversation = await db.insert(conversation).values({
                    user1Id: user1Id,
                    user2Id: user2Id
                }).returning();
            }

            return createConversation[0];
        }

        return findConversation;


    } catch (e: any) {
        console.log(e);
        throw new Error("Fehler beim Erstellen oder Finden der Konversation.");
    }
}