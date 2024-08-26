import { userTable } from "@/db/schema";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Switch } from "react-native";
import { Text, View } from "react-native";

interface ViewsAndNotificationsProps {
    currentUser: typeof userTable.$inferSelect;
}

const ViewsAndNotifications: React.FC<ViewsAndNotificationsProps> = ({
    currentUser
}) => {

    const [enabledGeneral, setEnabledGeneral] = useState(false);

    return (
        <View>
            <View className="flex flex-row items-center gap-x-4">
                <Ionicons name="notifications" size={24} color="white" />
                <Text className="text-lg font-semibold text-gray-200">
                    Benachrichtungen
                </Text>
            </View>
            <View className="flex flex-col mt-8 space-y-4">
                <View className="flex flex-row items-center">
                    <View className="w-1/4">
                        <Switch />
                    </View>
                    <View className="w-3/4">
                        <Text className="text-base font-semibold text-gray-200">
                            Push-Benachrichtigungen
                        </Text>
                        <Text className="text-gray-200/60 text-sm">
                            Du erhältst Benachrichtigungen über
                            neue Nachrichten,
                            Buchungsanfragen und mehr.
                            Falls aktiviert, kannst du deine Präferenzen genauer bestimmen.
                        </Text>
                    </View>
                </View>

                <View className="flex flex-row items-center">
                    <View className="w-1/4">
                        <Switch />
                    </View>
                    <View className="w-3/4">
                        <Text className="text-base font-semibold text-gray-200">
                            Konversationen
                        </Text>
                        <Text className="text-gray-200/60 text-sm">
                            Du erhältst Benachrichtigungen über neue Konversationen.
                            und Nachrichten.
                        </Text>
                    </View>
                </View>

                <View className="flex flex-row items-center">
                    <View className="w-1/4">
                        <Switch />
                    </View>
                    <View className="w-3/4">
                        <Text className="text-base font-semibold text-gray-200">
                        Buchungsanfragen
                        </Text>
                        <Text className="text-gray-200/60 text-sm">
                        Du erhältst Benachrichtigungen über neue Buchungsanfragen.
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ViewsAndNotifications;