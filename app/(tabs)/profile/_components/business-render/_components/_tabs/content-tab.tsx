import { inserat } from "@/db/schema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {  Text } from "react-native";
import { View } from "react-native";


interface ContentTabProps {
    username: string;
    foundInserate: typeof inserat.$inferSelect[];
}

const ContentTab = ({ username, foundInserate }: ContentTabProps) => {


    const router = useRouter();
    const [amountRendered, setAmountRendered] = useState(5);

    const InseratRender = (title: string, postalCode: string, city: string, price: string, imageUrl: string, inseratId : string) => {
        return (
            <TouchableOpacity key={inseratId} onPress={() => router.push(`/inserat/${inseratId}`)}>
                <View className="w-full">
                    <Image
                        source={{ uri: imageUrl }}
                        className="w-full h-40 object-cover rounded-t-md"
                    />
                </View>
                <View className=" bg-[#2a2f3d] shadow-xl rounded-b-md p-4">
                    <View className="flex flex-row items-center">
                        <Text className="text-lg font-semibold text-gray-200 w-3/4 line-clamp-1">
                            {title}
                        </Text>
                        <View className="ml-auto">
                        <MaterialCommunityIcons name="bookmark" size={24} color="#4B5563" />
                        </View>
                    </View>
                    <View className="mt-2 flex flex-row items-center">
                    <MaterialCommunityIcons name="map-marker-check" size={24} color="red" />
                        <Text className="ml-4 text-gray-200 font-semibold text-base">
                            {postalCode} | {city}
                        </Text>
                    </View>
                    <View className="mt-2 flex flex-row ">
                        <Text className="text-xl font-semibold text-gray-200">
                            {price}
                        </Text>
                        <Text className="text-lg text-gray-200/60 ml-1">
                            €
                        </Text>
                        <Text className="text-sm text-gray-200/60 ml-1">
                            /Tag
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

const onRenderMore = () => {
    setAmountRendered(amountRendered + 5);
}

    return (
        <View className="">
            <View className="flex flex-row items-center">
                <MaterialCommunityIcons name="chevron-right" size={20} color="#4B5563" />
                <Text className="text-lg font-semibold text-gray-200 ml-4">
                    Mehr von {username}
                </Text>
            </View>
            {foundInserate?.length > 0 ? (
                <View className="space-y-4 mt-4">
                {foundInserate.slice(0, amountRendered).map((inserat: any) => (
                    InseratRender(inserat.title, inserat.address?.postalCode, inserat.address?.locationString, inserat.price, inserat?.images[0]?.url, inserat.id)
                ))}
            </View>
            ) : (
                <Text className="mt-4 text-gray-200/50">
                    Noch keine Inhalte geteilt..
                </Text>
            )}
            {amountRendered < foundInserate.length && (
                <View className="mt-4">
                    <TouchableOpacity className="bg-indigo-800 shadow-lg rounded-lg flex flex-row items-center justify-center" onPress={onRenderMore}>
                    
                        <Text className="flex flex-row justify-center text-gray-200 text-lg text-center items-center p-2.5 ">
                            Mehr anzeigen
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default ContentTab;