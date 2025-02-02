import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStorage from 'expo-secure-store';


const GoogleSignIn = () => {

  const [userInfo, setUserInfo] = useState(null);
const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId : process.env.EXPO_SECRET_GOOGLE_CLIENT_ID_ANDROID as string,
  iosClientId : process.env.EXPO_SECRET_GOOGLE_CLIENT_ID_IOS as string,
  webClientId : process.env.EXPO_SECRET_GOOGLE_CLIENT_ID_WEB as string,
})
    

  async function handleSignInWithGoogle() {
    const user = await SecureStorage.getItemAsync('user');
    if(!user) {

      if(response?.type === "success") {
        await getUserInfo(response.authentication.accessToken)
      }
    } else {
      setUserInfo(JSON.parse(user))
    }
  }

  useEffect(() => {
    handleSignInWithGoogle()
  },[response])

  const getUserInfo = async (token) => {
    if(!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers : {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const user = await response.json();
      console.log(user)
      await SecureStorage.setItemAsync('user', JSON.stringify(user));

    } catch(e : any) {
      console.log(e)
    }
  }

    return (
        <View className="mt-2">
            <TouchableOpacity
                className='py-4 rounded-md w-full bg-[#1A1C2C] flex items-center flex-row justify-center'
                onPress={() => { promptAsync }}>
                <FontAwesome name="google" size={24} color="white" />
                <Text className='ml-2 text-gray-200 text-center font-semibold'>
                    Mit Google anmelden
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default GoogleSignIn;