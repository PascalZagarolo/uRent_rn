'use server'
'use strict'

import db from "@/db/drizzle";
import { getCurrentUser } from "../getCurrentUser";
import { inserat } from "@/db/schema";

export const createInitialInserat = async (values) => {
    try {

        const { title, category, token } = values;

        if(!token) {
            return { error : "Nicht eingeloggt." }
        }

        if (!title || !category) {
            return { error: "Ungültige Daten" }
        }

        const currentUser = await getCurrentUser(token);


        if(!currentUser) {    
            return { error : "Nicht eingeloggt."}
        }

        const [createdInserat] : typeof inserat.$inferSelect = await db.insert(inserat).values({
            title : title,
            category : category,
            userId : currentUser.id
        }).returning();

        return { success : "Inserat erstellt", inseratId : createdInserat.id }

    } catch(e : any) {
        console.log(e);
        return { error: "Fehler beim Erstellen des Inserats" }
    }
}