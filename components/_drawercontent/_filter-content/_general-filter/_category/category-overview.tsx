
import { useSavedSearchParams } from "@/store";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import PkwAttributeRender from "./pkw-attributes-render";

const CategoryOverview = () => {
    
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const renderPkw = () => {
        return (
            <View className="p-4 bg-[#171923]">
                    <View className="flex flex-row items-center space-x-4">
                        <Ionicons name="car-outline" size={24} color="#fff" />
                        <Text className="text-lg font-semibold text-gray-200">
                            Pkw 
                        </Text>
                    </View>
                </View>
        )
    }

    const renderLkw = () => {
        return (
            <View className="p-4 bg-[#171923]">
                    <View className="flex flex-row items-center space-x-4">
                        <MaterialCommunityIcons name="truck" size={24} color="#fff" />
                        <Text className="text-lg font-semibold text-gray-200">
                        Lkw
                        </Text>
                    </View>
                </View>
        )
    }

    const renderTransporter = () => {
        return (
            <View className="p-4 bg-[#171923]">
                    <View className="flex flex-row items-center space-x-4">
                        <MaterialCommunityIcons name="van-utility" size={24} color="#fff" />
                        <Text className="text-lg font-semibold text-gray-200">
                            Transporter 
                        </Text>
                    </View>
                </View>
        )
    }

    const renderTrailer = () => {
        return (
            <View className="p-4 bg-[#171923]">
                    <View className="flex flex-row items-center space-x-4">
                        <MaterialCommunityIcons name="truck-trailer" size={24} color="#fff" />
                        <Text className="text-lg font-semibold text-gray-200">
                            Anhänger 
                        </Text>
                    </View>
                </View>
        )
    }

    return ( 
        <View>
            <View>
                {
                    {
                    "PKW" : renderPkw(),
                    "LKW" : renderLkw(),
                    "TRANSPORT" : renderTransporter(),
                    "TRAILER" : renderTrailer(),
                    
                    }[currentObject["thisCategory"]]
                }
            </View>
            <View>
                <PkwAttributeRender />
            </View>
        </View>
     );
}
 
export default CategoryOverview;