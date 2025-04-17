



import db from "@/db/drizzle";
import { userTable, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

import bcrypt from 'bcryptjs';

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



        const { name, email, password } = values;


        const existingEmail = await db.query.userTable.findFirst({
            where: eq(userTable.email, email)
        })


        console.log("Test 1")

        if (existingEmail) {
            return { error: "Email wird bereits benutzt" }
        }

        console.log("Test 2")

        if (!name || !email || !password) {
            return { error: "Ungültige Anmeldedaten" }
        }

        console.log("Test 3")
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const generatedId = generateId(15);
        console.log("Test 4")
        const [createdUser]: any = await db.insert(userTable).values({
            id: generatedId,
            name,
            email,
            password: hashedPassword,
        }).returning()
        console.log("Test 5")
        const findExistingToken = await db.query.verificationTokens.findFirst({
            where: eq(verificationTokens.email, createdUser.email)
        })
        console.log("Test 6")
        if (findExistingToken) {
            await db.delete(verificationTokens).where(eq(verificationTokens.email, createdUser.email))
        }
        console.log("Test 7")
        const token = uuid.v4();

        const today = new Date();
        console.log("Test 8")
        const expiryDate = new Date(today.setDate(today.getDate() + 7));

        console.log("Test 9")
        const createNewToken = await db.insert(verificationTokens).values({
            //@ts-ignore
            email: createdUser.email,
            token: token,
            expires: expiryDate,
            identifier: uuid.v4()
        }).returning();
        console.log("Test 10")
        const sendValues = {
            email: createdUser.email,
            token: token,
            secret: process.env.EXPO_SECRET_URENT_API_KEY
        }
        console.log("Test 11")
        await axios.post(`https://www.urent-rental.de/api/private/sent-mails/confirm-registration`, sendValues)

        return { success: true }

    } catch (e: any) {
        console.log(e)
    }
}