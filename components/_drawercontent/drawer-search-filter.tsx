import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "lucide-react-native";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CategoryFilter from "./_filter-content/_general-filter/category-filter";
import Results from "./_filter-content/results";
import PriceRange from "./_filter-content/_general-filter/price-range";
import SelectDateFilter from "./_filter-content/_general-filter/select-date-filter";
import SelectDateTime from "./_filter-content/_general-filter/select-date-time";
import DynamicSearchLayout from './_filter-content/_general-filter/_dynamic-search/dynamic-search-layout';
import ConditionsFilter from "./_filter-content/_general-filter/_conditions/conditions-fillter";
import CategoryOverview from "./_filter-content/_general-filter/_category/category-overview";
import { useSavedSearchParams } from "@/store";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";


interface DrawerSearchFilterProps {
    toggleFilter: () => void;
    currentResults: number;
}


const DrawerSearchFilter: React.FC<DrawerSearchFilterProps> = ({
    toggleFilter,
    currentResults
}) => {

    const { searchParams, changeSearchParams, deleteSearchParams, removeAll } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams);

    const router = useRouter();

    const onDelete = () => {
        removeAll();
    }

    return (



        
            <View className="bg-[#1F2332]">
                <SafeAreaView>
                <ScrollView className="bg-[#1F2332]   border-gray-600 ">
                
                <View className="flex-1 flex">
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
                            <TouchableOpacity className="flex flex-row items-center space-x-2"
                            onPress={onDelete}
                            >
                                <View className="w-1/12">
                                    <MaterialCommunityIcons name="delete" size={24} color="red" />
                                </View>
                                <Text className="text-gray-200/90 text-sm">
                                    Filter zurücksetzen
                                </Text>
                            </TouchableOpacity>
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
                        <PriceRange />
                    </View>
                    <View className="mt-4">
                        <SelectDateFilter />
                    </View>
                    <View className="mt-4">
                        <SelectDateTime />
                    </View>
                    <View className="mt-4">
                        <DynamicSearchLayout />
                    </View>
                    {currentObject["thisCategory"] && (
                        <>
                            <View className="mt-4">
                                <ConditionsFilter />
                            </View>
                            <View className="mt-4">
                                <CategoryOverview />
                            </View>
                        </>
                    )}
                    <View className="mt-4">
                        <Results
                            currentResults={currentResults}
                        />
                    </View>
                </View>
                
            </ScrollView>
                </SafeAreaView>
            </View>
        

    );
}

export default DrawerSearchFilter;