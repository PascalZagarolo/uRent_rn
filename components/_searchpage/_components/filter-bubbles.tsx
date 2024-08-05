import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import ExistingFilterBubble from "./existing-filter-bubble";


interface FilterBubblesProps {
    currentResults: number;
    toggleFilter: () => void;
}

const FilterBubbles: React.FC<FilterBubblesProps> = ({
    currentResults,
    toggleFilter
}) => {

    const params = getSearchParamsFunction();

    

    return (
        <View className="pb-2">
            <View>
                <Text className="text-base font-semibold text-gray-200">
                    {currentResults} Inserate gefunden
                </Text>
            </View>
            
            <View className="flex flex-row  items-center mr-2">
                <TouchableOpacity className="flex flex-row items-center space-x-1 bg-indigo-800 p-2 rounded-md"
                    onPress={toggleFilter}
                >
                    <AntDesign name="plussquare" size={20} color={"white"} />
                    <Text className="text-gray-200 font-semibold">
                        Filter hinzufügen
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-row gap-x-2 w-full flex-wrap">
                {Object.entries(params)
                    .filter(([key, value]) => value !== null && value !== undefined)
                    .map(([key, value]) => (
                        <View className="mt-2">
                            <ExistingFilterBubble
                            key={key}
                            pKey={key}
                            value={value as string}
                        />
                        </View>
                    ))}
           
            </View>
        </View>
    );
}

export default FilterBubbles;