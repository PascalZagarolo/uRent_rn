import placeholderPicture from "@/assets/images";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";



interface ConversationHeaderProps {
    inseratTitle?: string | null;
    username: string;
    imageUrl: string;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
    inseratTitle,
    username,
    imageUrl
}) => {

    const router = useRouter();

    return (
        <View>
            <View>

            </View>
            <View className="p-4 flex flex-row items-center border-b border-gray-800">
                <TouchableOpacity className="w-1/12" onPress={() => { router.push("/conversation") }}>
                    <FontAwesome name="arrow-left" size={20} color="white" />
                </TouchableOpacity>
                <View className="w-14 ">
                    <Image
                        source={{ uri: imageUrl ? imageUrl : placeholderPicture }}
                        className="w-10 h-10 rounded-full"
                    />
                </View>
                <View className="w-8/12">

                    {inseratTitle ? (
                        <View>
                            <Text className="text-lg text-gray-200 font-semibold" numberOfLines={1}>
                                {inseratTitle}
                            </Text>
                            <Text className="text-sm font-semibold text-gray-200/60 line-clamp-1 break-all" numberOfLines={1}>
                                {username}
                            </Text>
                        </View>
                    ) : (
                        <Text className="text-lg font-semibold text-gray-200 line-clamp-1 break-all" numberOfLines={1}>
                            {username}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
}

export default ConversationHeader;