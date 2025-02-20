import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Text, Platform } from "react-native";
import BookingCalendarMonth from "./components/booking-calendar-month";

const BookingDialog = () => {
    return ( 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-black/80 justify-center items-center p-2">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="w-full"
            >
                 <View className="bg-[#151821] rounded-lg overflow-hidden p-2.5 w-full">
                    <View className="flex items-center flex-row space-x-4">
                        <MaterialCommunityIcons 
                        size={20}
                        color={"white"}
                        name="calendar"
                        />
                    <Text className="text-xl font-semibold text-gray-200">
                        Fahrzeugverfügbarkeit prüfen
                    </Text>
                    </View>
                    <View className="mt-4">
                        <BookingCalendarMonth />
                    </View>
                </View>
                
            </KeyboardAvoidingView>
        </View>
    </TouchableWithoutFeedback>
     );
}
 
export default BookingDialog;