
import { cn } from "@/~/lib/utils";

import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as SecureStorage from 'expo-secure-store';
import { editBusinessDescription } from "@/actions/business/edit/edit-description";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface BusinessdescriptionProps {
    thisDescription: string;
    isOwnProfile: boolean;
    username: string;
}

const Businessdescription = ({ thisDescription, isOwnProfile, username }: BusinessdescriptionProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [currentDescription, setCurrentDescription] = useState(thisDescription);

    const router = useRouter()

    const onAbort = () => {
        setIsEditing(false);
        setCurrentDescription(thisDescription);
    }

    const onSave = async () => {
        try {
            const authToken = await SecureStorage.getItemAsync("authToken");
            
            await editBusinessDescription(currentDescription, authToken);
            Toast.show({
                type: "success",
                text1: "Beschreibung geändert",
                text2: "Deine Beschreibung wurde erfolgreich geändert"
            })
            
        } catch (e : any) {
            console.log(e + "11");
        } finally {
            setIsEditing(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View className="flex flex-col h-fulll">
                <View className="flex flex-row items-center">
                    <Text className="text-base text-gray-200 font-semibold w-3/4 line-clamp-1">
                        über {username}
                    </Text>
                    {(isOwnProfile && !isEditing) && (
                        <TouchableOpacity className="ml-auto p-2.5  rounded-md flex flex-row items-center" onPress={() => { setIsEditing(true) }}>

                            <MaterialCommunityIcons name="pencil" size={24} color={"white"}  />
                        </TouchableOpacity>
                    )}
                    {isEditing && (
                        <View className="flex flex-row items-center ml-auto">
                            <TouchableOpacity className="p-2.5  rounded-md flex flex-row items-center" onPress={onSave}>

                            <MaterialCommunityIcons name="content-save" size={24} color={"white"}  />
                            </TouchableOpacity>
                            <TouchableOpacity className="p-2.5   rounded-md flex flex-row items-center" onPress={onAbort}>

                            <MaterialCommunityIcons name="close-box" size={24} color={"white"}  />
                            </TouchableOpacity>

                        </View>
                    )}
                </View>
                <View className="pb-4 h-full">
                    {isEditing ? (
                        <TextInput
                            className="border-indigo-800 border rounded-md h-40 text-gray-200 p-2"
                            onChangeText={setCurrentDescription}
                            value={currentDescription}
                            multiline={true}
                            autoCorrect={true}
                        />
                    ) : (
                        <Text className={cn("text-gray-200/80 text-sm", String(currentDescription ?? "").trim() == "" && "text-gray-200/60")}>
                            {currentDescription ?
                                currentDescription :
                                isOwnProfile ? "Du hast noch nichts über dich geteilt" : "Dieser Nutzer hat noch keine Beschreibung hinzugefügt."
                            }
                        </Text>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Businessdescription;