import { lkwAttribute } from "@/db/schema";
import { FontAwesome, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Text, View } from "react-native";

interface LkwAttributeRenderProps {
    attributes: typeof lkwAttribute.$inferSelect;
}

const LkwAttributeRender: React.FC<LkwAttributeRenderProps> = ({ attributes }) => {
    const iconColors = ["#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6"]; // Alternating colors
    let colorIndex = 0;

    const attributeList = [
        { condition: attributes?.lkwBrand, icon: "truck-moving", label: attributes?.lkwBrand, component: FontAwesome5 },
        { condition: attributes?.initial, icon: "construction", label: `Baujahr: ${format(new Date(attributes?.initial), "MM/yyyy")}`, component: MaterialIcons },
        { condition: attributes?.application, icon: "truck-loading", label: attributes.application.charAt(0)?.toUpperCase() + attributes.application.slice(1).toLowerCase(), component: FontAwesome5 },
        { condition: attributes?.loading, icon: "crane", label: attributes?.loading?.charAt(0)?.toUpperCase() + attributes?.loading?.slice(1)?.toLowerCase(), component: MaterialCommunityIcons },
        { condition: attributes?.drive, icon: "gear", label: attributes?.drive?.slice(1) + `-Antrieb`, component: FontAwesome },
        { condition: Number(attributes?.weightClass ?? 0) !== 0 && attributes?.weightClass != 0, icon: "weight", label: (attributes?.weightClass) + " kg zulässiges Gesamtgewicht", component: MaterialCommunityIcons },
        { condition: attributes?.seats, icon: "couch", label: `${attributes.seats}-Sitzer`, component: FontAwesome5 },
        { condition: attributes?.axis, icon: "axis", label: { '1': "Einachser", '2': "Zweiachser", '3': "Dreiachser", '4': "Vierachser", '5': " > 4 Achsen" }[attributes?.axis], component: MaterialCommunityIcons },
        { condition: attributes?.power, icon: "engine", label: `${attributes.power} PS`, component: MaterialCommunityIcons },
        { condition: attributes?.loading_volume, icon: "cube", label: `${attributes.loading_volume} l`, component: Ionicons },
        { condition: attributes?.loading_l || attributes?.loading_b || attributes?.loading_h, icon: "arrow-resize", label: `${attributes?.loading_l} x ${attributes?.loading_b} x ${attributes?.loading_h} m`, component: Fontisto }
    ];

    return (
        <View className="w-full grid grid-cols-2 gap-y-2 mt-4 text-gray-200">
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

export default LkwAttributeRender;
