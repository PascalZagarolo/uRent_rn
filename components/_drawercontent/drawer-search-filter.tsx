import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "lucide-react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CategoryFilter from "./_filter-content/_general-filter/category-filter";
import Results from "./_filter-content/results";

interface DrawerSearchFilterProps {
    toggleFilter: () => void;
    currentResults : number;
}


const DrawerSearchFilter : React.FC<DrawerSearchFilterProps> = ({
    toggleFilter,
    currentResults
}) => {
    return (
        <View className="bg-[#1F2332]   border-gray-600 h-full ">
            <View className="p-4">
                <View className="ml-auto ">
                    <TouchableOpacity onPress={toggleFilter}>
                        <FontAwesome name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center w-full justify-center">
                    <Text className="text-gray-200 text-2xl font-semibold">
                        Suchfilter
                    </Text>
                </View>
                <View className="mt-2">
                    <View className="flex flex-row items-center space-x-2">
                    <View className="w-1/12">
                        <MaterialCommunityIcons name="delete" size={24} color="#fff" />
                        </View>
                        <Text className="text-gray-200/90 text-sm">
                            Filter zurücksetzen
                        </Text>
                    </View>
                </View>
                <View className="mt-2">
                <View className="flex flex-row items-center space-x-2">
                        <View className="w-1/12">
                        <MaterialCommunityIcons name="content-save" size={24} color="#fff" />
                        </View>
                        <Text className="text-gray-200/90 text-sm">
                            Suche speichern
                        </Text>
                    </View>
                </View>
            </View>
            <View className="mt-4">
                <View>
                    <CategoryFilter />
                </View>
            </View>
            <View className="mt-4">
            <Results 
            currentResults={currentResults}
            />
            </View>
        </View>
    );
}

export default DrawerSearchFilter;