'use server'

import BcryptReactNative from 'bcrypt-react-native';

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
        console.log(findExistingUser.password)
        console.log(givenPassword + "sss")

        
        
        const passwordsMatch = await bcrypt.compareSync(givenPassword, findExistingUser?.password);
        console.log("unsdaunondoiusfoi")
        console.log(passwordsMatch)

        if (!passwordsMatch || !findExistingUser.password) {
            return { error: "Falsche Anmeldedaten" }
        }

       

        const usedSecret = process.env.JWT_SECRET;
        const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

        console.log("Nurnoch token")

        const token = sign({
            userId: findExistingUser.id,
            exp: oneMonthInMilliseconds
        },
            usedSecret,
            {
                alg: "HS256"
            }

        )
        return token;

    } catch (e: any) {
        console.log(e)
    }
}