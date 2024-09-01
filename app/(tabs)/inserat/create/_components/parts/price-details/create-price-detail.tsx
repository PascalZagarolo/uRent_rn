import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { useState } from "react";
import { set } from 'date-fns';

interface CreatePriceProfileProps {
    onClose: () => void;
}

const CreatePriceProfile = ({ onClose }: CreatePriceProfileProps) => {
    const [currentTitle, setCurrentTitle] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentFreemiles, setCurrentFreemiles] = useState(null);
    const [currentExtraprice, setCurrentExtraprice] = useState(null);
    const [currentDescription, setCurrentDescription] = useState(null);
    

    return (
        <View className="flex-1 justify-center items-center bg-black/80">
            <View className="bg-[#151821] w-full rounded-lg overflow-hiddens">
                <View className="flex flex-row items-center p-4">
                    <Text className="text-xl font-semibold text-gray-200">
                        Preisprofil hinzufügen
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