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
                    <View className="bg-[#151821] rounded-lg overflow-hidden  p-2.5 w-full">
                        <View className="flex items-center flex-row space-x-4 p-2">
                        <MaterialCommunityIcons
                                size={20}
                                color={"white"}
                                name="calendar"
                            />
                            <Text className="text-xl font-semibold text-gray-200">
                                Verfügbarkeit prüfen
                            </Text>
                        </View>
                        <View className="mt-4">
                            <BookingCalendarMonth />
                        </View>

                        <View className="px-2">
                            <View>
                                <Text className="text-sm text-gray-200/60 ">
                                    *Klicke auf Tage um ihre vollständige Verfügbarkeit zu sehen.
                                </Text>
                            </View>
                            <View className="flex flex-row items-center space-x-2 mt-4">
                                <View
                                    className="bg-indigo-800 w-4 h-4 rounded-md"
                                />
                                <Text className="text-gray-200 font-semibold">
                                    Teilweise belegte Tage
                                </Text>
                            </View>
                            <View className="flex flex-row items-center space-x-2 mt-2">
                                <View
                                    className="bg-rose-800 w-4 h-4 rounded-md"
                                />
                                <Text className="text-gray-200 font-semibold">
                                    Vollständig belegte Tage
                                </Text>
                            </View>
                        </View>

                    </View>

                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default BookingDialog;