import { inserat } from "@/db/schema";
import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Text, View, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback,
    Modal, Image,
    ScrollView
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { set } from "date-fns";

interface BasicDetails2Props {
    thisInserat: typeof inserat.$inferSelect;
}

const BasicDetails2: React.FC<BasicDetails2Props> = ({
    thisInserat,
}) => {
    const [currentTitle, setCurrentTitle] = useState(thisInserat.title);
    const [currentDescription, setCurrentDescription] = useState(thisInserat.description);
    const [currentCategory, setCurrentCategory] = useState<string>(thisInserat.category);
    const [showModal, setShowModal] = useState(false);

    type PictureObject = {
        url: string,
        position: number
    };

    

    const [currentPicture, setCurrentPicture] = useState<PictureObject[]>([]);

    useEffect(() => {
        console.log("Current Picture:", currentPicture);
    },[currentPicture])

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="h-full">
            <View className="h-full">
                <View className="flex flex-col items-center w-full">
                    
                    <View className="w-full">
                        <TouchableOpacity className="w-full bg-[#1a1e29] p-4 rounded-lg mt-4 
                    flex-row items-center justify-center space-x-4"
                            onPress={() => setShowModal(true)}
                        >
                            <View>
                                <FontAwesome name="plus" size={20} color="#fff" />
                            </View>
                            <Text className="text-gray-200/90 text-base font-semibold">
                                Bilder hinzufügen
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <GestureHandlerRootView className="w-full h-full mt-4 flex-col flex">
                        <DraggableFlatList
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
                    <View className="flex-1 justify-center items-center bg-black/80">
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
}

export default BasicDetails2;