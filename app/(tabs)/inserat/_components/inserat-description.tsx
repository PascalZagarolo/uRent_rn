import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

interface InseratDescriptionProps {
    description: string;
}

const InseratDescription: React.FC<InseratDescriptionProps> = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const shouldShowMore = description.length > 100; // You can adjust the threshold as needed
    const displayedText = isExpanded ? description : `${description.substring(0, 100)}...`;

    return (
        <View>
            <View className="flex flex-row items-center gap-x-2">
                <View>
                    <FontAwesome name="align-left" size={20} color="white" />
                </View>
                <Text className="text-lg font-semibold text-gray-200">
                    Beschreibung der Anzeige
                </Text>
            </View>
            <View className="mt-2">
                <Text className="text-sm text-gray-200">
                    {displayedText}
                </Text>
                {shouldShowMore && (
                    <TouchableOpacity onPress={toggleExpanded} className="bg-[#242635] p-4 mt-2 rounded-md w-full flex justify-center">
                        <Text className="text-sm text-gray-200 font-semibold items-center flex justify-center text-center">
                            {isExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default InseratDescription;
