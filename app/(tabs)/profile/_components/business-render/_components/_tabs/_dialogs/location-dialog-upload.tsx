import { useImperativeHandle, useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";


interface LocationDialogUploadProps {
    setImageUrl : (url : string) => void;
    imageUrl? : string;
}

const LocationDialogUpload = ({ setImageUrl, imageUrl } : LocationDialogUploadProps) => {
    
    

    type PictureObject = {
        url: string,
    };
 
    const [currentPicture, setCurrentPicture] = useState<PictureObject>({ url: imageUrl ? imageUrl : "" });
    const [showModal, setShowModal] = useState(false);


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

                setCurrentPicture(newImage);
                setImageUrl(uri);
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
                <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}
                    className="w-full h-30 mb-4"  // Add margin-bottom to space out items
                >
                    <Image
                        source={{ uri: item.url }}
                        style={{ width: '100%', height: 100 }}
                        resizeMode="cover" 
                        className="w-full rounded-md"
                    />
                </TouchableOpacity>
            </ScaleDecorator>
        );
    };

    return (
      
        <View className="w-full">
        {currentPicture ? (
            <View>
                <Image
                    source={{ uri: currentPicture.url }}
                    
                    resizeMode="cover"
                    className="w-full rounded-md object-cover h-40" />
                    <View className="w-full flex flex-row items-center space-x-4">
                        <TouchableOpacity className="w-[48%] p-2.5 flex flex-row items-center" onPress={() => setShowModal(true)}>
                            <MaterialCommunityIcons name="file-replace" className="w-4 h-4 mr-2 text-gray-200" />
                            <Text className="text-gray-200">
                                Bild ändern
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="w-[48%] rounded-b-md p-2.5 flex flex-row items-center bg-rose-600" onPress={() => setCurrentPicture(null)}>
                            <MaterialCommunityIcons name="close" className="w-4 h-4 mr-2 text-gray-200" />
                            <Text className="text-gray-200">
                                Bild entfernen
                            </Text>
                        </TouchableOpacity>
                    </View>
            </View>
        ) : (
            <TouchableOpacity className="w-full bg-indigo-800 p-4 rounded-lg  
    flex-row items-center justify-center space-x-4 border "
            onPress={() => setShowModal(true)}
        >
            <View>
                <FontAwesome name="plus" size={20} color="#fff" />
            </View>
            <Text className="text-gray-200/90 text-base font-semibold">
                Bilder hinzufügen 
            </Text>
        </TouchableOpacity>
        )}
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
       
    );
}

export default LocationDialogUpload;