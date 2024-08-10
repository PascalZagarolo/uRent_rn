

import { getCurrentUser } from "@/actions/getCurrentUser";
import { getMessageConversation } from "@/actions/getMessageConversation";
import { writeMessage } from "@/actions/messages/write-message";

import db from "@/db/drizzle";

import { conversation, message } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function POST(req : Request) {
    try {   
        const values = await req.json();

        const writtenMessage = await writeMessage(values);

        console.log("!")
       

        return new Response("OK", { status : 200});

    } catch(e : any) {
        console.log(e);
        return new Response("Server Fehler", { status : 500});
    }
}