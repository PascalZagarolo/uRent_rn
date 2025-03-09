'use client'

import { registerUser } from "@/actions/user/register-user";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Keyboard, ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import GoogleSignIn from "./_components/google-signin";

interface RegisterFormProps {
    switchLayout: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    switchLayout
}) => {

    const [currentName, setCurrentName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');

    const [currentError, setCurrentError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const onSignUp = async () => {
        try {
            setIsLoading(true);
            const values = {
                name: currentName,
                password: currentPassword,
                email: currentEmail,
            }

            console.log(values);

            const res = await registerUser(values)

            if (res?.success) {
                switchLayout();
                Toast.show({
                    type: 'success',
                    text1: 'Bestätigungs Email gesendet',
                    text2: 'Bitte überprüfe deine Emails um deinen Account zu aktivieren und fortzufahren',
                    visibilityTime: 8000
                })
            } else if (res?.error) {
                Toast.show({
                    type: 'error',
                    text1: 'Fehler',

                })
            }

        } catch (e: any) {
            console.log(e);

        } finally {
            setIsLoading(false);
        }
    }


    const onSocial = () => {
        Toast.show({
            type: 'success',
            text1: 'Bestätigungs Email gesendet',
            text2: 'Bitte überprüfe deine Emails um deinen Account zu aktivieren und fortzufahren',
            visibilityTime: 8000
        })
    }

    return (
        <View className="px-4">
            <KeyboardAvoidingView>
            <View>
                <Text className="text-md text-gray-200 font-semibold">
                    Nutzername
                </Text>
                <TextInput
                    className="bg-[#2A2E3D] text-gray-200 p-4 rounded-md mt-2"
                    value={currentName}
                    onChangeText={setCurrentName}

                />
            </View>
            <View className="mt-4">
                <Text className="text-md text-gray-200 font-semibold">
                    Email
                </Text>
                <TextInput
                    className="bg-[#2A2E3D] text-gray-200 p-4 rounded-md mt-2"
                    value={currentEmail}
                    onChangeText={setCurrentEmail}
                    keyboardType="email-address"
                />
            </View>
            <View className="mt-4">
                <Text className="text-md text-gray-200 font-semibold">
                    Passwort
                </Text>
                <View className="flex flex-row items-center w-full">
                    <TextInput
                        className="bg-[#2A2E3D] text-gray-200 p-4 rounded-md rounded-r-none mt-2 w-10/12"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
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
                <TouchableOpacity className='px-8 py-4 rounded-md w-full bg-[#3f455c] flex flex-row items-center shadow-lg  justify-center'
                    onPress={onSignUp}
                    disabled={isLoading}>

                    {isLoading ? (
                        <ActivityIndicator size="small" color="#000" />
                    ) : (
                       <View className="flex flex-row items-center w-full justify-center space-x-4">
                        <MaterialCommunityIcons name="account-plus" size={20} color={"white"} />
                         <Text className='justify-center  text-gray-200  font-semibold'>
                            Account erstellen
                        </Text>
                       </View>
                    )}
                </TouchableOpacity>
            </View>

            <GoogleSignIn />
            </KeyboardAvoidingView>
        </View>
    );
}

export default RegisterForm;