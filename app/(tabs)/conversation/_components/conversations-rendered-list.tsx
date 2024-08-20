import { conversation } from "@/db/schema";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import RenderedConversation from "./rendered-conversation";


interface ConversationsRenderListProps {
    foundConversations : typeof conversation.$inferSelect[] | any;
}

const ConversationsRenderedList : React.FC<ConversationsRenderListProps> = ({
    foundConversations
}) => {
    
    const [usedConversations, setUsedConversations] = useState<any>(foundConversations)

    

    useMemo(() => {
        const sortedConversations = [...foundConversations].sort((a, b) => {
            
    
            return a.lastMessage.createdAt < b?.lastMessage.createdAt ? 1 : -1;
        });
    
        setUsedConversations(sortedConversations);
    }, [foundConversations]);

    return ( 
        <View className="w-full flex-col">
            
            {usedConversations.map((conversation) => (
                <RenderedConversation
                key={conversation.id}
                    thisConversation={conversation} />
            ))}
            
        </View>
     );
}
 
export default ConversationsRenderedList;