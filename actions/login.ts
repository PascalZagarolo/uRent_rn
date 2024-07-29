import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { error } from "console";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const login = async (email : string, password : string) => {
    try {

        const findUser = await db.query.userTable.findFirst({
            where : eq(userTable.email , email),
        })

        if(!findUser || findUser.password !== password) {
            return {error : "Kein Nutzer gefunden"};
        }

        const passwordMatch = await bcrypt.compare(password, findUser.password);

        if(!passwordMatch) {
            return {error : "Falsches Passwort"};
        }

        console.log("Richtiges Password");

    } catch(e : any) {
        console.log(e);
        return null;
    }
}