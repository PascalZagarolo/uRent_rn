import { images } from "@/db/schema";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MoreContentCardProps {
    thisTitle : string;
    inseratId : string;
    thisImages : typeof images.$inferSelect[];
}

const MoreContentCard : React.FC<MoreContentCardProps> = ({
    thisTitle,
    inseratId,
    thisImages
}) => {

    const router = useRouter();

    const usedImage = thisImages.sort((a, b) => a.position - b.position)[0];

    return ( 
        <TouchableOpacity onPress={() => {router.push(`/inserat/${inseratId}`)}} 
        className="bg-[#1F2332] rounded-t-md p-4">
            <View>
                <Text className="text-sm font-semibold text-gray-200 break-all line-clamp-1" numberOfLines={1}>
                    {thisTitle}
                </Text>
            </View>
            <View className="mt-2">
                <Image 
                source={{uri: usedImage.url}}
                className="h-32 w-full"
                />
            </View>
        </TouchableOpacity>
     );
}
 
export default MoreContentCard;