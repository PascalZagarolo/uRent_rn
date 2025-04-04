import { cn } from "@/~/lib/utils";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface ConversationSearchHeaderProps {
    currentConversationsLength : number;
    setCurrentTag : (tag : string) => void;
    setShowUnseenChats : (boolean) => void;
    showOnlyUnseen : boolean
}

const ConversationSearchHeader : React.FC<ConversationSearchHeaderProps> = ({
    currentConversationsLength,
    setCurrentTag,
    setShowUnseenChats,
    showOnlyUnseen
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
                    size = {20}
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
            </View>
            <View className="p-4 w-full flex flex-row items-center justify-evenly">
                <TouchableOpacity className={cn("bg-indigo-800 p-2 rounded-md",
                    !showOnlyUnseen && "bg-indigo-800/40"
                )}
                onPress={() => setShowUnseenChats(false)}
                >
                    <Text className={cn("text-sm text-gray-200 font-semibold",
                        !showOnlyUnseen && "text-gray-200/40")}>
                        Alle
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className={cn("bg-indigo-800 p-2 rounded-md",
                                        showOnlyUnseen && "bg-indigo-800/40")}
                onPress={() => setShowUnseenChats(true)}
                >
                    <Text className={cn("text-sm text-gray-200 font-semibold",
                                        showOnlyUnseen && "text-gray-200/40")}>
                        Ungelesen
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
     );
}
 
export default ConversationSearchHeader;