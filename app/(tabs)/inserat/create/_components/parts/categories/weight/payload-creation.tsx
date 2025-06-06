import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { brandEnum, BrandEnumRender } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface PayloadCreationProps {
    label: string;
    currentValue: string;
    setValue: (brand: string) => void;
}


const PayloadCreation = ({ currentValue, setValue, label }: PayloadCreationProps) => {

    const refRBSheet = useRef([]);

    

    const onChangeConvert = (value: string) => {
        const conValue = value.replace(/[^0-9]/g, '')
        return conValue;
    }

    return (
        <View>
            <Text className="text-lg font-semibold text-gray-200">
                {label}
            </Text>
            <View className="flex flex-row items-center w-full">
            <TextInput
                className="w-10/12 bg-[#212533] rounded-l-md text-base text-gray-200/90 p-4 font-semibold"
                placeholder="Nutzlast in kg"
                value={String(currentValue ?? "")}
                keyboardType="numeric"
                placeholderTextColor={"gray"}
                maxLength={5}
                onChangeText={(text) => setValue(onChangeConvert(text))}
            />
            <TouchableOpacity
                className="w-2/12 flex justify-center items-center bg-[#1a1d29] p-5 rounded-r-md "
                onPress={() => { refRBSheet.current[1].open() }}
            >
                <Text className="text-gray-200 font-semibold">
                    kg
                </Text>
            </TouchableOpacity>
            
            </View>
        </View>
    );
}


export default PayloadCreation;