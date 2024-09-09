import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, TextInput, View, StyleSheet, Keyboard, TouchableOpacity, Switch } from "react-native";
import BottomSheet, { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ScrollView } from "react-native-gesture-handler";
import { set } from "date-fns";
import { useSavedSearchParams } from "@/store";
import { cn } from "@/~/lib/utils";

const LoadingRoomFilter = () => {
    
    const refRBSheet = useRef([]);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)
    
    const [currentLiter, setCurrentLiter] = useState<number | string | null>(
        currentObject["volume"] ? Number(currentObject["volume"]) : null
    );
    const [currentCubic, setCurrentCubic] = useState<number | string | null>(
        currentObject["volume"] ? Number(currentObject["volume"]) : null
    );
    const [usesLiter, setUsesLiter] = useState<boolean>(true);
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

    

    

    


    


    const onChangeConvert = (value: string) => {
        const conValue = value.replace(/[^0-9]/g, '')
        return conValue;
    }

    

    useEffect(() => {
        if (currentLiter) {
            changeSearchParams("volume", currentLiter)
        } else {
            deleteSearchParams("volume")
        }
    },[currentLiter])
    

    

    return (
        <View className="">
            <View className="w-full">
                <View className="p-4 bg-[#171923]">
                    <View className="flex flex-row items-center space-x-4">
                        <MaterialCommunityIcons name="resize-bottom-right" size={24} color="#fff" />
                        <Text className="text-lg font-semibold text-gray-200">
                            Ladevolumen
                        </Text>
                    </View>
                </View>
                <View className="flex flex-row w-full mt-2 justify-center space-x-4 px-8">
                    <View className="w-1/2">
                        <Text className="text-base font-semibold text-gray-200">
                        ab Liter
                        </Text>
                        <View className="flex flex-row w-full">
                            <TextInput
                                className={
                                    cn("w-full bg-[#181b25] rounded-l-md text-base text-gray-200/90 p-4 font-semibold",
                                    !usesLiter && "bg-[#1d202c] text-gray-200/60"
                                    )
                                }
                                placeholder="Startpreis"
                                editable={usesLiter}
                                
                                value={currentLiter?.toString() || ''}  
                                keyboardType="numeric"
                                onChangeText={(text) => 
                                    {
                                        setCurrentLiter(onChangeConvert(text))
                                    setCurrentCubic(
                                        text ? Number(onChangeConvert(text)) / 1000 : null)
                                    }
                                } 
                            />
                            
                        </View>
                    </View>
                    <View className="w-1/2">
                        <Text className="text-base font-semibold text-gray-200">
                           ab Kubikmeter
                        </Text>
                        <View className="flex flex-row w-full">
                            <TextInput
                                className={
                                    cn("w-full bg-[#181b25] rounded-l-md text-base text-gray-200/90 p-4 font-semibold",
                                    usesLiter && "bg-[#1d202c] text-gray-200/60"
                                    )
                                }
                                placeholder="Endpreis"
                                editable={!usesLiter}
                                value={currentCubic?.toString() || ''}  
                                onChangeText={(text) => 
                                    {
                                        setCurrentCubic(onChangeConvert(text))
                                    setCurrentLiter(
                                        text ? Number(onChangeConvert(text)) * 1000 : null
                                        )
                                    }
                                }  
                                keyboardType="numeric"
                                
                            />
                            
                        </View>
                    </View>
                </View>
            </View>
            <View className="mt-2 px-6">
                <View className="flex flex-row items-center gap-x-2">
                        <Text className={cn("text-sm text-gray-200/90 font-medium", usesLiter && "font-semibold")}>
                            Liter
                        </Text>
                        <Switch
                            
                            
                            onValueChange={() => setUsesLiter(!usesLiter)}
                            value={!usesLiter} />
                        <Text className={cn("text-sm text-gray-200/90 font-medium", !usesLiter && "font-semibold")}>
                            Kubikmeter
                        </Text>
                </View>
            </View>
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

export default LoadingRoomFilter;
