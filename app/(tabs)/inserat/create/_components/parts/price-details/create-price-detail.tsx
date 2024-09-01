import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface CreatePriceProfileProps {
    onClose: () => void;
}

const CreatePriceProfile = ({ onClose }: CreatePriceProfileProps) => {



    return (
        <View className="flex-1 justify-center items-center bg-black/80">
            <View className="bg-[#151821] w-full rounded-lg overflow-hiddens">
                <View className="flex flex-row items-center p-4">
                    <Text className="text-xl font-semibold text-gray-200">
                        Inserat erstellen
                    </Text>
                    <TouchableOpacity className="ml-auto">
                        <FontAwesome name="close" size={24} color="white" onPress={onClose} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default CreatePriceProfile;