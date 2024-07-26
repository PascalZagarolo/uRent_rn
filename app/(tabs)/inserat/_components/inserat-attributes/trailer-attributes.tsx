




import { trailerAttribute } from "@/db/schema";

import { Text, View } from "react-native";
import { FontAwesome, FontAwesome6, Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface TrailerAttributeRenderProps {
    attributes: typeof trailerAttribute.$inferSelect

}


const TrailerAttributeRender: React.FC<TrailerAttributeRenderProps> = ({
    attributes
}) => {

    let shownItems = 0;

    return (
        <View className="w-full grid grid-cols-2 gap-2 mt-4 text-gray-200">
            {attributes?.type && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center">
                    <MaterialCommunityIcons name="caravan" className="w-4 h-4 mr-2" />
                    <Text>{attributes?.type?.substring(0, 1)}{attributes?.type?.substring(1).toLowerCase()}</Text>
                </View>
            )}
            {attributes?.extraType && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center">
                    <FontAwesome6 name="caravan" className="w-4 h-4 mr-2" />
                    <Text>{attributes?.extraType?.substring(0, 1)}{attributes?.extraType?.substring(1).toLowerCase()}</Text>
                </View>
            )}
            {attributes?.coupling && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center">
                    <FontAwesome name="gear" className="w-4 h-4 mr-2" />
                    <Text>{attributes?.coupling?.substring(0, 1)}{attributes?.coupling?.substring(1).toLowerCase()}</Text>
                </View>
            )}
            {attributes?.loading && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center">
                    <MaterialCommunityIcons name="crane" className="w-4 h-4 mr-2" />
                    <Text>{attributes?.loading?.substring(0, 1)}{attributes?.loading?.substring(1).toLowerCase()}</Text>
                </View>
            )}
            {attributes?.axis && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center">
                    <MaterialCommunityIcons name="axis" className="w-4 h-4 mr-2" />
                    <Text>
                        {{
                            '1': "Einachser",
                            '2': "Zweiachser",
                            '3': "Dreiachser",
                            '4': "Vierachser",
                            '5': " > 4 Achsen"
                        }[attributes?.axis]}
                    </Text>
                </View>
            )}
            {attributes?.weightClass && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center">
                    <MaterialCommunityIcons name="weight" className="w-4 h-4 mr-2" />
                    <Text>
                        {{
                            '75': " bis 0,75 t",
                            '150': " bis 1,5 t",
                            '280': " bis 2,8 t",
                            '350': " bis 3,5 t",
                            '750': " bis 7,5 t",
                            '1200': " bis 12 t",
                            '1800': " bis 18 t",
                            '2600': " bis 26 t",
                            '3200': " bis 32 t",
                            '3900': " bis 39 t",
                            '5000': " {'>'} 39 t",
                        }[attributes?.weightClass]}
                    </Text>
                </View>
            )}
            {attributes?.brake && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center">
                    <MaterialCommunityIcons name="car-brake-worn-linings" className="w-4 h-4 mr-2" />
                    <Text>{String(attributes?.brake) === "true" ? "Hat Auflaufbremse" : "Keine Bremse"}</Text>
                </View>
            )}
            {attributes?.loading_volume && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center">
                    <Ionicons name="cube" className="w-4 h-4 mr-2 text-gray-200" size={20} color="white"/>
                    <Text>{attributes.loading_volume} l</Text>
                </View>
            )}
            {(attributes?.loading_l || attributes?.loading_b || attributes?.loading_h) && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center">
                    <Fontisto name="arrow-resize" className="w-4 h-4 mr-2" size={20} color="white" />
                    <Text>{attributes?.loading_l} x {attributes?.loading_b} x {attributes?.loading_h} m</Text>
                </View>
            )}
        </View>
    );
}

export default TrailerAttributeRender;