import { pkwAttribute } from "@/db/schema";
import { FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons, Ionicons, Fontisto } from '@expo/vector-icons';
import { format } from "date-fns";
import { Text, View } from "react-native";

interface PkwAttributeRenderProps {
    attributes: typeof pkwAttribute.$inferSelect;
}

const PkwAttributeRender: React.FC<PkwAttributeRenderProps> = ({ attributes }) => {
    const iconColors = ["#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6"]; // Alternating colors
    let colorIndex = 0;

    const attributeList = [
        { condition: attributes?.brand, icon: "car-alt", label: attributes?.brand, component: FontAwesome5 },
        { condition: attributes?.initial, icon: "construction", label: `Baujahr: ${format(new Date(attributes?.initial), "MM/yyyy")}`, component: MaterialIcons },
        { condition: attributes?.power, icon: "engine", label: `${attributes.power} PS`, component: MaterialCommunityIcons },
        { condition: attributes?.seats, icon: "couch", label: `${attributes.seats} Sitze`, component: FontAwesome5 },
        { condition: attributes?.fuel, icon: "local-gas-station", label: attributes.fuel.charAt(0).toUpperCase() + attributes.fuel.slice(1).toLowerCase(), component: MaterialIcons },
        { condition: attributes?.doors, icon: "car-door", label: `${attributes.doors}/${Number(attributes.doors) + 1} Türer`, component: MaterialCommunityIcons },
        { condition: attributes?.transmission, icon: "gear", label: { 'MANUAL': 'Schaltgetriebe', 'SEMI_AUTOMATIC': 'Halbautomatikgetriebe', 'AUTOMATIC': 'Automatikgetriebe' }[attributes.transmission], component: FontAwesome },
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

export default PkwAttributeRender;
