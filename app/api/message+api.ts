import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { conversation, message } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req : Request) {
    try {   

        const values = await req.json();

        console.log(values)

        const currentUser = await getCurrentUser(values.token);

        if(!currentUser) {
            return new Response("Nutzer nicht gefunden", { status : 404});
        }

        const findConversation = db.query.conversation.findFirst({
            where : eq(
                conversation.id, values.conversationId
            )
        }).prepare("findConversation");

        const foundConversation = await findConversation.execute();

        if(!findConversation || !(foundConversation.user1Id === currentUser.id || foundConversation.user2Id === currentUser.id)) {
            return new Response("Konversation nicht gefunden / Nicht autorisiert", { status : 404});
        }

        

        return new Response("Message gesendet", { status : 200});

    } catch(e : any) {
        console.log(e);
        return new Response("Server Fehler", { status : 500});
    }
}