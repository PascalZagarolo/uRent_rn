import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { brandEnum, BrandEnumRender } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface WeightClassProps {
    label: string;
    currentValue: string;
    setValue: (brand: string) => void;
}


const WeightClass = ({ currentValue, setValue, label }: WeightClassProps) => {

    

    

    

   

    return (
        <View>
            <Text className="text-lg font-semibold text-gray-200">
                {label} 
            </Text>
            <View className="flex flex-row items-center w-full">
            <TextInput
                className="w-10/12 bg-[#212533] rounded-l-md text-base text-gray-200/90 p-4 font-semibold"
                placeholder="Gewicht in kg"
                value={String(currentValue ?? "")}
                keyboardType="numeric"
                maxLength={5}
                onChangeText={(text) => setValue(text)}
            />
            <TouchableOpacity
                className="w-2/12 flex justify-center items-center bg-[#1a1d29] p-5 rounded-r-md "
               
            >
                <Text className="text-gray-200 font-semibold">
                    kg
                </Text>
            </TouchableOpacity>
            
            </View>
        </View>
    );
}


export default WeightClass;