
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text, TouchableOpacity } from "react-native";

interface TransformProfileProps {
    setOpenSwitchProfile: (open: boolean) => void;
}

const TransformProfile = ({ setOpenSwitchProfile } : TransformProfileProps) => {
    return ( 
        <View>
            <View className="p-4 shadow-lg border-indigo-800 border rounded-md">
                <Text className="text-lg font-semibold text-gray-200">
                    Du bist Vermieter?
                </Text>
                <TouchableOpacity className="flex flex-row items-center shadow-lg space-x-4 bg-indigo-800 p-2.5 rounded-md mt-2" onPress={() => setOpenSwitchProfile(true)}>
                    <MaterialCommunityIcons name="account-switch" size={24} color="white" />
                    <Text className="text-base text-gray-200 font-medium">
                        Kostenlos Konto umwandeln
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
     );
}
 
export default TransformProfile;