import { openingTimes } from "@/db/schema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { is } from "drizzle-orm";

import { Text, TouchableOpacity, View } from "react-native";

interface OpeningTimesRenderProps {
    foundTimes: typeof openingTimes.$inferSelect;
    setOpenOpeningTimes: (open: boolean) => void;
    isOwn : boolean;
    foundOpeningTimes : {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    }
}

const OpeningTimesRender = ({ foundTimes, setOpenOpeningTimes, isOwn, foundOpeningTimes }: OpeningTimesRenderProps) => {
    console.log(foundTimes);
    const renderedDays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

    

    const renderedTimeline = (day: string) => {
        return (
            <View className="ml-auto">
                <Text className="text-gray-200 font-semibold text-lg px-4">
                    {
                        {
                            Montag: foundOpeningTimes?.monday ? `${foundOpeningTimes.monday} Uhr` : "-",
                            Dienstag: foundOpeningTimes?.tuesday ? `${foundOpeningTimes.tuesday} Uhr` : "-",
                            Mittwoch: foundOpeningTimes?.wednesday ? `${foundOpeningTimes.wednesday} Uhr` : "-",
                            Donnerstag: foundOpeningTimes?.thursday ? `${foundOpeningTimes.thursday} Uhr` : "-",
                            Freitag: foundOpeningTimes?.friday ? `${foundOpeningTimes.friday} Uhr` : "-",
                            Samstag: foundOpeningTimes?.saturday ? `${foundOpeningTimes.saturday} Uhr` : "-",
                            Sonntag: foundOpeningTimes?.sunday ? `${foundOpeningTimes.sunday} Uhr` : "-",
                        }[day]
                    }

                </Text>
            </View>
        )
    }

    return (
        <View className="">
            <View className="flex flex-row items-center">
                <MaterialCommunityIcons name="clock-time-four-outline" size={24} color="white" />
                <Text className="text-lg font-semibold text-gray-200">
                    Öffnungszeiten
                </Text>
                {isOwn && (
                    <TouchableOpacity onPress={() => setOpenOpeningTimes(true)} className="flex flex-row items-center ml-auto p-2.5 rounded-md shadow-lg">
                    <MaterialCommunityIcons name="pencil" size={24} color="white" />
                    
                </TouchableOpacity>
                )}
            </View>
            <View className="mt-8 space-y-8">
                {renderedDays.map(day => (
                    <View key={day} className="flex flex-row items-center">
                        <Text className="text-base font-semibold text-gray-200/80">
                            {day}
                        </Text>
                        {renderedTimeline(day)}
                    </View>
                ))}
            </View>
        </View>
    );
}

export default OpeningTimesRender;