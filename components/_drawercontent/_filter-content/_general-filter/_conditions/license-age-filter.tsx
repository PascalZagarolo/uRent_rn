import { useSavedSearchParams } from "@/store";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

const LicenseAgeFilter = () => {

    const [currentLicense, setCurrentLicense] = useState<any>();
    const [currentReqAge, setCurrentReqAge] = useState<any>();

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const refRBSheet = useRef([]);

    

    useEffect(() => {
        if(currentLicense) {
            changeSearchParams("license", currentLicense)
        } else {
            deleteSearchParams("license")
        }
    },[currentLicense])

    useEffect(() => {
        if(currentReqAge) {
            changeSearchParams("reqAge", currentReqAge)
        } else {
            deleteSearchParams("reqAge")
        }
    },[currentReqAge])

    useEffect(() => {
        if(!currentObject["reqAge"]) {
            setCurrentReqAge(undefined)
        }
    },[currentObject["reqAge"]])

    useEffect(() => {
        if(!currentObject["license"]) {
            setCurrentLicense(undefined)
        }
    },[currentObject["license"]])

    const prefilledValuesAge = [];

    for (let i = 16; i <= 30; i++) {
        prefilledValuesAge.push(i)
    }

    const prefilledValuesLicense = [
        "B",
        "BE",
        "C1",
        "C",
        "CE",
        "CE1"
    ]

    

    return (
        <View>
            <View>
                <View className="flex flex-row w-full mt-2 justify-center space-x-4 px-8">
                    <View className="w-1/2">
                        <Text className="text-base font-semibold text-gray-200">
                            Führerschein
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row"
                        onPress={() => refRBSheet.current[1].open()}
                        >
                            {
                                currentLicense ? (
                                    <Text className="text-base text-gray-200 font-semibold">{currentLicense}</Text>
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
                            Mindestalter
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row"
                        onPress={() => refRBSheet.current[2].open()}
                        >
                            {
                                currentReqAge ? (
                                    <Text className="text-base text-gray-200 font-semibold">{currentReqAge} Jahre</Text>
                                ) : (
                                    <Text className="text-base text-gray-200/60">Beliebig</Text>
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
                        Führerschein auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentLicense(null);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {prefilledValuesLicense.map((value) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2" key={value}
                                    onPress={() => {
                                        setCurrentLicense(value);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        {currentLicense}
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
                        Mindestalter auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentReqAge(null);
                                        refRBSheet.current[2].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {prefilledValuesAge.map((value) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2" key={value}
                                    onPress={() => {
                                        setCurrentReqAge(value);
                                        refRBSheet.current[2].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        {value} Jahre
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

export default LicenseAgeFilter;