import { changeUser } from "@/actions/user/change-user";
import { AntDesign, Feather, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImagePickerResult } from "expo-image-picker";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Image, TouchableOpacity, Text, Modal } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useAuth } from "@/app/(tabs)/AuthProvider";

interface ChangeProfilePicProps {
    savedImage: string
}

const ChangeProfilePic: React.FC<ChangeProfilePicProps> = ({
    savedImage
}) => {

    const [showDialog, setShowDialog] = useState<boolean>(false);

    const [currentImage, setCurrentImage] = useState(null);

    const { refetchUser } = useAuth();

    const onImageUpload = async (mode: string) => {
        try {
            let result: ImagePickerResult;

            if (mode === "gallery") {
                console.log("Requesting media library permissions...");
                await ImagePicker.requestMediaLibraryPermissionsAsync();

                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
                console.log("Gallery result received.");
            } else {
                console.log("Requesting camera permissions...");
                await ImagePicker.requestCameraPermissionsAsync();

                result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
                console.log("Camera result received.");
            }

            // Check if the result is not canceled and has a URI
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                console.log("Image URI: ", uri);

                saveImage(uri);
            } else {
                console.log("Image picking was canceled or no URI found.");
            }

        } catch (e: any) {
            console.log("Error during image upload:", e);
        }
    };

    const saveImage = async (persistedImage: string) => {
        try {
            setCurrentImage(persistedImage);
        } catch (e: any) {
            console.log(e)
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

                    console.log(image)
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

    const router = useRouter();

    const onChangeProfilePic = async (mode: string) => { 
        try {

            if (mode === "deleteExisting") {
                const newLink = null;
                
                const foundToken = await SecureStore.getItemAsync("authToken");
                
                const values = {
                    image: newLink
                }
                await changeUser(values, foundToken)
                .then(() => {
                    setShowDialog(false);
                    setCurrentImage(null);
                    refetchUser();
                })

            } else {
            
                const newLink = await uploadImage(currentImage)

                const foundToken = await SecureStore.getItemAsync("authToken");
                
                const values = {
                    image: newLink
                }
                await changeUser(values, foundToken)
                .then(() => {
                    setShowDialog(false);
                    setCurrentImage(null);
                    refetchUser();
                })
            }
        } catch (e: any) {
            console.log(e);
            return null;
        }
    }

    return (
        <View className="flex flex-col items-center">
            <TouchableOpacity onPress={() => {
                setShowDialog(true);


            }}>
                <Image
                    style={{ resizeMode: 'cover' }}
                    source={{ uri: savedImage }}
                    className="w-28 h-28 rounded-full"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setShowDialog(true);


            }}>
                <Text className="mt-4 text-gray-200/60 font-semibold text-sm">
                    Profilbild bearbeiten
                </Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showDialog}
                onRequestClose={() => {
                    setShowDialog(false);
                }}

            >
                <View className="flex-1 justify-center items-center bg-black/80">
                    <View className="bg-[#151821] w-full rounded-lg overflow-hidden pb-8">
                        <View className="flex flex-row items-center p-4">
                            <Text className="text-xl font-semibold text-gray-200">
                                Profilbild hochladen
                            </Text>
                            <TouchableOpacity className="ml-auto">
                                <FontAwesome name="close" size={24} color="white" onPress={() => { setShowDialog(false) }} />
                            </TouchableOpacity>
                        </View>
                        {currentImage ? (
                            <View>
                                <View>
                                    <Image
                                        source={{ uri: currentImage }}
                                        style={{ width: '100%', height: 300 }}
                                        resizeMode="contain"
                                        className="mt-4"
                                    />
                                </View>
                                <View className="flex flex-row items-center px-4 mt-4 space-x-4 justify-center w-full">
                                    <TouchableOpacity className=" p-2.5 rounded-md w-1/2"
                                        onPress={() => {
                                            setCurrentImage(null);
                                        }}
                                    >
                                        <Text className="text-center text-base text-gray-200 font-semibold">
                                            Bild entfernen
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="w-1/2 bg-indigo-800 p-2.5 rounded-md flex flex-row items-center space-x-4"
                                    onPress={() => {onChangeProfilePic("upload")}}
                                    >
                                        <FontAwesome name="save" size={20} color="white" />
                                        <Text className="text-center text-base text-gray-200 font-semibold">
                                            Bild speichern
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View className="flex flex-col items-center justify-center space-y-8">

                                <View className="px-12 w-full">
                                    <TouchableOpacity className="bg-[#262b3d] rounded-md w-full p-4 flex flex-row items-center space-x-4">
                                        <AntDesign name="close" size={20} color="red" />
                                        <Text className="text-gray-200 font-semibold text-base">
                                            Profilbild entfernen
                                        </Text>
                                    </TouchableOpacity>
                                </View>

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
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ChangeProfilePic;