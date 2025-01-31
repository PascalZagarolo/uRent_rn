import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, TextInput, View, StyleSheet, Keyboard, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ScrollView } from "react-native-gesture-handler";
import { set } from "date-fns";
import { useSavedSearchParams } from "@/store";

const Caution = () => {
    
    const refRBSheet = useRef([]);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)
    
    const [caution, setCaution] = useState<number | string | null>(currentObject["caution"]);
    
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
        if (caution !== undefined) {
            changeSearchParams("caution", caution)
        } else {
            deleteSearchParams("caution")
        }
    },[caution])
    
    /* 
    useEffect(() => {
        if(currentObject["caution"] === undefined) {
            setCaution(undefined)
        }
    },[currentObject["caution"]])
    */

    return (
        <View className="">
            <View className="w-full">
                
                <View className="flex flex-row w-full mt-2 justify-center  px-6">
                    <View>
                        <Text className="text-base font-semibold text-gray-200">
                            Kaution
                        </Text>
                        <View className="flex flex-row w-full">
                            <TextInput
                                className="w-full bg-[#1c1f2b] rounded-l-md text-base text-gray-200/90 p-4 font-semibold"
                                placeholder="Kautionsbetrag.."
                                onFocus={() => setIsStartFocused(true)}
                                onBlur={() => setIsStartFocused(false)}
                                value={currentObject["caution"]?.toString() || ''}
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"  
                                keyboardType="numeric"
                                onChangeText={(text) => setCaution(onChangeConvert(text))} 
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

export default Caution;
