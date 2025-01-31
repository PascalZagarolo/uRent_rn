import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, TextInput, View, StyleSheet, Keyboard, TouchableOpacity, Switch } from "react-native";
import BottomSheet, { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ScrollView } from "react-native-gesture-handler";
import { set } from "date-fns";
import { useSavedSearchParams } from "@/store";
import { cn } from "@/~/lib/utils";

const LoadingSizeFilter = () => {
    
    const refRBSheet = useRef([]);


    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)
    
    const [currentLength, setCurrentLength] = useState<number | string | null>(currentObject["loading_l"] ? Number(currentObject["loading_l"]) : null);
    const [currentWidth, setCurrentWidth] = useState<number | string | null>(currentObject["loading_b"] ? Number(currentObject["loading_b"]) : null);
    const [currentHeight, setCurrentHeight] = useState<number | string | null>(currentObject["loading_h"] ? Number(currentObject["loading_h"]) : null);

    
    const [isStartFocused, setIsStartFocused] = useState(false);
    const [isEndFocused, setIsEndFocused] = useState(false);

    

    

    

    


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
        if (currentLength) {
            changeSearchParams("loading_l", currentLength)
        } else {
            deleteSearchParams("loading_l")
        }
    },[currentLength])

    useEffect(() => {
        if (currentWidth) {
            changeSearchParams("loading_b", currentWidth)
        } else {
            deleteSearchParams("loading_b")
        }
    },[currentWidth])

    useEffect(() => {
        if (currentHeight) {
            changeSearchParams("loading_h", currentHeight)
        } else {
            deleteSearchParams("loading_h")
        }
    },[currentHeight])
    

    

    return (
        <View className="">
            <View className="w-full">
                
                
                <View className="flex flex-row w-full mt-2 justify-center space-x-4 px-10">
                    <View className="w-1/3">
                        <Text className="text-base font-semibold text-gray-200">
                        Länge
                        </Text>
                        <View className="flex flex-row w-full">
                            <TextInput
                                className={
                                    cn("w-full bg-[#181b25] rounded-l-md text-base text-gray-200/90 p-4 font-semibold")
                                }
                                placeholder="in Meter"
                                
                                onFocus={() => setIsStartFocused(true)}
                                onBlur={() => setIsStartFocused(false)}
                                value={currentObject["loading_l"]?.toString() || ''}  
                                keyboardType="numeric"
                                onChangeText={(text) => 
                                    {
                                        setCurrentLength(onChangeConvert(text))
                                    
                                    }
                                } 
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            />
                            
                        </View>
                    </View>
                    <View className="w-1/3">
                        <Text className="text-base font-semibold text-gray-200">
                           Breite
                        </Text>
                        <View className="flex flex-row w-full">
                            <TextInput
                                className={
                                    cn("w-full bg-[#181b25] rounded-l-md text-base text-gray-200/90 p-4 font-semibold")
                                }
                                placeholder="in Meter"
                                
                                value={currentObject["loading_b"]?.toString() || ''}  
                                onChangeText={(text) => 
                                    {
                                        setCurrentWidth(onChangeConvert(text))
                                    
                                    }
                                } 
                                placeholderTextColor="rgba(255, 255, 255, 0.5)" 
                                keyboardType="numeric"
                                onFocus={() => setIsEndFocused(true)}
                                onBlur={() => setIsEndFocused(false)}
                            />
                            
                        </View>
                    </View>

                    <View className="w-1/3">
                        <Text className="text-base font-semibold text-gray-200">
                           Höhe
                        </Text>
                        <View className="flex flex-row w-full">
                            <TextInput
                                className={
                                    cn("w-full bg-[#181b25] rounded-l-md text-base text-gray-200/90 p-4 font-semibold",
                                    
                                    )
                                }
                                placeholder="in Meter"
                                
                                value={currentObject["loading_h"]?.toString() || ''}  
                                onChangeText={(text) => 
                                    {
                                        setCurrentHeight(onChangeConvert(text))
                                    
                                    }
                                } 
                                placeholderTextColor="rgba(255, 255, 255, 0.5)" 
                                keyboardType="numeric"
                                onFocus={() => setIsEndFocused(true)}
                                onBlur={() => setIsEndFocused(false)}
                            />
                            
                        </View>
                    </View>
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

export default LoadingSizeFilter;
