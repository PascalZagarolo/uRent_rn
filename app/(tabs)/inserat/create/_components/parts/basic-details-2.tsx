import { inserat } from "@/db/schema";
import { Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
    Text, View, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback,
    Modal, Image,
    ScrollView
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { addImagesInserat } from "@/actions/inserat/images/add-images-inserat";
import * as SecureStorage from 'expo-secure-store';
import Toast from "react-native-toast-message";
import axios from "axios";
import { getAxiosRequest } from "@/actions/inserat/images/axios-request";
import mime from "mime";
import { BoxSelectIcon, XIcon } from "lucide-react-native";
import { cn } from "@/~/lib/utils";
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { onlyReorderImages } from "@/actions/inserat/images/only-reorder-images";



interface BasicDetails2Props {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat: () => void;
}

const BasicDetails2 = forwardRef(({ thisInserat, refetchInserat }: BasicDetails2Props, ref) => {

    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const [isDeleting, setIsDeleting] = useState(false);

    const hasChanged = (): { rearrangedImage: boolean, deletedImage: boolean; addedImage: boolean } => {


        let deletedImage = false; // Flag for deleted images
        let addedImage = false; // Flag for added images
        let rearrangedImage = false; // Flag for rearranged images

        // Check if any image is deleted or rearranged
        for (const pImage of currentPicture) {
            const matchingImage = thisInserat.images.find((image) => image.url === pImage.url);

            // If no matching image is found, it means the image was added
            if (!matchingImage) {
                addedImage = true;
                break;
            }

            // If positions are different, it means the image was rearranged
            if (matchingImage.position !== pImage.position) {
                rearrangedImage = true;
                break;
            }
        }

        // Check if any image is missing in currentPicture (deleted)
        for (const image of thisInserat.images) {
            const matchingImage = currentPicture.find((pImage) => pImage.url === image.url);

            // If no matching image is found, it means the image was deleted
            if (!matchingImage) {
                deletedImage = true;
                break;
            }
        }

        // Return true if any of the changes are detected
        return { rearrangedImage, deletedImage, addedImage }
    };

    useEffect(() => {
        if(!isDeleting) {
            setSelectedImages([]);
        }
    },[isDeleting])

    const onDelete = () => {
        const filteredPictures = currentPicture.filter(
            (image) => !selectedImages.includes(image.url)
        );
        setCurrentPicture(filteredPictures);
        setIsDeleting(false);
    };
    

    useImperativeHandle(ref, () => ({
        onSave: () => {
            const uploadOnChange = async () => {
                try {
                    if (isLoading) return;
                    setIsLoading(true);

                    const { rearrangedImage, deletedImage, addedImage } = hasChanged();

                    if (!rearrangedImage && !deletedImage && !addedImage) {
                        console.log("nothing change..!")
                        return;
                    } else {
                        

                        if(rearrangedImage && !deletedImage && !addedImage) {
                            try {
                                console.log("only reordered...");
                                const values = {
                                    inseratId : thisInserat.id,
                                    reorderedImages : currentPicture,
                                    token : await SecureStorage.getItemAsync("authToken")
                                }
                                const res = await onlyReorderImages(values);
                                setCurrentPicture(res as any);
                                refetchInserat();
                            } catch(e : any) {
                                console.log(e)
                            }
                        } else {
                            let uploadData: { url: string, position: number }[] = [];
                        console.log("uploadOnChange!!")
                        const oldData = [...currentPicture];

                        for await (const pImage of currentPicture) {
                            let returnedUrl = "";
                            returnedUrl = await uploadImage(pImage.url);
                            uploadData.push({ url: returnedUrl, position: pImage.position });

                        }

                        const authToken = await SecureStorage.getItemAsync("authToken");

                        const res = await addImagesInserat(uploadData, thisInserat.id, authToken);
                        console.log(res)
                        setCurrentPicture(res as any);
                        refetchInserat();
                        }


                    }


                } catch (e: any) {
                    console.log(e);
                    Toast.show({
                        type: 'error',
                        text1: 'Fehler',
                        text2: 'Fehler beim Speichern der Bilder'
                    })
                } finally {
                    setIsLoading(false);
                }
            }

            uploadOnChange();
        }
    }));

    

    const MAX_RETRIES = 3;

    const isValidUrl = (url: string): boolean => {
        try {
            // Try creating a new URL to ensure it's a valid URL
            new URL(url);
            // Return false if the URL contains "blob:"
            return !url.includes("file:");
        } catch (_) {
            // If new URL() fails, it’s an invalid URL
            return false;
        }
    };

    type PictureObject = {
        url: string,
        position: number
    };



    const [currentPicture, setCurrentPicture] = useState<PictureObject[]>(
        thisInserat?.images?.map((image) => ({
            url: image?.url,
            position: image?.position
        })) || []
    );




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
                    position: currentPicture.length
                };

                setCurrentPicture([...currentPicture, newImage]);
                setShowModal(false);
            }
        } catch (e: any) {
            console.log("Error during image upload:", e);
        }
    };

    const renderItem = ({ item, drag, isActive }: { item: PictureObject, drag: () => void, isActive: boolean }) => {
        return (
            <ScaleDecorator

            >
               <View className="flex flex-row items-center">
               <View className={cn("flex flex-row h-40 items-center mb-4 ", isDeleting && "w-[80%]")}>
                    <TouchableOpacity
                        onLongPress={drag}
                        disabled={isActive}
                        className=" w-1/4 shadow-lg "  // Add margin-bottom to space out items
                    >
                        <View className="bg-[#232636] h-full flex items-center justify-center rounded-l-lg">
                            <MaterialCommunityIcons
                                name="drag"
                                size={64}
                                color="gray" />
                        </View>
                    </TouchableOpacity>
                    <Image
                        source={{ uri: item.url }}


                        className="w-3/4 rounded-r-md h-full object-cover"
                    />
                </View>
                {isDeleting && (
                    <BouncyCheckbox 
                    isChecked={selectedImages.includes(item.url)}
                    className="ml-8"
                    fillColor="#fff"
                    
                    onPress={(isChecked) => {
                        if (isChecked) {
                            setSelectedImages([...selectedImages, item.url]);
                        } else {
                            setSelectedImages(selectedImages.filter((url) => url !== item.url));
                        }
                    }}
                />
                )}
               </View>
            </ScaleDecorator>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="h-full">
            <View className="h-full">
                <View className="flex flex-col items-center w-full">

                    <View className="w-full">
                        <TouchableOpacity className="w-full bg-[#232636] shadow-lg p-4 rounded-lg mt-4 
                    flex-row items-center justify-center space-x-4 border "
                            onPress={() => setShowModal(true)}
                        >
                            <View>
                                <FontAwesome name="plus" size={20} color="#fff" />
                            </View>
                            <Text className="text-gray-200/90 text-base font-semibold">
                                Bilder hinzufügen ({currentPicture.length} / 20)
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {currentPicture.length > 0 && (
                        <View className="flex justify-end w-full">
                            {isDeleting ? (
                                <View className="flex flex-row items-center">
                                    <TouchableOpacity
                                        className=" bg-rose-600  p-2.5 w-8/12 rounded-lg mt-4  flex-row items-center"
                                        onPress={() => {
                                            onDelete()
                                        }}
                                    >
                                        <XIcon size={24} color="white" className="mr-4" />
                                        <Text className="text-sm text-center text-gray-200 font-semibold">
                                            ({selectedImages?.length}) Elemente löschen
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="ml-auto flex justify-end  p-4 rounded-lg mt-4 w-4/12  flex-row items-center"
                                        onPress={() => {

                                            console.log("press")
                                            setIsDeleting(false);
                                        }}
                                    >
                                        
                                        <Text className="text-sm text-gray-200">
                                            Abbrechen
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    className="ml-auto flex justify-end  p-4 rounded-lg mt-4  flex-row items-center"
                                    onPress={() => {
                                        setIsDeleting(true);
                                    }}
                                >
                                    <BoxSelectIcon size={24} color="white" className="mr-4" />
                                    <Text className="text-sm text-gray-200">
                                        Bilder auswählen
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                    <GestureHandlerRootView className="w-full h-2/3 mt-4 flex-col flex ">
                    <View className="flex-1 pb-26">
                    <DraggableFlatList
                    className="h-full "
                            data={currentPicture}

                            
                            onDragEnd={({ data, from, to }) => {
                                // Log the starting index and the final index
                                console.log("Dragged item from index:", from, "to index:", to);

                                // Update the positions in the new array
                                const updatedData = data.map((item, index) => ({
                                    ...item,
                                    position: index,  // Update the position based on the new index
                                }));

                                // Update the state with the new data
                                setCurrentPicture(updatedData);

                            }}

                            keyExtractor={(item) => item.url}
                            renderItem={renderItem}


                        />
                        </View>
                    </GestureHandlerRootView>
                    
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
        </TouchableWithoutFeedback>
    );
});

export default BasicDetails2;