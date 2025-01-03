import React from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { XIcon } from "lucide-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { getExistingOrCreateNewConversation } from "@/actions/conversations/find-existing-or-create-new";
import { useRouter } from "expo-router";
import { writeMessageRequest } from "@/actions/messages/request/write-message-request";
import * as SecureStorage from 'expo-secure-store';

interface DialogRequestProps {
    onClose: () => void;
    inseratUserId : string;
    currentUserId : string;
}

const DialogRequest = ({ onClose, inseratUserId, currentUserId }: DialogRequestProps) => {


    const [currentContent, setCurrentContent] = React.useState<string>(`
    Betreff: Anfrage bezüglich ihres Inserates

    Sehr geehrte Damen und Herren,

    Nach eingehender Prüfung Ihres Mietangebots bin ich 
    sehr interessiert an dem genannten Fahrzeug.
    Gerne würde ich weitere Details zu den Konditionen besprechen und 
    das Fahrzeug persönlich in Augenschein nehmen.

    Mit freundlichen Grüßen,
    [Dein Name]

    Meine Kontaktdaten: 
    E-Mail: [Deine Email]
    `);

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter()

    const onSend = async () => {
        try {
            if(isLoading) return;
            setIsLoading(true);
            
            if(!currentUserId) {
                return router.push("/login")
            }

            const findConversation = await getExistingOrCreateNewConversation(inseratUserId, currentUserId);
            if(!findConversation) {
                return Toast.show({
                    type: "error",
                    text1: "Fehler",
                    text2: "Konversation konnte nicht gefunden werden.",
                })
            }

            const authToken = await SecureStorage.getItemAsync("authToken");

            if(!authToken) {
                return router.push("/login")
            }

            const values = {
                conversationId : findConversation.id,
                content : currentContent,
                senderId : currentUserId,
                token : authToken
            }

            await writeMessageRequest(values);
            onClose();
            return router.push(`/conversation/${findConversation.id}`)


        } catch (e: any) {
            console.log(e);
            Toast.show({
                type: "error",
                text1: "Fehler",
                text2: "Nachricht konnte nicht gesendet werden.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-black/80 justify-center items-center p-4">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="w-full"
                >
                    <View className="bg-[#151821] rounded-lg overflow-hidden">
                        {/* Header */}
                        <View className="flex-row items-center p-4">
                            <Text className="text-lg font-semibold text-gray-200">
                                Fahrzeug anfragen
                            </Text>
                            <TouchableOpacity className="ml-auto" onPress={onClose}>
                                <XIcon color="#e5e7eb" />
                            </TouchableOpacity>
                        </View>

                        {/* TextInput Section */}
                        <View className="mt-2 px-4 pb-4">
                            <TextInput
                                className="p-2.5 h-[400px] border border-indigo-800 rounded-md bg-gray-800 text-gray-200 text-sm"
                                placeholder="..."
                                placeholderTextColor="#9ca3af"
                                multiline
                                value={currentContent}
                                onChangeText={setCurrentContent}
                            />
                        </View>

                        {/* Buttons */}
                        <View className="flex-row justify-between px-4 pb-4">
                            <TouchableOpacity
                                className="flex-1 bg-indigo-800 mr-2 p-3 rounded-md"
                                onPress={onSend}
                            >
                                <Text className="text-gray-200 text-center text-base">
                                    <MaterialCommunityIcons name="share" size={20} /> Senden
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex-1 bg-gray-600 ml-2 p-3 rounded-md"
                                onPress={onClose}
                            >
                                <Text className="text-gray-200 text-center text-base">
                                    Abbrechen
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default DialogRequest;
