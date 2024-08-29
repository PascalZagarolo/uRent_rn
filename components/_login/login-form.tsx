'use client'


import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { createLogin } from "@/app/api";

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const router = useRouter();

    const onSignUp = async () => {
        console.log(email + "!!");
        console.log(password + "!!")
        await createLogin(email, password)
            .then((res : any) => {
                if (res.error) {
                    console.log("schade");
                    return;
                } else {
                    console.log(res);
                    const token = res;
                    SecureStore.setItem("authToken", token);
                    router.replace("/")
                }
            })
    }

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    router.replace("/")
                }
            } catch (e: any) {

            }
        }

        checkLoginStatus()
    }, [])

    

    return (
        <View className="">

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
                <TextInput
                    className="bg-[#2A2E3D] text-gray-200 p-4 rounded-md mt-2"
                    onChangeText={(text) => {setPassword(text)}}
                    secureTextEntry={true}
                />
            </View>
            <View className="mt-8">
                <TouchableOpacity className='px-8 py-4 rounded-md w-full bg-white  justify-center'
                    onPress={onSignUp}>
                    <Text className=' justify-center text-gray-800 text-center font-semibold'>
                        Einloggen
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="mt-2">
                <TouchableOpacity
                    className='py-4 rounded-md w-full bg-[#1A1C2C] flex items-center flex-row justify-center'
                    onPress={onSignUp}>
                    <FontAwesome name="google" size={24} color="white" />
                    <Text className='ml-2 text-gray-200 text-center font-semibold'>
                        Mit Google anmelden
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default LoginForm;