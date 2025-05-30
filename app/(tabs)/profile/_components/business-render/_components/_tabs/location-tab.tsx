import { businessAddress } from "@/db/schema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

import { TouchableOpacity } from "react-native";
import {  Text, View } from "react-native";


interface LocationTabProps {
    foundAddresses: typeof businessAddress.$inferSelect[];
    isOwn: boolean;
    setOpenLocation: (open: boolean, id: string, type : string) => void;
}

const LocationTab = ({ foundAddresses, isOwn, setOpenLocation }: LocationTabProps) => {

    const RenderedAddress = (title: string, postalCode: string, city: string, street: string, imageUrl: string, id : string) => {
        return (
            <View key={title}>
                <View>
                    {imageUrl ? (
                        <Image
                        source={{ uri: imageUrl }}
                        className="w-full h-40 object-cover rounded-t-md"
                    />
                    ) : ( 
                        <View className="h-40 flex flex-row items-center justify-center bg-[#303645]">
                            <MaterialCommunityIcons name="image" size={20} color={"white"}
                         className="" 
                        />
                        </View>
                    )}
                </View>
                <View className=" bg-[#2a2f3d] shadow-xl rounded-b-md p-4">
                    <View className="flex flex-row items-center">
                        <Text className="text-lg font-semibold text-gray-200 w-3/4 line-clamp-1">
                            {title}
                        </Text>
                        {isOwn && (
                            <View className="w-1/4 flex flex-row items-center justify-between">
                                <TouchableOpacity onPress={() => setOpenLocation(true, id, "edit")}>
                                <MaterialCommunityIcons name="pencil" size={24} color={"white"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setOpenLocation(true, id, "delete")}>
                                <MaterialCommunityIcons name="pencil" size={24} color={"red"} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <View className="mt-2 flex flex-row items-center">
                        <MaterialCommunityIcons name="map-marker-check" size={24} color={"white"} />
                        <Text className="ml-4 text-gray-200 font-semibold text-base">
                            {street}, {postalCode}  {city}
                        </Text>
                    </View>

                </View>
            </View>
        )
    }

    return (
        <View>
            <View className="flex flex-row items-center">
            <MaterialCommunityIcons name="home-map-marker" size={20} color={"white"} className="mr-4" />
                
                    <Text className="text-lg font-semibold text-gray-200 ml-4">
                        Standort
                    </Text>
                
                {isOwn && (
                    <TouchableOpacity className="ml-auto p-2.5" onPress={() => { setOpenLocation(true, null, null) }}>
                        <MaterialCommunityIcons name="plus-circle" size={24} color={"white"} />
                    </TouchableOpacity>
                )}
            </View>
            {foundAddresses?.length > 0 ? (
                <View className="mt-4 space-y-8">
                    {foundAddresses.map(address => (
                        RenderedAddress(address?.title, String(address.postalCode ?? ""), address.city, address.street, address.image, address?.id)
                    ))}
                </View>
            ) : (
                <View className="mt-8 space-y-8">
                    <Text className="text-base text-gray-200/60">
                        Keine Standorte hinzugefügt..

                    </Text>
                </View>
            )}
        </View>
    );
}

export default LocationTab;