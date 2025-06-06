import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { useSavedSearchParams } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

const LkwWeightClassFilter = () => {
    const currentObject = useSavedSearchParams((state) => state.searchParams)
    const [currentWeight, setCurrentWeight] = useState<any>(currentObject["weightClass"] ? currentObject["weightClass"] : null);
    const [currentWeightMax, setCurrentWeightMax] = useState<any>(currentObject["weightClassMax"] ? currentObject["weightClassMax"] : null);
    const { changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const refRBSheet = useRef([]); // Single ref for both sheets

    type givenType = {
        value: number;
        string: string;
    };

    const prefilledWeight: givenType[] = [
        { value: 550, string: "5,5 t" },
        { value: 750, string: "7,5 t" },
        { value: 1200, string: "12 t" },
        { value: 1800, string: "18 t" },
        { value: 2600, string: "26 t" },
        { value: 3200, string: "32 t" },
        { value: 3400, string: "34 t" },
        { value: 3900, string: "39 t" },
        { value: 5000, string: `>39 t` },
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
                            {currentObject["weightClass"] ? (
                                <Text className="text-base text-gray-200 font-semibold">{getWeightString(currentObject["weightClass"])}</Text>
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
                            {currentObject["weightClassMax"] ? (
                                <Text className="text-base text-gray-200 font-semibold">{getWeightString(currentObject["weightClassMax"])}</Text>
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
                currentValue={currentObject["weightClass"] ? currentObject["weightClass"] : null}
                refRBSheet={refRBSheet} 
            />

            <RbSheetCostum 
                index={2}
                title="Gewichtsklasse auswählen"
                prefilledValues={prefilledWeight}
                setCurrentValue={setCurrentWeightMax}
                currentValue={currentObject["weightClassMax"] ? currentObject["weightClassMax"] : null}
                refRBSheet={refRBSheet} 
            />
        </View>
    );
}

export default LkwWeightClassFilter;
