import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { brandEnum, BrandEnumRender } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface FurtherPowerProps {
    label: string;
    currentValue: string;
    setValue: (brand: string) => void;
}


const FurtherPower = ({ currentValue, setValue, label }: FurtherPowerProps) => {

    const refRBSheet = useRef([]);

    const usedValues = ([
        { string: "50 PS", value: "50" },
        { string: "100 PS", value: "100" },
        { string: "125 PS", value: "125" },
        { string: "150 PS", value: "150" },
        { string: "200 PS", value: "200" },
        { string: "250 PS", value: "250" },
        { string: "300 PS", value: "300" },
        { string: "400 PS", value: "400" },
        { string: "500 PS", value: "500" },

    ]);

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
                placeholder="Leistung in PS"
                value={currentValue}
                keyboardType="numeric"
                onChangeText={(text) => setValue(onChangeConvert(text))}
            />
            <TouchableOpacity
                className="w-2/12 flex justify-center items-center bg-[#1a1d29] p-5 rounded-r-md "
                onPress={() => { refRBSheet.current[1].open() }}
            >
                <FontAwesome name="chevron-down" size={20} color="white" />
            </TouchableOpacity>
            <RbSheetCostum
                index={1}
                title="PS auswählen"
                prefilledValues={usedValues}
                setCurrentValue={setValue}
                currentValue={currentValue}
                refRBSheet={refRBSheet}
            />
            </View>
        </View>
    );
}


export default FurtherPower;