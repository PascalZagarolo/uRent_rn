import { getCurrentUser } from "@/actions/getCurrentUser";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import AccountPart from "./_components/account";
import { useAuth } from "../AuthProvider";
import ViewsAndNotifications from "./_components/view-and-notifications";
import PrivacyPart from "./_components/privacy";
import DeleteAccount from "./_components/delete-account";
import { useRouter } from "expo-router";
import { cn } from "@/~/lib/utils";

const SettingsPage = () => {
    0



    const { currentUser, isLoading } = useAuth();

    const router = useRouter();

    if (!currentUser) {
        return null;
    }

    return (
        <View className="flex flex-1 w-full h-full bg-[#1F2332]">
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <View className={cn("border-b border-gray-800 p-4 bg-[#181b27] space-x-4 flex flex-row items-center",
                            Platform.OS === "android" ? "pt-12" : "pt-8"
                        )}>
                            <TouchableOpacity className="" onPress={() => { router.back() }}>
                                <MaterialCommunityIcons name="arrow-left" size={24} color={"white"} />
                            </TouchableOpacity>
                            <Text className="text-xl font-semibold text-gray-200">
                               Einstellungen
                            </Text>
                        </View>
                        <View className="p-4">
                            <AccountPart
                                currentUser={currentUser}
                            />
                        </View>
                        <View className="mt-8 p-4">
                            <ViewsAndNotifications
                                currentUser={currentUser}
                            />
                        </View>
                        <View className="mt-8 p-4">
                            <PrivacyPart
                                currentUser={currentUser}
                            />
                        </View>
                        <View className="mt-8 p-4">
                            <DeleteAccount
                                currentUser={currentUser}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default SettingsPage;