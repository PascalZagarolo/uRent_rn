import { getCurrentUser } from "@/actions/getCurrentUser";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import AccountPart from "./_components/account";
import { useAuth } from "../AuthProvider";
import ViewsAndNotifications from "./_components/view-and-notifications";
import PrivacyPart from "./_components/privacy";

const SettingsPage = () => {0

   

    const { currentUser, isLoading } = useAuth();

    if(!currentUser) {
        return null;
    }

    return ( 
        <View className="flex flex-1 w-full h-full bg-[#1F2332]">
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <View className="flex flex-row items-center p-4 gap-x-4">
                            <Ionicons name="settings" size={24} color="white" />
                            <Text className="text-2xl font-semibold text-gray-200">
                                Einstellungen
                            </Text>
                        </View>
                        <View className="p-4">
                            <AccountPart 
                            currentUser = {currentUser}
                            />
                        </View>
                        <View className="mt-8 p-4">
                        <ViewsAndNotifications 
                        currentUser = {currentUser}
                        />
                        </View>
                        <View className="mt-8 p-4">
                            <PrivacyPart 
                            currentUser = {currentUser}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
     );
}
 
export default SettingsPage;