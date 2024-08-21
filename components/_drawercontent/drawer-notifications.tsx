import { notification } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import { format } from "date-fns";

import { useState } from "react";
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
        }
    ]

    const returnedNotificationRender = (thisNotification: typeof notification.$inferSelect) => {
        return (
            <View className="px-4">
                <View className="flex flex-row">
                    <View className="w-2/12">
                        {returnImage(thisNotification.notificationType)}
                    </View>
                    <View className="flex flex-col">
                        <View>
                            {returnTitle(thisNotification.content, thisNotification.notificationType)}
                        </View>
                    </View>
                </View>
                <View className="ml-auto">
                    <Text className="text-xs text-gray-200/60">
                        {format(new Date(thisNotification.createdAt), "dd.MM.yyyy")}
                    </Text>
                </View>
            </View>
        )
    }

    const returnImage = (type: string) => {
        
    const returnImage = () => {
        switch(type) {
            case "SUBSCRIPTION_REDEEMED":
                return (
                    <Ionicons name="gift" size={24} color="white" />
                )
            case "MESSAGE" :
                return (
                    <Entypo name="message" size={24} color="white" />
                )
            case "BOOKING" : 
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

    const returnTitle = (title : string, type : string) => {
        const formatTitle = () => {
            switch(type) {
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

    return (
        <View className="bg-[#1F2332] h-full">
            <SafeAreaView className="">
                <ScrollView className="bg-[#1F2332]   border-gray-600 ">

                    <View className="flex-1 flex ">
                        <View className="p-4 flex flex-row items-center space-x-4">
                            <Ionicons name="arrow-back" size={24} color="white" />
                            <Text className="text-xl font-semibold text-gray-200">
                                Benachrichtigungen
                            </Text>
                        </View>
                        <ScrollView horizontal={true} contentContainerStyle={{ paddingHorizontal: 4 }}>
                            <View className="flex flex-row items-center space-x-2 p-4">
                                {usedFilter.map((item) => filterBubble(item.key, item.value))}
                            </View>
                        </ScrollView>
                        <View className="mt-4 flex flex-col space-y-4 px-4">
                            {renderedNotifications.map((notification) => (
                                <View>
                                    {returnedNotificationRender(notification)}
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default DrawerNotifications;