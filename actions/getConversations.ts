
import db from "@/db/drizzle";
import { conversation } from "@/db/schema";
import { eq, or } from "drizzle-orm";

export async function getConversations(userId : string) {
    'use server'
    try {

        const findConversations = db.query.conversation.findMany({
            where : or(
                eq(conversation.user1Id, userId),
                eq(conversation.user2Id, userId),
            ), with : {
                messages : true,
                user1 : true,
                user2 : true,
                lastMessage : true,
                inserat : true
            }
        }).prepare("findConversations");

        const foundConversations = await findConversations.execute();

        return foundConversations

    } catch(e : any){
        console.log(e);
        return [];
    }
}