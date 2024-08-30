'use server'

import db from "@/db/drizzle";
import { twoFactorToken, userTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import JWT from "expo-jwt";

export const checkFor2fa = async (values) => {
    try {

        const { email, token } = values;
        
        if(!email) {
            return { error : "Ungültige Anmeldedaten"}
        }

        if(!token) {
            return { error : "Ungültiger Token"}
        }


        const findExistingToken = await db.query.twoFactorToken.findFirst({
            where : and(
                eq(twoFactorToken.email, email),
                eq(twoFactorToken.token, token)
            )
        })

        if(!findExistingToken) {
            return { errror : "Ungültiger Token"}
        }

        const usedSecret = "77375149353387154508860974358780";
        const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

        const findExistingUser = await db.query.userTable.findFirst({
            where : eq(
                userTable.email, email
            )
        });

        const generatedTokenJWT = JWT.encode({
            userId : findExistingUser.id,
            exp : oneMonthInMilliseconds
        },
        usedSecret
        )

        return { success : "Erfolgreich eingeloggt", token : generatedTokenJWT}
    } catch(e : any) {
        console.log(e);
        return { errror : "Etwas ist schief gelaufen"}
    }
}