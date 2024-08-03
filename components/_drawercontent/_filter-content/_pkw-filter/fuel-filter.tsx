import { BrandEnumRender } from "@/db/schema";
import { useSavedSearchParams } from "@/store";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

const FuelFilter = () => {

    const [currentFuel, setCurrentFuel] = useState<any>();
    

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const refRBSheet = useRef([]);

    const prefilledValues = [
        {
            value : "BENZIN",
            string : "Benzin"
        },
        {
            value : "DIESEL",
            string : "Diesel"
        },
        {
            value : "ELEKTRISCH",
            string : "Elektrisch"
        },
        {
            value : "HYBRID",
            string : "Hybrid"
        },
    ]
    

    const convertValues = (value: string) => {
        switch(value) {
            case "BENZIN":
                return "Benzin"
            case "DIESEL":
                return "Diesel"
            case "ELEKTRISCH":
                return "Elektrisch"
            case "HYBRID":
                return "Hybrid"
            default:
                return null
        }
    }
    

    

    useEffect(() => {
        if(currentFuel) {
            changeSearchParams("fuel", currentFuel)
        }else {
            deleteSearchParams("fuel")
        }
    },[currentFuel])

    

    

    

    function removeUnderscore(inputString: string): string {
        const outputString = inputString.replace(/_/g, ' ');
        return outputString;
    }

    return (
        <View>
            <View>
                <View className="flex flex-row w-full mt-2 justify-center  pl-6">
                    <View className="w-full">
                        <Text className="text-base font-semibold text-gray-200">
                            Treibstoff
                        </Text>
                        <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row"
                        onPress={() => refRBSheet.current[1].open()}
                        >
                            {
                                 currentFuel  ? (
                                    <Text className="text-base text-gray-200 font-semibold">{convertValues(currentFuel)}</Text>
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
                        Treibstoff auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentFuel(null);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                                {prefilledValues.map((value) => (
                                    <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentFuel(value.value);
                                        refRBSheet.current[1].close();
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

export default FuelFilter;