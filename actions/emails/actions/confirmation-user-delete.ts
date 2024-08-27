import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { deleteUserToken } from "@/db/schema";
import { eq, ne } from "drizzle-orm";

const ConfirmUserDelete = async (authToken : string) => {
    try {

        const currentUser = await getCurrentUser(authToken);

        if(!currentUser) {
            return new Error("User not found");
        }

        const existingToken = await db.query.deleteUserToken.findFirst({
            where: eq(deleteUserToken.id, currentUser.id)
        })
        
        if(existingToken) {
            await db.delete(deleteUserToken).where(eq(deleteUserToken.id, currentUser.id));
        }

        

    } catch(e : any) {
        console.log(e);
        return null;
    }
}
 
export default ConfirmUserDelete;