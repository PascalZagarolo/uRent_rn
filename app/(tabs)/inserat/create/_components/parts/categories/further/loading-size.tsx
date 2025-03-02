import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { brandEnum, BrandEnumRender } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";


interface LoadingSizeProps {
    label: string;
    currentValue: string;
    currentValue2: string;
    currentValue3 : string;
    setValue: (brand: string) => void;
    setValue2: (brand: string) => void;
    setValue3: (brand: string) => void;
}


const LoadingSize = ({ currentValue, currentValue2, currentValue3,
                         setValue, setValue2, setValue3, label }: LoadingSizeProps) => {

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
            <View className="flex flex-row w-full mt-2 justify-center space-x-4 px-4">
                    <View className="w-1/3">
                        <Text className="text-base font-semibold text-gray-200">
                        Länge
                        </Text>
                        <View className="flex flex-row w-full">
                            <TextInput
                                className={
                                    cn("w-full bg-[#1f2330] rounded-md text-base text-gray-200/90 p-4 font-semibold")
                                }
                                placeholder="in Meter"

                                value={currentValue}  
                                keyboardType="numeric"
                                onChangeText={(text) => 
                                    {
                                        setValue(onChangeConvert(text))
                                    
                                    }
                                }
                                placeholderTextColor={"gray"}
                            />
                            
                        </View>
                    </View>
                    <View className="w-1/3">
                        <Text className="text-base font-semibold text-gray-200">
                           Breite
                        </Text>
                        <View className="flex flex-row w-full">
                            <TextInput
                                className={
                                    cn("w-full bg-[#1f2330] rounded-md text-base text-gray-200/90 p-4 font-semibold")
                                }
                                placeholder="in Meter"
                                
                                value={currentValue2}  
                                onChangeText={(text) => 
                                    {
                                        setValue2(onChangeConvert(text))
                                    
                                    }
                                }  
                                keyboardType="numeric"
                                placeholderTextColor={"gray"}
                            />
                            
                        </View>
                    </View>

                    <View className="w-1/3">
                        <Text className="text-base font-semibold text-gray-200">
                           Höhe
                        </Text>
                        <View className="flex flex-row w-full">
                            <TextInput
                                className={
                                    cn("w-full bg-[#1f2330] rounded-md text-base text-gray-200/90 p-4 font-semibold",
                                    
                                    )
                                }
                                placeholder="in Meter"
                                
                                value={currentValue3}  
                                onChangeText={(text) => 
                                    {
                                        setValue3(onChangeConvert(text))
                                    
                                    }
                                }  
                                keyboardType="numeric"
                                placeholderTextColor={"gray"}
                            />
                            
                        </View>
                    </View>
                </View>
        </View>
    );
}


export default LoadingSize;