import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, TextInput, View, StyleSheet, Keyboard, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ScrollView } from "react-native-gesture-handler";
import { set } from "date-fns";
import { useSavedSearchParams } from "@/store";

const PriceRange = () => {
    
    const refRBSheet = useRef([]);


    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
    const [startPrice, setStartPrice] = useState<number | string | null>();
    const [endPrice, setEndPrice] = useState<number | string | null>();
    const [isStartFocused, setIsStartFocused] = useState(false);
    const [isEndFocused, setIsEndFocused] = useState(false);

    const prefilledValues = [
        {
            price: 50,
            string: "50 €"
        },
        {
            price: 75,
            string: "75 €"
        },
        {
            price: 100,
            string: "100 €"
        },
        {
            price: 125,
            string: "125 €"
        },
        {
            price: 150,
            string: "150 €"
        },
        {
            price: 200,
            string: "200 €"
        },
        {
            price: 250,
            string: "250 €"
        },
        {
            price: 300,
            string: "300 €"
        },
        {
            price: 400,
            string: "400 €"
        },
        {
            price: 500,
            string: "500 €"
        },
        {
            price: 600,
            string: "600 €"
        },
        {
            price: 750,
            string: "750 €"
        },
        {
            price: 1000,
            string: "1000 €"
        }
    ];

    const onPrefillValueSelectStart = (value: number) => {
        setStartPrice(value);
        console.log(startPrice);
        refRBSheet.current[1].close();
    }

    const onStartDelete = () => {
        setStartPrice(null);
        console.log(startPrice);
        refRBSheet.current[1].close();
    }

    const onEndDelete = () => {
        setEndPrice(null);
        console.log(startPrice);
        refRBSheet.current[2].close();
    }

    const onPrefillValueSelect = (value: number) => {
        setEndPrice(value);
        console.log(endPrice);
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

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    useEffect(() => {
        if (startPrice) {
            changeSearchParams("start", startPrice)
        } else {
            deleteSearchParams("start")
        }
    },[startPrice])
    

    useEffect(() => {
        if (endPrice) {
            console.log(endPrice);
            changeSearchParams("end", endPrice)
        } else {
            deleteSearchParams("end")
        }
    }, [endPrice])

    return (
        <View className="">
            <View className="w-full">
                <View className="p-4 bg-[#171923]">
                    <View className="flex flex-row items-center space-x-4">
                        <Entypo name="price-tag" size={24} color="#fff" />
                        <Text className="text-lg font-semibold text-gray-200">
                            Preisrahmen
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
                                placeholder="Startpreis"
                                onFocus={() => setIsStartFocused(true)}
                                onBlur={() => setIsStartFocused(false)}
                                value={startPrice?.toString() || ''}  
                                keyboardType="numeric"
                                onChangeText={(text) => setStartPrice(onChangeConvert(text))} 
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
                                placeholder="Endpreis"
                                value={endPrice?.toString() || ''}  
                                onChangeText={(text) => setEndPrice(onChangeConvert(text))}  
                                keyboardType="numeric"
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
                        Startpreis auswählen
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
                                    onPress={() => onPrefillValueSelectStart(value.price)}
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
                                    onPress={() => onPrefillValueSelect(value.price)}
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

export default PriceRange;
