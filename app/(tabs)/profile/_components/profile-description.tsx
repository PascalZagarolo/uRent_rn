import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ProfileDescriptionProps {
    thisDescription: string;
    thisName: string;
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({
    thisDescription,
    thisName
}) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const shouldShowMore = thisDescription.length > 100; 
    const displayedText = isExpanded ? thisDescription : `${thisDescription.substring(0, 100)}...`;

    return (
        <View className="p-4">
            <View>
                <Text className="text-lg font-semibold text-gray-200">
                    über {thisName}
                </Text>
            </View>
            <View>
                <Text className="text-sm text-gray-200/90 font-medium">
                    {displayedText}
                </Text>
            </View>
            <TouchableOpacity onPress={toggleExpanded} className="bg-[#1d1e2b] p-2 mt-2 rounded-md w-full flex justify-center">
                <Text className="text-sm text-gray-200 font-semibold items-center flex justify-center text-center">
                    {isExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default ProfileDescription;