import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";

import { businessAddress, business, userTable } from '../../../db/schema';
import { eq } from "drizzle-orm";


export const createLocation = async (values, jwtToken) => {
    "use server"
    try {

        if(String(jwtToken).trim() == "") {
            console.log("Nicht autorisiert");
            return Error("ERR :404");
        }

        const findUser : typeof userTable = await getCurrentUser(jwtToken);


        const findCorrespondingBusiness = await db.query.business.findFirst({
            where : (
                eq(business.userId , findUser.id)
            )
        })

        if(!findUser || !findUser?.isBusiness || !findCorrespondingBusiness) {
            console.log("Nicht autorisiert");
            return Error("ERR :404");
        } 


        const [createLocation] = await db.insert(businessAddress).values({
            ...values,
            businessId : findCorrespondingBusiness.id
        }).returning()

        return createLocation;


    } catch(e : any) {
        console.log(e);
    }
}