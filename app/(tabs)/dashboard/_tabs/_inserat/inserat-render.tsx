import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

import {  Text, TouchableOpacity } from "react-native";
import { View } from "react-native";


interface InseratRenderProps {
    thisInserat: typeof inserat.$inferSelect & { images };
    setOpenDeleteDialog: (value: string) => void;
}

const InseratRender = ({ thisInserat, setOpenDeleteDialog }: InseratRenderProps) => {

    const router = useRouter()

    return (
        <View className="bg-[#202433] shadow-lg w-full rounded-md overflow-hidden">
    <View className="flex flex-row items-center">
        {/* Image */}
        <View>
            {thisInserat?.images[0]?.url ? (
                <Image
                    source={{ uri: thisInserat.images[0].url }}
                    className="w-28 h-28 rounded-l-md"
                />
            ) : (
                <View className="w-28 h-28 bg-[#2a2f41] rounded-l-md flex items-center justify-center">
                    <MaterialCommunityIcons name="image" color="white" size={24} />
                </View>
            )}
        </View>

        {/* Info Section */}
        <View className="px-4 py-2 flex-1">
            <Text className="text-base text-gray-200 font-semibold mb-1" numberOfLines={1}>
                {thisInserat.title}
            </Text>

            {/* Created At */}
            <Text className="text-xs text-gray-200/60 font-semibold mb-1">
                {new Date(thisInserat.createdAt).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </Text>

            {/* Published Badge */}
            <View className={cn(
                "mt-2  flex flex-row items-center rounded-lg px-2",
                thisInserat.isPublished ? "bg-green-600/10" : "bg-gray-500/20"
            )}>
                {thisInserat?.isPublished ? (
                    <MaterialCommunityIcons name="earth" size={12} color={"white"} />
                ) : (
                    <MaterialCommunityIcons name="lock" size={12} color={"white"} />
                )}
                <Text
                    className={`text-xs font-medium px-2 py-1 rounded-full  ${
                        thisInserat.isPublished
                            ? " text-green-600 "
                            : " text-gray-400"
                    }`}
                >
                    {thisInserat.isPublished ? "Veröffentlicht" : "Entwurf"}
                </Text>
            </View>
        </View>

        {/* Actions */}
        <View className="ml-auto flex flex-col pr-4 py-4">
            <TouchableOpacity
                className="p-2 rounded-md"
                onPress={() => router.push(`/inserat/create/${thisInserat?.id}`)}
            >
                <MaterialCommunityIcons name="pencil-minus-outline" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                className="mt-4 p-2 rounded-md"
                onPress={() => setOpenDeleteDialog(thisInserat?.id)}
            >
                <MaterialCommunityIcons name="trash-can" size={20} color="#f43f5e" />
            </TouchableOpacity>
        </View>
    </View>
</View>

    );
}

export default InseratRender;