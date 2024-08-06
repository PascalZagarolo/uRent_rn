import { BrandEnumRender } from "@/db/schema";
import { useSavedSearchParams } from "@/store";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

const DoorsFilter = () => {

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const [currentDoors, setCurrentDoors] = useState<any>(currentObject["doors"] ? currentObject["doors"] : null);
    const [currentDoorsMax, setCurrentDoorsMax] = useState<any>(currentObject["doorsMax"] ? currentObject["doorsMax"] : null);

    

    const refRBSheet = useRef([]);

    
    const prefilledDoors = [
        {
            value : "2",
            string : "2/3"
        },
        {
            value : "4",
            string : "4/5"
        },
        {
            value : "6",
            string : "6/7"
        }
    ]
    

    

    useEffect(() => {
        if(currentDoors) {
            changeSearchParams("doors", currentDoors)
        } else {
            deleteSearchParams("doors")
        }
    },[currentDoors])

    useEffect(() => {
        if(currentDoorsMax) {
            changeSearchParams("doorsMax", currentDoorsMax)
        } else {
            deleteSearchParams("doorsMax")
        }
    },[currentDoorsMax])

    

    

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
                            Türen
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row"
                        onPress={() => refRBSheet.current[1].open()}
                        >
                            {
                                currentObject["doors"] ? (
                                    <Text className="text-base text-gray-200 font-semibold">{convertValues(currentObject["doors"])}</Text>
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
                            max. Türen
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row items-center"
                        onPress={() => refRBSheet.current[2].open()}
                        >
                            {
                                currentObject["doorsMax"] ? (
                                    <Text className="text-base text-gray-200 font-semibold">{convertValues(currentObject["doorsMax"])}</Text>
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
                        Türen auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentDoors(null);
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
                                        setCurrentDoors(doors.value);
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
                        Max. Anzahl Türen auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentDoorsMax(null);
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
                                        setCurrentDoorsMax(value.value);
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





export default DoorsFilter;