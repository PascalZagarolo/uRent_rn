import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useCallback, useMemo, useRef, useState } from "react";
import { Text, TextInput, View, StyleSheet, Keyboard, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ScrollView } from "react-native-gesture-handler";

const PriceRange = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
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
    
    const onPrefillValueSelect = (value: number) => {
        setEndPrice(value);
        refRBSheet.current.close();
    }

  
    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
        setIsStartFocused(false);
        setIsEndFocused(false);
    };

    const refRBSheet = useRef();

    return (
        <View className="flex-1">
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
                                className="w-3/4 bg-[#1c1f2b] rounded-l-md text-base text-gray-200/90 p-4"
                                placeholder="Startpreis"
                                onFocus={() => setIsStartFocused(true)}
                                onBlur={() => setIsStartFocused(false)}
                            />
                            <TouchableOpacity
                                className="w-1/4 flex justify-center items-center bg-[#171923]"
                                
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
                                className="w-3/4 bg-[#1c1f2b] rounded-l-md text-base text-gray-200/90 p-4"
                                placeholder="Endpreis"
                                onFocus={() => setIsEndFocused(true)}
                                onBlur={() => setIsEndFocused(false)}
                            />
                            <TouchableOpacity
                                className="w-1/4 flex justify-center items-center bg-[#171923]"
                                onPress={() => {refRBSheet.current.open()}}
                            >
                                <FontAwesome name="chevron-down" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <RBSheet
                ref={refRBSheet}
                
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    container : {
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
