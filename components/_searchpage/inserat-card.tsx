import { inserat } from "@/db/schema";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import { address } from '../../db/schema';

interface InseratCardProps {
    thisInserat: typeof inserat.$inferSelect;
}

const InseratCard: React.FC<InseratCardProps> = ({
    thisInserat
}) => {

    const matchingIcon = (usedCategory: string) => {
        switch (usedCategory) {
            case "PKW":
                return <FontAwesome5 name="car" size={20} color="white" />;
            case "LKW":
                return <FontAwesome name="truck" size={20} color="white" />;
            case "TRANSPORT":
                return <MaterialCommunityIcons name="van-utility" size={20} color="white" />;
            case "TRAILER":
                return <MaterialCommunityIcons name="truck-trailer" size={20} color="white" />;

        }
    }


    return (
        <View className="bg-[#141620]  w-full">
            <View>
                <View className="flex flex-row gap-x-4 items-center px-4 py-4">
                    <View>
                        {matchingIcon(thisInserat.category)}
                    </View>
                    <Text className="text-lg font-medium text-gray-200 line-clamp-1 w-10/12 break-all" numberOfLines={1}>
                        {thisInserat.title}
                    </Text>
                </View>
                <View className=" px-4 ">
                    <Image
                        className="w-full h-40  rounded-t-md"
                        source={{
                            uri: thisInserat.images[0].url,
                        }}
                    />

                </View>
                <View className="px-4">
                    <View className="w-full bg-[#1a1d29] p-4 py-4">
                        <View className="flex flex-row gap-x-2">
                            <View>
                                <FontAwesome name="location-arrow" size={20} color="red" />
                            </View>
                            <Text className="text-md font-semibold text-gray-200 line-clamp-1 w-10/12 break-all" numberOfLines={1}>
                                {thisInserat.address.postalCode} 
                                <Text className="text-xs" numberOfLines={1}> {thisInserat.address.locationString}  </Text>
                            </Text>
                        </View>
                    </View>
                    <View className="w-full bg-[#1a1d29] p-4 py-2">
                        <View>
                            <Text className="text-md font-bold text-gray-200 line-clamp-1 w-10/12 break-all" numberOfLines={1}>
                                {thisInserat.price} <Text className="text-xs text-gray-300">/Tag</Text> €
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="flex flex-row py-2 px-2 items-center gap-x-4">
                    <View className="flex ">
                        <Image
                            className="w-10 h-10 rounded-md "
                            source={{
                                uri: thisInserat.user?.image,
                            }}
                        />
                    </View>
                    <Text className="text-md font-semibold text-gray-200 line-clamp-1 w-10/12 break-all" numberOfLines={1}>
                        {thisInserat.user?.name} 
                    </Text>
                </View>
                
            </View>
            
        </View>
    );
}

export default InseratCard;