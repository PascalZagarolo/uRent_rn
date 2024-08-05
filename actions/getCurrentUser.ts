'use server'
'use strict'

import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import JWT from "expo-jwt";

export async function getCurrentUser(jwtString : string) {
    try {
        const decodedToken = await JWT.decode(jwtString, "77375149353387154508860974358780");
        

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