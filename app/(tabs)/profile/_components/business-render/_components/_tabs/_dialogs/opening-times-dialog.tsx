import { XIcon } from "lucide-react-native";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";


interface OpeningTimesRenderProps {
    onClose: () => void;
}

const OpeningTimesDialog = ({ onClose } : OpeningTimesRenderProps) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="h-full w-full justify-center items-center bg-black/80 p-4"

            >

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

                >
                    <View className="bg-[#151821] w-full rounded-lg">
                        <View className="flex flex-row items-center p-4 w-full">
                            <Text className="text-lg font-semibold text-gray-200">
                                Öffnungszeiten bearbeiten
                            </Text>
                            <TouchableOpacity className="ml-auto" onPress={onClose}>
                                <XIcon />
                            </TouchableOpacity>
                        </View>
                        <View className="px-4">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200/80">
                                    Montag
                                </Text>
                                <View className="mt-2 flex flex-row items-center justify-between">
                                    <View className="w-1/3">

                                    </View>
                                    <View >
                                        <Text className="text-gray-200 text-base font-semibold">
                                            -
                                        </Text>
                                    </View>
                                    <View className="w-1/3">

                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default OpeningTimesDialog;