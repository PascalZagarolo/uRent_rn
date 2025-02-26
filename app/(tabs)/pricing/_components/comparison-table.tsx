import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ComparisonTable = () => {

    const renderedOptions: { attribute, basis: string | boolean, premium: string | boolean, enterprise: string | boolean }[] = [
        {
            attribute: "Laufzeit",
            basis: "1 Monat",
            premium: "1 Monat",
            enterprise: "1 Monat",
        },
        {
            attribute: "Inserate erstellen",
            basis: true,
            premium: true,
            enterprise: true
        }
    ]

    return (
        <ScrollView horizontal={true}>
            <View>
            <View className="flex flex-row items-center">
                <View className="w-32">
                    <Text className="text-lg font-semibold text-gray-200">
                        Feature
                    </Text>
                </View>

                <View className="w-32">
                    <Text className="text-lg font-semibold text-gray-200">
                        Basis
                    </Text>
                </View>

                <View className="w-32">
                    <Text className="text-lg font-semibold text-gray-200">
                        Premium
                    </Text>
                </View>

                <View className="w-32">
                    <Text className="text-lg font-semibold text-gray-200">
                        Enterprise
                    </Text>
                </View>
            </View>
            <View className="">
                <View className="flex flex-col space-y-4 mt-4">
                    {renderedOptions.map((option) => (
                        <View className="flex flex-row items-center border-b border-slate-700 pb-2" key={option.attribute}>
                        <View className="w-32">
                            <Text className="text-lg font-semibold  text-gray-200/80">
                                {option.attribute}
                            </Text>
                        </View>
        
                        <View className="w-32">
                            {typeof(option.basis) == "string" ? 
                            <Text className="text-lg font-semibold text-gray-200">
                            {option.basis}
                            </Text> : (
                                option.basis ?  (
                                    <MaterialCommunityIcons name="check-circle-outline" 
                                    size={24}
                                    color={"green"}
                                    />
                                ) : (
                                    <MaterialCommunityIcons name="close-box" 
                                    size={24}
                                    color={"red"}
                                    />
                                )
                            )}
                        </View>
        
                        <View className="w-32">
                        {typeof(option.premium) == "string" ? 
                            <Text className="text-lg font-semibold text-gray-200">
                            {option.premium}
                            </Text> : (
                                option.premium ?  (
                                    <MaterialCommunityIcons name="check-circle-outline" 
                                    size={24}
                                    color={"green"}
                                    />
                                ) : (
                                    <MaterialCommunityIcons name="close-box" 
                                    size={24}
                                    color={"red"}
                                    />
                                )
                            )}
                        </View>
        
                        <View className="w-32">
                        {typeof(option.enterprise) == "string" ? 
                            <Text className="text-lg font-semibold text-gray-200">
                            {option.enterprise}
                            </Text> : (
                                option.enterprise ?  (
                                    <MaterialCommunityIcons name="check-circle-outline" 
                                    size={24}
                                    color={"green"}
                                    />
                                ) : (
                                    <MaterialCommunityIcons name="close-box" 
                                    size={24}
                                    color={"red"}
                                    />
                                )
                            )}
                        </View>
                    </View>
                    ))}
                </View>
            </View>
            </View>
        </ScrollView>
    );
}

export default ComparisonTable;