import { conversation, message } from "@/db/schema";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../AuthProvider";
import { format } from "date-fns";
import { useRouter } from "expo-router";

import { cn } from "@/~/lib/utils";
import placeholderPicture from "@/assets/images";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface RenderedConversationProps {
    thisConversation: typeof conversation.$inferSelect | any;

}

const RenderedConversation: React.FC<RenderedConversationProps> = ({
    thisConversation
}) => {

    const router = useRouter();

    const { currentUser } = useAuth();

    const otherUser = thisConversation?.user1Id === currentUser.id ? thisConversation.user2 : thisConversation.user1;

    const lastMessage = thisConversation?.lastMessage

    const lastMessageFromMe = lastMessage?.senderId === currentUser.id;

    const unseenMessages = thisConversation?.messages.filter((pMessage) => {
        if(!pMessage?.seen && otherUser?.id == pMessage?.senderId) {
            return pMessage;
        }
    })

    return (
        <TouchableOpacity className="border-b border-gray-800 py-4 px-2"
            onPress={() => {
                router.push(`/conversation/${thisConversation.id}`)
            }}
        >
            <View className="flex flex-row items-center">
                <View className="w-2/12">
                    
                        <Image
                            source={{ uri: otherUser.image ? otherUser?.image : placeholderPicture }}
                            className="w-10 h-10 rounded-full"
                        />
                    
                </View>
                <View className="w-10/12 flex flex-col">
                    <View className="flex flex-row ">
                        <Text className="text-base text-gray-200 font-semibold w-10/12 line-clamp-1" numberOfLines={1}>
                            {otherUser?.name} {otherUser?.id}
                        </Text>
                        {lastMessage && (
                            <Text className="text-xs text-gray-200/60 font-semibold">
                                {format(new Date(lastMessage?.createdAt), "HH:mm")}
                            </Text>
                        )}
                    </View>
                    <View className="w-full flex flex-row items-center">
                        <Text className={cn("text-sm text-gray-200/60 line-clamp-1 w-3/4", !lastMessage?.content && "font-semibold")} numberOfLines={1}>
                            {lastMessageFromMe && "Ich: "} {lastMessage?.content ? lastMessage.content :
                                "Hat ein Foto gesendet."}
                        </Text>
                        {(!lastMessage?.seen && otherUser?.id == lastMessage?.senderId)  && (
                            <View className="py-0.5 px-1  rounded-full bg-rose-600 justify-end ml-auto mr-8">
                                <Text className="text-gray-200 text-xs font-semibold">
                                    {unseenMessages?.length > 9 ? "9+" : unseenMessages?.length}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default RenderedConversation;