

import db from "@/db/drizzle";
import { getCurrentUser } from "../getCurrentUser";
import { inserat } from "@/db/schema";

export const createInitialInserat = async (values) => {
    "use server"
   
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

        const createdInserat = await db.insert(inserat).values({
            title : title,
            category : category,
            userId : currentUser.id
        }).returning();

        console.log(createdInserat);
        console.log(createdInserat[0].id);

        return { success : "Inserat erstellt", inseratId : createdInserat[0].id }

    } catch(e : any) {
        console.log(e);
        return { error: "Fehler beim Erstellen des Inserats" }
    }
}