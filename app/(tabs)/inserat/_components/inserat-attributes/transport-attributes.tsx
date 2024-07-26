import { transportAttribute } from "@/db/schema";
import { FontAwesome, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";


import { format } from "date-fns";





import { Text, View } from "react-native";

interface TransportAttributeRenderProps {
    attributes: typeof transportAttribute.$inferSelect;

}


const TransportAttributeRender: React.FC<TransportAttributeRenderProps> = ({
    attributes
}) => {

    let shownItems = 0;

    return (
        <View className="w-full grid grid-cols-2 gap-2 mt-4 text-gray-200">
            {attributes?.transportBrand && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <MaterialCommunityIcons name="van-utility" className="w-4 h-4 mr-2" size={20} color="white" />
                    <Text className="font-semibold text-gray-200">{attributes.transportBrand}</Text>
                </View>
            )}
            {attributes?.initial && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <MaterialIcons name="construction" className="w-4 h-4 mr-2" size={20} color="white" />
                    <Text className="font-semibold text-gray-200">Baujahr: {format(new Date(attributes.initial), "MM/yyyy")}</Text>
                </View>
            )}
            {attributes?.loading && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <MaterialCommunityIcons name="crane" className="w-4 h-4 mr-2" size={20} color="white" />
                    <Text className="font-semibold text-gray-200">{attributes.loading.substring(0, 1)}{attributes.loading.substring(1).toLowerCase()}</Text>
                </View>
            )}
            {attributes?.seats && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <FontAwesome5 name="couch" className="w-4 h-4 mr-2" size={20} color="white" />
                    <Text className="font-semibold text-gray-200">{attributes.seats}</Text>
                </View>
            )}
            {attributes?.fuel && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <MaterialCommunityIcons name="gas-station" className="w-4 h-4 mr-2" size={20} color="white" />
                    <Text className="font-semibold text-gray-200">{attributes.fuel.substring(0, 1)}{attributes.fuel.substring(1).toLowerCase()}</Text>
                </View>
            )}
            {attributes?.transmission && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <FontAwesome name="gear" className="w-4 h-4 mr-2" size={20} color="white" />
                    <Text className="font-semibold text-gray-200">
                        {{
                            'MANUAL': 'Schaltgetriebe',
                            'SEMI_AUTOMATIC': 'Schaltgetriebe',
                            'AUTOMATIC': 'Automatikgetriebe'
                        }[attributes.transmission]}
                    </Text>
                </View>
            )}
            {Number(attributes?.doors) !== 0 && attributes?.doors && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <MaterialCommunityIcons name="door" className="w-4 h-4 mr-2" size={20} color="white" />
                    <Text className="font-semibold text-gray-200">{attributes.doors}/{Number(attributes.doors) + 1}</Text>
                </View>
            )}
            {attributes?.weightClass && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <MaterialCommunityIcons name="weight" className="w-4 h-4 mr-2" size={20} color="white" />
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
                        }[attributes.weightClass]}
                    </Text>
                </View>
            )}
            {attributes?.extraType && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <FontAwesome5 name="caravan" className="w-4 h-4 mr-2" size={20} color="white" />
                    <Text className="font-semibold text-gray-200">{attributes.extraType.substring(0, 1)}{attributes.extraType.substring(1).toLowerCase()}</Text>
                </View>
            )}
            {attributes?.power && (
                <View className="bg-[#13151C] p-4 font-semibold flex-row items-center space-x-4">
                    <MaterialCommunityIcons name="engine" className="w-4 h-4 mr-2" size={20} color="white" />
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
                    <Text className="font-semibold text-gray-200">{attributes.loading_l} x {attributes.loading_b} x {attributes.loading_h} m</Text>
                </View>
            )}
        </View>
    );
    
}

export default TransportAttributeRender;