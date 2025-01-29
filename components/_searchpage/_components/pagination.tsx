
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { TouchableOpacity, View } from "react-native";

interface PaginationComponentProps {
    currentPage: number;
    inserateLength: number;
    onPageSwitch: (page: number) => void;
}

const PaginationComponent = ({
    currentPage,
    inserateLength,
    onPageSwitch
}: PaginationComponentProps) => {

    const availablePages = Math.ceil(inserateLength / 5);

    const [renderedPages, setRenderedPages] = useState([1, 2, 3]);

    useEffect(() => {
        let newPages = [];
    
        if (currentPage > 1) {
            newPages.push(currentPage - 1);
        }
    
        newPages.push(currentPage);
    
        if (currentPage + 1 <= availablePages) {
            newPages.push(currentPage + 1);
        }

        if(currentPage == 1) {
            newPages = [1, 2, 3];
        }

        
    
        setRenderedPages(newPages);
    }, [currentPage, availablePages]); 

    const onClick = () => {
        
    }
    

    return (
        <View className="bg-[#1B1D28] shadow-lg p-4 rounded-lg">
            <View className="flex flex-row items-center justify-evenly w-full">
                <TouchableOpacity className="shadow-lg p-2.5 bg-[#282b3a] rounded-md mr-auto" disabled>
                    <MaterialCommunityIcons name="chevron-left" size={24} color="gray" />
                </TouchableOpacity>
                <View className="flex flex-row items-center space-x-2">
                    {currentPage > 2 && (
                        <TouchableOpacity className="shadow-lg p-2.5 px-4 bg-indigo-800 rounded-md">
                        <Text className="text-white text-base font-bold">1</Text>
                    </TouchableOpacity>
                    
                    )}
                    {currentPage > 2 && (
                    <Text className="text-gray-400 text-base">...</Text>
                    )}
                    {renderedPages?.map((page, index) => (
                        <TouchableOpacity className="shadow-lg p-2.5 px-4 bg-[#282b3a] rounded-md">
                            <Text className="text-gray-200 text-base">{page}</Text>
                        </TouchableOpacity>
                    ))}

                </View>
                <TouchableOpacity className="shadow-lg p-2.5 bg-indigo-800 rounded-md ml-auto">
                    <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PaginationComponent;