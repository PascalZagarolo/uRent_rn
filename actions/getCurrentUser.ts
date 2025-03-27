

import db from "@/db/drizzle";
import { notification, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import JWT from "expo-jwt";

export async function getCurrentUser(jwtString : string) {

    'use server'


    try {
       
        const decodedToken = await JWT.decode(jwtString, process.env.EXPO_SECRET_JWT_TOKEN);
       
        

        if(!decodedToken?.userId) {
            return false;
        }
       
        const retrievedUser = await db.query.userTable.findFirst({
            where : eq(
                userTable.id, decodedToken.userId
            ),
            with: {
                notifications: true
            }
        })

        

        

        return retrievedUser;

    } catch(e : any) {
        console.log(e);
        return false;
    } 
}