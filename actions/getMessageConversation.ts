'use server'
'use strict'

import db from "@/db/drizzle";
import { conversation, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import JWT from "expo-jwt";

export async function getMessageConversation(conversationId : string) {
    try {

        
        
        

        if(!conversationId) {
            return null;
        }

        const retrievedUser = await db.query.conversation.findFirst({
            where : eq(
                conversation.id, conversationId
            )
        })

        console.log(retrievedUser)

        return retrievedUser;

    } catch(e : any) {
        console.log(e);
        return false;
    } 
}