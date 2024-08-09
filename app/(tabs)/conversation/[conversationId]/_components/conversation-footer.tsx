import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";

const ConversationFooter = () => {
    
    const [currentText, setCurrentText] = useState("");

    return ( 
        <View className="flex flex-row items-center bg-[#1a1c27] w-full p-2 justify-between">
  <SafeAreaView className="flex flex-row items-center w-full">
    
    <View className="flex items-center justify-center w-1/12">
      <FontAwesome name="camera" size={20} color="white" />
    </View>
    
    <View className="flex-grow px-2">
      <TextInput 
        className="w-full p-2.5 text-sm bg-[#202336] text-gray-200 font-semibold rounded-md"
        placeholder="Type a message..."
        placeholderTextColor="#888" 
      />
    </View>
    
    <TouchableOpacity className={cn("flex items-center justify-center w-2/12 bg-indigo-800 p-2 rounded-full", !currentText && "opacity-60")}
    disabled={!currentText}
    >
      <FontAwesome name="paper-plane" size={20} color="white" />
    </TouchableOpacity>
  
  </SafeAreaView>
</View>
     );
}
 
export default ConversationFooter;