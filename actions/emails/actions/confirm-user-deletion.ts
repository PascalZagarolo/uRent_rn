

import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { deleteUserToken } from "@/db/schema";
import { eq, ne } from "drizzle-orm";

import { sendUserDeletedTokenMail } from "../sendMails";
import axios from "axios";

export async function ConfirmUserDeleteFunction(authToken : string){
    'use server'
    try {
        
        const currentUser = await getCurrentUser(authToken);
        
        if(!currentUser) {
            return new Error("User not found");
        }
        
        const existingToken = await db.query.deleteUserToken.findFirst({
            where: eq(deleteUserToken.userId, currentUser.id)
        })
        
        if(existingToken) {
            await db.delete(deleteUserToken).where(eq(deleteUserToken.userId, currentUser.id));
        }
        
        const currentDate = new Date();
        const generateToken = "Halllo!"
        const expireInOneHour = new Date(currentDate.getTime() + 60 * 60 * 1000);

       
        const createNewToken = await db.insert(deleteUserToken).values({
            userId : currentUser.id,
            token : generateToken as string,
            expires : expireInOneHour,
        })

        //const sendCorresponingMail = await sendUserDeletedTokenMail(currentUser.email, generateToken);
        
        const values = {
            email : currentUser?.email,
            token : generateToken,
            secret : process.env.EXPO_PUBLIC_URENT_API_KEY
        }

        await axios.post("https://www.urent-rental.de/api/private/sent-mails/delete-user-request", values);
    
        return;

    } catch(e : any) {
        console.log(e);
        return null;
    }
}
 
