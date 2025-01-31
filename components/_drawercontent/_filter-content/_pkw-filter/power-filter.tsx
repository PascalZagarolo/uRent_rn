import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, TextInput, View, StyleSheet, Keyboard, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ScrollView } from "react-native-gesture-handler";
import { set } from "date-fns";
import { useSavedSearchParams } from "@/store";

const PowerFilter = () => {
    
    const refRBSheet = useRef([]);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)
    
    const [currentPs, setCurrentPs] = useState<number | string | null>(
        currentObject["power"] === undefined ? null : Number(currentObject["power"])
    );
    const [currentPsMax, setCurrentPsMax] = useState<number | string | null>(
        currentObject["powerMax"] === undefined ? null : Number(currentObject["powerMax"])
    );
    
    const [isStartFocused, setIsStartFocused] = useState(false);
    const [isEndFocused, setIsEndFocused] = useState(false);
    const [usesPs, setUsesPs] = useState(false);


    const prefilledValues = [
        50,
        100,
        125,
        150,
        200,
        250,
        300,
        400,
        500,
    ];

    const onPrefillValueSelectPS = (value: number) => {
        setCurrentPs(value);
        
        refRBSheet.current[1].close();
    }

    const onStartDelete = () => {
        setCurrentPs(null);
        
        refRBSheet.current[1].close();
    }

    const onEndDelete = () => {
        setCurrentPsMax(null);
        
        refRBSheet.current[2].close();
    }

    const onPrefillValueSelect = (value: number) => {
        setCurrentPsMax(value);
        
        refRBSheet.current[2].close();
    }


    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
        setIsStartFocused(false);
        setIsEndFocused(false);
    };


    const onChangeConvert = (value: string) => {
        const conValue = value.replace(/[^0-9]/g, '')
        return conValue;
    }

    

    useEffect(() => {
        if (currentPs) {
            changeSearchParams("power", currentPs)
        } else {
            deleteSearchParams("power")
        }
    },[currentPs])
    

    useEffect(() => {
        if (currentPsMax) {
            console.log(currentPsMax);
            changeSearchParams("powerMax", currentPsMax)
        } else {
            deleteSearchParams("powerMax")
        }
    }, [currentPsMax])

    /*
    useEffect(() => {
        if(currentObject["power"] === undefined) {
            setCurrentPs(null)
        }
    },[currentObject["power"]])

    useEffect(() => {
        if(currentObject["powerMax"] === undefined) {
            setCurrentPsMax(null)
        }
    },[currentObject["powerMax"]])
    */

    return (
        <View className="">
            <View className="w-full">
                <View className="p-4 bg-[#171923]">
                    <View className="flex flex-row items-center space-x-4">
                        <MaterialCommunityIcons name="engine-outline" size={24} color="#fff" />
                        <Text className="text-lg font-semibold text-gray-200">
                            Leistung
                        </Text>
                    </View>
                </View>
                <View className="flex flex-row w-full mt-2 justify-center space-x-4 px-8">
                    <View className="w-1/2">
                        <Text className="text-base font-semibold text-gray-200">
                            Von
                        </Text>
                        <View className="flex flex-row w-full">
                            <TextInput
                                className="w-3/4 bg-[#1c1f2b] rounded-l-md text-base text-gray-200/90 p-4 font-semibold"
                                placeholder="Von.."
                                onFocus={() => setIsStartFocused(true)}
                                onBlur={() => setIsStartFocused(false)}
                                value={currentPs?.toString() || ''}
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"  
                                keyboardType="numeric"
                                onChangeText={(text) => setCurrentPs(onChangeConvert(text))} 
                            />
                            <TouchableOpacity
                                className="w-1/4 flex justify-center items-center bg-[#171923]"
                                onPress={() => { refRBSheet.current[1].open() }}
                            >
                                <FontAwesome name="chevron-down" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="w-1/2">
                        <Text className="text-base font-semibold text-gray-200">
                            Bis
                        </Text>
                        <View className="flex flex-row w-full">
                            <TextInput
                                className="w-3/4 bg-[#1c1f2b] rounded-l-md text-base text-gray-200/90 p-4 font-semibold"
                                placeholder="Bis.."
                                value={currentPsMax?.toString() || ''}  
                                onChangeText={(text) => setCurrentPsMax(onChangeConvert(text))}  
                                keyboardType="numeric"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                onFocus={() => setIsEndFocused(true)}
                                onBlur={() => setIsEndFocused(false)}
                            />
                            <TouchableOpacity
                                className="w-1/4 flex justify-center items-center bg-[#171923]"
                                onPress={() => { refRBSheet.current[2].open() }}
                            >
                                <FontAwesome name="chevron-down" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
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
                        Mindestanzahl PS auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => onStartDelete()}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {prefilledValues.map((value) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => onPrefillValueSelectPS(value)}
                                    key={value}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        {value}
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
                        Endpreis auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => onEndDelete()}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {prefilledValues.map((value) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2"
                                key={value}
                                    onPress={() => onPrefillValueSelect(value)}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        {value}
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

const styles = StyleSheet.create({
    bottomSheetBackground: {
        backgroundColor: '#1F2332',
    },
    bottomSheetContent: {
        flex: 1,
    },
});

export default PowerFilter;
