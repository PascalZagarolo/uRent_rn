import { getCurrentUser } from "@/actions/getCurrentUser";

export async function publishInserat (values) {
    "use server";
    try {

        const { token } = values;

        const currentUser = await getCurrentUser(token);

        if(!currentUser) {
            throw new Error("User not found");
        }

        

    } catch(e : any) {
        console.log(e);
    }
}