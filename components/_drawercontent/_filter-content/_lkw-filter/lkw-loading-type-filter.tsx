import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { useSavedSearchParams } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

const LkwLoadingTypeFilter = () => {
    const currentObject = useSavedSearchParams((state) => state.searchParams)
    const [currentType, setCurrentType] = useState<any>(currentObject["loading"] ? currentObject["loading"] : null);
    
    const { changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const refRBSheet = useRef([]); // Single ref for both sheets

    type givenType = {
        value: string;
        string: string;
    };

    const prefilledTransportTypes: givenType[] = [
        { value: "AUFFAHRRAMPE", string: "Auffahrrampe" },
        { value: "LADEBORDWAND", string: "Ladebordwand" },
        { value: "LADERAMPE", string: "Laderampe" },
        { value: "KRAN", string: "Kran" }
    ];

    function getWeightString(value) {
        for (let i = 0; i < prefilledTransportTypes.length; i++) {
            if (prefilledTransportTypes[i].value === value) {
                return prefilledTransportTypes[i].string;
            }
        }
        return "...";
    }

    useEffect(() => {
        if (currentType) {
            changeSearchParams("loading", currentType);
        } else {
            deleteSearchParams("loading");
        }
    }, [currentType]);

    

    return (
        <View>
            <View>
                <View className="flex flex-row w-full mt-2 justify-center  pr-8">
                    <View className="w-full">
                        <Text className="text-base font-semibold text-gray-200">
                            Ladevorrichtung
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row"
                            onPress={() => refRBSheet.current[1].open()}
                        >
                            {currentObject["loading"] ? (
                                <Text className="text-base text-gray-200 font-semibold line-clamp-1 w-3/4" numberOfLines={1}>{getWeightString(currentObject["loading"])}</Text>
                            ) : (
                                <Text className="text-base text-gray-200/60">Beliebig</Text>
                            )}
                            <View className="ml-auto">
                                <FontAwesome name="chevron-down" size={20} color="#fff" className="ml-auto" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    
                </View>
            </View>

            <RbSheetCostum 
                index={1}
                title="Ladevorrichtung auswählen"
                prefilledValues={prefilledTransportTypes}
                setCurrentValue={setCurrentType}
                currentValue={currentObject["loading"] ? currentObject["loading"] : null}
                refRBSheet={refRBSheet} 
            />

            
        </View>
    );
}

export default LkwLoadingTypeFilter;
