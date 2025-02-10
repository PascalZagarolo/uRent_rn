import { inserat } from "@/db/schema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";


interface InseratRenderProps {
    thisInserat: typeof inserat.$inferSelect;
    setOpenDeleteDialog: (value: string) => void;
}

const InseratRender = ({ thisInserat, setOpenDeleteDialog }: InseratRenderProps) => {

    const router = useRouter()

    return (
        <View className="bg-[#202433] shadow-lg w-full">
            <View className="flex flex-row items-center">
                <View>
                    {thisInserat?.images[0]?.url ? (
                        <Image
                            source={{ uri: thisInserat.images[0]?.url }}
                            className="w-28 h-28 rounded-l-md"
                        />
                    ) : (
                        <View
                            className="w-28 h-28 bg-[#2a2f41] rounded-l-md flex flex-row items-center justify-center"
                        >
                            <MaterialCommunityIcons name="image"
                                className="w-4 h-4 text-gray-200/60"
                            />
                        </View>
                    )}
                </View>
                <View className="p-4 w-[40%]">
                    <Text className="text-base text-gray-200 line-clamp-1 w-full break-all">
                        {thisInserat.title} 
                    </Text>
                </View>
                <View className="ml-auto flex flex-col p-2">
                    <TouchableOpacity className=" p-2 rounded-md" onPress={() => {router.push(`/inserat/create/${thisInserat?.id}`)}}>
                        <MaterialCommunityIcons name="pencil-minus-outline" className="text-gray-200 w-4 h-4" />
                    </TouchableOpacity>
                    <TouchableOpacity className="mt-4 p-2 rounded-md" onPress={() => { setOpenDeleteDialog(thisInserat?.id) }}>
                        <MaterialCommunityIcons name="trash-can" className="text-rose-800 font-semibold w-4 h-4" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default InseratRender;