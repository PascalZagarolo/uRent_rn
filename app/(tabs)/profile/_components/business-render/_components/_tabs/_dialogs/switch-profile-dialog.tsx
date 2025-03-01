import {  ImageIcon, ReplaceAllIcon, SaveIcon, UserIcon, XIcon } from "lucide-react-native";
import React from "react";
import { Image, Modal } from "react-native";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/~/lib/utils";
import Toast from "react-native-toast-message";

import * as SecureStorage from 'expo-secure-store';

import { switchToBusiness } from "@/actions/user/switch-to-business";


interface SwitchProfileDialogProps {
    onClose: () => void;
   onReload: () => void;
  
}

const SwitchProfileDialog = ({ onClose, onReload }: SwitchProfileDialogProps) => {

    type PictureObject = {
        url: string,
    };

    

    
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

            await switchToBusiness(token);
            Toast.show({
                type: "success",
                text1: "Erfolgreich",
                text2: "Dein Konto wurde erfolgreich in ein Vermieter Konto umgewandelt"
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
                                Konto umwandeln
                            </Text>
                            <TouchableOpacity className="ml-auto" onPress={onClose}>
                                <XIcon />
                            </TouchableOpacity>
                        </View>
                        <View className="mt-4 px-4 pb-4">
                            <Text className="text-sm text-gray-200/80">
                                Möchtest du dein Konto in ein Vermieter Konto umwandeln? 
                            </Text>
                            <Text className="text-sm text-gray-200/80">
                                Du erhältst dadurch Zugriff auf weitere nützliche Funktionen.
                            </Text>
                            <Text className="text-sm text-gray-200/80">
                                Du kannst dein Konto jederzeit wieder in ein Mieter Konto umwandeln.
                            </Text>
                        </View>
                        <View className="flex flex-row items-center px-4 pb-4">
                        <TouchableOpacity className="bg-indigo-800 w-1/2 p-2.5 rounded-md" onPress={onSwitch}>
                            <Text className="text-gray-200 text-center text-base">
                             <MaterialCommunityIcons name="share" size={20} />  Umwandeln
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

export default SwitchProfileDialog;