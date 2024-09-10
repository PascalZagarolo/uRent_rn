import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { brandEnum, BrandEnumRender } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";

interface LoadingVolumeProps {
    label: string;
    currentValue: string;
    currentValue2: string;
    setValue: (value: string | number) => void;
    setValue2: (value: string | number) => void;
}


const LoadingVolume = ({ currentValue, currentValue2, setValue, setValue2, label }: LoadingVolumeProps) => {

    const refRBSheet = useRef([]);

    const [usesLiter, setUsesLiter] = useState<boolean>(true);

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
            <View className="">
                <View className="w-full">
                   
                    <View className="flex flex-row w-full mt-2 justify-center space-x-4 px-2">
                        <View className="w-1/2">
                            <Text className="text-base font-semibold text-gray-200">
                                Liter
                            </Text>
                            <View className="flex flex-row w-full">
                                <TextInput
                                    className={
                                        cn("w-full bg-[#212533] rounded-md text-base text-gray-200/90 p-4 font-semibold ",
                                            !usesLiter ? "border-none text-gray-200/40 font-normal bg-[#1a1d29] " : "border border-indigo-900"
                                        )
                                    }
                                    placeholder="Startpreis"
                                    editable={usesLiter}

                                    value={currentValue}
                                    keyboardType="numeric"
                                    onChangeText={(text) => {
                                        setValue(onChangeConvert(text))
                                        setValue2(
                                            text ? Number(onChangeConvert(text)) / 1000 : null)
                                    }
                                    }
                                />

                            </View>
                        </View>
                        <View className="w-1/2">
                            <Text className="text-base font-semibold text-gray-200">
                                ab Kubikmeter
                            </Text>
                            <View className="flex flex-row w-full">
                                <TextInput
                                    className={
                                        cn("w-full bg-[#212533] rounded-md text-base text-gray-200/90 p-4 font-semibold ",
                                            usesLiter ? "border-none text-gray-200/40 font-normal bg-[#1a1d29] " : "border border-indigo-900"
                                        )
                                    }
                                    placeholder="Endpreis"
                                    editable={!usesLiter}
                                    value={currentValue2}
                                    onChangeText={(text) => {
                                        setValue2(onChangeConvert(text))
                                        setValue(
                                            text ? Number(onChangeConvert(text)) * 1000 : null
                                        )
                                    }
                                    }
                                    keyboardType="numeric"

                                />

                            </View>
                        </View>
                    </View>
                </View>
                <View className="mt-2 px-6">
                    <View className="flex flex-row items-center gap-x-2">
                        <Text className={cn("text-sm text-gray-200/90 font-medium", usesLiter && "font-semibold")}>
                            Liter
                        </Text>
                        <Switch


                            onValueChange={() => setUsesLiter(!usesLiter)}
                            value={!usesLiter} />
                        <Text className={cn("text-sm text-gray-200/90 font-medium", !usesLiter && "font-semibold")}>
                            Kubikmeter
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}


export default LoadingVolume;