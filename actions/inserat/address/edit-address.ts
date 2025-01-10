
import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { address, inserat } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function editAddress(values) {
    "use server";
    try {

        const currentUser = await getCurrentUser(values.token);


        if (!currentUser) {
            throw new Error("User not found");
        }



        const findInserat = await db.query.inserat.findFirst({
            where: eq(inserat.id, values.inseratId)
        })

        if (!findInserat || findInserat?.userId != currentUser.id) {
            throw new Error("Inserat not found");
        }


        console.log("find inserat" + findInserat?.id)

        const findAddress = await db.query.address.findFirst({
            where: eq(address?.inseratId, findInserat?.id)
        })

        console.log(findAddress + "!!!!")

        if (!findAddress) {
            const newAddress = await db.insert(address).values({
                ...(values?.postalCode ? { postalCode: values.postalCode } : {}),
                ...(values?.locationString ? { locationString: values.locationString } : {}),
                inseratId: findInserat.id
            }).returning()

            console.log(newAddress[0].id + "new address id")

            const matchInserat = await db.update(inserat).set({
                addressId: newAddress[0].id
            }).where(eq(inserat.id, values.inseratId)).returning();

            console.log(newAddress)

            return newAddress[0];
        } else {
            console.log("else..")
            console.log(values?.locationString)
            const updateAddress = await db.update(address)
                .set({
                    ...(values?.postalCode ? { postalCode: values.postalCode } : {}),
                    ...(values?.locationString ? { locationString: values.locationString } : {})
                })
                .where(eq(address.id, findAddress.id))
                .returning();

            return updateAddress[0];
        }

    } catch (e: any) {
        console.log(e);
        throw new Error("Error editing address");
    }
}