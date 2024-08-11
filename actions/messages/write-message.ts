'use server'

import db from "@/db/drizzle"
import { conversation, message } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "../getCurrentUser"


export async function writeMessage(values : any) {
    try {

        var Pusher = require('pusher');

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
    
        //@ts-ignore
        const writtenMessage = await db.insert(message).values({
            senderId : currentUser.id,
            conversationId : values.conversationId,
            content : values?.content ? values.content : null,
            image : values?.image ? values.image : null
        }).returning();

        var pusher = new Pusher({
            appId : process.env.EXPO_PUBLIC_PUSHER_APP_ID,
            key : process.env.EXPO_PUBLIC_PUSHER_APP_KEY,
            secret : process.env.EXPO_PUBLIC_PUSHER_APP_SECRET,
            cluster : "eu"
        })

        pusher.trigger("messages", "new-massage", { writtenMessage})
        

        return writtenMessage;


    } catch(e : any){
        console.log(e)
    }
}