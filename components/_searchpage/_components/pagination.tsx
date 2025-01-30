
import { cn } from "@/~/lib/utils";
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
    
        // Always include the previous page if it exists
        if (currentPage > 1) {
            newPages.push(currentPage - 1);
        }
    
        // Include the current page
        newPages.push(currentPage);
    
        // Include the next page only if it does not exceed available pages
        if (currentPage + 1 <= availablePages) {
            newPages.push(currentPage + 1);
        }
    
        // Ensure at least 4 pages for the first few pages
        if (currentPage === 1 && availablePages >= 4) {
            newPages = [1, 2, 3, 4];
        } else if (currentPage === 2 && availablePages >= 5) {
            newPages = [2, 3, 4, 5];
        } else if (currentPage === 3 && availablePages >= 6) {
            newPages = [3, 4, 5, 6];
        }
    
        // Ensure if we are near the last page, we don't exceed available pages
        if (currentPage === availablePages) {
            newPages = [currentPage - 2, currentPage - 1, currentPage].filter(p => p > 0);
        } else if (currentPage === availablePages - 1) {
            newPages = [currentPage - 1, currentPage, currentPage + 1].filter(p => p > 0);
        }
    
        setRenderedPages(newPages);
    }, [currentPage, availablePages]);
    

    
    

    return (
        <View className="bg-[#1B1D28] shadow-lg p-4 rounded-lg">
            <View className="flex flex-row items-center justify-evenly w-full">
                <TouchableOpacity className="shadow-lg p-2.5 bg-[#282b3a] rounded-md mr-auto" disabled>
                    <MaterialCommunityIcons name="chevron-left" size={24} color="gray" />
                </TouchableOpacity>
                <View className="flex flex-row items-center space-x-2">
                    {currentPage > 2 && (
                        <TouchableOpacity className="shadow-lg p-2.5 px-4 bg-indigo-800 rounded-md" onPress={() => {onPageSwitch(1)}}>
                        <Text className="text-white text-base font-bold">1</Text>
                    </TouchableOpacity>
                    
                    )}
                    {currentPage > 2 && (
                    <Text className="text-gray-400 text-base">...</Text>
                    )}
                    {renderedPages?.map((page, index) => (
                        <TouchableOpacity className={
                            cn("shadow-lg p-2.5 px-4 bg-[#282b3a] rounded-md",
                            currentPage === page && "bg-[#282b3a]/40 border border-indigo-800"
                            )
                        } key={page} onPress={() => {onPageSwitch(page)}}>
                            <Text className="text-gray-200 text-base">{page}</Text>
                        </TouchableOpacity>
                    ))}
<Text className="text-gray-400 text-base">...</Text>
                </View>
                {!renderedPages.some((page) => page === availablePages - 1) && (
                    <TouchableOpacity className="shadow-lg p-2.5 bg-indigo-800 rounded-md ml-auto" onPress={() => {onPageSwitch(availablePages)}}>
                    <Text className="text-gray-200 text-base">{availablePages}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

export default PaginationComponent;