import { CirclePlusIcon, XIcon } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import LocationDialogUpload from "./location-dialog-upload";
import { createLocation } from "@/actions/business/location/create-location";
import * as SecureStorage from 'expo-secure-store';
import Toast from "react-native-toast-message";
import BarLoader from "react-spinners/ClipLoader";
interface LocationDialogProps {
    onClose: () => void;
}

const LocationDialog = ({ onClose }: LocationDialogProps) => {

    const [title, setTitle] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [plz, setPLZ] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const onCreate = async () => {
        try {
            setIsLoading(true);
            let usedUrl: string | null = null;

            if (imageUrl) {
                usedUrl = await uploadImage(imageUrl);
            }

            console.log(usedUrl);

            const values = {
                title: title ?? null,
                street: street ?? null,
                city: city ?? null,
                postalCode: plz ?? null,
                image: usedUrl ?? null,
            }

            console.log(values);

            const authToken = await SecureStorage.getItemAsync("authToken");

            await createLocation(values, authToken);
            Toast.show({
                type: 'success',
                text1: 'Standort hinzugefügt',
                text2: 'Der Standort wurde erfolgreich hinzugefügt',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                position: 'top',
                onPress: () => Toast.hide()
            })
            onClose();
        } catch (e: any) {
            console.log(e);
            Toast.show({
                type: 'error',
                text1: 'Etwas ist schief gelaufen',
                text2: 'Versuche es bitte erneut',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                position: 'top',
                onPress: () => Toast.hide()
            })

        } finally {
            setIsLoading(false);
        }
    }

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
            <View className="h-full  justify-center items-center bg-black/80 p-4"

            >

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

                >
                    <View className="bg-[#151821] w-full rounded-lg">

                        <View className="flex flex-row items-center p-4">
                            <Text className="text-lg font-semibold text-gray-200">
                                Standort hinzufügen
                            </Text>
                            <TouchableOpacity className="ml-auto" onPress={onClose}>
                                <XIcon />
                            </TouchableOpacity>
                        </View>
                        <View className="px-4">

                            <LocationDialogUpload
                                setImageUrl={setImageUrl}
                            />

                            <Text className="text-base font-semibold text-gray-200 mt-4">
                                Titel
                            </Text>
                            <TextInput
                                placeholder="z.B. Autohaus Mömer"
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                                className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg"
                            />
                        </View>
                        <View className="p-4">
                            <Text className="text-base font-semibold text-gray-200">
                                Straße
                            </Text>
                            <TextInput
                                placeholder="Musterstraße 13"
                                value={street}
                                onChangeText={(text) => setStreet(text)}
                                className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg"
                            />
                        </View>
                        <View className="px-4 flex flex-row items-center space-x-4">
                            <View className="w-[48%]">
                                <Text className="text-base font-semibold text-gray-200">Stadt</Text>
                                <TextInput
                                    placeholder="Musterstadt"
                                    value={city}
                                    onChangeText={(text) => setCity(text)}
                                    className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg"
                                />
                            </View>
                            <View className="w-[48%]">
                                <Text className="text-base font-semibold text-gray-200">Postleitzahl</Text>
                                <TextInput
                                    placeholder="10100"
                                    value={plz}
                                    onChangeText={(text) => setPLZ(text)}
                                    className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg"
                                />
                            </View>
                        </View>
                        <View className="py-4 px-4">
                            <TouchableOpacity
                                className="px-4 flex flex-row justify-center items-center p-2.5 bg-indigo-800 rounded-md"
                                onPress={onCreate}
                            >

                                {!isLoading ? (
                                    <View>
                                        <ActivityIndicator size="small" color="#fff" />
                                    </View>
                                ) : (
                                    <>
                                        <CirclePlusIcon className="w-4 h-4 mr-2 text-gray-200" />
                                        <Text className="text-sm font-semibold text-gray-200 rounded-lg text-center">
                                            Standort hinzufügen
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>

                    </View>
                </KeyboardAvoidingView>

            </View>
        </TouchableWithoutFeedback>
    );
}

export default LocationDialog;