import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { brandEnum, BrandEnumRender } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface PkwExtraTypeProps {
    label: string;
    currentValue: string;
    setValue: (brand: string) => void;
}


const PkwExtraType = ({ currentValue, setValue, label }: PkwExtraTypeProps) => {

    const refRBSheet = useRef([]);

    const usedValues = [
        { string: "Beliebig", value: null },
        { string: "Cabrio", value: "CABRIO" },
        { string: "Coupe", value: "COUPE" },
        { string: "Geländewagen/Pickup", value: "PICKUP" },
        { string: "Kastenwagen", value: "KASTENWAGEN" },
        { string: "Kleinbus", value: "KLEINBUS" },
        { string: "Kleinwagen", value: "KLEIN" },
        { string: "Kombi", value: "KOMBI" },
        { string: "Limousine", value: "LIMOUSINE" },
        { string: "Sportwagen", value: "SPORT" },
        { string: "Supersportwagen", value: "SUPERSPORT" },
        { string: "SUV", value: "SUV" },
        { string: "Van", value: "VAN" }
    ];


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
                title="Fahrzeugtyp wählen"
                prefilledValues={usedValues}
                setCurrentValue={setValue}
                currentValue={currentValue}
                refRBSheet={refRBSheet}
            />
        </View>
    );
}


export default PkwExtraType;