



import db from "@/db/drizzle";
import { userTable, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

import isaac from "isaac";

import uuid from 'react-native-uuid';
import axios from "axios";

function generateId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

export const registerUser = async (values) => {
    'use server'
    try {

        var bcrypt = require('bcryptjs');

        const { name, email, password } = values;

        
        const existingEmail = await db.query.userTable.findFirst({
            where: eq(userTable.email, email)
        })


        

        if (existingEmail) {
            return { error : "Email wird bereits benutzt" }
        }

        console.log("13");

        if (!name || !email || !password) {
            return { error : "Ungültige Anmeldedaten" }
        }
        
        bcrypt.setRandomFallback((len) => {
            const buf = new Uint8Array(len);
        
            return buf.map(() => Math.floor(isaac.random() * 256));
        });
        
        const hashedPassword = await bcrypt.hashSync(password, 10);

        const generatedId = generateId(15);

        const [createdUser] : any = await db.insert(userTable).values({
            id: generatedId,    
            name,
            email,
            password: hashedPassword,
        }).returning()

        const findExistingToken = await db.query.verificationTokens.findFirst({
            where : eq(verificationTokens.email, createdUser.email)
        })

        if(findExistingToken) {
            await db.delete(verificationTokens).where(eq(verificationTokens.email, createdUser.email))
        }
        
        const token = uuid.v4();

        const today = new Date();

        const expiryDate = new Date(today.setDate(today.getDate() + 7));
       
        
        const createNewToken = await db.insert(verificationTokens).values({
            //@ts-ignore
            email : createdUser.email,
            token : token,
            expires : expiryDate,
            identifier : uuid.v4()
        }).returning();
        
        const sendValues = {
            email : createdUser.email,
            token : token,
            secret : process.env.EXPO_PUBLIC_URENT_API_KEY
        }

        await axios.post(`https://www.urent-rental.de/api/private/sent-mails/confirm-registration`, sendValues)
        
        return { success: true }

    } catch (e: any) {
        console.log(e)
    }
}