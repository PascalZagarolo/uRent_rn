
import React from "react";
import { Image, KeyboardAvoidingView, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Keyboard,  Platform, Text,  View } from "react-native";



import Toast from "react-native-toast-message";
import { editProfilePic } from "@/actions/user/edit/edit-image";
import * as SecureStorage from 'expo-secure-store';

import * as ImagePicker from 'expo-image-picker';
import { cn } from "@/~/lib/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";


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
    const [isLoading, setIsLoading] = React.useState(false);


    const onSave = async () => {
        try {
            if(isLoading) return null;
            setIsLoading(true);

            let uploadUrl = imageUrl ? await uploadImage(imageUrl) : "";

            

            const authToken = await SecureStorage.getItemAsync("authToken");

            await editProfilePic(uploadUrl, authToken);

            Toast.show({
                type: "success",
                text1: "Erfolgreich",
                text2: "Profilbild wurde erfolgreich geändert"
            })
            
            onClose();
            setImageUrl(uploadUrl);
        } catch(e : any) {
            console.log(e);
            Toast.show({
                type: "error",
                text1: "Fehler",
                text2: "Ein Fehler ist aufgetreten, bitte versuchen Sie es erneut"
            })
        }
    }


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

    const uploadImage = async (imageUri: string) => {
        try {
            const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";

            const formData = new FormData();

            let result;

            const image = {
                uri: imageUri,
                type: 'image/jpeg', // Change according to your image type
                name: 'upload.jpg', // Provide a name for the file
            };

            // Here, we need to either convert the file to base64 or pass the actual bytes
            // In a React Native environment, you might need an additional library like `react-native-fs`
            // to read the file and convert it to base64.

            //@ts-ignore
            formData.append("file", {
                uri: image.uri,
                type: image.type,
                name: image.name,
            });
            formData.append("upload_preset", "oblbw2xl");
            console.log(4)
            await fetch(url, {
                method: "POST",
                body: formData
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {

                    console.log(data.secure_url)
                    result = data.secure_url;
                });

            if (result) {
                return result;
            }
        } catch (e: any) {
            console.log(e);
            return null;
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="h-full justify-center items-center bg-black/80 p-4">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View className="bg-[#151821] w-full rounded-lg">
                    <View className="flex flex-row items-center p-4 w-full">
                        <Text className="text-lg font-semibold text-gray-200">Profilbild ändern</Text>
                        <Pressable className="ml-auto" onPress={onClose}>
                            <MaterialCommunityIcons name="close" size={24} color={"white"}/>
                        </Pressable>
                    </View>
                     <View className="flex flex-row items-center justify-center">
                        {imageUrl ? (
                            <Image source={{ uri: imageUrl }} resizeMode="cover" className="object-cover h-40 w-40 rounded-full" />
                        ) : (
                            <Pressable className="w-40 h-40 bg-gray-800 rounded-full flex items-center justify-center">
                                <MaterialCommunityIcons name="face-man-profile" className="w-32 h-32 text-gray-200" />
                            </Pressable>
                        )}
                    </View>
                    <View className="mt-8 mb-8">
                        <View className="w-full flex flex-row items-center space-x-4 justify-center">
                            <Pressable className="w-[44%] p-2.5 py-4 flex items-center bg-gray-800 shadow-lg rounded-md" onPress={() => setShowModal(true)}>
                                <MaterialCommunityIcons name="image" size={24} color={"white"} className="w-4 h-4 mr-2 text-gray-200" />
                                <Text className="text-gray-200 mt-2">Bild ändern</Text>
                            </Pressable>
                            <Pressable className="w-[44%] p-2.5 py-4 flex items-center bg-rose-600 shadow-lg rounded-md" onPress={() => setImageUrl(null)}>
                            <MaterialCommunityIcons name="close" size={24} color={"white"}/>
                                <Text className="text-gray-200 mt-2">Bild entfernen</Text>
                            </Pressable>
                        </View>
                        <View className="px-4 mt-4">
                            <Pressable 
                                onPress={onSave}
                                className={cn(
                                    "w-full rounded-md shadow-lg justify-center flex flex-row items-center p-2.5 space-x-4",
                                    imageUrl == previousUrl ? "bg-opacity-50 bg-indigo-600/50" : "bg-opacity-100 bg-indigo-800"
                                )}
                            >
                                <MaterialCommunityIcons name="content-save" size={20} color={"white"} className={cn("w-4 h-4 mr-4 text-gray-200",
                                    imageUrl == previousUrl ? "text-gray-200/40" : "text-gray-200"
                                )} />
                                <Text className={cn(
                                    "text-sm font-semibold text-center text-gray-200", 
                                    imageUrl == previousUrl ? "text-gray-200/40" : "text-gray-200"
                                )}>
                                    Änderungen speichern
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <Modal animationType="slide" transparent={true} visible={showModal} onRequestClose={() => setShowModal(false)}>
                        <View className="flex-1 justify-center items-center bg-black/95">
                            <View className="bg-[#151821] w-full rounded-lg overflow-hidden pb-8">
                                <View className="flex flex-row items-center p-4">
                                    <Text className="text-xl font-semibold text-gray-200">Bilder hinzufügen</Text>
                                    <Pressable className="ml-auto" onPress={() => setShowModal(false)}>
                                        <MaterialCommunityIcons name="close" size={24} color="white" />
                                    </Pressable>
                                </View>
                                <View className="mt-4 flex flex-row items-center">
                                    <View className="flex flex-row items-center w-full justify-evenly">
                                        <Pressable className="w-1/3 flex-col justify-center items-center bg-[#262b3d] p-4 rounded-md" onPress={() => onImageUpload("camera")}>
                                            <MaterialCommunityIcons name="camera" size={20} color="white" />
                                            <Text className="text-gray-200 font-semibold text-base">Kamera</Text>
                                        </Pressable>
                                        <Pressable className="w-1/3 flex-col justify-center items-center bg-[#262b3d] p-4 rounded-md" onPress={() => onImageUpload("gallery")}>
                                            <MaterialCommunityIcons name="image" size={20} color="white" />
                                            <Text className="text-gray-200 font-semibold text-base">Galerie</Text>
                                        </Pressable>
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

export default ImageDialog