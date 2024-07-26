


import { lkwAttribute } from "@/db/schema";
import { FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { format } from "date-fns";
import { Text, View, ViewBase } from "react-native";

interface LkwAttributeRenderProps {
    attributes: typeof lkwAttribute.$inferSelect

}


const LkwAttributeRender: React.FC<LkwAttributeRenderProps> = ({
    attributes
}) => {

    let shownItems = 0;

    return(
        <View className="w-full grid grid-cols-2 gap-2 mt-4 text-gray-200">
            {attributes?.lkwBrand && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <FontAwesome5 name="truck-moving" className="w-4 h-4 mr-2" size={20} color="white" />
                    <Text className="font-semibold text-gray-200">{attributes.lkwBrand}</Text>
                </View>
            )}
            {attributes?.initial && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <MaterialIcons name="construction" className="w-4 h-4 mr-2" size={20} color="white"/>
                    <Text className="font-semibold text-gray-200">Baujahr: {format(new Date(attributes?.initial), "MM/yyyy")}</Text>
                </View>
            )}
            {attributes?.application && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <FontAwesome5 name="truck-loading" className="w-4 h-4 mr-2" size={20} color="white" />
                    <Text className="font-semibold text-gray-200">{attributes.application.substring(0, 1)}{attributes.application.substring(1).toLowerCase()}</Text>
                </View>
            )}
            {attributes?.loading && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <MaterialCommunityIcons name="crane" className="w-4 h-4 mr-2" size={20} color="white"/>
                    <Text className="font-semibold text-gray-200">{attributes.loading.substring(0, 1)}{attributes.loading.substring(1).toLowerCase()}</Text>
                </View>
            )}
            {attributes?.drive && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <FontAwesome5 name="gear" className="w-4 h-4 mr-2" size={20} color="white"/>
                    <Text className="font-semibold text-gray-200">{attributes.drive.substring(1)}</Text>
                </View>
            )}
            {attributes?.weightClass && attributes?.weightClass != 0 && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <MaterialCommunityIcons name="weight" className="w-4 h-4 mr-2" size={20} color="white"/>
                    <Text className="font-semibold text-gray-200">
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
            {attributes?.seats && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <FontAwesome5 name="couch" className="w-4 h-4 mr-2" size={20} color="white"/>
                    <Text className="font-semibold text-gray-200">{attributes.seats} {attributes.seats > 1 ? 'Sitze' : 'Sitz'}</Text>
                </View>
            )}
            {attributes?.axis && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <MaterialCommunityIcons name="axis" className="w-4 h-4 mr-2" size={20} color="white"/>
                    <Text className="font-semibold text-gray-200">
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
            {attributes?.power && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <MaterialCommunityIcons name="engine" className="w-4 h-4 mr-2" size={20} color="white"/>
                    <Text className="font-semibold text-gray-200">{attributes.power} PS</Text>
                </View>
            )}
            {attributes?.loading_volume && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <Ionicons name="cube" className="w-4 h-4 mr-2 text-gray-200" size={20} color="white"/>
                    <Text className="font-semibold text-gray-200">{attributes.loading_volume} l</Text>
                </View>
            )}
            {(attributes?.loading_l || attributes?.loading_b || attributes?.loading_h) && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <Fontisto name="arrow-resize" className="w-4 h-4 mr-2" size={20} color="white" />
                    <Text className="font-semibold text-gray-200">{attributes?.loading_l} x {attributes?.loading_b} x {attributes?.loading_h} m</Text>
                </View>
            )}
        </View>
    )
}

export default LkwAttributeRender;