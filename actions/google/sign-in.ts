import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from "@react-native-google-signin/google-signin";
import { eq } from "drizzle-orm";
import JWT from "expo-jwt";



// Somewhere in your code
export const signIn = async (): Promise<{error? : string, success? : string, token? : string}> => {
  "use server";
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      

      const res = await loginWithGoogle(response.data?.user)
      return { token: res }
    } else {
      // if (response?.data) {
      //   console.log("Response data!")
      //   await createAccount(response.data?.user.email, response.data?.user.photo, response.data?.user.name)
      //   const res = await loginWithGoogle(response.data?.user)
      //   return { token: res }
      // }
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
          console.log(error.code + error.message + error.name + error?.cause);
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
      where: eq(userTable.email, values.email)
    })

    const usedToken = process.env.EXPO_SECRET_JWT_TOKEN
    
    if (findExistingUser) {
      
      const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;


      const generatedTokenJWT = JWT.encode({
        userId: findExistingUser.id,
        exp: oneMonthInMilliseconds
      },
        usedToken
      )
      
      return generatedTokenJWT
    } else {
      await createAccount(values.email, values.photo, values.givenName);
      const res = await loginWithGoogle(values)

      
      const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;


      const generatedTokenJWT = JWT.encode({
        userId: res,
        exp: oneMonthInMilliseconds
      },
        usedToken
      )

      

      return generatedTokenJWT;
    }

  } catch (e: any) {

  }
}

const createAccount = async (email, photo, name) => {
  try {

    const usedId = generateId();

    const newUser = await db.insert(userTable).values({
      id: usedId,
      email: email,
      image: photo,
      name: name
    }).returning();



    return newUser[0].id

  } catch (e: any) {
    console.log(e)
    throw new Error(e);
  }
}

function generateId(length: number = 16): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}