'use client';

import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";



const MainForm = () => {

    const [currentForm, setCurrentForm] = useState<"login" | "register">('register');

    const onSwitchLayout = () => {
        setCurrentForm(currentForm === 'login' ? 'register' : 'login');
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
                        <LoginForm />
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
                    <View>
                        <TouchableOpacity className=' py-4 rounded-md w-full  justify-center' onPress={() => {setCurrentForm("register") }}>
                            <Text className=' justify-center text-xs text-gray-200 text-center font-semibold'>
                                
                                Noch keinen Account?
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity className=' py-4 rounded-md w-full  justify-center' onPress={() => { setCurrentForm("login")}}>
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