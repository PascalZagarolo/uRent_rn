'use client';

import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";
import { FontAwesome } from "@expo/vector-icons";
import { set } from "date-fns";



const MainForm = () => {

    const [currentForm, setCurrentForm] = useState<"login" | "register">('register');
    const [is2fa, setIs2fa] = useState(false);

    const onSwitchLayout = () => {
        setCurrentForm(currentForm === 'login' ? 'register' : 'login');
    }

    const show2FaVoid = (value) => {
        setIs2fa(value);
    }

    return (
        <SafeAreaView>

            {currentForm === 'login' ? (
                <View>
                    <View className="flex flex-col justify-center items-center">
                        <Text className="text-gray-200 text-2xl">Einloggen</Text>
                        <Text className="text-xs text-gray-200/60">
                            Willkommen zurück! Logge dich ein um fortzufahren.
                        </Text>
                    </View>
                    <View>
                        <LoginForm
                            show2FaVoid={show2FaVoid}
                            show2Fa={is2fa}
                            
                        />
                    </View>
                </View>
            ) : (
                <View>
                    <View className="flex flex-col justify-center items-center">
                        <Text className="text-gray-200 text-2xl">Registrieren</Text>
                        <Text className="text-xs text-gray-200/60">
                            Erstelle ein Konto und erlebe uRents vollen Umfang!
                        </Text>

                    </View>
                    <View className="mt-8">
                        <RegisterForm
                            switchLayout={onSwitchLayout}
                        />
                    </View>
                </View>
            )}
            {
                currentForm === 'login' ? (
                    is2fa ? (
                        <View>
                            <TouchableOpacity className=' py-4 rounded-md w-full flex flex-row items-center  justify-center' 
                            onPress={() => { setCurrentForm("login"); 
                                            setIs2fa(false)
                            }}>
                                <View className="mr-4">
                                <FontAwesome name="arrow-left" size={20} color="white" />
                                </View>
                                <Text className=' justify-center text-xs text-gray-200 text-center font-semibold'>

                                    Zurück zur Anmeldung
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <TouchableOpacity className=' py-4 rounded-md w-full  justify-center' onPress={() => { setCurrentForm("register") }}>
                                <Text className=' justify-center text-xs text-gray-200 text-center font-semibold'>

                                    Noch keinen Account?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                ) : (
                    <View>
                        <TouchableOpacity className=' py-4 rounded-md w-full  justify-center' onPress={() => { setCurrentForm("login") }}>
                            <Text className=' justify-center text-xs text-gray-200 text-center font-semibold'>
                                Du besitzt bereits einen Account?
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }

        </SafeAreaView>
    );
}

export default MainForm;