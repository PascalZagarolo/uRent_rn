

import db from "@/db/drizzle";
import { images, notification, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import JWT from "expo-jwt";

export async function getCurrentUserDashboard(jwtString : string) {

    'use server'


    try {

        
        const decodedToken = await JWT.decode(jwtString, process.env.EXPO_SECRET_JWT_TOKEN as string);
       
        

        if(!decodedToken?.userId) {
            return false;
        }
       
        const retrievedUser = await db.query.userTable.findFirst({
            where : eq(
                userTable.id, decodedToken.userId
            ),
            with: {
                notifications: true,
                inserat : {
                    with : {
                        images : {
                            orderBy: (created_at, { asc }) => [asc(images.position)],
                        }
                    }
                },
                favourites : {
                    with : {
                        inserat : {
                            with : {
                                images : {
                                    orderBy: (created_at, { asc }) => [asc(images.position)],
                                },
                                user : true
                            }
                        }
                    }
                }
            }
        })

        

        
        console.log(retrievedUser + "sss")
        return retrievedUser;

    } catch(e : any) {
        console.log(e);
        return false;
    } 
}