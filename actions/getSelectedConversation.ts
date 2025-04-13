import db from "@/db/drizzle";
import { conversation } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSelectedConversation(conversationId : string) {
    try {

        const findConversation = db.query.conversation.findFirst({
            where: eq(conversation.id, conversationId),
            with : {
                messages : true,
                user1 : true,
                user2 : true,
                inserat : true
            }
        }).prepare("findConversation");

        const foundConversation = await findConversation.execute();

        return foundConversation;

    } catch(e : any) {
        console.log(e);
        return null;
    }
}