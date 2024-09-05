import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { brandEnum } from "@/db/schema";
import { useRef } from "react";
import { View, Text, TextInput } from "react-native";

interface PkwBrandProps {
    label : string;
    currentValue: string;
    setValue: (brand: string) => void;
}


const PkwBrand = ({ currentValue, setValue, label } : PkwBrandProps) => {

    const refRBSheet = useRef([]);

    const usedValues = Object.values(brandEnum).map(brand => brand);

    return (
        <View>
            <Text className="text-lg font-semibold text-gray-200">
                {label}
            </Text>
            <TextInput
                placeholder="Titel deines Inserats..."
                value={currentValue}
                onChangeText={(text) => setValue(text)}
                className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg" 
            />
             <RbSheetCostum
                    index={1}
                    title="Email-Addresse auswählen"
                    prefilledValues={usedValues}
                    setCurrentValue={setValue}
                    currentValue={currentValue}
                    refRBSheet={refRBSheet}
                />
        </View>
    );
}

export default PkwBrand;