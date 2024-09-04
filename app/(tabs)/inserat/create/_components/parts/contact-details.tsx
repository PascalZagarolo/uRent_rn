import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, 
    Keyboard, TouchableWithoutFeedback } from "react-native";



interface ContactDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
   
}

const ContactDetails = forwardRef(({ thisInserat }: ContactDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
            console.log("Saving:");
        }
    }));

    const [currentAddress, setCurrentAddress] = useState(thisInserat.title);
    const [currentEmail, setCurrentEmail] = useState(thisInserat.description);
    const [currentPhone, setCurrentPhone] = useState(thisInserat.description);
   

    

    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">
                <View className="w-full">
                    <Text className="text-lg font-semibold text-gray-200">
                        Addresses
                    </Text>
                    <TextInput
                        placeholder="Standort des Fahrzeuges..."
                        value={currentAddress}
                        onChangeText={(text) => setCurrentAddress(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg" />

                </View>

                <View className="w-full mt-8 h-full">
                    <Text className="text-lg font-semibold text-gray-200">
                    Email-Addresse
                    </Text>
                    <KeyboardAvoidingView className="">
                    <TextInput
                        placeholder="Deine Email-Addresse.."
                        value={currentEmail}
                        onChangeText={(text) => setCurrentEmail(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg"
                        
                    />
                    </KeyboardAvoidingView>

                </View>

                <View className="w-full mt-8 h-full">
                    <Text className="text-lg font-semibold text-gray-200">
                    Telefonnummer
                    </Text>
                    <KeyboardAvoidingView className="">
                    <TextInput
                        placeholder="Deine Telefonnummer.."
                        value={currentPhone}
                        onChangeText={(text) => setCurrentPhone(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg"
                        
                    />
                    </KeyboardAvoidingView>

                </View>
               
                
            </View>
        </TouchableWithoutFeedback>
    );
});

export default ContactDetails;