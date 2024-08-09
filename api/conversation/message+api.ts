import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { conversation, message } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req : Request) {
    try {

        const values = await req.json();

        console.log(values);

        const currentUser = await getCurrentUser(values.token);

        if(!currentUser) {
            return new Response("Nicht autorisiert", { status : 401})
        }

        const findConversation = await db.query.conversation.findFirst({
            where : eq(
                conversation.id, values.conversationId
            )
        })

        if(!findConversation || (findConversation.user1Id !== currentUser.id || findConversation.user2Id !== currentUser.id)) {
            return new Response("Konversation nicht gefunden", { status : 404})
        }

        //@ts-ignore
        const createdMessage = await db.insert(message).values({
            conversationId : values.conversationId as any,
            senderId : currentUser.id,
            image : values?.image,
            content : values.content,

        }).returning();

        return Response.json(createdMessage);


    } catch(e : any) {
        return new Response(e.message, { status : 500})
    }
}