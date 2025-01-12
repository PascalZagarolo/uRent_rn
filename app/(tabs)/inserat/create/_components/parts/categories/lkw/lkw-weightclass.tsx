import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { brandEnum, BrandEnumRender } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface LkwWeightclassProps {
    label: string;
    currentValue: string;
    setValue: (brand: string) => void;
}


const LkwWeightclass = ({ currentValue, setValue, label }: LkwWeightclassProps) => {

    const refRBSheet = useRef([]);

    const usedValues = ([
        { value: 550, string: "5,5 t" },
        { value: 750, string: "7,5 t" },
        { value: 1200, string: "12 t" },
        { value: 1800, string: "18 t" },
        { value: 2600, string: "26 t" },
        { value: 3200, string: "32 t" },
        { value: 3400, string: "34 t" },
        { value: 3900, string: "39 t" },
        { value: 5000, string: `>39 t` },

    ]);


    return (
        <View>
            <Text className="text-lg font-semibold text-gray-200">
                {label}
            </Text>
            <TouchableOpacity className="bg-[#1a1e29] p-4 flex flex-row items-center rounded-md"
                onPress={() => refRBSheet.current[1].open()}
            >
                <Text className={cn("text-base text-gray-200 font-semibold", !currentValue && "text-gray-200/40 font-medium")}>
                {String(currentValue ?? "")?.trim() != "" ? usedValues.find(item => Boolean(item.value) == Boolean(currentValue))?.string || "Beliebig" : "Beliebig"}
                </Text>
                <View className="ml-auto">
                    <FontAwesome name="chevron-down" size={20} color="white" />
                </View>
            </TouchableOpacity>
            <RbSheetCostum
                index={1}
                title="Gewichtsklasse auswählen"
                prefilledValues={usedValues}
                setCurrentValue={setValue}
                currentValue={currentValue}
                refRBSheet={refRBSheet}
            />
        </View>
    );
}


export default LkwWeightclass;