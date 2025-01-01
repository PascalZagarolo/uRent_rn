import { cn } from "@/~/lib/utils";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface SelectDashboardTab {
    tab : string;
    setTab : (value : string) => void;
}

const SelectDashboardTab = ({
    tab,
    setTab
} : SelectDashboardTab) => {
    return (
        <View>
            <ScrollView
                className="py-2"
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
            >
                <TouchableOpacity className={
                    cn(
                        "p-4 bg-[#1F2332] rounded-md", tab === "inserat" && "border border-indigo-800"
                    )
                }>
                    <Text className={cn("text-gray-200/60 font-medium text-base", tab === "inserat" && "text-gray-200 font-semibold")}>
                        Meine Inserate
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className={
                    cn(
                        "p-4 bg-[#1F2332] rounded-md", tab === "favourites" && "border border-indigo-800"
                    )
                }>
                    <Text className={cn("text-gray-200/60 font-medium text-base", tab === "favourites" && "text-gray-200 font-semibold")}>
                        Favoriten
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default SelectDashboardTab;