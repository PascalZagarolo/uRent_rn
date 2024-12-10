'use server'
'use strict'

import db from "@/db/drizzle";
import { notification, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import JWT from "expo-jwt";

export async function getCurrentUser(jwtString : string) {
    try {

        console.log("JAAAAAAA")
        const decodedToken = await JWT.decode(jwtString, process.env.EXPO_PUBLIC_JWT_TOKEN as string);
        console.log(decodedToken?.userId)
        

        if(!decodedToken?.userId) {
            return false;
        }
        console.log(decodedToken.userId);
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
        console.log(e + "11");
        return false;
    } 
}