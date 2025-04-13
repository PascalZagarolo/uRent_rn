import { cn } from "@/~/lib/utils";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface ConversationSearchHeaderProps {
    currentConversationsLength: number;
    setCurrentTag: (tag: string) => void;
    setShowUnseenChats: (boolean) => void;
    showOnlyUnseen: boolean
    currentTab : string;
    setCurrentTab: (tab : string) => void;
}

const ConversationSearchHeader: React.FC<ConversationSearchHeaderProps> = ({
    currentConversationsLength,
    setCurrentTag,
    setShowUnseenChats,
    showOnlyUnseen,
    currentTab,
    setCurrentTab
}) => {

    const [search, setSearch] = useState("");



    const onPress = () => {
        setCurrentTag(search)
    }

    return (
        <View>
            <View>
                <View className="px-4 pt-4 flex flex-row items-center">
                    <TouchableOpacity className="mr-4"
                        onPress={() => {
                            router.push("/")
                        }}
                    >
                        <MaterialCommunityIcons
                            color={"white"}
                            size={20}
                            name="arrow-left"
                        />
                    </TouchableOpacity>
                    <Text className="text-xl text-gray-200 font-semibold">
                        Konversationen ({currentConversationsLength})
                    </Text>
                </View>
                <View className="mt-4 px-4 w-full flex items-center flex-row">
                    <TextInput
                        className="bg-[#141620] p-4 rounded-r-none rounded-l-md text-gray-200 w-10/12"
                        placeholder="Suche nach Konversationen.."
                        onChangeText={setSearch}
                        placeholderTextColor={"gray"}
                    />
                    <TouchableOpacity className=" flex flex-row justify-center bg-[#1E2839] w-2/12 p-4 rounded-r-md"
                        onPress={onPress}
                    >
                        <FontAwesome name="search" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 16 }}
    className="py-4"
>
    <View className="flex flex-row items-center space-x-4">
        {/* Alle */}
        <TouchableOpacity
            className={cn(
                "px-4 py-2 rounded-md",
                !showOnlyUnseen ? "bg-indigo-800 shadow-lg" : "bg-indigo-800/10"
            )}
            onPress={() => setShowUnseenChats(false)}
        >
            <Text
                className={cn(
                    "text-sm font-semibold",
                    !showOnlyUnseen ? "text-gray-200" : "text-gray-200/20"
                )}
            >
                Alle
            </Text>
        </TouchableOpacity>

        {/* Ungelesen */}
        <TouchableOpacity
            className={cn(
                "px-4 py-2 rounded-md",
                showOnlyUnseen ? "bg-indigo-800 shadow" : "bg-indigo-800/10"
            )}
            onPress={() => setShowUnseenChats(true)}
        >
            <Text
                className={cn(
                    "text-sm font-semibold",
                    showOnlyUnseen ? "text-gray-200" : "text-gray-200/10"
                )}
            >
                Ungelesen
            </Text>
        </TouchableOpacity>

        {/* Inserate */}
        <TouchableOpacity className={cn(
            "flex flex-row items-center space-x-2  px-4 py-2 rounded-md",
            currentTab == "INSERAT" ? "bg-indigo-800" : "bg-indigo-800/10"
        )}
        onPress={() => {
            setCurrentTab("INSERAT")
        }}
        >
            <MaterialCommunityIcons name="car" size={16} color={currentTab == "INSERAT" ? "white" : "gray"} />
            <Text className={cn("text-sm font-semibold", currentTab == "INSERAT" ? "text-gray-200" : "text-gray-200/10")}
            >Inserate</Text>
        </TouchableOpacity>

        {/* Profil */}
        <TouchableOpacity className={cn(
            "flex flex-row items-center space-x-2  px-4 py-2 rounded-md",
            currentTab == "ACCOUNT" ? "bg-indigo-800" : "bg-indigo-800/10"
        )}
        onPress={() => {
            setCurrentTab("ACCOUNT")
        }}
        >
            <MaterialCommunityIcons name="account" size={16} color={currentTab == "ACCOUNT" ? "white" : "gray"} />
            <Text className={cn("text-sm font-semibold", currentTab == "ACCOUNT" ? "text-gray-200" : "text-gray-200/10")}
            >Profil</Text>
        </TouchableOpacity>
    </View>
</ScrollView>

            </View>
           

        </View>
    );
}

export default ConversationSearchHeader;