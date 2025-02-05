import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from "@react-native-google-signin/google-signin";
import { eq } from "drizzle-orm";
import JWT from "expo-jwt";

  
  // Somewhere in your code
  export const signIn = async () => {
    "use server";
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        console.log(response.data)
        console.log(response.data?.user)
        const res = await loginWithGoogle(response.data?.user)
        return { token : res }
      } else {
        if(response?.data) {
          await createAccount(response.data?.user.email, response.data?.user.photo, response.data?.user.name)
          const res = await loginWithGoogle(response.data?.user)
          return { token : res }
        }
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('In progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Play services not available');
            break;
          default:
          console.log(error);
        }
      } else {
        console.log("...")
      }
    }
  }


  const loginWithGoogle = async (values) => {
    "use server";
    try {

      const findExistingUser = await db.query.userTable.findFirst({
        where : eq(userTable.email, values.email)
      })

      if(findExistingUser) {
        const usedSecret = "77375149353387154508860974358780";
        const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

        

        const generatedTokenJWT = JWT.encode({
            userId : findExistingUser.id,
            exp : oneMonthInMilliseconds
        },
        usedSecret
        )

        return  generatedTokenJWT
      }

    } catch(e : any) {

    }
  }

  const createAccount = async (email, photo, name) => {
    try {
      const newUser = await db.insert(userTable).values({
        email : email,
        image : photo,
        name: name
      }).returning();

      return newUser[0].id

    } catch(e: any) {
      throw new Error(e)
    }
  }