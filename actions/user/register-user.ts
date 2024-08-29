
'use server'


import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs';
import BcryptReactNative from 'bcrypt-react-native';
import isaac from "isaac";
import { generateId } from "lucia";

export const registerUser = async (values) => {
    try {

        var bcrypt = require('bcryptjs');

        const { name, email, password } = values;

        console.log("11");

        const existingEmail = await db.query.userTable.findFirst({
            where: eq(userTable.email, email)
        })


        console.log("12");

        if (existingEmail) {
            return new Error("Email already exists")
        }

        console.log("13");

        if (!name || !email || !password) {
            return new Error("Please fill in all fields")
        }
        
        bcrypt.setRandomFallback((len) => {
            const buf = new Uint8Array(len);
        
            return buf.map(() => Math.floor(isaac.random() * 256));
        });
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const generatedId = generateId(15);

        const createdUser = await db.insert(userTable).values({
            id: generatedId,    
            name,
            email,
            password: hashedPassword,
        })

        
        

        return;

    } catch (e: any) {
        console.log(e)
    }
}