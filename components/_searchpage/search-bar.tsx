import { useSavedSearchParams } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import qs from "query-string";
import { TouchableOpacity } from "react-native";


const SearchBar = () => {

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const [currentTitle, setCurrentTitle] = useState(currentObject["title"] ? currentObject["title"] : "");

    useEffect(() => {
        if(currentTitle.length > 0) {
            changeSearchParams("title", currentTitle);
        } else {
            deleteSearchParams("title");
        }
    },[currentTitle])


    const router = useRouter();

    const onSearch = () => {

        

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
        const url = qs.stringifyUrl({
            url: '/mainpage',


            //@ts-ignore
            query: {
                //@ts-ignore
                category: thisCategory,
                //@ts-ignore
                periodBegin: usedStart ? usedStart : null,
                //@ts-ignore
                periodEnd: usedEnd ? usedEnd : null,
                //@ts-ignore
                type: filteredValues.thisType,
                title : currentTitle,
                ...filteredValues
            },

        }, { skipEmptyString: true, skipNull: true })
        
        
        
        router.push(url);
    }

    return ( 
        <View className="w-full">
            <View className=" w-full  rounded-md">
                <View className="flex flex-row items-center">
                    
                    <TextInput
                        placeholder="Ich suche nach.."
                        value={currentTitle}
                        onChangeText={setCurrentTitle}
                        placeholderTextColor="gray" 
                        className="text-gray-200 w-10/12 bg-[#171923] p-4 rounded-l-md"
                    />
                    <TouchableOpacity onPress={onSearch} className=" flex flex-row justify-center bg-[#1E2839] w-2/12 p-4 rounded-r-md">
                        <FontAwesome name="search" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                
                </View>
            
        </View>
     );
}
 
export default SearchBar;