import { cn } from "@/~/lib/utils";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, View, Modal, Image, TouchableWithoutFeedback } from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { router } from "expo-router";
import { writeMessage } from "@/actions/messages/write-message";
import { socket } from "@/lib/utils/socketService";
import RBSheet from "react-native-raw-bottom-sheet";

import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from "expo-image-picker";

interface ConversationFooterProps {
  conversationId: string;
}

const ConversationFooter: React.FC<ConversationFooterProps> = ({
  conversationId
}) => {

  const apiUrl = process.env.EXPO_PUBLIC_BASE_URL;

  const [isLoading, setIsLoading] = useState(false);

  const [currentText, setCurrentText] = useState("");
  const [currentImage, setCurrentImage] = useState(null);

  const [isImageDialogVisible, setImageDialogVisible] = useState(false);

  const refRBSheet = useRef([]);

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
        refRBSheet.current[1].close();
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
      setImageDialogVisible(true);
    } catch (e: any) {
      console.log(e)
    }
  }

  const onMessageSend = async () => {
    try {

      setIsLoading(true);
      const token = await SecureStore.getItemAsync("authToken");
      console.log("1")
      if (!token) {

        return null;
      }
      console.log("2")
      const values = {
        conversationId: conversationId,
        token: token,
        content: currentText,
      }

      const response = await writeMessage(values)
        .then((res) => {
          console.log(res);
          setCurrentText("");
          Keyboard.dismiss();
        })

    } catch (e: any) {
      console.log(e.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <View className="flex flex-row items-center bg-[#1a1c27] w-full p-2 justify-between">
      <SafeAreaView className="flex flex-row items-center w-full">
        <TouchableOpacity
          className="flex items-center justify-center w-2/12"
          onPress={() => refRBSheet.current[1].open()}
        >
          <FontAwesome name="plus" size={20} color="white" />
        </TouchableOpacity>
        <View className="flex-grow px-2">
          <TextInput
            className="w-full p-2.5 text-sm bg-[#202336] text-gray-200 font-semibold rounded-md"
            placeholder="Schreibe eine Nachricht.."
            placeholderTextColor="#888"
            onChangeText={(e) => setCurrentText(e)}
            value={currentText}
          />
        </View>
        <TouchableOpacity
          className={cn(
            "flex items-center justify-center w-2/12 bg-indigo-800 py-2 px-2 rounded-full",
            !currentText && "opacity-60"
          )}
          onPress={() => {}}
          disabled={!currentText || isLoading}
        >
          <FontAwesome name="paper-plane" size={20} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
  
      
      <Modal
        animationType="slide"
        
        visible={isImageDialogVisible}
        
      >
        <View className="flex-1 justify-center items-center bg-black/80">
          <View className="bg-[#1F2332] w-full rounded-lg overflow-hidden">
            <Image
              source={{ uri: currentImage }}
              style={{ width: '100%', height: 300 }}
              resizeMode="contain"
            />
            <View className="flex-row justify-between p-4">
              <TouchableOpacity
                className="flex-1 items-center py-2"
                onPress={() => setImageDialogVisible(false)}
              >
                <Text className="text-white text-lg">Abbrechen</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 items-center py-2 bg-blue-600 rounded-lg"
                onPress={() => {}}
              >
                <Text className="text-white text-lg">Senden</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  
      <RBSheet
        ref={(ref) => (refRBSheet.current[1] = ref)}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            backgroundColor: "#1F2332",
            borderTopColor: "#2D3748",
            borderTopWidth: 2,
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <View className="flex-1 flex">
          <View className="p-4">
            <Text className="text-lg font-semibold text-gray-200">
              Fotos & Anhänge senden
            </Text>
          </View>
          <View className="flex flex-row justify-center items-center px-4 w-full space-x-4 mt-8">
            <TouchableOpacity
              className="w-1/3 flex-col justify-center items-center bg-[#262b3d] p-4 rounded-full"
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
              className="w-1/3 flex-col justify-center items-center bg-[#262b3d] p-4 rounded-full"
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
      </RBSheet>
    </View>
  );
  
}

export default ConversationFooter;