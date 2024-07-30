import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";


const Footer = () => {

    const router = useRouter();

    return ( 
        <View className="p-4 border-t border-gray-800 bg-[#1a1c27] h-full">
            <View className="w-full flex flex-row py-4 space-x-4">
            <FontAwesome name="instagram" size={24} color="white" />
            <FontAwesome name="twitter" size={24} color="white" />
                <Entypo name="email" size={24} color="white" />
            </View>
            <View className="w-full flex flex-row justify-between">
                <View className="w-1/3">
                    <Text className="text-sm font-semibold text-gray-200">
                        Über uns
                    </Text>
                    <Text className="text-sm font-semibold text-gray-200">
                       Kontakt
                    </Text>
                    <Text className="text-sm font-semibold text-gray-200">
                        Karriere
                    </Text>
                </View>
                <View className="w-1/3">
                    <TouchableOpacity onPress={() => router.push('/imprint')}>
                <Text className="text-sm font-semibold text-gray-200">
                        Impressum
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/data-privacy')}>
                    <Text className="text-sm font-semibold text-gray-200">
                       Datenschutz
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/agbs')}>
                    <Text className="text-sm font-semibold text-gray-200">
                        AGBs
                    </Text>
                    </TouchableOpacity>
                </View>
                <View className="w-1/3">
                <Text className="text-sm font-semibold text-gray-200">
                        FAQs & Hilfe
                    </Text>
                </View>
            </View>
            <View className="w-full flex flex-row py-4 space-x-4">
                <Text className="text-gray-200/80">
                    © 2024 uRent
                </Text>
            </View>
        </View>
     );
}
 
export default Footer;