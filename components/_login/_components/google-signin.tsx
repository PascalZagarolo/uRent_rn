
import { Text,  View } from "react-native";

import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { signIn } from "@/actions/google/sign-in";


const GoogleSignIn = () => {

  
  

 
 
  GoogleSignin.configure({
    webClientId: "10083961656-1mdgaosij338sekm5pfevtu9kp14eisl.apps.googleusercontent.com",
    
    scopes : ["https://www.googleapis.com/auth/drive.readonly"],
    offlineAccess: true,
    forceCodeForRefreshToken: true,

  })
  

  

  

    return (
        <View className="mt-2">
          <Text>
 asda            Hallo! 
          </Text>
            {/* <TouchableOpacity
                className='py-4 rounded-md w-full bg-[#1A1C2C] flex items-center flex-row justify-center'>
                <FontAwesome name="google" size={24} color="white" />
                <Text className='ml-2 text-gray-200 text-center font-semibold'>
                    Mit Google anmelden
                </Text>
            </TouchableOpacity> */}
            <GoogleSigninButton 
            onPress={signIn}
            />

        </View>
    );
}

export default GoogleSignIn;