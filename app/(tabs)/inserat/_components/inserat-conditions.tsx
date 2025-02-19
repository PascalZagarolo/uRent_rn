import { inserat } from "@/db/schema";

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
                <Text className="text-lg font-semibold flex flex-row items-center text-gray-200">
                    Rahmenbedingungen
                </Text>
            </View>
            {(thisInserat?.caution || thisInserat?.reqAge) && (
                <View className="mt-2">
                <View className="space-y-2">
                {thisInserat?.caution && (
                    <View className="w-full flex flex-row items-center">
                        <View className="w-1/2 flex flex-row items-center">
                            
                            
                            <Text className="text-gray-200/80 text-sm  font-medium break-all line-clamp-1" numberOfLines={1}>
                            Kaution
                           </Text>
                        </View>
                        <View className="w-1/2">
                        <Text className="text-gray-200 text-base font-medium break-all line-clamp-1" numberOfLines={1}>
                            {thisInserat?.caution} €
                            </Text>
                        </View>
                    </View>
                )}

{thisInserat?.reqAge && (
                    <View className="w-full flex flex-row items-center">
                        <View className="w-1/2 flex flex-row items-center">
                            
                            
                            <Text className="text-gray-200/80 text-sm font-semibold flex flex-row items-center">
                            Mindestalter
                            </Text>
                        </View>
                        <View className="w-1/2">
                        <Text className="text-gray-200 text-base font-medium break-all line-clamp-1" numberOfLines={1}>
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