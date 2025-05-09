import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { DriveEnumRender } from "@/db/schema";
import { useSavedSearchParams } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

const  LkwDriveFilter = () => {

    const { changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const currentObject = useSavedSearchParams((state) => state.searchParams)
    const [currentType, setCurrentType] = useState<any>(currentObject["drive"] ? currentObject["drive"] : null);
    
    
    const refRBSheet = useRef([]); // Single ref for both sheets

    type givenType = {
        value: string;
        string: string;
    };

    const prefilledTransportTypes: givenType[] = [
        
    ];

    Object.values(DriveEnumRender).map((value) => {
        prefilledTransportTypes.push({
            value : value,
            string : value.slice(1)
        })
    })

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
            changeSearchParams("drive", currentType);
        } else {
            deleteSearchParams("drive");
        }
    }, [currentType]);

    

    return (
        <View>
            <View>
                <View className="flex flex-row w-full mt-2 justify-center  pl-8">
                    <View className="w-full">
                        <Text className="text-base font-semibold text-gray-200">
                            Antrieb
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row"
                            onPress={() => refRBSheet.current[1].open()}
                        >
                            {currentObject["drive"] ? (
                                <Text className="text-base text-gray-200 font-semibold line-clamp-1 w-3/4" numberOfLines={1}>{getWeightString(currentObject["drive"])}</Text>
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
                title="Erweiterte Fahrzeugkategorie auswählen"
                prefilledValues={prefilledTransportTypes}
                setCurrentValue={setCurrentType}
                currentValue={currentType}
                refRBSheet={refRBSheet} 
            />

            
        </View>
    );
}

export default LkwDriveFilter;
