import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";


interface FilterBubblesProps {
    currentResults : number;
}

const FilterBubbles : React.FC<FilterBubblesProps> = ({
    currentResults
}) => {
    return ( 
        <View className="pb-2">
            <View>
                <Text className="text-base font-semibold text-gray-200">
                    {currentResults} Inserate gefunden
                </Text>
            </View>
            <View className="flex flex-row mt-2">
                <TouchableOpacity className="flex flex-row items-center space-x-1 bg-indigo-800 p-2 rounded-md">
                    <AntDesign name="plussquare" size={20} color={"white"} />
                    <Text className="text-gray-200 font-semibold">
                        Filter hinzufügen
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
     );
}
 
export default FilterBubbles;