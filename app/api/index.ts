'use server'

import JWT from 'expo-jwt';


import { sign } from "react-native-pure-jwt";

import db from "@/db/drizzle"
import { userTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from 'bcryptjs';






export const createLogin = async (givenEmail: string, givenPassword: string) => {
    try {

        var bcrypt = require('bcryptjs');

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

        const usedSecret = "77375149353387154508860974358780";
        const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

        console.log(usedSecret)

        const generatedTokenJWT = JWT.encode({
            userId : findExistingUser.id,
            exp : oneMonthInMilliseconds
        },
        usedSecret
        )

        return generatedTokenJWT;

    } catch (e: any) {
        console.log(e)
    }
}