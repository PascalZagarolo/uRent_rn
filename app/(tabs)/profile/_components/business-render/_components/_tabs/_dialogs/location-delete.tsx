import { CirclePlusIcon, XIcon } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import LocationDialogUpload from "./location-dialog-upload";
import { createLocation } from "@/actions/business/location/create-location";
import * as SecureStorage from 'expo-secure-store';
import Toast from "react-native-toast-message";
import BarLoader from "react-spinners/ClipLoader";
import LetterRestriction from "@/components/LetterRestriction";
import { deleteLocationBusiness } from "@/actions/business/location/delete-location";
interface LocationDialogProps {
    onClose: () => void;
    onDelete : (newAddress) => void;
    locationId : string;
}

const LocationDialogDelete = ({ onClose, onDelete, locationId }: LocationDialogProps) => {

    

    const [isLoading, setIsLoading] = useState(false);

    const onDeleteFunc = async () => {
        try{
            console.log("pressed")
            if(isLoading) {
                return null;
            }

            setIsLoading(true);

            const authToken = await SecureStorage.getItemAsync("authToken");

            const deletedBusiness = await deleteLocationBusiness(locationId, authToken);

            Toast.show({
                type: 'success',
                text1: 'Standort gelöscht',
                text2: 'Der Standort wurde erfolgreich gelöscht',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            })
            onDelete(deletedBusiness);
            onClose();
        } catch(e : any) {
            console.log(e);
            Toast.show({
                type: 'error',
                text1: 'Fehler',
                text2: e.message
            })
        } finally {
            setIsLoading(false);
        }
    }

   


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="h-full  justify-center items-center bg-black/80 p-4"

            >

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

                >
                    <View className="bg-[#151821] w-full rounded-lg p-4">

                        <View className="flex flex-row items-center ">
                            <Text className="text-lg font-semibold text-gray-200">
                                Standort löschen?
                            </Text>
                            <TouchableOpacity className="ml-auto" onPress={onClose}>
                                <XIcon className="text-gray-200"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className="text-xs text-gray-200/60">
                                Gelöschte Standorte können nicht wiederhergestellt werden.
                            </Text>
                        </View>
                       <View className="flex flex-row items-center mt-4">
                            <TouchableOpacity onPress={onDeleteFunc} className="p-2.5 w-1/2 bg-rose-600 rounded-md">
                                {isLoading ? (
                                    <ActivityIndicator 
                                    className="w-4 h-4 text-gray-200"
                                    />
                                ) : (
                                    <Text className="text-base text-gray-200 text-center">
                                    Standort löschen
                                </Text>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onClose} className="p-2.5 w-1/2  rounded-md">
                                <Text className="text-base text-gray-200 text-center">
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

export default LocationDialogDelete;