import { FontAwesome } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

const SearchBar = () => {
    return ( 
        <View className="w-full">
            <View className=" w-full  rounded-md">
                <View className="flex flex-row items-center">
                    
                    <TextInput
                        placeholder="Ich suche nach.."
                        placeholderTextColor="gray" 
                        className="text-gray-200 w-10/12 bg-[#171923] p-4"
                    />
                    <View className=" flex justify-center bg-[#1E2839] w-2/12 p-4 rounded-r-md">
                        <FontAwesome name="search" size={20} color="white" />
                    </View>
                </View>
                
                </View>
            
        </View>
     );
}
 
export default SearchBar;