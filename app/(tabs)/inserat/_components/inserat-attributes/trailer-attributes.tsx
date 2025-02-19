import { trailerAttribute } from "@/db/schema";
import { Text, View } from "react-native";
import { FontAwesome, FontAwesome6, Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface TrailerAttributeRenderProps {
    attributes: typeof trailerAttribute.$inferSelect;
}

const TrailerAttributeRender: React.FC<TrailerAttributeRenderProps> = ({ attributes }) => {
    const iconColors = ["#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6"]; // Alternating colors
    let colorIndex = 0;

    const attributeList = [
        { condition: attributes?.type, icon: "caravan", label: attributes?.type, component: MaterialCommunityIcons },
        { condition: attributes?.extraType, icon: "caravan", label: attributes?.extraType, component: FontAwesome6 },
        { condition: attributes?.coupling, icon: "gear", label: attributes?.coupling, component: FontAwesome },
        { condition: attributes?.loading, icon: "crane", label: attributes?.loading, component: MaterialCommunityIcons },
        { condition: attributes?.axis, icon: "axis", label: { '1': "Einachser", '2': "Zweiachser", '3': "Dreiachser", '4': "Vierachser", '5': " > 4 Achsen" }[attributes?.axis], component: MaterialCommunityIcons },
        { condition: attributes?.weightClass, icon: "weight", label: { '75': " bis 0,75 t", '150': " bis 1,5 t", '280': " bis 2,8 t", '350': " bis 3,5 t", '750': " bis 7,5 t", '1200': " bis 12 t", '1800': " bis 18 t", '2600': " bis 26 t", '3200': " bis 32 t", '3900': " bis 39 t", '5000': " > 39 t" }[attributes?.weightClass], component: MaterialCommunityIcons },
        { condition: attributes?.brake, icon: "car-brake-worn-linings", label: attributes?.brake ? "Hat Auflaufbremse" : "Keine Bremse", component: MaterialCommunityIcons },
        { condition: attributes?.loading_volume, icon: "cube", label: `${attributes.loading_volume} l`, component: Ionicons },
        { condition: attributes?.loading_l || attributes?.loading_b || attributes?.loading_h, icon: "arrow-resize", label: `${attributes?.loading_l} x ${attributes?.loading_b} x ${attributes?.loading_h} m`, component: Fontisto }
    ];

    return (
        <View className="w-full grid grid-cols-2 gap-2 mt-4 text-gray-200">
            {attributeList.map(({ condition, icon, label, component: IconComponent }) => {
                if (!condition) return null;
                const color = iconColors[colorIndex % iconColors.length]; // Cycle through colors
                colorIndex++;

                return (
                    <View key={icon} className="bg-[#2d3141] shadow-lg p-4 rounded-lg flex-row items-center space-x-4">
                        {/* Fixed-width container for icons to ensure alignment */}
                        <View className="w-6 h-6 flex items-center justify-center">
                            <IconComponent name={icon as any} size={20} color={color} />
                        </View>
                        <Text className="text-gray-200 font-semibold">{label}</Text>
                    </View>
                );
            })}
        </View>
    );
};

export default TrailerAttributeRender;
