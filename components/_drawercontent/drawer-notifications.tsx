import { notification } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import { format, isThisMonth, isThisWeek, isToday } from "date-fns";

import { useMemo, useState } from "react";
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity } from "react-native"



interface DrawerNotificationsProps {
    foundNotifications: typeof notification.$inferSelect[];
    toggleDrawerNotifications: () => void;
}

const DrawerNotifications: React.FC<DrawerNotificationsProps> = ({
    foundNotifications,
    toggleDrawerNotifications
}) => {

    const filterBubble = (title: string, value: string) => {
        return (
            <TouchableOpacity className={cn("rounded-full bg-[#191c28] p-2",
                currentFilter === value && "border-2 border-blue-800")}
                onPress={() => setCurrentFilter(value)}
            >
                <Text className={cn("text-sm text-gray-200/60 font-semibold",
                    currentFilter === value && "text-gray-200"
                )}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }

    const [currentFilter, setCurrentFilter] = useState("A");
    const [renderedNotifications, setRenderedNotifications] = useState<any[]>(
        foundNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    );

    const usedFilter = [
        {
            key: "Alle",
            value: "A"
        },
        {
            key: "Nachrichten",
            value: "C"
        },
        {
            key: "Anfragen",
            value: "R"
        },
        {
            key: "Buchungen",
            value: "B"
        },
        {
            key : "uRent - News",
            value : "N"
        }
    ]

    const returnedNotificationRender = (thisNotification: typeof notification.$inferSelect) => {
        return (
            <View className="px-4">
                <View className="flex flex-row">
                    <View className="w-2/12">
                        {returnImage(thisNotification.notificationType)}
                    </View>
                    <View className="flex flex-col w-10/12">
                        <View>
                            {returnTitle(thisNotification.content, thisNotification.notificationType)}
                        </View>
                        <View className="mt-2 w-full">
                            {returnContent(thisNotification.notificationType, thisNotification.content)}
                        </View>
                    </View>
                </View>
                <View className="ml-auto">
                    <Text className="text-xs text-gray-200/60 ">
                        {format(new Date(thisNotification.createdAt), "dd.MM.yyyy")}
                    </Text>
                </View>
            </View>
        )
    }

    const returnImage = (type: string) => {

        const returnImage = () => {
            switch (type) {
                case "SUBSCRIPTION_REDEEMED":
                    return (
                        <Ionicons name="gift" size={24} color="white" />
                    )
                case "MESSAGE":
                    return (
                        <Entypo name="message" size={24} color="white" />
                    )
                case "BOOKING":
                    return (
                        <Feather name="bookmark" size={24} color="white" />
                    )
                default:
                    ""
            }
        }

        return (
            <View>
                {returnImage()}
            </View>
        )
    }

    const returnTitle = (title: string, type: string) => {
        const formatTitle = () => {
            switch (type) {
                case "SUBSCRIPTION_REDEEMED":
                    return "Abonnement eingelöst!";

                default:
                    return title;
            }
        }

        return (
            <Text className="text-gray-200 font-semibold">
                {formatTitle()}
            </Text>
        )
    }

    useMemo(() => {
        if (currentFilter === "A") {
            setRenderedNotifications(foundNotifications);
        } else if (currentFilter === "C") {
            setRenderedNotifications(foundNotifications.filter((item) => item.notificationType === "MESSAGE"));
        }
    }, [currentFilter])

    const returnContent = (type: string, title: string) => {
        const formatContent = () => {
            switch (type) {
                case "Booking":
                    return "Du wurdest zu einer Buchung hinzugefügt"
                case "MESSAGE":
                    return "Hat dir eine Nachricht gesendet"
                case "SUBSCRIPTION_REDEEMED":
                    return title;
                default:
                    ""
            }
        }

        return (
            <Text className="text-gray-200">
                {formatContent()}
            </Text>
        )
    }

    const categorizeNotifications = () => {
        const today: any[] = [];
        const lastWeek: any[] = [];
        const lastMonth: any[] = [];
        const older: any[] = [];

        renderedNotifications.forEach(notification => {
            const createdAt = new Date(notification.createdAt);

            if (isToday(createdAt)) {
                today.push(notification);
            } else if (isThisWeek(createdAt, { weekStartsOn: 1 })) {
                lastWeek.push(notification);
            } else if (isThisMonth(createdAt)) {
                lastMonth.push(notification);
            } else {
                older.push(notification);
            }
        });

        return { today, lastWeek, lastMonth, older };
    }

    const renderDateSeparation = (label: string) => (
        <View className="px-4 py-2 bg-gray-800 mb-4 mt-2">
            <Text className="text-sm text-gray-400 font-semibold">
                {label}
            </Text>
        </View>
    );

    const renderSection = (notifications: any[], label: string) => {
        if (notifications.length === 0) return null;

        return (
            <>
                {renderDateSeparation(label)}
                {notifications.map((notification, _index) => (
                    <View key={_index} className="px-4">
                        {returnedNotificationRender(notification)}
                    </View>
                ))}
            </>
        );
    }


    const { today, lastWeek, lastMonth, older } = categorizeNotifications();

    return (
        <View className="bg-[#1F2332] h-full">
            <SafeAreaView>
                <ScrollView className="bg-[#1F2332] border-gray-600">
                    <View className="flex-1 flex ">
                        <View className="p-4 flex flex-row items-center space-x-4">
                            <TouchableOpacity onPress={toggleDrawerNotifications}>
                                <Ionicons name="arrow-back" size={24} color="white" />
                            </TouchableOpacity>
                            <Text className="text-xl font-semibold text-gray-200">
                                Benachrichtigungen
                            </Text>
                        </View>
                        <ScrollView horizontal={true} contentContainerStyle={{ paddingHorizontal: 4 }}>
                            <View className="flex flex-row items-center space-x-2 p-4">
                                {usedFilter.map((item) => filterBubble(item.key, item.value))}
                            </View>
                        </ScrollView>
                        <View className="mt-4 flex flex-col space-y-4 ">
                            {renderSection(today, "Heute")}
                            {renderSection(lastWeek, "Letzte Woche")}
                            {renderSection(lastMonth, "Letzter Monat")}
                            {renderSection(older, "Älter")}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default DrawerNotifications;