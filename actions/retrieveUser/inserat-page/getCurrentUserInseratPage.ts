

import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import JWT from "expo-jwt";

export async function getCurrentUserInseratPage(jwtString : string) {

    'use server'


    try {

        if(!jwtString) {
            return false;
        }
        
        const decodedToken = await JWT.decode(jwtString, process.env.EXPO_SECRET_JWT_TOKEN);
       
        
        if(!decodedToken?.userId) {
            return false;
        }
       
        const retrievedUser = await db.query.userTable.findFirst({
            where : eq(
                userTable.id, decodedToken.userId
            ),
            with: {
                notifications: true,
                favourites : true
            }
        })

        return retrievedUser;

    } catch(e : any) {
        console.log(e);
        throw new Error("Error retrieving user");
    } 
}