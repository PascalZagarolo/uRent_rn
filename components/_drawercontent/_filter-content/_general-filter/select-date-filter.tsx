import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

const SelectDateFilter = () => {
    return ( 
        <View className="p-4 bg-[#171923]">
            <View className="flex flex-row items-center gap-x-4">
                <FontAwesome name="calendar" size={24} color="#fff" />
                <Text className="text-lg font-semibold text-gray-200">
                    Mietzeitraum
                </Text>
            </View>
            <View className="flex flex-row items-center">

            </View>
        </View>
     );
}
 
export default SelectDateFilter;