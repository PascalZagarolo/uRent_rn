import { ReplaceAllIcon, XIcon } from "lucide-react-native";
import React from "react";
import { Image } from "react-native";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";



interface ImageDialogProps {
    onClose: () => void;
    setImageUrl: (newOne: string) => void;
    imageUrl : string;
}

const ImageDialog = ({ onClose, setImageUrl, imageUrl }: ImageDialogProps) => {

    const [showModal, setShowModal] = React.useState(false);

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
                                Profilbild ändern
                            </Text>
                            <TouchableOpacity className="ml-auto" onPress={onClose}>
                                <XIcon />
                            </TouchableOpacity>
                        </View>
                        <View className="flex flex-row items-center justify-center">
                        <Image
                                    source={{ uri: imageUrl }}

                                    resizeMode="cover"
                                    className="w-full rounded-md object-cover h-40 w-40 rounded-full" />
                        </View>
                        <View className="mt-8 mb-8">
                            <View>
                                
                                <View className="w-full flex flex-row items-center space-x-8 justify-center">
                                    <TouchableOpacity className="w-[40%] p-2.5 py-4 flex items-center bg-indigo-800 shadow-lg rounded-md" onPress={() => setShowModal(true)}>
                                        <ReplaceAllIcon className="w-4 h-4 mr-2 text-gray-200" />
                                        <Text className="text-gray-200 mt-2">
                                            Bild ändern
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="w-[40%] p-2.5 py-4 flex  items-center bg-rose-600 shadow-lg rounded-md" onPress={() => setImageUrl(null)}>
                                        <XIcon className="w-4 h-4 mr-2 text-gray-200" />
                                        <Text className="text-gray-200 mt-2">
                                            Bild entfernen
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>

    );
}

export default ImageDialog;