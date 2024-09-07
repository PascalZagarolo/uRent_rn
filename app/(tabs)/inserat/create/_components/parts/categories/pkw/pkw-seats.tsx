import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { brandEnum, BrandEnumRender } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface PkwSeatsProps {
    label: string;
    currentValue: string;
    setValue: (brand: string) => void;
}


const PkwSeats = ({ currentValue, setValue, label }: PkwSeatsProps) => {

    const refRBSheet = useRef([]);

    const usedValues = ([
        { string: "1", value: "1" },
        { string: "2", value: "2" },
        { string: "3", value: "3" },
        { string: "4", value: "4" },
        { string: "5", value: "5" },
        { string: "6", value: "6" },
        { string: "7", value: "7" },
        { string: ">7", value: "8" },

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
                    {currentValue ? currentValue : "Beliebig"}
                </Text>
                <View className="ml-auto">
                    <FontAwesome name="chevron-down" size={20} color="white" />
                </View>
            </TouchableOpacity>
            <RbSheetCostum
                index={1}
                title="Anzahl Sitze auswählen"
                prefilledValues={usedValues}
                setCurrentValue={setValue}
                currentValue={currentValue}
                refRBSheet={refRBSheet}
            />
        </View>
    );
}


export default PkwSeats;