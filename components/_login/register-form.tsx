'use client'

import { registerUser } from "@/actions/user/register-user";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

interface RegisterFormProps {
    switchLayout : () => void;
}

const RegisterForm : React.FC<RegisterFormProps> = ({
    switchLayout
}) => {

    const [currentName, setCurrentName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const onSignUp = async () => {
        try {
            setIsLoading(true);
            const values = {
                name : currentName,
                password : currentPassword,
                email : currentEmail,
            }

            console.log(values);

            const res = await registerUser(values)

            if(res?.success) {
                switchLayout();
                Toast.show({
                    type: 'success',
                    text1: 'Bestätigungs Email gesendet',
                    text2: 'Bitte überprüfe deine Emails um deinen Account zu aktivieren und fortzufahren',
                    visibilityTime: 8000
                })
            } else if(res?.error) {
                Toast.show({
                    type: 'error',
                    text1: 'Fehler',
                    
                })
            }

        } catch(e : any) {
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
        <View className="">
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
                />
            </View>
            <View className="mt-4">
                <Text className="text-md text-gray-200 font-semibold">
                    Passwort
                </Text>
                <TextInput
                    className="bg-[#2A2E3D] text-gray-200 p-4 rounded-md mt-2"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    passwordRules={"true"}
                />
            </View>
            <View className="mt-8">
                <TouchableOpacity className='px-8 py-4 rounded-md w-full bg-white  justify-center'
                    onPress={onSignUp}
                    disabled={isLoading}>
                    
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#000" />
                    ) : (
                        <Text className='justify-center text-gray-800 text-center font-semibold'>
                            Account erstellen
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            <View className="mt-2">
                <TouchableOpacity
                    className='py-4 rounded-md w-full bg-[#1A1C2C] flex items-center flex-row justify-center'
                    onPress={onSocial}>
                    <FontAwesome name="google" size={24} color="white" />
                    <Text className='ml-2 text-gray-200 text-center font-semibold'>
                        Mit Google anmelden
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default RegisterForm;