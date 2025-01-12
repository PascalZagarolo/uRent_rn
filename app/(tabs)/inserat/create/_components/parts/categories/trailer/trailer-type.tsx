import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { brandEnum, BrandEnumRender } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface TrailerTypeProps {
    label: string;
    currentValue: string;
    setValue: (brand: string) => void;
}


const TrailerType = ({ currentValue, setValue, label }: TrailerTypeProps) => {

    const refRBSheet = useRef([]);

    const usedValues = [
        { value : "SATTEL", string: "Auflieger" },
        { value: "ANHAENGER", string: "Anhänger" },
        { value : "VERANSTALTUNG", string: "Freizeit & Veranstaltung" },
        { value: "KLEIN", string: "Kleinanhänger" },
    ];

    return (
        <View>
            <Text className="text-lg font-semibold text-gray-200">
                {label}
            </Text>
            <TouchableOpacity className="bg-[#1a1e29] p-4 flex flex-row items-center rounded-md"
                onPress={() => refRBSheet.current[1].open()}
            >
                <Text className={cn("text-base text-gray-200 font-semibold", !currentValue && "text-gray-200/40 font-medium")}>
                {currentValue ? usedValues.find(item => item.value === currentValue)?.string || "Beliebig" : "Beliebig"}
                </Text>
                <View className="ml-auto">
                    <FontAwesome name="chevron-down" size={20} color="white" />
                </View>
            </TouchableOpacity>
            <RbSheetCostum
                index={1}
                title="Anhängertyp wählen"
                prefilledValues={usedValues}
                setCurrentValue={setValue}
                currentValue={currentValue}
                refRBSheet={refRBSheet}
            />
        </View>
    );
}


export default TrailerType;