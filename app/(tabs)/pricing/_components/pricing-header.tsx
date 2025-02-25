import { Text } from "react-native";
import { View } from "react-native";

const PricingHeader = () => {
    return ( 
        <View className="">
    {/* Header Section */}
    <View className="mb-4">
        <Text className="text-2xl font-semibold text-gray-200">uRent Business</Text>
        <Text className="text-gray-200/60  leading-relaxed">
            Präsentiere, verwalte und vermiete Fahrzeuge – einfacher als je zuvor.
        </Text>
    </View>

    {/* Call to Action */}
    <View className="mt-10 items-center text-center">
        <Text className="text-lg font-semibold text-gray-200">Starte noch heute</Text>
        <Text className="text-3xl font-bold text-gray-100  text-center">
            Deine <Text className="text-indigo-500">Kunden</Text> warten auf dich!
        </Text>
    </View>
</View>

     );
}
 
export default PricingHeader;