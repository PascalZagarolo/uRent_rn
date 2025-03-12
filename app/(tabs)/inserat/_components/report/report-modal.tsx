import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";
import { TextInput } from "react-native";
import LetterRestriction from "@/components/LetterRestriction";

interface ReportModalInseratProps {
    onClose: () => void;
}

const REPORT_REASONS = [
    "Beleidigung",
    "Betrug",
    "Diskriminierung",
    "Spam",
    "Verletzen der eigenen Rechte",
    "Sonstiges"
];

const ReportModalInserat = ({ onClose }: ReportModalInseratProps) => {
    const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

    const toggleReason = (reason: string) => {
        setSelectedReasons(prev =>
            prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason]
        );
    };

    const [information, setInformation] = useState("")

    return (
        <View className="flex-1 bg-black/80 justify-center items-center p-2">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="w-full">
                <View className="p-4 border dark:border-none w-full bg-[#151821] rounded-lg">
                    {/* Header */}
                    <View className="flex flex-row justify-between items-center w-full">
                        <View className="flex flex-row items-center space-x-3">
                            <MaterialCommunityIcons name="alert" color="white" size={24} />
                            <Text className="text-lg text-gray-200 font-semibold">Inserat melden</Text>
                        </View>
                        <TouchableOpacity onPress={onClose}>
                            <MaterialCommunityIcons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Info Text */}
                    <Text className="text-gray-400 text-sm mt-2">
                        Melde Inserate, die gegen europäisches Recht oder gegen die uRent AGBs verstoßen.
                    </Text>

                    {/* Auswahlgründe */}
                    <View className="mt-4 space-y-2">
                        {REPORT_REASONS.map(reason => (
                            <TouchableOpacity className="flex flex-row items-center "
                            onPress={() => toggleReason(reason)}
                            >
                                <View>
                                    <BouncyCheckbox
                                        key={reason}
                                        size={16}
                                        fillColor="#2563EB"



                                        isChecked={selectedReasons.includes(reason)}
                                        onPress={() => toggleReason(reason)}
                                    />
                                </View>
                                <Text className="text-gray-200 font-semibold text-base">
                                    {reason}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Weitere Informationen */}
                    <View className="mt-8">
                        <Text className="text-gray-200 text-base font-semibold">Weitere Informationen (optional)</Text>
                        <TextInput className=" bg-[#1e222e] p-2.5 rounded-md mt-1 h-24" placeholder="Beschreibe das Problem genauer.." multiline
                        placeholderTextColor={"gray"}
                        maxLength={4000}
                        textAlignVertical="top"
                        />
                        <LetterRestriction 
                        limit={4000}
                        inputLength={information?.length ?? 0}
                        />
                        
                    </View>

                    {/* Absenden Button */}
                    <TouchableOpacity className="mt-6 bg-indigo-800 py-2 rounded-lg items-center">
                        <Text className="text-white font-semibold">Meldung senden</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ReportModalInserat;
