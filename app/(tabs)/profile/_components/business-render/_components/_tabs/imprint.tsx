
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import * as SecureStorage from 'expo-secure-store';
import { editImprintBusiness } from "@/actions/business/imprint/edit-imprint";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
        <View>

            <View className="flex flex-row items-center">
            <MaterialCommunityIcons name="scale-balance" size={20} color="white" className="mr-4" />
                <Text className="text-lg font-semibold text-gray-200 ml-4">
                    Impressum
                </Text>
                {isOwn && (
                    isEditing ? (
                        <View className="ml-auto flex flex-row items-center px-4 space-x-8">
                            <TouchableOpacity onPress={() => setIsEditing(false)}>
                            <MaterialCommunityIcons name="content-save" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsEditing(false)}>
                                <MaterialCommunityIcons name="close" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity className="ml-auto px-4" onPress={() => setIsEditing(true)}>
                            <MaterialCommunityIcons name="pencil" size={24} color="white" />
                        </TouchableOpacity>
                    )
                )}
            </View>
            {isEditing ? (
               <TextInput 
                className="text-gray-200/80 border-indigo-800 border p-4 mt-4 rounded-lg h-40"
                multiline
                placeholderTextColor={"gray"}
                autoFocus
                placeholder="Impressum hinzufügen.."
                style={{ textAlignVertical: "top" }}
              />
            ) : (
                <View className="mt-4">
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