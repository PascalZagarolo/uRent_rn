import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { error } from "console";
import { eq } from "drizzle-orm";
import BcryptReactNative from "react-native-bcrypt"


export const login = async (email : string, password : string) => {
    'use server'
    try {
        
       

        const findUser = await db.query.userTable.findFirst({
            where : eq(userTable.email , email),
        })

        

        if(!findUser || findUser.password !== password) {
            return {error : "Kein Nutzer gefunden"};
        }

        const passwordsMatch = await BcryptReactNative.compare(password, findUser.password);

        if(!passwordsMatch) {
            return {error : "Falsches Passwort"};
        }

        console.log("Richtiges Password");

    } catch(e : any) {
        console.log(e);
        return null;
    }
}