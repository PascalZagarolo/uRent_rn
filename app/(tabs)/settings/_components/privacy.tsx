import { userTable } from "@/db/schema";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";


import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";


interface PrivacyPartProps {
    currentUser: typeof userTable.$inferSelect;
}

const PrivacyPart : React.FC<PrivacyPartProps> = ({
    currentUser
}) => {

    const [shareRealname, setShareRealname] = useState(false);
    const [shareEmail, setShareEmail] = useState(false);
    const [sharePhone, setSharePhone] = useState(false);

    const onSubmit = () => {

    }

    return (
        <View>
            <View className="flex flex-row items-center gap-x-4">
                <MaterialCommunityIcons name="incognito" size={24} color="white" />
                <Text className="text-lg font-semibold text-gray-200">
                    Privatsphäre
                </Text>
            </View>
            <View className="flex flex-col items-center justify-center mt-8 space-y-4">
                <View className="flex flex-row items-center w-full">
                    <View className="w-1/4">
                        
                    </View>
                    <View>
                        <Text className="text-base text-gray-200/90 font-semibold">
                            E-Mail teilen
                        </Text>
                    </View>
                </View>
                <View className="flex flex-row items-center w-full">
                    <View className="w-1/4">
                        
                    </View>
                    <View>
                        <Text className="text-base text-gray-200/90 font-semibold">
                            Echten Namen teilen
                        </Text>
                    </View>
                </View>

                <View className="flex flex-row items-center w-full">
                    <View className="w-1/4">
                        
                    </View>
                    <View>
                        <Text className="text-base text-gray-200/90 font-semibold">
                            Telefonnummer teilen
                        </Text>
                    </View>
                </View>
                <View className="w-full">
                    <TouchableOpacity className="p-4 bg-indigo-800 rounded-md">
                        <Text className="text-center text-gray-200 text-sm font-semibold">
                            Änderungen speichern
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default PrivacyPart;