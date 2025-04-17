

import JWT from 'expo-jwt';
import bcrypt from 'bcryptjs';
import db from "@/db/drizzle"
import { twoFactorToken, userTable } from "@/db/schema"
import { eq } from "drizzle-orm"

import axios from 'axios';



function generateId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}


export const createLogin = async (givenEmail: string, givenPassword: string) => {
    'use server'
    try {
        
        

        if (!givenEmail || !givenPassword) {
            return { error: "Ungültige Anmeldedaten" }
        }

        const findExistingUser = await db.query.userTable.findFirst({
            where: eq(
                userTable.email, givenEmail
            )
        })

        if (!findExistingUser) {
            return { error: "Dieser Nutzer existiert nicht" }
        }
        
      
        const passwordsMatch = await bcrypt.compareSync(givenPassword, findExistingUser?.password);
        
        console.log(passwordsMatch)

        if (!passwordsMatch || !findExistingUser.password) {
            return { error: "Falsche Anmeldedaten" }
        }

        if(findExistingUser?.usesTwoFactor) {

            const findExistingToken = await db.query.twoFactorToken.findFirst({
                where : eq(
                    twoFactorToken.email, givenEmail
                )
            })

            if(findExistingToken) {
                await db.delete(twoFactorToken).where(eq(twoFactorToken.email, givenEmail))
            }

            const today = new Date();
            const expirationDate = new Date(today.setDate(today.getDate() + 1))
            const usedToken = generateId(16);

            const [createNewTwoFactorToken] : any = await db.insert(twoFactorToken).values({
                //@ts-ignore
                email : givenEmail,
                token : usedToken,
                expires : expirationDate,
                
            }).returning()

            const values = {
                token : createNewTwoFactorToken.token,
                email : givenEmail,
                secret : process.env.EXPO_PRIVATE_URENT_API_KEY
            }

            await axios.post(`https://www.urent-rental.de/api/private/sent-mails/two-fa`, values);

            return { twoFa : true, user : findExistingUser}
        }

        const usedSecret = process.env.EXPO_SECRET_JWT_TOKEN;
        const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

        

        const generatedTokenJWT = JWT.encode({
            userId : findExistingUser.id,
            exp : oneMonthInMilliseconds
        },
        usedSecret
        )

        return { token : generatedTokenJWT}

    } catch (e: any) {
        console.log(e)
    }
}