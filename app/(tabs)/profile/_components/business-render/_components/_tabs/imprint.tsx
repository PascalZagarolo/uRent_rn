import { PencilIcon, SaveAllIcon, SaveIcon, ScaleIcon, XIcon } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import * as SecureStorage from 'expo-secure-store';
import { editImprintBusiness } from "@/actions/business/imprint/edit-imprint";

interface ImprintRenterProps {
    imprint: string;
    isOwn: boolean
}

const ImprintRender = ({ imprint, isOwn }: ImprintRenterProps) => {

    const [currentImprint, setCurrentImprint] = useState<string>(imprint);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onChange = async () => {
        try {
            setIsLoading(true);
            if (isLoading) return;

            const authToken = await SecureStorage.getItemAsync("authToken");

            await editImprintBusiness(currentImprint, authToken);

            Toast.show({
                type: "success",
                text1: "Erfolg",
                text2: "Impressum erfolgreich geändert"
            })

            setIsEditing(false);
            setCurrentImprint(currentImprint);
        } catch (e: any) {
            console.log(e);
            Toast.show({
                type: "error",
                text1: "Fehler",
                text2: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut."
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View

        >

            <View className="flex flex-row items-center">
                <ScaleIcon className="w-4 h-4 mr-4" />
                <Text className="text-lg font-semibold text-gray-200">
                    Impressum
                </Text>
                {isOwn && (
                    isEditing ? (
                        <View className="ml-auto flex flex-row items-center px-4 space-x-8">
                            <TouchableOpacity onPress={() => setIsEditing(false)}>
                                <SaveAllIcon className="w-4 h-4 text-indigo-800" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsEditing(false)}>
                                <XIcon className="w-4 h-4 text-gray-200" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity className="ml-auto px-4" onPress={() => setIsEditing(true)}>
                            <PencilIcon className="w-4 h-4 text-gray-200" />
                        </TouchableOpacity>
                    )
                )}
            </View>
            {isEditing ? (
                
                    <Text>
                        
                    </Text>
                
            ) : (
                <View className="mt-8">
                    {imprint ? (
                        <Text className="text-gray-200/80 text-base">
                            {imprint}
                        </Text>
                    ) : (
                        <Text className="text-gray-200/60 text-base">
                            Noch keine Angaben hinzugefügt
                        </Text>
                    )}
                </View>
            )}

        </View>
    );
}

export default ImprintRender;