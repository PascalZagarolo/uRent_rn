import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";


interface ProfileImprintProps {
    thisImprint : string;
}

const ProfileImprint : React.FC<ProfileImprintProps> = ({
    thisImprint
}) => {
    
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const shouldShowMore = thisImprint.length > 100; 
    const displayedText = isExpanded ? thisImprint : `${thisImprint.substring(0, 100)}...`;

    return ( 
        <View className="p-4">
            <View className="">
                <View>
                    <Text className="text-gray-200 text-lg font-semibold">
                        Impressum
                    </Text>
                </View>
                <View className="mt-2">
                    {thisImprint ? (
                        <View>
                            <Text className="text-gray-200 font-medium text-sm">
                        {displayedText}
                    </Text>
                    {shouldShowMore && (
                        <TouchableOpacity className="mt-2 bg-[#1d1f2c] p-2 rounded-md" onPress={toggleExpanded}>
                            <Text className="text-center text-gray-200 font-semibold">
                                {isExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
                            </Text>
                        </TouchableOpacity>
                    )}
                        </View>
                    ) : (
                        <Text className="text-gray-200/60 font-medium text-sm">
                        Noch kein Impressum hinzugefügt..
                    </Text>
                    )}
                </View>
            </View>
        </View>
     );
}
 
export default ProfileImprint;