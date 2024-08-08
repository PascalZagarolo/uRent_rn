import { useSavedSearchParams } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

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

    return ( 
        <View className="w-full">
            <View className=" w-full  rounded-md">
                <View className="flex flex-row items-center">
                    
                    <TextInput
                        placeholder="Ich suche nach.."
                        value={currentTitle}
                        onTextInput={(e) => setCurrentTitle(e.nativeEvent.text)}
                        placeholderTextColor="gray" 
                        className="text-gray-200 w-10/12 bg-[#171923] p-4 rounded-l-md"
                    />
                    <View className=" flex flex-row justify-center bg-[#1E2839] w-2/12 p-4 rounded-r-md">
                        <FontAwesome name="search" size={20} color="white" />
                    </View>
                </View>
                
                </View>
            
        </View>
     );
}
 
export default SearchBar;