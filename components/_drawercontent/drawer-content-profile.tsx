import { userTable } from "@/db/schema";
import { Entypo, FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Feather } from "lucide-react-native";
import { SafeAreaView } from "react-native";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";


interface DrawerContentProfileProps {
    currentUser: typeof userTable.$inferSelect;
    closeModal : () => void;
}

const DrawerContentProfile: React.FC<DrawerContentProfileProps> = ({
    currentUser,
    closeModal
}) => {

    const router = useRouter();

    return (
        <SafeAreaView className="bg-[#1F2332] p-4 border-l border-gray-600 h-full flex-1">
            <View className="h-full p-4">
            <View className="">
                <View>
                    <Image
                        source={{ uri: currentUser.image }}
                        className="w-20 h-20 rounded-full"
                    />
                </View>
                <Text className="text-lg mt-4 font-semibold text-gray-200">
                    {currentUser.name}
                </Text>
                {(currentUser?.vorname || currentUser?.nachname) && (
                    <Text className="text-gray-200/90">
                        {currentUser.vorname} {currentUser.nachname}
                    </Text>
                )}
                <Text className="text-sm text-gray-200/90 font-semibold">
                    {currentUser.email}
                </Text>
            </View>
            <View className="mt-4 border-t border-gray-600">
                <View className="mt-4">
                    <TouchableOpacity className="flex flex-row items-center space-x-4  p-4  rounded-md"
                    onPress={() => {router.push(`/profile/${currentUser.id}`)}}
                    >
                        <FontAwesome name="user" size={24} color="white" />
                        <Text className="text-sm text-gray-200 font-semibold">
                            Mein Profil
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="mt-4">
                    <View className="flex flex-row items-center space-x-4   p-4  rounded-md">
                        <FontAwesome6 name="arrow-trend-up" size={20} color="white" />
                        <Text className="text-sm text-gray-200 font-semibold">
                            Dashboard
                        </Text>
                    </View>
                </View>

                <View className="mt-4">
                    <TouchableOpacity className="flex flex-row items-center space-x-4   p-4 rounded-md"
                    onPress={() => {router.push(`/conversation`)}}
                    >
                        <FontAwesome6 name="message" size={20} color="white" />
                        <Text className="text-sm text-gray-200 font-semibold">
                            Konversationen
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="mt-4">
                    <View className="flex flex-row items-center space-x-4  p-4  rounded-md">
                        <Ionicons name="pricetags" size={20} color="white" />
                        <Text className="text-sm text-gray-200 font-semibold">
                            Pläne und Upgrades
                        </Text>
                    </View>
                </View>

                

            </View>
            <View className="mt-auto border-t border-gray-600">
            <View className="mt-4">
                    <TouchableOpacity className="flex flex-row items-center space-x-4 py-4 rounded-md"
                    onPress={() => {
                        router.push(`/settings`);
                        closeModal();
                    }}
                    >
                        <Ionicons name="settings" size={20} color="white" />
                        <Text className="text-sm text-gray-200 font-semibold">
                            Einstellungen
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center space-x-4   py-4  rounded-md">
                    <Entypo name="login" size={20} color="white" />
                    <Text className="text-sm text-gray-200 font-semibold">
                        Ausloggen
                    </Text>
                </View>
            </View>
            </View>
        </SafeAreaView>
    );
}

export default DrawerContentProfile;