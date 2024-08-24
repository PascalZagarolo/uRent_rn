import { conversation, message } from "@/db/schema";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../AuthProvider";
import { format } from "date-fns";
import { useRouter } from "expo-router";


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

    
    return (
        <TouchableOpacity className="border-b border-gray-800 py-4 px-2"
        onPress={() => {
            router.push(`/conversation/${thisConversation.id}`)
        }}
        >
            <View className="flex flex-row items-center">
                <View className="w-2/12">
                    <Image
                        source={{ uri: otherUser.image }}
                        className="w-12 h-12 rounded-full"
                    />
                </View>
                <View className="w-10/12 flex flex-col">
                    <View className="flex flex-row ">
                        <Text className="text-base text-gray-200 font-semibold w-10/12 line-clamp-1" numberOfLines={1}>
                            {otherUser.name}
                        </Text>
                        {lastMessage && (
                            <Text className="text-xs text-gray-200/60 font-semibold">
                            {format(new Date(lastMessage?.createdAt), "HH:mm")}
                        </Text>
                        )}
                    </View>
                    <View>
                        <Text className="text-sm text-gray-200/60 line-clamp-1" numberOfLines={1}>
                           {lastMessageFromMe && "Ich: "} {lastMessage?.content ? lastMessage.content : "Hat ein Bild gesendet."}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default RenderedConversation;