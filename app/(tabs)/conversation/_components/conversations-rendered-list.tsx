import { conversation } from "@/db/schema";
import { useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RenderedConversation from "./rendered-conversation";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface ConversationsRenderListProps {
    foundConversations : typeof conversation.$inferSelect[] | any;
}

const ConversationsRenderedList : React.FC<ConversationsRenderListProps> = ({
    foundConversations
}) => {    
    const [usedConversations, setUsedConversations] = useState<any>(foundConversations)

    useMemo(() => {
        const sortedConversations = [...foundConversations].sort((a, b) => {  
            return a.lastMessage?.createdAt < b?.lastMessage?.createdAt ? 1 : -1;
        });
    
        setUsedConversations(sortedConversations);
    }, [foundConversations]);

    return ( 
        <View className="w-full flex-col">
            
            {usedConversations?.length > 0 ? (
                usedConversations.map((conversation) => (
                    <RenderedConversation
                    key={conversation.id}
                        thisConversation={conversation} />
                ))
            ) : (
                <View className="flex py-16 flex-col items-center justify-center">
                    <MaterialCommunityIcons name="chat" 
                    size={40}
                    color={"gray"}
                    />
                    <Text className="text-center font-semibold mt-2 text-base text-gray-200/60">
                    Keine passenden Konversationen gefunden..
                </Text>
                </View>
            )}
            
        </View>
     );
}
 
export default ConversationsRenderedList;