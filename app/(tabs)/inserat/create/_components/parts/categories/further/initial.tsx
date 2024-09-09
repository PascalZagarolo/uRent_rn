import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { brandEnum, BrandEnumRender } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface FurtherInitialProps {
    label: string;
    currentValue: string;
    setValue: (brand: string) => void;
}


const FurtherInitial = ({ currentValue, setValue, label }: FurtherInitialProps) => {

    const refRBSheet = useRef([]);

    const usedValues : { string : string, value : string }[] = ([]);

    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 1960; i < currentYear ; i++) {
        usedValues.push({ string: i.toString(), value: i.toString() });
    }

    return (
        <View>
            <Text className="text-lg font-semibold text-gray-200">
                {label}
            </Text>
            <TouchableOpacity className="bg-[#1a1d29] p-4 flex flex-row items-center rounded-md"
                onPress={() => refRBSheet.current[1].open()}
            >
                <Text className={cn("text-base text-gray-200 font-semibold", !currentValue && "text-gray-200/40 font-medium")}>
                    {currentValue ? currentValue : "Beliebig"}
                </Text>
                <View className="ml-auto">
                    <FontAwesome name="chevron-down" size={20} color="white" />
                </View>
            </TouchableOpacity>
            <RbSheetCostum
                index={1}
                title="Baujahr auswählen"
                prefilledValues={usedValues}
                setCurrentValue={setValue}
                currentValue={currentValue}
                refRBSheet={refRBSheet}
            />
        </View>
    );
}


export default FurtherInitial;