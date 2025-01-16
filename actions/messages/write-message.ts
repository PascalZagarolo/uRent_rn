


import db from "@/db/drizzle"
import { conversation, message, notification } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { getCurrentUser } from "../getCurrentUser"
import { socket } from "@/lib/utils/socketService"
import axios from "axios"

export async function writeMessage(values: any) {
    'use server'
    try {
        const currentUser = await getCurrentUser(values.token);

        if (!currentUser) {
            return null;
        }

        const findConversation = db.query.conversation.findFirst({
            where: eq(
                conversation.id, values.conversationId
            )
        }).prepare("findConversation");

        const foundConversation = await findConversation.execute();

        if (!foundConversation || !(foundConversation.user1Id === currentUser.id || foundConversation.user2Id === currentUser.id)) {
            return null;
        }

        const existingMessage = await db.query.conversation.findFirst({
            where : eq(
                conversation.id, values.conversationId
            )
        })

        const writtenMessage = await db.insert(message).values({
            senderId: currentUser.id,
            conversationId: values.conversationId,
            content: values?.content ? values.content : null,
            image: values?.image ? values.image : null
        }).returning();



        

        const updateLastMessage = await db.update(conversation)
        .set({
            message: writtenMessage[0], lastMessageId: writtenMessage[0].id
        })
        .where(eq(conversation.id, foundConversation.id))
            

        const existingNotification = await db.query.notification.findFirst({
            where:
                and(
                    eq(notification.userId, currentUser.id),
                    eq(notification.conversationId, values.conversationId),
                    eq(notification.seen, false)
                )
        })

        if(!existingNotification) {

            const otherUserId = foundConversation.user1Id === currentUser?.id ? foundConversation?.user2Id : foundConversation?.user1Id

            const [createdNotification] = await db.insert(notification).values({
                userId : otherUserId,
                conversationId : values.conversationId,
                notificationType : "MESSAGE",
                content : currentUser?.name
            }).returning()



            const parameters = {
                sentMessage: writtenMessage[0],
                sender : {
                    id : currentUser?.id,
                    name : currentUser?.name,
                    image : currentUser?.image
                },
                createdNotification : createdNotification,
                startedConversation : existingMessage ? true : false,
                imageUrl : currentUser?.image
            }

            await axios.post(`https://www.urent-rental.de/api/public/${values.conversationId}/sent-message`, parameters)
        } else {

            console.log(currentUser?.image)

            const parameters = {
                sentMessage: writtenMessage[0],
                sender : {
                    id : currentUser?.id,
                    name : currentUser?.name,
                    image : currentUser?.image
                },
            }
            await axios.post(`https://www.urent-rental.de/api/public/${values.conversationId}/sent-message`, parameters)
        }


        

        

        socket.emit("newMessage", {
            sendMessage: writtenMessage[0],
            conversationId: values.conversationId
        })

        return writtenMessage[0];


    } catch (e: any) {
        console.log(e)
    }
}