import { openingTimes } from "@/db/schema";
import { is } from "drizzle-orm";
import { ClockIcon, PencilIcon } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface OpeningTimesRenderProps {
    foundTimes: typeof openingTimes.$inferSelect;
    setOpenOpeningTimes: (open: boolean) => void;
    isOwn : boolean;
}

const OpeningTimesRender = ({ foundTimes, setOpenOpeningTimes, isOwn }: OpeningTimesRenderProps) => {
    console.log(foundTimes);
    const renderedDays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

    const renderedTimeline = (day: string) => {
        return (
            <View className="ml-auto">
                <Text className="text-gray-200 font-semibold text-lg px-4">
                    {
                        {
                            Montag: foundTimes?.monday ? `${foundTimes.monday} Uhr` : "-",
                            Dienstag: foundTimes?.tuesday ? `${foundTimes.tuesday} Uhr` : "-",
                            Mittwoch: foundTimes?.wednesday ? `${foundTimes.wednesday} Uhr` : "-",
                            Donnerstag: foundTimes?.thursday ? `${foundTimes.thursday} Uhr` : "-",
                            Freitag: foundTimes?.friday ? `${foundTimes.friday} Uhr` : "-",
                            Samstag: foundTimes?.saturday ? `${foundTimes.saturday} Uhr` : "-",
                            Sonntag: foundTimes?.sunday ? `${foundTimes.sunday} Uhr` : "-",
                        }[day]
                    }

                </Text>
            </View>
        )
    }

    return (
        <View className="">
            <View className="flex flex-row items-center">
                <ClockIcon className="w-4 h-4 mr-4" />
                <Text className="text-lg font-semibold text-gray-200">
                    Öffnungszeiten
                </Text>
                {isOwn && (
                    <TouchableOpacity onPress={() => setOpenOpeningTimes(true)} className="flex flex-row items-center ml-auto p-2.5 rounded-md shadow-lg">
                    <PencilIcon className="w-4 h-4 mr-2 text-gray-200" />
                    
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