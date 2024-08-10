import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";


interface ConversationFooterProps {
  conversationId : string;
}

const ConversationFooter : React.FC<ConversationFooterProps> = ({
  conversationId
}) => {

  const apiUrl = process.env.EXPO_PUBLIC_BASE_URL;

  const [isLoading, setIsLoading] = useState(false);

  const [currentText, setCurrentText] = useState("");
  const [currentImage, setCurrentImage] = useState(null);

  const onMessageSend = async () => {
    try {
      setIsLoading(true);
      const token = await SecureStore.getItemAsync("authToken");
      console.log("1")
      if(!token) {
        
        return null;
      }
      console.log("2")
      const values = {
        conversationId : conversationId,
        token : token,
        content : currentText,
      }

      const response = await axios.post(`http://192.168.178.45:8081/api/message`, values)

      
      
      console.log(response.data)

    } catch(e : any) {
      console.log(e.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <View className="flex flex-row items-center bg-[#1a1c27] w-full p-2 justify-between">
      <SafeAreaView className="flex flex-row items-center w-full">

        <View className="flex items-center justify-center w-1/12">
          <FontAwesome name="camera" size={20} color="white" />
        </View>

        <View className="flex-grow px-2">
          <TextInput
            className="w-full p-2.5 text-sm bg-[#202336] text-gray-200 font-semibold rounded-md"
            placeholder="Schreibe eine Nachricht.."
            placeholderTextColor="#888"
            onChangeText={(e) => setCurrentText(e)}
            value={currentText}
          />
        </View>

        <TouchableOpacity className={cn("flex items-center justify-center w-2/12 bg-indigo-800 p-2 rounded-full", !currentText && "opacity-60")}
        onPress={onMessageSend}
          disabled={!currentText || isLoading}
        >
          <FontAwesome name="paper-plane" size={20} color="white" />
        </TouchableOpacity>

      </SafeAreaView>
    </View>
  );
}

export default ConversationFooter;