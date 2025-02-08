import { pkwAttribute } from "@/db/schema";
import { FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons, Ionicons, Fontisto } from '@expo/vector-icons';

import { format } from "date-fns";


import { Text, View } from "react-native";

interface PkwAttributeRenderProps {
    attributes: typeof pkwAttribute.$inferSelect

}


const PkwAttributeRender: React.FC<PkwAttributeRenderProps> = ({
    attributes
}) => {

    let shownItems = 0;

    return (
        <View className="w-full gap-2 grid-cols-2 grid mt-4">
            {attributes?.brand && (
                <View className="flex-row items-center bg-[#2d3141] shadow-lg rounded-md text-base p-4 space-x-4">
                    <FontAwesome5 name="car-alt" className="w-4 h-4 mr-2 text-gray-200" 
                    
                    size={16} color="white"
                    />
                    <Text className="font-semibold text-gray-200 text-base">{attributes.brand}</Text>
                </View>
            )}
            {attributes?.initial && (
                <View className="flex-row items-center bg-[#2d3141] shadow-lg rounded-md text-base p-4 space-x-4">
                    <MaterialIcons name="construction" className="w-4 h-4 mr-2 text-gray-200" 
                    size={16} color="white"
                    />
                    <Text className="font-semibold text-gray-200 text-base">Baujahr : {format(new Date(attributes?.initial), "MM/yyyy")}</Text>
                </View>
            )}
            {attributes?.power && (
                <View className="flex-row items-center bg-[#2d3141] shadow-lg rounded-md text-base p-4 space-x-4">
                    <MaterialCommunityIcons name="engine" className="w-4 h-4 mr-2 text-gray-200" 
                    size={16} color="white"
                    />
                    <Text className="font-semibold text-gray-200 text-base">{attributes.power} PS</Text>
                </View>
            )}
            {attributes?.seats && (
                <View className="flex-row items-center bg-[#2d3141] shadow-lg rounded-md text-base p-4 space-x-4">
                    <FontAwesome5 name="couch" className="w-4 h-4 mr-2 text-gray-200" 
                    size={16} color="white"
                    />
                    <Text className="font-semibold text-gray-200 text-base">{attributes.seats} Sitze</Text>
                </View>
            )}
            {attributes?.fuel && (
                <View className="flex-row items-center bg-[#2d3141] shadow-lg rounded-md text-base p-4 space-x-4">
                    <MaterialIcons name="local-gas-station" className="w-4 h-4 mr-2 text-gray-200" 
                    size={16} color="white"
                    />
                    <Text className="font-semibold text-gray-200 text-base">{attributes.fuel.charAt(0).toUpperCase() + attributes.fuel.slice(1).toLowerCase()}</Text>
                </View>
            )}
            {attributes?.doors && (
                <View className="flex-row items-center bg-[#2d3141] shadow-lg rounded-md text-base p-4 space-x-4">
                    <MaterialCommunityIcons name="car-door" className="w-4 h-4 mr-2 text-gray-200"
                    size={16} color="white"
                    />
                    <Text className="font-semibold text-gray-200 text-base">{attributes.doors}/{Number(attributes.doors) + 1} Türer</Text>
                </View>
            )}
            {attributes?.transmission && (
                <View className="flex-row items-center bg-[#2d3141] shadow-lg rounded-md text-base p-4 space-x-4">
                    <FontAwesome name="gear" className="w-4 h-4 mr-2 text-gray-200" size={16} color="white"/>
                    <Text className="font-semibold text-gray-200 text-base">
                        {{
                            'MANUAL': 'Schaltgetriebe',
                            'SEMI_AUTOMATIC': 'Halbautomatikgetriebe',
                            'AUTOMATIC': 'Automatikgetriebe'
                        }[attributes.transmission]}
                    </Text>
                </View>
            )}
            {attributes?.loading_volume && ( 
                <View className="flex-row items-center bg-[#2d3141] shadow-lg rounded-md text-base p-4 space-x-4">
                    <Ionicons name="cube" className="w-4 h-4 mr-2 text-gray-200" size={16} color="white"/>
                    <Text className="font-semibold text-gray-200 text-base">{attributes.loading_volume} l</Text>
                </View>
            )}
            {(attributes?.loading_l || attributes?.loading_b || attributes?.loading_h) && (
                <View className="flex-row items-center bg-[#2d3141] shadow-lg rounded-md text-base p-4 space-x-4">
                    <Fontisto name="arrow-resize" className="w-4 h-4 mr-2" size={16} color="white" />
                    <Text className="font-semibold text-gray-200 text-base">{attributes?.loading_l} x {attributes?.loading_b} x {attributes?.loading_h} m</Text>
                </View>
            )}
        </View>
    );
}

export default PkwAttributeRender;