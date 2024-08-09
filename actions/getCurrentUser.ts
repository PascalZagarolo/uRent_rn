'use server'
'use strict'

import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import JWT from "expo-jwt";

export async function getCurrentUser(jwtString : string) {
    try {

        console.log("..", process.env.EXPO_PUBLIC_JWT_TOKEN as string)
        console.log("..", process.env.EXPO_PUBLIC_DATABASE_URL)
        const decodedToken = await JWT.decode(jwtString, process.env.EXPO_PUBLIC_JWT_TOKEN as string);
        
        

        if(!decodedToken.userId) {
            return false;
        }

        const retrievedUser = await db.query.userTable.findFirst({
            where : eq(
                userTable.id, decodedToken.userId
            )
        })

        

        return retrievedUser;

    } catch(e : any) {
        console.log(e);
        return false;
    } 
}