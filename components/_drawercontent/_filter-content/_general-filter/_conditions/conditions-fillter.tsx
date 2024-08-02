import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";
import LicenseAgeFilter from "./license-age-filter";
import Caution from "./caution";

const ConditionsFilter = () => {
    return (
        <View>
            <View>
                <View>
                    <View className="flex flex-row items-center gap-x-4 p-4 bg-[#171923]">
                        <FontAwesome5 name="file-signature" size={24} color="#fff" />
                        <Text className="text-lg font-semibold text-gray-200">
                            Mietkonditionen
                        </Text>

                    </View>
                    <View className="mt-2">
                        <LicenseAgeFilter />
                    </View>
                    <View className="mt-2">
                        <Caution/>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ConditionsFilter;