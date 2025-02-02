'use client'


import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { createLogin } from "@/app/api";
import Toast from "react-native-toast-message";
import Twofa from "./_components/2fa";
import * as SecureStorage from 'expo-secure-store';
import GoogleSignIn from "./_components/google-signin";

interface LoginFormProps {
    show2Fa : boolean;
    show2FaVoid : (value : boolean) => void;
}

const LoginForm : React.FC<LoginFormProps> = ({
    show2Fa,
    show2FaVoid
}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    
    const [foundUser, setFoundUser] = useState(null);

    const router = useRouter();

    

    const onSignUp = async () => {
        
        try {
            setIsLoading(true);
            await createLogin(email, password)
            .then((res : any) => {
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
                    } else if(res?.twoFa) {
                        setFoundUser(res.user);
                        show2FaVoid(true);
                        
                    }
                }
            })
        } catch(e : any) {
            console.log(e);
            return;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await SecureStorage.getItem("authToken");
                if (token) {
                    router.replace("/")
                }
            } catch (e: any) {

            }
        }

        checkLoginStatus()
    }, [])

    

    return (
        <View className="px-4">

            {show2Fa ? (
            <Twofa 
            foundUser = {foundUser}
            />
            ) : (
                <View>
            <View className="mt-4">
                <Text className="text-md text-gray-200 font-semibold">
                    Email
                </Text>
                <TextInput
                    className="bg-[#2A2E3D] text-gray-200 p-4 rounded-md mt-2"
                    onChangeText={(text) => {setEmail(text)}}
                />
            </View>
            <View className="mt-4">
                <Text className="text-md text-gray-200 font-semibold">
                    Passwort
                </Text>
                <View className="flex flex-row items-center w-full">
                    <TextInput
                        className="bg-[#2A2E3D] text-gray-200 p-4 rounded-md rounded-r-none mt-2 w-10/12"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword} // Hide password text based on showPassword state
                    />
                    <TouchableOpacity
                        className="w-2/12 items-center justify-center bg-[#262a37] p-4 mt-2 rounded-md rounded-l-none" // Ensure the icon is centered
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="mt-8">
                <TouchableOpacity className='px-8 py-4 rounded-md w-full bg-white  justify-center'
                    onPress={onSignUp}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#000" />
                    ) : (
                        <Text className='justify-center text-gray-800 text-center font-semibold'>
                            Einloggen
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            <GoogleSignIn />
            </View>
            )}
        </View>
    );
}

export default LoginForm;