import { getCurrentResults } from "@/actions/getCurrentResults";
import { useSavedSearchParams } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useRouter } from "expo-router";

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

    const router = useRouter();

    const onRedirect = () => {
        

        const {//@ts-ignore
            thisCategory, ...filteredValues} = searchParams;

            
        //@ts-ignore
        const usedStart = filteredValues.periodBegin;

        let usedEnd = null;
        
        
    //@ts-ignore
        if(filteredValues.periodEnd){
        //@ts-ignore
        usedEnd = filteredValues.periodEnd;
        } else {
            //@ts-ignore
            if(filteredValues.periodBegin) {
                //@ts-ignore
                usedEnd = filteredValues.periodBegin;
            }
        }
        // const url = qs.stringifyUrl({
        //     url: '/mainpage',


        //     //@ts-ignore
        //     query: {
        //         //@ts-ignore
        //         category: thisCategory,
        //         //@ts-ignore
        //         periodBegin: usedStart ? usedStart : null,
        //         //@ts-ignore
        //         periodEnd: usedEnd ? usedEnd : null,
        //         //@ts-ignore
        //         type: filteredValues.thisType,
        //         ...filteredValues
        //     },

        // }, { skipEmptyString: true, skipNull: true })
        
        // console.log(url)
        
        // router.push(url);
    }

    return (
        <View className="p-4 ">
            <TouchableOpacity className="w-full bg-indigo-800 p-8 rounded-md border border-gray-800"
            onPress={onRedirect}
            >
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