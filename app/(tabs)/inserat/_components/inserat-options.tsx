import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import DialogRequest from "./dialogs/dialog-request";

interface InseratOptionsProps {
    inseratUserId : string;
    currentUserId : string;
}

const InseratOptions = ({ inseratUserId, currentUserId } : InseratOptionsProps) => {

    const [openDialog, setOpenDialog] = useState<{open : boolean, type : string}>({open : false, type : ""});

    return (
        <View className="flex flex-col px-4">
            <View className="space-y-2">
                <TouchableOpacity className="p-4 bg-emerald-800 rounded-md  flex flex-row items-center" onPress={() => {setOpenDialog({open : true, type: "request"})}}>
                    <View className="mr-4">
                        <FontAwesome name="thumbs-up" size={20} color="white" />
                    </View>
                    <Text className="text-gray-200 font-semibold text-md ">

                        Fahrzeug anfragen
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity className="p-4 bg-blue-800 rounded-md  flex flex-row items-center">
                    <View className="mr-4">
                        <MaterialCommunityIcons name="calendar-search" size={20} color="white" />
                    </View>
                    <Text className="text-gray-200 font-semibold text-md ">

                        Buchung vorschlagen
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity className="p-4 bg-[#232635] rounded-md  flex flex-row items-center">
                    <View className="mr-4">
                        <Feather name="star" size={20} color="white" />
                    </View>
                    <Text className="text-gray-200 font-semibold text-md ">

                        Anzeige vormerken
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity className="p-4 bg-[#262837] rounded-md  flex flex-row items-center">
                    <View className="mr-4">
                        <Ionicons name="mail-outline" size={20} color="white" />
                    </View>
                    <Text className="text-gray-200 font-semibold text-md ">

                        Händler kontaktieren
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity className="p-4 bg-[#1e202d] rounded-md  flex flex-row items-center">
                    <View className="mr-4">
                        <MaterialCommunityIcons name="share-all" size={20} color="white" />
                    </View>
                    <Text className="text-gray-200 font-semibold text-md ">

                        Anzeige teilen
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={openDialog.open}
                onRequestClose={() => {
                    setOpenDialog({open : false, type : ""});
                }}

            >
                {openDialog.type == "request" && 
                <DialogRequest 
                onClose={() => setOpenDialog({open : false, type : ""})}
                inseratUserId={inseratUserId}
                currentUserId={currentUserId}
                />
                }
            </Modal>
        </View>
    );
}

export default InseratOptions;