import { FontAwesome } from "@expo/vector-icons";

import { useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface ConversationSearchHeaderProps {
    currentConversationsLength : number;
    setCurrentTag : (tag : string) => void;
}

const ConversationSearchHeader : React.FC<ConversationSearchHeaderProps> = ({
    currentConversationsLength,
    setCurrentTag
}) => {
    
    const [search, setSearch] = useState("");

    useMemo(() => {
        if(search.length > 0){
            setCurrentTag(search);
        } else {
            setCurrentTag("");
        }
    },[search])

    return ( 
        <View>
            <View>
                <View className="px-4 pt-4">
                    <Text className="text-xl text-gray-200 font-semibold">
                    Konversationen ({currentConversationsLength})
                    </Text>
                </View>
                <View className="mt-2 px-4 w-full flex items-center flex-row">
                    <TextInput 
                    className="bg-[#141620] p-4 rounded-r-none rounded-l-md text-gray-200 w-10/12"
                    placeholder="Suche nach Konversationen.."
                    />
                    <View className=" flex flex-row justify-center bg-[#1E2839] w-2/12 p-4 rounded-r-md">
                        <FontAwesome name="search" size={20} color="white" />
                    </View>
                </View>
            </View>
            <View className="p-4 w-full flex flex-row items-center justify-evenly">
                <TouchableOpacity className="bg-indigo-800 p-2 rounded-md">
                    <Text className="text-sm text-gray-200 font-semibold">
                        Alle
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-indigo-800 p-2 rounded-md">
                    <Text className="text-sm text-gray-200 font-semibold">
                        Ungelesen
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
     );
}
 
export default ConversationSearchHeader;