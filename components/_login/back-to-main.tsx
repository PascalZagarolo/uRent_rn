'use client'

import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

const BackToMain = () => {

    const router = useRouter();

    return (
    <SafeAreaView className="absolute top-0 left-0 mt-12 ml-4 flex">

        <TouchableOpacity onPress={() => {router.push(`/`)}}>
        <View className="flex-row items-center gap-x-2">
            <FontAwesome name="arrow-left" size={16} color="white" />
            <Text className="text-gray-200/90 font-semibold hover:underline text-xs">
                Ohne Account fortfahren..
            </Text>
        </View>
        </TouchableOpacity>
    </SafeAreaView>
    );
}

export default BackToMain;