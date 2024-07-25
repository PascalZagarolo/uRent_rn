import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";
import SearchBar from "./search-bar";


const Header = () => {
    return ( 
        <View className="bg-[#202336] p-4 border-b border-gray-700">
            <View className="flex flex-row items-center">
                <View className="mr-4">
                <FontAwesome name="bars" size={24} color="white" className="mr-4" />
                </View>
                <Text className="text-xl font-semibold text-gray-200">
                    uRent
                </Text>
            </View>
            <View className="mt-4">
                <SearchBar />
            </View>
        </View>
     );
}
 
export default Header;