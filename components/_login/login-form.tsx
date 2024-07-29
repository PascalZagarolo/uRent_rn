'use client'

import { FontAwesome } from "@expo/vector-icons";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const LoginForm = () => {

    const onSignUp = () => {
        console.log('Sign up')
    }

    return (
        <View className="">
            
            <View className="mt-4">
                <Text className="text-md text-gray-200 font-semibold">
                    Email
                </Text>
                <TextInput
                    className="bg-[#2A2E3D] text-gray-200 p-4 rounded-md mt-2"
                />
            </View>
            <View className="mt-4">
                <Text className="text-md text-gray-200 font-semibold">
                    Passwort
                </Text>
                <TextInput
                    className="bg-[#2A2E3D] text-gray-200 p-4 rounded-md mt-2"
                    
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