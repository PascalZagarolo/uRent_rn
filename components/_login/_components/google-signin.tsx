
import { Text,  TouchableOpacity,  View } from "react-native";

import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { signIn } from "@/actions/google/sign-in";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";



const GoogleSignIn = () => {

  
  

 
 
  GoogleSignin.configure({
    webClientId: "10083961656-1mdgaosij338sekm5pfevtu9kp14eisl.apps.googleusercontent.com",
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
      <TouchableOpacity
        onPress={onSignUp}
        disabled={isLoading}
        style={{
          backgroundColor: '#3730a3',
          borderRadius: 6,
          width: '100%',
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 12,
          gap: 8,
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        <MaterialCommunityIcons name="google" 
        size={20}
        color={"white"}
        />
        <Text style={{ color: 'white', fontSize: 12, fontWeight: '800' }}>
          {isLoading ? 'Bitte warten...' : 'Mit Google fortfahren'}
        </Text>
      </TouchableOpacity>
    </View>
    );
}

export default GoogleSignIn;