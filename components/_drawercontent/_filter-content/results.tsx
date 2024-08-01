import { getCurrentResults } from "@/actions/getCurrentResults";
import { useSavedSearchParams } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


interface ResultProps {
    currentResults : number
}

const Results : React.FC<ResultProps> = ({
    currentResults
}) => {
    

    const [currentResult, setCurrentResult] = useState<number | null>();
    const searchParams = useSavedSearchParams((state) => state.searchParams);
    console.log(searchParams);

    useMemo(() => {
        const getSearchResults = async () => {
            const values = searchParams;
            const results = await getCurrentResults(values);
            setCurrentResult(results);
        }
        getSearchResults();
    },[searchParams])

    return (
        <View className="p-4 ">
            <TouchableOpacity className="w-full bg-indigo-800 p-8 rounded-md border border-gray-800">
                <View className="flex flex-row items-center justify-center space-x-4">
                    <FontAwesome name="search" size={24} color="#fff" />
                    <Text className="text-center text-base font-semibold text-gray-200">
                        {currentResult} Ergebnisse
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Results;