import {  ReplaceAllIcon, SaveIcon, UserIcon, XIcon } from "lucide-react-native";
import React from "react";
import { Image, Modal } from "react-native";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Feather, FontAwesome } from "@expo/vector-icons";
import { cn } from "@/~/lib/utils";


interface ImageDialogProps {
    onClose: () => void;
    setImageUrl: (newOne: string) => void;
    imageUrl : string;
}

const ImageDialog = ({ onClose, setImageUrl, imageUrl }: ImageDialogProps) => {

    type PictureObject = {
        url: string,
    };

    

    const [previousUrl, setPreviousUrl] = React.useState(imageUrl);
    const [showModal, setShowModal] = React.useState(false);

    const onImageUpload = async (mode: string) => {
        try {
            let result: ImagePicker.ImagePickerResult;

            if (mode === "gallery") {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            } else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            }

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;

                const newImage: PictureObject = {
                    url: uri,

                };

                setImageUrl(newImage.url);
                setImageUrl(uri);
                setShowModal(false);
            }
        } catch (e: any) {
            console.log("Error during image upload:", e);
        }
    };

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
                         {imageUrl ? (
                            <Image
                            source={{ uri: imageUrl }}

                            resizeMode="cover"
                            className="  object-cover h-40 w-40 rounded-full" />
                         ) : (
                            <TouchableOpacity className="w-40 h-40 bg-gray-800 rounded-full flex items-center justify-center">
                                <UserIcon className="w-32 h-32 text-gray-200" />
                            </TouchableOpacity>
                         )}
                        </View>
                        <View className="mt-8 mb-8">
                            <View>
                                
                                <View className="w-full flex flex-row items-center space-x-4 justify-center">
                                    <TouchableOpacity className="w-[44%] p-2.5 py-4 flex items-center bg-gray-800 shadow-lg rounded-md" onPress={() => setShowModal(true)}>
                                        <ReplaceAllIcon className="w-4 h-4 mr-2 text-gray-200" />
                                        <Text className="text-gray-200 mt-2">
                                            Bild ändern
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="w-[44%] p-2.5 py-4 flex  items-center bg-rose-600 shadow-lg rounded-md" onPress={() => setImageUrl(null)}>
                                        <XIcon className="w-4 h-4 mr-2 text-gray-200" />
                                        <Text className="text-gray-200 mt-2">
                                            Bild entfernen
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View className="px-4 mt-4 ">
                                <TouchableOpacity className={cn(
                                    "w-full rounded-md shadow-lg justify-center flex flex-row items-center  p-2.5",
                                    imageUrl == previousUrl ? "bg-opacity-50 bg-indigo-600/50" : "bg-opacity-100 bg-indigo-800"
                                )}>
                                    <SaveIcon className={cn("w-4 h-4 mr-4 text-gray-200",
                                        imageUrl == previousUrl ? "text-gray-200/40" : "text-gray-200"
                                    )} />
                                    <Text className={cn(
                                        "text-sm font-semibold text-center text-gray-200", 
                                        imageUrl == previousUrl ? "text-gray-200/40" : "text-gray-200"
                                    )}>
                                        Änderungen speichern
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => {
                        setShowModal(false);
                    }}
                >
                    <View className="flex-1 justify-center items-center bg-black/95">
                        <View className="bg-[#151821] w-full rounded-lg overflow-hidden pb-8">
                            <View className="flex flex-row items-center p-4">
                                <Text className="text-xl font-semibold text-gray-200">
                                    Bilder hinzufügen
                                </Text>
                                <TouchableOpacity className="ml-auto">
                                    <FontAwesome name="close" size={24} color="white" onPress={() => { setShowModal(false) }} />
                                </TouchableOpacity>
                            </View>
                            <View className="mt-4 flex flex-row items-center">
                                <View className="flex flex-row items-center w-full justify-evenly">
                                    <TouchableOpacity
                                        className="w-1/3 flex-col justify-center items-center bg-[#262b3d] p-4 rounded-md"
                                        onPress={() => {
                                            onImageUpload("camera");
                                        }}
                                    >
                                        <View>
                                            <Feather name="camera" size={20} color="white" />
                                        </View>
                                        <Text className="text-gray-200 font-semibold text-base">
                                            Kamera
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        className="w-1/3 flex-col justify-center items-center bg-[#262b3d] p-4 rounded-md"
                                        onPress={() => {
                                            onImageUpload("gallery");
                                        }}
                                    >
                                        <View className="flex flex-col">
                                            <View>
                                                <Feather name="image" size={20} color="white" />
                                            </View>
                                        </View>
                                        <Text className="text-gray-200 font-semibold text-base">
                                            Galerie
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>

    );
}

export default ImageDialog;