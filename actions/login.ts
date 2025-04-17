import db from "@/db/drizzle";
import { userTable } from "@/db/schema";

import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs';


export const login = async (email : string, password : string) => {
    'use server'
    try {
        
        console.log(process.env.EXPO_SECRET_JWT_TOKEN)
        const findUser = await db.query.userTable.findFirst({
            where : eq(userTable.email , email),
        })
        

        if(!findUser || findUser.password !== password) {
            return {error : "Kein Nutzer gefunden"};
        }

        const passwordsMatch = await bcrypt.compare(password, findUser.password);

        if(!passwordsMatch) {
            return {error : "Falsches Passwort"};
        }

        

    } catch(e : any) {
        console.log(e);
        return null;
    }
}