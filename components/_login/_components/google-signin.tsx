
import { Text,  TouchableOpacity,  View } from "react-native";

import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { signIn } from "@/actions/google/sign-in";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";


const GoogleSignIn = () => {

  
  

 
 
  GoogleSignin.configure({
    webClientId: "10083961656-1mdgaosij338sekm5pfevtu9kp14eisl.apps.googleusercontent.com",
    
    scopes : ["https://www.googleapis.com/auth/drive.readonly"],
    offlineAccess: true,
    forceCodeForRefreshToken: true,

  })

  const [isLoading, setIsLoading] = useState(false);
  
  const onSignUp = async () => {
        
    try {
      if(isLoading) return;
        setIsLoading(true);
        const res = await signIn()
        
            if (res?.error) {
                console.log("schade");
                return;
            } else {
                if(res?.token) {
                    const token = res.token;
                SecureStore.setItem("authToken", token);
                Toast.show({
                    type: 'success',
                    text1: 'Erfolgreich eingeloggt',
                    visibilityTime: 4000
                })
                    router.replace("/")
                }
            }
       
    } catch(e : any) {
        console.log(e);
        return;
    } finally {
        setIsLoading(false);
    }
}
  

  

    return (
        <View className="mt-2 w-full">
          
            {/* <TouchableOpacity
                className='py-4 rounded-md w-full bg-[#1A1C2C] flex items-center flex-row justify-center'>
                <FontAwesome name="google" size={24} color="white" />
                <Text className='ml-2 text-gray-200 text-center font-semibold'>
                    Mit Google anmelden
                </Text>
            </TouchableOpacity>  */}
             <GoogleSigninButton 
             
            onPress={onSignUp}
            /> 

        </View>
    );
}

export default GoogleSignIn;