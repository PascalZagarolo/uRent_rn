import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback,
    Modal,
    Image
} from "react-native";
import { ImagePickerResult } from "expo-image-picker";
import * as ImagePicker from 'expo-image-picker';
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";

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
    }

    const [currentPicture, setCurrentPicture] = useState<null | PictureObject[]>([]);

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

                const newImage = {
                    url: uri,
                    position: currentPicture ? currentPicture?.length + 1 : 1
                }
                console.log(newImage)
                setCurrentPicture([...currentPicture, newImage]);
                setShowModal(false);
            } else {
                console.log("Image picking was canceled or no URI found.");
            }
        } catch (e: any) {
            console.log("Error during image upload:", e);
        }
    };


    const renderItem = ({ item, drag, isActive }: { item: PictureObject, drag: () => void, isActive: boolean }) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}
                    style={[
                        {
                            backgroundColor: isActive ? "lightgrey" : "transparent",
                            marginVertical: 10,
                        }
                    ]}
                >
                    <Image
                        source={{ uri: item.url }}
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                </TouchableOpacity>
            </ScaleDecorator>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <View className="flex flex-col items-center w-full">
                    <View className="w-full mt-4">
                        <Text className="text-lg font-semibold text-gray-200">
                            Bilder hochladen
                        </Text>
                        <Text className="text-xs text-gray-200/60">
                            Lade Bilder von deinem Fahrzeug hoch, um es besser zu präsentieren.
                        </Text>
                    </View>
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
                    <View className="w-full mt-4">
                        <DraggableFlatList
                            data={currentPicture}
                            onDragEnd={({ data }) => setCurrentPicture(data)}
                            keyExtractor={(item) => item.url}
                            renderItem={renderItem}
                            horizontal={true} // If you want horizontal scrolling of images
                        />
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