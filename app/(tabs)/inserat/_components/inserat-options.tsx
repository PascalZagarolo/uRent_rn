import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Linking, Modal, Share, Text, TouchableOpacity, View } from "react-native";
import DialogRequest from "./dialogs/dialog-request";
import { getExistingOrCreateNewConversation } from "@/actions/conversations/find-existing-or-create-new";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { baseUrl } from "@/lib/staticEnv";
import { deleteFavourite } from "@/actions/favourites/delete-favourite";
import * as SecureStore from "expo-secure-store";
import { addFavourite } from "@/actions/favourites/add-favourite";

interface InseratOptionsProps {
    inseratUserId: string;
    currentUserId: string;
    phoneNumber : string | null;
    inseratId: string;
    isFaved: boolean;
}

const InseratOptions = ({ inseratUserId, currentUserId, inseratId, isFaved, phoneNumber }: InseratOptionsProps) => {

    const [openDialog, setOpenDialog] = useState<{ open: boolean, type: string }>({ open: false, type: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [faved, setFaved] = useState<boolean>(isFaved);
    const router = useRouter();

    const usedUrl = `${baseUrl}/inserat/${inseratId}`;

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `Schau dir dieses Inserat an: ${usedUrl}`
            });

            if (result.action == Share.sharedAction) {
                if (result.activityType) {
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
        } catch (e: any) {
            console.log(e);
        }
    }

    const onConversation = async () => {
        try {
            if (isLoading) return;
            setIsLoading(true);

            if (!currentUserId) {
                return router.push('/login');
            }

            const findConversation = await getExistingOrCreateNewConversation(inseratUserId, currentUserId);

            if (findConversation) {
                return router.push(`/conversation/${findConversation.id}`);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Fehler',
                    text2: 'Konversation konnte nicht erstellt werden.'
                })
            }
        } catch (e: any) {
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



    const onFav = async () => {
        try {
            if (isLoading) return;



            setIsLoading(true);


            if (!currentUserId) {
                return router.push('/login');
            }
            console.log("faved")
            const authToken = await SecureStore.getItemAsync("authToken");

            if (faved) {
                await deleteFavourite(authToken, inseratId);
                setFaved(false);
                Toast.show({
                    type: 'success',
                    text1: 'Favorit entfernt',
                    text2: 'Das Inserat wurde aus deinen Favoriten entfernt'
                });
            } else {
                await addFavourite(authToken, inseratId);
                setFaved(true);
                Toast.show({
                    type: 'success',
                    text1: 'Favorit hinzugefügt',
                    text2: 'Das Inserat wurde zu deinen Favoriten hinzugefügt'
                });
            }

        } catch (e: any) {
            Toast.show({
                type: 'error',
                text1: 'Fehler',
                text2: 'Favorit konnte nicht hinzugefügt werden'
            });
        } finally {

            setIsLoading(false);

        }
    };


    return (
        <View className="flex flex-col px-4">
            <View className="space-y-2">




                <TouchableOpacity className="p-4 border-blue-800  bg-blue-800 rounded-md  flex flex-row items-center" onPress={() => { setOpenDialog({ open: true, type: "request" }) }}>
                    <View className="mr-4">
                        <FontAwesome name="thumbs-up" size={20} color="white" />
                    </View>
                    <Text className="text-gray-200 font-semibold text-md ">

                        Fahrzeug anfragen
                    </Text>
                </TouchableOpacity>


                {phoneNumber && (
                    <TouchableOpacity
                    className="p-4  bg-[#2b2d3d] rounded-md flex flex-row items-center"
                    onPress={() => {
                        Linking.openURL(`tel:+49${phoneNumber}`); 
                    }}
                >
                    <View className="mr-4">
                        <FontAwesome name="phone" size={20} color="white" />
                    </View>
                    <Text className="text-gray-200 font-semibold text-md">
                        Vermieter anrufen
                    </Text>
                </TouchableOpacity>
                )}


                <TouchableOpacity className="p-4 bg-[#262837] rounded-md  flex flex-row items-center" onPress={onConversation}>
                    <View className="mr-4">
                        <Ionicons name="mail-outline" size={20} color="white" />
                    </View>
                    <Text className="text-gray-200 font-semibold text-md ">

                        Händler kontaktieren
                    </Text>
                </TouchableOpacity>
                <View className="w-full flex flex-row items-center justify-between ">
                    <TouchableOpacity className="p-4 bg-[#262837] rounded-md flex flex-row items-center flex-1 mr-4" onPress={onFav}>
                        <View className="mr-4">
                            {faved ? (
                                <FontAwesome name="bookmark" size={20} color="white" />
                            ) : (
                                <FontAwesome name="bookmark-o" size={20} color="white" />
                            )}
                        </View>
                        <Text className="text-gray-200 font-semibold text-md">
                            Anzeige speichern
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="p-4 bg-[#262837] rounded-md flex flex-row items-center flex-1" onPress={onShare}>
                        <View className="mr-4">
                            <MaterialCommunityIcons name="share-all" size={20} color="white" />
                        </View>
                        <Text className="text-gray-200 font-semibold text-md">
                            Anzeige teilen
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={openDialog.open}
                onRequestClose={() => {
                    setOpenDialog({ open: false, type: "" });
                }}

            >
                {openDialog.type == "request" &&
                    <DialogRequest
                        onClose={() => setOpenDialog({ open: false, type: "" })}
                        inseratUserId={inseratUserId}
                        currentUserId={currentUserId}
                    />
                }
            </Modal>
        </View>
    );
}

export default InseratOptions;