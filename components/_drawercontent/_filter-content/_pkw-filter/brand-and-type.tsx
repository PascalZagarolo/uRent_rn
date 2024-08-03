import { BrandEnumRender } from "@/db/schema";
import { useSavedSearchParams } from "@/store";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

const BrandTypeFilter = () => {

    const [currentBrand, setCurrentBrand] = useState<any>();
    const [currentType, setCurrentType] = useState<any>();

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const refRBSheet = useRef([]);

    const prefilledValuesType = [
        {
            value : "CABRIO",
            string : "Cabrio"
        },
        {
            value : "COUPE",
            string : "Coupe"
        },
        {
            value : "KLEINBUS",
            string : "Kleinbus"
        },
        {
            value : "KLEIN",
            string : "Kleinwagen"
        },
        {
            value : "KOMBI",
            string : "Kombi"
        },
        {
            value : "LIMOUSINE",
            string : "Limousine"
        },
        {
            value : "VAN",
            string : "Van"
        },
        {
            value : "SPORT",
            string : "Sportwagen"
        },
        {
            value : "SUPERSPORT",
            string : "Supersportwagen"
        },
        {
            value : "SUV",
            string : "SUV"
        },
    ]

    const convertType = (type : string) => {
        switch (type) {
            case "CABRIO":
                return "Cabrio"
            case "COUPE":
                return "Coupe"
            case "KLEINBUS":
                return "Kleinbus"
            case "KLEIN":
                return "Kleinwagen"
            case "KOMBI":
                return "Kombi"
            case "LIMOUSINE":
                return "Limousine"
            case "VAN":
                return "Van"
            case "SPORT":
                return "Sportwagen"
            case "SUPERSPORT":
                return "Supersportwagen"
            case "SUV":
                return "SUV"
            default:
                return "Beliebig"
        }
    }

    

    useEffect(() => {
        if(currentBrand) {
            changeSearchParams("thisBrand", currentBrand)
        } else {
            deleteSearchParams("thisBrand")
        }
    },[currentBrand])

    useEffect(() => {
        if(currentType) {
            changeSearchParams("type", currentType)
        } else {
            deleteSearchParams("type")
        }
    },[currentType])

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

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <View>
            <View>
                <View className="flex flex-row w-full mt-2 justify-center space-x-4 px-8">
                    <View className="w-1/2">
                        <Text className="text-base font-semibold text-gray-200">
                            Marke
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row"
                        onPress={() => refRBSheet.current[1].open()}
                        >
                            {
                                currentBrand ? (
                                    <Text className="text-base text-gray-200 font-semibold">{removeUnderscore(currentBrand)}</Text>
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
                            Fahrzeugtyp
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row items-center"
                        onPress={() => refRBSheet.current[2].open()}
                        >
                            {
                                currentType ? (
                                    <Text className="text-base text-gray-200 font-semibold">{convertType(currentType)}</Text>
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
                        Marke auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentBrand(null);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {Object.values(BrandEnumRender).map((brand) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2" key={brand}
                                    onPress={() => {
                                        setCurrentBrand(brand);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                    {removeUnderscore(brand)}
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
                        Fahrzeugtyp auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentType(null);
                                        refRBSheet.current[2].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {prefilledValuesType.map((value) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2" key={value.value}
                                    onPress={() => {
                                        setCurrentType(value.value);
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

export default BrandTypeFilter;