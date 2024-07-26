import { inserat } from "@/db/schema";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface InseratConditionsProps {
    thisInserat : typeof inserat.$inferSelect;
}

const InseratConditions : React.FC<InseratConditionsProps> = ({
    thisInserat
}) => {
    return ( 
        <View>
            <View>
                <Text className="text-lg font-semibold flex flex-row gap-x-2 items-center text-gray-200">
                    <View>
                    <FontAwesome name="bookmark" size={20} color="white" />
                    </View>Rahmenbedingungen
                </Text>
            </View>
            {(thisInserat?.caution || thisInserat?.reqAge) && (
                <View className="mt-2">
                <View className="space-y-2">
                {thisInserat?.caution && (
                    <View className="w-full flex flex-row items-center">
                        <View className="w-1/2 ">
                            <Text className="text-gray-200 text-sm font-semibold flex flex-row items-center gap-x-2">
                            <View className="">
                            <FontAwesome5 name="money-check" size={16} color="white" />
                            </View>
                            Kaution
                            </Text>
                        </View>
                        <View className="w-1/2">
                        <Text className="text-gray-200 text-lg font-medium break-all line-clamp-1" numberOfLines={1}>
                            {thisInserat?.caution} €
                            </Text>
                        </View>
                    </View>
                )}

{thisInserat?.reqAge && (
                    <View className="w-full flex flex-row items-center">
                        <View className="w-1/2 ">
                            <Text className="text-gray-200 text-sm font-semibold flex flex-row items-center gap-x-2">
                            <View className="">
                            <FontAwesome5 name="user-circle" size={16} color="white" />
                            </View>
                            Mindestalter
                            </Text>
                        </View>
                        <View className="w-1/2">
                        <Text className="text-gray-200 text-lg font-medium break-all line-clamp-1" numberOfLines={1}>
                            {thisInserat?.reqAge} Jahre
                            </Text>
                        </View>
                    </View>
                )}
                </View>
            </View>
            )}
        </View>
     );
}
 
export default InseratConditions;