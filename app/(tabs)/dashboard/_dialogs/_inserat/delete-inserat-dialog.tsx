import {  ImageIcon, ReplaceAllIcon, SaveIcon, TrashIcon, UserIcon, XIcon } from "lucide-react-native";
import React from "react";
import { Image, Modal } from "react-native";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/~/lib/utils";
import Toast from "react-native-toast-message";
import { editProfilePic } from "@/actions/user/edit/edit-image";
import * as SecureStorage from 'expo-secure-store';
import { editBanner } from "@/actions/business/banner/edit-banner";
import { switchToBusiness } from "@/actions/user/switch-to-business";
import { deleteInserat } from "@/actions/inserat/delete/delete-inserat";


interface DeleteInseratDialogProps {
    onClose: () => void;
   onReload: () => void;
   inseratId : string;
  
}

const DeleteInseratDialog = ({ onClose, onReload, inseratId }: DeleteInseratDialogProps) => {

    

    

    
    const [isLoading, setIsLoading] = React.useState(false);


    
    const onSwitch = async () => {
        try {
            if(isLoading) return;
            setIsLoading(true);

            const token = await SecureStorage.getItemAsync("authToken");

            if(!token) {
                console.log("401")
                throw new Error("Not authenticated");
            }

            await deleteInserat(inseratId, token);
            Toast.show({
                type: "success",
                text1: "Erfolgreich",
                text2: "Das Inserat wurde erfolgreich entfernt."
            })
            onReload();
            onClose();
        } catch(e : any) {
            console.log(e)
            Toast.show({
                type: "error",
                text1: "Fehler",
                text2: "Es ist ein Fehler aufgetreten"
            })
        }
    }


    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="h-full  justify-center items-center bg-black/80 p-4"

            >

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

                >
                    <View className="bg-[#151821] w-full rounded-lg ">

                        <View className="flex flex-row items-center p-4 w-full">
                            <Text className="text-lg font-semibold text-gray-200">
                                Inserat löschen?
                            </Text>
                            <TouchableOpacity className="ml-auto" onPress={onClose}>
                                <XIcon />
                            </TouchableOpacity>
                        </View>
                        <View className="mt-4 px-4 pb-4">
                            <Text className="text-sm text-gray-200/80">
                                Gelöschte Inserate können nicht wiederhergestellt werden.
                            </Text>
                            <Text className="text-sm text-gray-200/80">
                                Bist du sicher, dass du dieses Inserat löschen möchtest?
                            </Text>
                        </View>
                        <View className="flex flex-row items-center px-4 pb-4">
                        <TouchableOpacity className="bg-rose-800 w-1/2 p-2.5 rounded-md flex flex-row items-center justify-center" onPress={onSwitch}>
                        <TrashIcon className="w-4 h-4 mr-2 text-gray-200" />
                            <Text className="text-gray-200 text-center text-base">
                               Löschen
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="w-1/2" onPress={onClose}>
                            <Text className="text-gray-200 text-center text-base  p-2.5 rounded-md">
                                Abbrechen
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>

    );
}

export default DeleteInseratDialog;