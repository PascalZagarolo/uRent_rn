import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { useSavedSearchParams } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

const TransportWeightClassFilter = () => {
    const [currentWeight, setCurrentWeight] = useState<any>();
    const [currentWeightMax, setCurrentWeightMax] = useState<any>();
    const { changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const refRBSheet = useRef([]); // Single ref for both sheets

    type givenType = {
        value: number;
        string: string;
    };

    const prefilledWeight: givenType[] = [
        { value: 550, string: "2,8 t" },
        { value: 550, string: "3,5 t" },
        { value: 550, string: "5,5 t" },
        
    ];

    function getWeightString(value) {
        for (let i = 0; i < prefilledWeight.length; i++) {
            if (prefilledWeight[i].value === value) {
                return prefilledWeight[i].string;
            }
        }
        return "...";
    }

    useEffect(() => {
        if (currentWeight) {
            changeSearchParams("weightClass", currentWeight);
        } else {
            deleteSearchParams("weightClass");
        }
    }, [currentWeight]);

    useEffect(() => {
        if (currentWeightMax) {
            changeSearchParams("weightClassMax", currentWeightMax);
        } else {
            deleteSearchParams("weightClassMax");
        }
    }, [currentWeightMax]);

    return (
        <View>
            <View>
                <View className="flex flex-row w-full mt-2 justify-center space-x-4 px-8">
                    <View className="w-1/2">
                        <Text className="text-base font-semibold text-gray-200">
                            Gewichtsklasse
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row"
                            onPress={() => refRBSheet.current[1].open()}
                        >
                            {currentWeight ? (
                                <Text className="text-base text-gray-200 font-semibold">{getWeightString(currentWeight)}</Text>
                            ) : (
                                <Text className="text-base text-gray-200/60">Beliebig</Text>
                            )}
                            <View className="ml-auto">
                                <FontAwesome name="chevron-down" size={20} color="#fff" className="ml-auto" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="w-1/2">
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row items-center mt-7"
                            onPress={() => refRBSheet.current[2].open()}
                        >
                            {currentWeightMax ? (
                                <Text className="text-base text-gray-200 font-semibold">{getWeightString(currentWeightMax)}</Text>
                            ) : (
                                <Text className="text-base text-gray-200/60 flex flex-row items-center">Beliebig</Text>
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
                title="Gewichtsklasse auswählen"
                prefilledValues={prefilledWeight}
                setCurrentValue={setCurrentWeight}
                currentValue={currentWeight}
                refRBSheet={refRBSheet} 
            />

            <RbSheetCostum 
                index={2}
                title="Gewichtsklasse auswählen"
                prefilledValues={prefilledWeight}
                setCurrentValue={setCurrentWeightMax}
                currentValue={currentWeightMax}
                refRBSheet={refRBSheet} 
            />
        </View>
    );
}

export default TransportWeightClassFilter;
