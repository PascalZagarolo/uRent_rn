import { userTable } from "@/db/schema";
import { Entypo, FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Feather } from "lucide-react-native";
import { useState } from "react";
import { Modal, SafeAreaView, Touchable } from 'react-native';
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store"
import { useAuth } from "@/app/(tabs)/AuthProvider";


interface DrawerContentProfileProps {
    currentUser: typeof userTable.$inferSelect;
    closeModal: () => void;
}

const DrawerContentProfile: React.FC<DrawerContentProfileProps> = ({
    currentUser,
    closeModal
}) => {

    const router = useRouter();

    const [showDialog, setShowDialog] = useState(false);

    const logOutModal = () => {
        closeModal();
        setTimeout(() => {
            setShowDialog(true);
        }, 1)
    }

    const { refetchUser } = useAuth();

    const onLogOut = async () => {
        try {
            setShowDialog(false);
            await SecureStore.deleteItemAsync("authToken");
            await refetchUser();
            setTimeout(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Erfolgreich ausgeloggt',
                    text2: "Bis bald! 👋",
                    
                  });
        }, 10)
        } catch(e : any) {

        }
    }

    return (
        <SafeAreaView className="bg-[#1F2332] p-4 border-l border-gray-600 h-full flex flex-col">
            <View className="h-full p-4 ">
                <View className="mt-8">
                    <View>
                        <Image
                            source={{ uri: currentUser?.image }}
                            className="w-12 h-12 rounded-full"
                        />
                    </View>
                    <Text className="text-lg mt-4 font-semibold text-gray-200">
                        {currentUser?.name}
                    </Text>
                    {(currentUser?.vorname || currentUser?.nachname) && (
                        <Text className="text-gray-200/90">
                            {currentUser.vorname} {currentUser.nachname}
                        </Text>
                    )}
                    <Text className="text-sm text-gray-200/90 font-semibold">
                        {currentUser?.email}
                    </Text>
                </View>
                <View className="mt-4 border-t border-gray-600">
                    <View className="mt-4">
                        <TouchableOpacity className="flex flex-row items-center space-x-4  p-4  rounded-md"
                            onPress={() => { router.push(`/profile/${currentUser.id}`) }}
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
                            onPress={() => { router.push(`/conversation`) }}
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
                    <TouchableOpacity className="flex flex-row items-center space-x-4 py-4 rounded-md"
                        onPress={logOutModal}
                    >
                        <Entypo name="login" size={20} color="white" />
                        <Text className="text-sm text-gray-200 font-semibold">
                            Ausloggen
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showDialog}
                onRequestClose={() => {
                    setShowDialog(false);
                }}

            >
                <View className="flex-1 justify-center items-center bg-black/80">
                    <View className="bg-[#151821] w-full rounded-lg overflow-hidden pb-4">
                        <View className="flex flex-row items-center p-4">
                            <Text className="text-xl font-semibold text-gray-200">
                                Wirklich ausloggen?
                            </Text>
                            <TouchableOpacity className="ml-auto">
                                <FontAwesome name="close" size={24} color="white" onPress={() => { setShowDialog(false) }} />
                            </TouchableOpacity>
                        </View>
                        <View className="flex flex-row items-center px-4 ">
                            <TouchableOpacity className="p-4 bg-indigo-800 rounded-md w-1/2" onPress={onLogOut}>
                                <Text className="text-sm text-gray-200 font-semibold text-center">
                                    Ausloggen
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="p-4  rounded-md w-1/2" onPress={() => { setShowDialog(false) }}>
                                <Text className="text-sm text-gray-200 font-semibold text-center">
                                    Abbrechen
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

export default DrawerContentProfile;