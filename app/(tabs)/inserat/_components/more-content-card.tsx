import { images } from "@/db/schema";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MoreContentCardProps {
    thisTitle: string;
    inseratId: string;
    thisPrice: number;
    thisImages: typeof images.$inferSelect[];
}

const MoreContentCard: React.FC<MoreContentCardProps> = ({
    thisTitle,
    inseratId,
    thisPrice,
    thisImages
}) => {

    const router = useRouter();

    const usedImage = thisImages.sort((a, b) => a.position - b.position)[0];

    return (
        <TouchableOpacity
  onPress={() => router.push(`/inserat/${inseratId}`)}
  activeOpacity={0.85}
  className="bg-[#1F2332] rounded-md shadow-lg h-40"
>
  {/* Content (Image and Price) */}
  <View className="flex flex-row items-stretch justify-between">
    {/* Image Section */}
    {usedImage && (
      <View className="w-3/5 overflow-hidden rounded-l-md">
        <Image
          source={{ uri: usedImage?.url }}
          className="h-full object-cover w-full"
          resizeMode="cover"
        />
      </View>
    )}

    <View className="flex-1 flex flex-col justify-between">
      {/* Title Section */}
      <View>
        <Text className="text-base font-semibold text-gray-200 truncate p-2 line-clamp-3" numberOfLines={3}>
          {thisTitle}
        </Text>
      </View>

      {/* Price Section */}
      <View className="bg-indigo-800 shadow-lg rounded-r-md rounded-t-none p-2.5 h-1/3 items-end flex flex-row space-x-1">
        <Text className="text-gray-200 font-semibold text-lg">
          {thisPrice}€
        </Text>
        <Text className="text-gray-200/80 font-semibold">/Tag</Text>
      </View>
    </View>
  </View>
</TouchableOpacity>


    );
}

export default MoreContentCard;