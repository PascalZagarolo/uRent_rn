import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
    Keyboard, Modal, TouchableOpacity,
    TouchableWithoutFeedback, View, Text
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { priceprofile } from "@/db/schema";
import { deletePriceprofile } from "@/actions/inserat/priceprofiles/delete-price-profile";
import Toast from "react-native-toast-message";


interface DeletePriceDetailsProps {
    thisProfile: typeof priceprofile.$inferSelect;
    onDelete: (values: any) => void;
}

const DeletePriceDetails = ({ thisProfile, onDelete } : DeletePriceDetailsProps) => {

    const [showModal, setShowModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => { 
        try {
            setIsLoading(true);
            const authToken = await SecureStore.getItemAsync('authToken')

            const values = {
                profileId : thisProfile?.id,
                token : authToken,
            }

            const deleted = await deletePriceprofile(values);
            onDelete(values);
            setShowModal(false);
            Toast.show({
                text1: "Preisprofil gelöscht",
                text2: "Dein Preisprofil wurde erfolgreich gelöscht.",
                type: "success"
            })


        } catch(e : any) {
            console.log(e);
            return;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View className="">
            <TouchableOpacity onPress={() => {setShowModal(true)}}>
                <FontAwesome name="trash" size={24} color="white" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}
                
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1 justify-center items-center bg-black/95">
                        <View className="bg-[#151821] w-full rounded-lg overflow-hidden pb-4">
                            <View className="flex flex-row items-center px-4 pt-4">
                                <Text className="text-xl font-semibold text-gray-200">
                                    Preisprofil wirklich löschen?
                                </Text>
                                <TouchableOpacity className="ml-auto">
                                    <FontAwesome name="close" size={24} color="white" onPress={() => { setShowModal(false) }} />
                                </TouchableOpacity>
                                
                            </View>
                            <View className="px-4">
                            <Text className="text-xs text-gray-200/60">
                                    Gelöschte Preisprofile können nicht wiederhergestellt werden.
                                </Text>
                            </View>
                            <View className="mt-8 flex flex-row items-center space-x-4 px-4">
                                <TouchableOpacity className=" w-1/2 rounded-md bg-rose-800" onPress={onSubmit} disabled={isLoading}>
                                    <Text className={cn("text-center text-sm font-semibold text-gray-200  p-4",
                                        isLoading && "text-gray-200/60 bg-indigo-800/20")}>
                                        Preisprofil löschen
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="w-1/2" onPress={() => {setShowModal(false)}}>
                                    <Text className={cn("text-center text-sm font-semibold text-gray-200  p-4",
                                        isLoading && "text-gray-200/60 bg-indigo-800/20")}>
                                        Abbrechen
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

export default DeletePriceDetails;