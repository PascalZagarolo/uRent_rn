import { FontAwesome } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

interface PlanOptionsProps {
    setCurrentInserate : (value : number) => void;
    currentValue : number;
    
}

const ChooseAmount = ({ setCurrentInserate, currentValue } : PlanOptionsProps) => {


    const prefilledValues = [
        1,
        5,
        10,
        15,
        25,
        35,
        50,
        65,
        80,
        100,
        500
    ]

    const refRBSheet = useRef([]);

    return (
        <View>
            <View className="mb-2">
                <Text className="text-base text-gray-200/80 font-semibold">
                    Wie viele Inserate möchtest du schalten?
                </Text>
            </View>
            <TouchableOpacity
                className="w-full flex flex-row items-center bg-[#0d0f14] shadow-lg p-2.5 rounded-md"
                onPress={() => { refRBSheet.current[1].open() }}
            >   
            <Text className="text-base font-bold text-gray-200">
               {currentValue} {currentValue == 1 ? "Inserat" : "Inserate"}
            </Text>
                <View className="ml-auto">
                <FontAwesome name="chevron-down" size={20} color="white" />
                </View>
            </TouchableOpacity>
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
                        Anzahl Inserate auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">

                            {prefilledValues.map((value) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    key={value}
                                    onPress={() => {
                                        setCurrentInserate(value);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        {value} {value == 1 ? "Inserat" : "Inserate"}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </RBSheet>
        </View>
    );
}

export default ChooseAmount;