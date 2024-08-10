'use server'

import db from "@/db/drizzle"
import { conversation, message } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "../getCurrentUser"

export async function writeMessage(values : any) {
    try {

        const currentUser = await getCurrentUser(values.token);

        if(!currentUser) {
            return null;
        }

        const findConversation = db.query.conversation.findFirst({
            where : eq(
                conversation.id, values.conversationId
            )
        }).prepare("findConversation");

        const foundConversation = await findConversation.execute();

        if(!foundConversation || !(foundConversation.user1Id === currentUser.id || foundConversation.user2Id === currentUser.id)) {
            return null;
        }
        
        const writtenMessage = await db.insert(message).values({
            senderId : currentUser.id,
            conversationId : values.conversationId,
            content : values?.content ? values.content : null,
            image : values?.image ? values.image : null
        }).returning();

        return writtenMessage;


    } catch(e : any){
        console.log(e)
    }
}