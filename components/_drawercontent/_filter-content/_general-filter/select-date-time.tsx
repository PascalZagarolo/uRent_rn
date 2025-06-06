import { useSavedSearchParams } from "@/store";
import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

const SelectDateTime = () => {


    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const [currentStartTime, setCurrentStartTime] = useState<any>(currentObject["startTime"] !== undefined ? currentObject["startTime"] : undefined);
    const [currentEndTime, setCurrentEndTime] = useState<any>(currentObject["endTime"] !== undefined ? currentObject["endTime"] : undefined);

    

    const refRBSheet = useRef([]);

    const prefilledValues = [];

    useEffect(() => {
        if(currentStartTime !== undefined) {
            changeSearchParams("startTime", currentStartTime)
        } else {
            deleteSearchParams("startTime")
        }
    },[currentStartTime])

    
    useEffect(() => {
        if(currentEndTime !== undefined) {
            changeSearchParams("endTime", currentEndTime)
        } else {
            deleteSearchParams("endTime")
        }
    },[currentEndTime])
    
    for(let i = 0; i < 1440; i=i+30) {
        prefilledValues.push(i)
    }

    function convertMinutesToGermanTime(minutes: number): string {
        
        if(minutes == 0) {
            return "00:00 Uhr";
        }

        // Calculate hours and remaining minutes
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
    
        // Format hours and minutes to ensure they are two digits
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
    
        // Combine hours and minutes with "Uhr"
        return `${formattedHours}:${formattedMinutes} Uhr`;
    }
    
    return (
        <View>
            <View>
                <View className="flex flex-row w-full mt-2 justify-center space-x-4 px-8">
                    <View className="w-1/2">
                        <Text className="text-base font-semibold text-gray-200">
                            Startzeit
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row"
                        onPress={() => refRBSheet.current[1].open()}
                        >
                            {
                                (currentObject["startTime"] !== undefined && !currentObject["dynamicSearch"]) ? (
                                    <Text className="text-base text-gray-200 font-semibold">{convertMinutesToGermanTime(currentObject["startTime"])}</Text>
                                ) : (
                                    <Text className="text-base text-gray-200/60">Start</Text>
                                )
                            }
                            <View className="ml-auto justify-end">
                                <Feather name="clock" size={24} color="gray" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="w-1/2">
                        <Text className="text-base font-semibold text-gray-200">
                            Endzeit
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row"
                        onPress={() => refRBSheet.current[2].open()}
                        >
                            {
                                (currentObject["endTime"] !== undefined && !currentObject["dynamicSearch"]) ? (
                                    <Text className="text-base text-gray-200 font-semibold">{convertMinutesToGermanTime(currentObject["endTime"])}</Text>
                                ) : (
                                    <Text className="text-base text-gray-200/60">Ende</Text>
                                )
                            }
                            <View className="ml-auto justify-end">
                                <Feather name="clock" size={24} color="gray" />
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
                        Startzeit auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentStartTime(undefined);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {prefilledValues.map((value) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2" key={value}
                                    onPress={() => {
                                        setCurrentStartTime(value);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        {convertMinutesToGermanTime(value)}
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
                        Endzeit auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentEndTime(undefined);
                                        refRBSheet.current[2].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {prefilledValues.map((value) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2" key={value}
                                    onPress={() => {
                                        setCurrentEndTime(value);
                                        refRBSheet.current[2].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        {convertMinutesToGermanTime(value)}
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

export default SelectDateTime;