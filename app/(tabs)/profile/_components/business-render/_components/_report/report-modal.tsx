import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";
import { TextInput } from "react-native";
import LetterRestriction from "@/components/LetterRestriction";
import Toast from "react-native-toast-message";
import { createReport } from "@/actions/report/create-report";
import { cn } from "@/~/lib/utils";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

interface ReportModalProfileProps {
    reportedUserId: string;
    currentUserId: string;
    onClose: () => void;
}

const REPORT_REASONS = [
    { key: "BELEIDIGUNG", label: "Beleidigendes oder \nDiskriminierendes Verhalten" },
    { key: "STALKING", label: "Belästigung oder Stalking" },
    { key: "FAKE", label: "Fake-Profile" },
    { key: "FALSCH", label: "Falschangaben oder \nBetrug" },
    { key: "DANGEROUS", label: "Gefährliche oder \nirreführende Inhalte" },
    { key: "PRIVACY", label: "Privatsphären-Verletzung" },
    { key: "SPAM", label: "Spam" },
    { key: "CONTENT_WARNING", label: "Unangebrachte Inhalte" },
    { key: "AD", label: "Unangemessene Werbung" },
    { key: "RECHT", label: "Verstößt gegen deutsches Recht" },
    { key: "SONSTIGES", label: "Sonstiges" }
];

function getKeyByLabel(label) {
    const reason = REPORT_REASONS.find(item => item.label === label);
    return reason ? reason.key : null; // Return null if not found
}

const ReportModalProfile = ({ onClose, currentUserId, reportedUserId }: ReportModalProfileProps) => {


    const router = useRouter()

    const [content, setContent] = useState("");
    const [reportType, setReportType] = useState("");
    const [switchedSuccess, setSwitchedSuccess] = useState<{ isOpen: boolean, content: string }>({ isOpen: false, content: "" });
    const [isLoading, setIsLoading] = useState(false);

    const onReport = async () => {
        try {
            if (!reportType || isLoading) return;
            setIsLoading(true);
            const values = {
                userId: currentUserId,
                reportedUserId,
                reportType: getKeyByLabel(reportType),
                reportedAsset: "INSERAT",
                content : content,
            }
            const res = await createReport(values);
            if (res.success) {
                setSwitchedSuccess({ isOpen: true, content: res?.success ?? "" });
            }
        } catch (e: any) {
            Toast.show({
                type: "error",
                text1: "Ein Fehler ist aufgetreten",
                text2: "Bitte versuche es später nochmal."
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View className="flex-1 bg-black/80 justify-center items-center p-2">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="w-full">
                <View className="p-4 border dark:border-none w-full bg-[#151821] rounded-lg">
                    {/* Header */}
                    <View className="flex flex-row justify-between items-center w-full">
                        <View className="flex flex-row items-center space-x-3">
                            <MaterialCommunityIcons name="alert" color="white" size={24} />
                            <Text className="text-lg text-gray-200 font-semibold">Nutzer melden</Text>
                        </View>
                        <TouchableOpacity onPress={onClose}>
                            <MaterialCommunityIcons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>


                    {/* Info Text */}
                    <Text className="text-gray-400 text-sm mt-2">
                        Melde Nutzer wenn du denkst, dass sie gegen unsere Richtlinien verstoßen
                    </Text>
                    {!switchedSuccess.isOpen ? (
                        <View>
                            {/* Auswahlgründe */}
                            <ScrollView className="mt-4 space-y-4 h-60">
                                {REPORT_REASONS.map(reason => (
                                    <TouchableOpacity className="flex flex-row items-center "
                                        onPress={() => setReportType(reason.label)}
                                    >
                                        <View>
                                            <BouncyCheckbox
                                                key={reason.key}
                                                size={16}
                                                fillColor="#2563EB"
                                                isChecked={reportType.includes(reason.label)}
                                                onPress={() => setReportType(reason.label)}
                                            />
                                        </View>
                                        <Text className="text-gray-200 font-semibold text-base">
                                            {reason.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {/* Weitere Informationen */}
                            <View className="mt-8">
                                <Text className="text-gray-200 text-base font-semibold">Weitere Informationen (optional)</Text>
                                <TextInput className=" bg-[#1e222e] p-2.5 rounded-md mt-1 h-24 text-gray-200" placeholder="Beschreibe das Problem genauer.." multiline
                                    placeholderTextColor={"gray"}
                                    onChangeText={setContent}
                                    maxLength={4000}
                                    textAlignVertical="top"
                                />
                                <LetterRestriction
                                    limit={4000}
                                    inputLength={content?.length ?? 0}
                                />

                            </View>
                            <View>
                            <Text className="text-xs text-gray-200/60">
                            * Deine Daten werden vertraulich behandelt und niemals an Dritte weitergegeben.
uRent wird deine Meldung so schnell wie möglich prüfen und adäquate Maßnahmen ergreifen
                            </Text>
                            </View>
                            {/* Absenden Button */}
                            <TouchableOpacity className={cn("mt-6 bg-indigo-800 py-2 rounded-lg items-center", !reportType && "bg-indigo-600/30")}
                                disabled={!reportType}
                                onPress={onReport}
                            >
                                <Text className={cn("text-gray-200 font-semibold",
                                    !reportType && "text-gray-200/40"
                                )}>Meldung senden</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="mt-4 w-full flex flex-coll items-center">
                            <View className="flex flex-row items-center">
                                <MaterialCommunityIcons name="check-circle"
                                    className="" size={44} color={"green"}
                                />
                            </View>
                            <Text className="text-gray-200 text-base font-semibold">
                                {switchedSuccess?.content}
                            </Text>
                            <View className="mb-4">
                                <Text className="text-gray-200/60 text-center font-semibold px-2">
                                    uRent wird sich so schnell wie möglich um dein Anliegen kümmern.
                                </Text>
                                <Text className=" text-gray-200/60 mt-8">
                                    Für weitere Informationen kannst du jederzeit den Support unter support@urent-rental.de erreichen.
                                </Text>
                            </View>
                            <View className="w-full px-4 ">
                                <TouchableOpacity className="bg-indigo-800 space-x-2 w-full p-2.5 rounded-md flex flex-row justify-center items-center shadow-lg"
                                onPress={() => {router.push("/")}}
                                >
                                    <MaterialCommunityIcons name="arrow-left"
                                        size={16}
                                        color={"white"}
                                    />
                                    <Text className="text-gray-200 font-semibold">
                                        Zurück zur Startseite
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ReportModalProfile;
