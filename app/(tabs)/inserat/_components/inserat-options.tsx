import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Share, Text, TouchableOpacity, View } from "react-native";
import DialogRequest from "./dialogs/dialog-request";
import { getExistingOrCreateNewConversation } from "@/actions/conversations/find-existing-or-create-new";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { baseUrl } from "@/lib/staticEnv";


interface InseratOptionsProps {
    inseratUserId : string;
    currentUserId : string;
    inseratId : string;
}

const InseratOptions = ({ inseratUserId, currentUserId, inseratId } : InseratOptionsProps) => {

    const [openDialog, setOpenDialog] = useState<{open : boolean, type : string}>({open : false, type : ""});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const usedUrl = `${baseUrl}/inserat/${inseratId}`;
    
    const onShare = async () => {
        try {
            const result = await Share.share({
                message : `Schau dir dieses Inserat an: ${usedUrl}`
            });

            if(result.action == Share.sharedAction) {
                if(result.activityType) {
                    console.log("shared with activity type", result.activityType);
                } else {
                    console.log("shared");
                }

                Toast.show({
                    type: 'success',
                    text1: 'Inserat erfolgreich geteilt!',
                    text2: 'Das Inserat wurde erfolgreich geteilt.'
                })
            } 
        } catch(e: any) {
            console.log(e);
        }
    }

    const onConversation = async () => {
        try {
            if(isLoading) return;
            setIsLoading(true);
            const findConversation = await getExistingOrCreateNewConversation(inseratUserId, currentUserId);

            if(findConversation) {
                return router.push(`/conversation/${findConversation.id}`);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Fehler',
                    text2: 'Konversation konnte nicht erstellt werden.'
                })
            }
        } catch(e : any) {
            console.log(e);
            Toast.show({
                type: 'error',
                text1: 'Fehler',
                text2: 'Konversation konnte nicht erstellt werden.'
            })
        } finally {
            setIsLoading(false);
        }
    }

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

                <TouchableOpacity className="p-4 bg-[#262837] rounded-md  flex flex-row items-center" onPress={onConversation}>
                    <View className="mr-4">
                        <Ionicons name="mail-outline" size={20} color="white" />
                    </View>
                    <Text className="text-gray-200 font-semibold text-md ">

                        Händler kontaktieren
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity className="p-4 bg-[#1e202d] rounded-md  flex flex-row items-center" onPress={onShare}>
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