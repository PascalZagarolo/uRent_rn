import db from "@/db/drizzle";
import { getCurrentUser } from "../getCurrentUser";
import { business, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function switchToBusiness (authToken : string) {
    "use server";
    try{
        const currentUser = await getCurrentUser(authToken);

        if(!currentUser) {
            console.log("404")
            throw new Error("User not found");
        }

        if(currentUser.isBusiness) {
            console.log("400")
            throw new Error("User is already a business");
        }

        const createBusiness : any = await db.insert(business).values({
            userId : currentUser.id
        }).returning()

        await db.update(userTable).set({
            isBusiness : true,
            businessId : createBusiness[0].id
        }).where(eq(userTable.id, currentUser.id))

        return createBusiness[0];

    } catch(e : any) {
        console.log(e);
        throw new Error(e);
    }
}