import { Entypo, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface ProfileContactProps {
    thisEmail : string;
    thisNumber : string;
    thisFax : string;
    thisWebsite : string;
}

const ProfileContact : React.FC<ProfileContactProps> = ({
    thisEmail,
    thisNumber,
    thisFax,
    thisWebsite
}) => {
    return ( 
        <View className="px-4 pb-4">
            <View>
                <Text className="text-lg font-semibold text-gray-200">
                    Kontakt
                </Text>
            </View>
            <View className="mt-2 space-y-2">
                {thisWebsite && (
                    <View className="flex flex-row items-center">
                    <View className="w-1/4">
                        <FontAwesome6 name="globe" size={20} color="#fff"/>
                    </View>
                    <View className="w-3/4">
                        <Text className="font-semibold text-md text-gray-200">
                            {thisWebsite}
                        </Text>
                    </View>
                </View>
                )}

{thisEmail && (
                    <View className="flex flex-row items-center">
                    <View className="w-1/4">
                        <Entypo name="mail" size={20} color="#fff"/>
                    </View>
                    <View className="w-3/4">
                        <Text className="font-semibold text-md text-gray-200">
                            {thisEmail}
                        </Text>
                    </View>
                </View>
                )}

{thisNumber && (
                    <View className="flex flex-row items-center">
                    <View className="w-1/4">
                        <Entypo name="phone" size={20} color="#fff"/>
                    </View>
                    <View className="w-3/4">
                        <Text className="font-semibold text-md text-gray-200">
                            {thisNumber}
                        </Text>
                    </View>
                </View>
                )}

{thisFax && (
                    <View className="flex flex-row items-center">
                    <View className="w-1/4">
                        <FontAwesome5 name="fax" size={20} color="#fff"/>
                    </View>
                    <View className="w-3/4">
                        <Text className="font-semibold text-md text-gray-200">
                            {thisFax}
                        </Text>
                    </View>
                </View>
                )}
            </View>
        </View>
     );
}
 
export default ProfileContact;