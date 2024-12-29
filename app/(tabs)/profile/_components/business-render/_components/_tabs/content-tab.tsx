import { inserat } from "@/db/schema";
import { useRouter } from "expo-router";
import { Bookmark, BookmarkCheckIcon, EllipsisIcon, EllipsisVerticalIcon, LocateFixedIcon, MapIcon, MapPinCheckInsideIcon, SaveAll, SaveIcon } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, Text } from "react-native";
import { View } from "react-native";


interface ContentTabProps {
    username: string;
    foundInserate: typeof inserat.$inferSelect[];
}

const ContentTab = ({ username, foundInserate }: ContentTabProps) => {


    const router = useRouter();
    const [amountRendered, setAmountRendered] = useState(5);

    const InseratRender = (title: string, postalCode: string, city: string, price: string, imageUrl: string, inseratId : string) => {
        return (
            <TouchableOpacity key={title} onPress={() => router.push(`/inserat/${inseratId}`)}>
                <View className="w-full">
                    <Image
                        source={{ uri: imageUrl }}
                        className="w-full h-40 object-cover rounded-t-md"
                    />
                </View>
                <View className=" bg-[#2a2f3d] shadow-xl rounded-b-md p-4">
                    <View className="flex flex-row items-center">
                        <Text className="text-lg font-semibold text-gray-200 w-3/4 line-clamp-1">
                            {title}
                        </Text>
                        <View className="ml-auto">
                            <Bookmark className="w-4 h-4 text-gray-200" />
                        </View>
                    </View>
                    <View className="mt-2 flex flex-row items-center">
                        <MapPinCheckInsideIcon className="w-4 h-4 text-rose-600" />
                        <Text className="ml-4 text-gray-200 font-semibold text-base">
                            {postalCode} | {city}
                        </Text>
                    </View>
                    <View className="mt-2 flex flex-row ">
                        <Text className="text-xl font-semibold text-gray-200">
                            {price}
                        </Text>
                        <Text className="text-lg text-gray-200/60 ml-1">
                            €
                        </Text>
                        <Text className="text-sm text-gray-200/60 ml-1">
                            /Tag
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

const onRenderMore = () => {
    setAmountRendered(amountRendered + 5);
}

    return (
        <View className="">
            <View className="flex flex-row items-center">
                <EllipsisVerticalIcon className="w-4 h-4 mr-4" />
                <Text className="text-lg font-semibold text-gray-200">
                    Mehr von {username}
                </Text>
            </View>
            {foundInserate?.length > 0 ? (
                <View className="space-y-4 mt-8">
                {foundInserate.slice(0, amountRendered).map((inserat) => (
                    InseratRender(inserat.title, inserat.address?.postalCode, inserat.address?.locationString, inserat.price, inserat?.images[0]?.url, inserat.id)
                ))}
            </View>
            ) : (
                <Text className="mt-4 text-gray-200/50">
                    Noch keine Inhalte geteilt..
                </Text>
            )}
            {amountRendered < foundInserate.length && (
                <View className="mt-4">
                    <TouchableOpacity className="bg-[#161820] shadow-lg rounded-lg flex flex-row items-center justify-center" onPress={onRenderMore}>
                    
                        <Text className="flex flex-row justify-center text-gray-200 text-lg text-center items-center p-2.5 ">
                            Mehr anzeigen
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default ContentTab;