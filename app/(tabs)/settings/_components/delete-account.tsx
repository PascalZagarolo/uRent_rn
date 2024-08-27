import { userTable } from "@/db/schema";
import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";


interface DeleteAccountProps {
    currentUser: typeof userTable.$inferSelect;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({
    currentUser
}) => {

    const [showDialog, setShowDialog] = useState(false);

    return (
        <View>
            <View className="flex flex-row items-center gap-x-4">
                <AntDesign name="delete" size={24} color="white" />
                <Text className="text-lg font-semibold text-gray-200">
                    Account löschen
                </Text>
            </View>
            <View className="">
                <Text className="text-gray-200/60 text-xs">
                    Lösche deinen Account und alle damit assoziierten Daten. Diese Aktion kann nicht rückgängig gemacht werden.
                </Text>
                <TouchableOpacity className="bg-rose-600 p-4 rounded-md mt-4">
                    <Text className="text-sm text-gray-200 font-semibold text-center">
                        Account löschen
                    </Text>
                </TouchableOpacity>
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
                    <View className="bg-[#151821] w-full rounded-lg overflow-hidden pb-8">
                        <View className="flex flex-row items-center p-4">
                            <Text className="text-xl font-semibold text-gray-200">
                                Account löschen
                            </Text>
                            <TouchableOpacity className="ml-auto">
                                <FontAwesome name="close" size={24} color="white" onPress={() => { setShowDialog(false) }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className="text-xs text-gray-200/60">
                                Bist du sicher, dass du deinen Account löschen möchtest?
                                Gelöschte Accounts können nicht wiederhergestellt werden.
                                Du bekommst eine Email mit der du deine Entscheidung bestätigen musst.
                            </Text>
                        </View>
                        <View className="flex flex-row items-center">
                            <TouchableOpacity className="p-4 bg-rose-600 rounded-md">
                                <Text className="text-sm text-gray-200 font-semibold text-center">
                                    Account löschen
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-[#151821] p-4">
                                <Text className="text-sm text-gray-200 font-semibold text-center">
                                    Abbrechen
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal >
        </View >
    );
}

export default DeleteAccount;