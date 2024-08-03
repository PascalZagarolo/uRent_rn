import { BrandEnumRender } from "@/db/schema";
import { useSavedSearchParams } from "@/store";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

const LkwWeightClassFilter = () => {

    const [currentWeight, setCurrentWeight] = useState<any>();
    const [currentWeightMax, setCurrentWeightMax] = useState<any>();
    

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const refRBSheet = useRef([]);

    
    const prefilledWeight = [
        {
            value : 550,
            string : "5,5 t"
        },
        {
            value : 750,
            string : "7,5 t"
        },
        {
            value : 1200,
            string : "12 t"
        },
        {
            value : 1800,
            string : "18 t"
        },
        {
            value : 2600,
            string : "26 t"
        },
        {
            value : 3200,
            string : "32 t"
        },
        {
            value : 3400,
            string : "34 t"
        },
        {
            value : 3900,
            string : "39 t"
        },
        {
            value : 5000,
            string : `{`>`}39 t`
        },
        {
            value : 5500,
            string : "5,5 t"
        },
    ]
    

    function getWeightString(value) {
        for (let i = 0; i < prefilledWeight.length; i++) {
            if (prefilledWeight[i].value === value) {
                return prefilledWeight[i].string;
            }
        }
        return "..."
    }

    useEffect(() => {
        if(currentWeight) {
            changeSearchParams("weightClass", currentWeight)
        } else {
            deleteSearchParams("weightClass")
        }
    },[currentWeight])

    useEffect(() => {
        if(currentWeightMax) {
            changeSearchParams("weightClassMax", currentWeightMax)
        } else {
            deleteSearchParams("weightClassMax")
        }
    },[currentWeightMax])

    

    

    const convertValues = (value: string) => {
        switch(value) {
            case "2":
                return "2/3"
            case "4":
                return "4/5"
            case "6":
                return "6/7"
            default:
                return null
        }
    }

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
                            {
                                currentWeight ? (
                                    <Text className="text-base text-gray-200 font-semibold">{getWeightString(currentWeight)}</Text>
                                ) : (
                                    <Text className="text-base text-gray-200/60">Beliebig</Text>
                                )
                            }
                           <View className="ml-auto">
                                    <FontAwesome name="chevron-down" size={20} color="#fff" className="ml-auto"/>
                                </View>
                        </TouchableOpacity>
                    </View>

                    <View className="w-1/2">
                        
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row items-center mt-7"
                        onPress={() => refRBSheet.current[2].open()}
                        >
                            {
                                currentWeightMax ? (
                                    <Text className="text-base text-gray-200 font-semibold">{getWeightString(currentWeightMax)}</Text>
                                ) : (
                                    <Text className="text-base text-gray-200/60 flex flex-row items-center">Beliebig
                                    
                                    </Text>
                                )
                            }
                            
                                <View className="ml-auto">
                                    <FontAwesome name="chevron-down" size={20} color="#fff" className="ml-auto"/>
                                </View>
                            
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <RBSheet
                ref={ref => (refRBSheet.current[1] = ref)}

                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    container: {
                        backgroundColor: '#1F2332',
                        borderTopColor: '#2D3748', // Gray-800 color
                        borderTopWidth: 2,

                    }
                }}

                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: false,
                }}>
                <View className="p-4">
                    <Text className="text-base font-semibold text-gray-200">
                    Gewichtsklasse auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentWeight(null);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {prefilledWeight.map((weight) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2" key={weight.value}
                                    onPress={() => {
                                        setCurrentWeight(weight.value);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                    {weight.string}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </RBSheet>

            <RBSheet
                ref={ref => (refRBSheet.current[2] = ref)}

                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    container: {
                        backgroundColor: '#1F2332',
                        borderTopColor: '#2D3748', // Gray-800 color
                        borderTopWidth: 2,

                    }
                }}

                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: false,
                }}>
                <View className="p-4">
                    <Text className="text-base font-semibold text-gray-200">
                        max. Gewichtsklasse auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentWeightMax(null);
                                        refRBSheet.current[2].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {prefilledWeight.map((weight) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2" key={weight.value}
                                    onPress={() => {
                                        setCurrentWeightMax(weight.value);
                                        refRBSheet.current[2].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        {weight.string}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </RBSheet>
        </View >
    );
}





export default LkwWeightClassFilter;