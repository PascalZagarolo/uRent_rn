import { openingTimes } from "@/db/schema";
import { ClockIcon } from "lucide-react-native";
import { Text, View } from "react-native";

interface OpeningTimesRenderProps {
    foundTimes : typeof openingTimes.$inferSelect;
}

const OpeningTimesRender = ({ foundTimes } : OpeningTimesRenderProps) => {

    const renderedDays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

    const renderedTimeline = (day : string) => {
        return (
            <View>
                <Text>
                    {
                        {
                            "Montag" : `${foundTimes.monday} Uhr`,
                            "Dienstag" : `${foundTimes.tuesday} Uhr`,
                            "Mittwoch" : `${foundTimes.wednesday} Uhr`,
                            "Donnerstag" : `${foundTimes.thursday} Uhr`,
                            "Freitag" : `${foundTimes.friday} Uhr`,
                            "Samstag" : `${foundTimes.saturday} Uhr`,
                            
                           
                        }[day]
                    }
                </Text>
            </View>
        )
    }

    return (
        <View>
            <View className="flex flex-row items-center">
                <ClockIcon className="w-4 h-4 mr-4" />
                <Text className="text-lg font-semibold text-gray-200">
                    Öffnungszeiten
                </Text>
            </View>
            <View className="mt-8 space-y-8">
                {renderedDays.map(day => (
                    <View key={day} className="">
                        <Text className="text-base font-semibold text-gray-200">
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