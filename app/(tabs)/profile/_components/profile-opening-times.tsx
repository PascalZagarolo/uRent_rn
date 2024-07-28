import { openingTimes } from "@/db/schema";
import { Text, View } from "react-native";

interface ProfileOpeningTimesProps {
    thisOpeningTimes : typeof openingTimes.$inferSelect | any;
}

const ProfileOpeningTimes : React.FC<ProfileOpeningTimesProps> = ({
    thisOpeningTimes
}) => {
    return ( 
        <View className="p-4">
            <View>
                <Text className="text-lg font-semibold text-gray-200">
                    Öffnungszeiten
                </Text>
            </View>
            <View className="mt-2 space-y-2 ">
                <View className="flex flex-row items-center">
                    <Text className="w-1/2 text-gray-200/90 font-medium">
                        Montag
                    </Text>
                    <Text className="w-1/2 text-gray-200 font-semibold">
                        {thisOpeningTimes.monday ? thisOpeningTimes.monday : "-"}
                    </Text>
                </View>

                <View className="flex flex-row items-center">
                    <Text className="w-1/2 text-gray-200/90 font-medium">
                        Montag
                    </Text>
                    <Text className="w-1/2 text-gray-200 font-semibold">
                        {thisOpeningTimes.monday ? thisOpeningTimes.monday : "-"}
                    </Text>
                </View>

                <View className="flex flex-row items-center">
                    <Text className="w-1/2 text-gray-200/90 font-medium">
                        Dienstag
                    </Text>
                    <Text className="w-1/2 text-gray-200 font-semibold">
                        {thisOpeningTimes.thursday ? thisOpeningTimes.thursday : "-"}
                    </Text>
                </View>

                <View className="flex flex-row items-center">
                    <Text className="w-1/2 text-gray-200/90 font-medium">
                        Mittwoch
                    </Text>
                    <Text className="w-1/2 text-gray-200 font-semibold">
                        {thisOpeningTimes.wednesday ? thisOpeningTimes.wednesday : "-"}
                    </Text>
                </View>

                <View className="flex flex-row items-center">
                    <Text className="w-1/2 text-gray-200/90 font-medium">
                        Donnerstag
                    </Text>
                    <Text className="w-1/2 text-gray-200 font-semibold">
                        {thisOpeningTimes.thursday ? thisOpeningTimes.thursday : "-"}
                    </Text>
                </View>

                <View className="flex flex-row items-center">
                    <Text className="w-1/2 text-gray-200/90 font-medium">
                        Freitag
                    </Text>
                    <Text className="w-1/2 text-gray-200 font-semibold">
                        {thisOpeningTimes.friday ? thisOpeningTimes.friday : "-"}
                    </Text>
                </View>

                <View className="flex flex-row items-center">
                    <Text className="w-1/2 text-gray-200/90 font-medium">
                        Samstag
                    </Text>
                    <Text className="w-1/2 text-gray-200 font-semibold">
                        {thisOpeningTimes.saturday ? thisOpeningTimes.saturday : "-"}
                    </Text>
                </View>
            </View>
        </View>
     );
}
 
export default ProfileOpeningTimes;