'use server'

import db from "@/db/drizzle"
import { conversation, message } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "../getCurrentUser"
import {socket} from "@/lib/utils/socketService"
import axios from "axios"

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
    
        const [writtenMessage] = await db.insert(message).values({
            senderId : currentUser.id,
            conversationId : values.conversationId,
            content : values?.content ? values.content : null,
            image : values?.image ? values.image : null
        }).returning();

        
        await axios.post(`https://www.urent-rental.de/api/public/${values.conversationId}/sent-message`, writtenMessage)
       
        socket.emit("newMessage", writtenMessage)

        return writtenMessage;


    } catch(e : any){
        console.log(e)
    }
}