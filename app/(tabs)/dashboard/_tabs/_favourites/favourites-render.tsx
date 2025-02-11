import { favourite, inserat } from "@/db/schema";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";


interface FavouriteRenderProps {
    thisFavourite: typeof favourite.$inferSelect & { inserat: typeof inserat.$inferSelect };
    onDeFav : (inseratId : string) => void;
}

const FavouriteRender = ({ thisFavourite, onDeFav }: FavouriteRenderProps) => {

    const router = useRouter()

    return (
        <View className="bg-[#202433] shadow-lg w-full">
            <View className="flex flex-row items-center">
                <View>
                    {thisFavourite?.inserat?.images[0]?.url ? (
                        <Image
                            source={{ uri: thisFavourite?.inserat?.images[0]?.url }}
                            className="w-28 h-28 rounded-tl-md"
                        />
                    ) : (
                        <View
                            className="w-28 h-28 bg-[#2a2f41] rounded-l-md flex flex-row items-center justify-center"
                        >
                            <MaterialCommunityIcons name="image"
                                className="w-4 h-4 text-gray-200/60"
                            />
                        </View>
                    )}
                </View>
                <TouchableOpacity className="p-4 w-[40%] mb-auto" onPress={() => {router.push(`/inserat/${thisFavourite?.inseratId}`)}}>
                    <Text className="text-base text-gray-200 line-clamp-1 w-full break-all" numberOfLines={3}>
                        {thisFavourite?.inserat.title} 
                    </Text>
                </TouchableOpacity>
                <View className="ml-auto flex flex-col mb-auto px-4">
                    
                    <TouchableOpacity className="mt-4  rounded-md" onPress={() => {onDeFav(thisFavourite?.inseratId)}}>
                        <Ionicons name="bookmark" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity className="p-2.5 flex flex-row items-center rounded-b-md bg-[#1e222e] border-t border-gray-800 shadow-lg" onPress={() => {router.push(`/profile/${thisFavourite?.inserat?.userId}`)}}>
                <View>
                    <Image 
                    source={{ uri: thisFavourite?.inserat?.user?.image ? thisFavourite?.inserat?.user?.image : "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg" }}
                    className="w-12 h-12 rounded-full object-cover"
                    />
                </View>
                <View className="w-3/4 ml-4">
                    <Text className="text-base text-gray-200 font-semibold">
                    {thisFavourite?.inserat?.user?.name}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default FavouriteRender;