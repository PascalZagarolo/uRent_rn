import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";

import { useSavedSearchParams } from "@/store";
import DynamicSearchCalendar from "./dynamic-search-calendar";
import DynamicSearchReqTime from "./dynamic-reqTime";
import DynamicSearchStartTime from "./dynamic-search-startTime";


const DynamicSearchLayout = () => {

    const [dynamicSearch, setDynamicSearch] = useState<boolean>(false);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    useEffect(() => {
        if(dynamicSearch) {
            changeSearchParams("dynamicSearch", "true")
        } else {
            deleteSearchParams("dynamicSearch")
        }

    },[dynamicSearch])

    return (
        <View>
            <View>
                <View className="flex flex-row items-center gap-x-4 p-4 bg-[#171923]">
                    <MaterialCommunityIcons name="calendar-search" size={24} color="#fff" />
                    <Text className="text-lg font-semibold text-gray-200">
                        Dynamische Suche
                    </Text>

                </View>
                <View className="p-4">
                    <View className="bg-indigo-800 p-4 rounded-md w-full flex flex-row items-center ">
                        <Text className="text-base text-gray-200 font-semibold">
                            Dynamische Suche nutzen
                        </Text>
                        <View className="ml-auto flex justify-end">
                            <Switch
                            onChange={() => setDynamicSearch(!dynamicSearch)}
                                value={dynamicSearch}
                            />
                        </View>
                    </View>
                </View>
                <View>
                <DynamicSearchCalendar 
                disabled={!dynamicSearch}
                />
                </View>
                <View className="">
                    <DynamicSearchStartTime 
                    disabled={!dynamicSearch}
                    />
                </View>
                <View>
                <DynamicSearchReqTime 
                    disabled={!dynamicSearch}
                    />
                </View>
            </View>
        </View>
    );
}

export default DynamicSearchLayout;