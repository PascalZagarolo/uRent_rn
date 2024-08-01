import { CategoryEnumRender } from "@/db/schema";
import { useDeleteParams, useSavedSearchParams } from "@/store";
import { cn } from "@/~/lib/utils";
import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

import { Text, TouchableOpacity, View } from "react-native";

const CategoryFilter = () => {

    const [selectedCategory, setSelectedCategory] = useState();

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)
    

    const { changeAttributes } = useDeleteParams();
    
    const setCategory = (category: typeof CategoryEnumRender) => {
        deleteAttributes();
        //@ts-ignore
        changeSearchParams("thisCategory", category);

    }

    const deleteCategory = () => {

        deleteAttributes();
        deleteSearchParams("thisCategory")
    }

    const deleteAttributes = () => {

        changeAttributes(true);

        //ALLGEMEIN
        deleteSearchParams("caution")

        //PKW
        deleteSearchParams("brand")
        deleteSearchParams("thisBrand")
        deleteSearchParams("seats")
        deleteSearchParams("seatsMax")
        deleteSearchParams("doors")
        deleteSearchParams("doorsMax")
        deleteSearchParams("fuel")
        deleteSearchParams("initial")
        deleteSearchParams("initialMax")
        deleteSearchParams("type");
        deleteSearchParams("ahk");

        //LKW
        deleteSearchParams("application")
        deleteSearchParams("axis")
        deleteSearchParams("drive")
        deleteSearchParams("lkwBrand")
        deleteSearchParams("loading")
        deleteSearchParams("loading_b")
        deleteSearchParams("loading_h")
        deleteSearchParams("loading_l")
        deleteSearchParams("power")
        deleteSearchParams("powerMax")
        deleteSearchParams("transmission")
        deleteSearchParams("volume")
        deleteSearchParams("weightClass")

        //TRAILER
        deleteSearchParams("brake")
        deleteSearchParams("coupling")
        deleteSearchParams("brake")

        //TRANSPORT
        deleteSearchParams("transportBrand")



    }

    return (
        <View>
            <View className="p-4 w-full bg-[#171923]">
                <View>
                    <Text className="text-lg font-semibold text-gray-200">
                        Fahrzeugkategorie
                    </Text>
                </View>
            </View>
            <View className="mt-8">
                <View className="flex flex-row items-center ">
                    <View className="w-1/2 flex justify-center">
                        <TouchableOpacity className="flex flex-col items-center"
                        onPress={//@ts-ignore
                            () => currentObject["thisCategory"] === "PKW" ? deleteCategory() : setCategory("PKW")}
                        >
                            <View className={cn(" p-4 rounded-md bg-[#171923] border-2", 
                            currentObject["thisCategory"] === "PKW" ? "border-blue-800" : "border-[#212539]")}>
                                <Ionicons name="car-outline" size={32} color="#fff" />
                            </View>
                            <Text className={cn("text-base text-center text-gray-200 ",
                            currentObject["thisCategory"] === "PKW" ? "font-semibold" : ""
                            )}>
                                Pkw
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="w-1/2 flex justify-center">
                        <TouchableOpacity className="flex flex-col items-center"
                        onPress={//@ts-ignore
                            () => currentObject["thisCategory"] === "LKW" ? deleteCategory() : setCategory("LKW")}
                        >
                            <View className={cn(" p-4 rounded-md bg-[#171923] border-2", 
                            currentObject["thisCategory"] === "LKW" ? "border-blue-800" : "border-[#212539]")}>
                                <MaterialCommunityIcons name="truck" size={32} color="#fff" />
                            </View>
                            <Text className={cn("text-base text-center text-gray-200 ",
                            currentObject["thisCategory"] === "LKW" ? "font-semibold" : ""
                            )}>
                                Lkw
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex flex-row items-center mt-4">
                    <TouchableOpacity className="w-1/2 flex justify-center"
                    onPress={//@ts-ignore
                        () => currentObject["thisCategory"] === "TRAILER" ? deleteCategory() : setCategory("TRAILER")}
                    >
                        <View className="flex flex-col items-center">
                        <View className={cn(" p-4 rounded-md bg-[#171923] border-2", 
                            currentObject["thisCategory"] === "TRAILER" ? "border-blue-800" : "border-[#212539]")}>
                                <MaterialCommunityIcons name="truck-trailer" size={32} color="#fff" />
                            </View>
                            <Text className={cn("text-base text-center text-gray-200 ",
                            currentObject["thisCategory"] === "TRAILER" ? "font-semibold" : ""
                            )}>
                                Anhänger
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View className="w-1/2 flex justify-center">
                        <TouchableOpacity className="flex flex-col items-center"
                         onPress={//@ts-ignore
                            () => currentObject["thisCategory"] === "TRANSPORT" ? deleteCategory() : setCategory("TRANSPORT")}
                        >
                            <View className={cn(" p-4 rounded-md bg-[#171923] border-2", 
                            currentObject["thisCategory"] === "TRANSPORT" ? "border-blue-800" : "border-[#212539]")}>
                                <MaterialCommunityIcons name="van-utility" size={32} color="#fff" />
                            </View>
                            <Text className={cn("text-base text-center text-gray-200 ",
                            currentObject["thisCategory"] === "TRANSPORT" ? "font-semibold" : ""
                            )}>
                                Transporter
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default CategoryFilter;