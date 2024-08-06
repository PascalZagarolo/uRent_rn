import { BrandEnumRender } from "@/db/schema";
import { useSavedSearchParams } from "@/store";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

const LkwAxisFilter = () => {

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const [currentAxis, setCurrentAxis] = useState<any>(currentObject["axis"] ? currentObject["axis"] : null);
    const [currentAxisMax, setCurrentAxisMax] = useState<any>(currentObject["axisMax"] ? currentObject["axisMax"] : null);
    

    

    const refRBSheet = useRef([]);

    
    const prefilledDoors = [
        {
            value : "2",
            string : "2"
        },
        {
            value : "3",
            string : "3"
        },
        {
            value : "4",
            string : "4"
        },
        {
            value : "5",
            string : ">4"
        }
    ]
    

    

    useEffect(() => {
        if(currentAxis) {
            changeSearchParams("axis", currentAxis)
        } else {
            deleteSearchParams("axis")
        }
    },[currentAxis])

    useEffect(() => {
        if(currentAxisMax) {
            changeSearchParams("axisMax", currentAxisMax)
        } else {
            deleteSearchParams("axisMax")
        }
    },[currentAxisMax])

    

    

    const convertValues = (value: string) => {
        switch(value) {
            case "2":
                return "2"
            case "3":
                return "3"
            case "4":
                return "4"
            case "5":
                    return ">4"               
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
                            Achsen
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row"
                        onPress={() => refRBSheet.current[1].open()}
                        >
                            {
                                currentObject["axis"] ? (
                                    <Text className="text-base text-gray-200 font-semibold">{convertValues(currentObject["axis"])}</Text>
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
                        <Text className="text-base font-semibold text-gray-200">
                           
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row items-center mt-3"
                        onPress={() => refRBSheet.current[2].open()}
                        >
                            {
                                currentObject["axisMax"] ? (
                                    <Text className="text-base text-gray-200 font-semibold">{convertValues(currentObject["axisMax"])}</Text>
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
                        Achsen auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentAxis(null);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {prefilledDoors.map((doors) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2" key={doors.value}
                                    onPress={() => {
                                        setCurrentAxis(doors.value);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                    {doors.string} Türen
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
                        max. Anzahl Achsen auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentAxisMax(null);
                                        refRBSheet.current[2].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {prefilledDoors.map((value) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2" key={value.value}
                                    onPress={() => {
                                        setCurrentAxisMax(value.value);
                                        refRBSheet.current[2].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        {value.string}
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





export default LkwAxisFilter;