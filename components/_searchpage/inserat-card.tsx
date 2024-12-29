import { inserat } from "@/db/schema";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { address } from '../../db/schema';
import { useRouter } from "expo-router";
  

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

    const router = useRouter();



    return (
        <View className="bg-[#141620]  w-full">
            <View>
                
                    <TouchableOpacity className="flex flex-row gap-x-4 items-center px-4 py-4"
                    onPress={() => {router.push(`/inserat/${thisInserat.id}`)}}
                    >
                    <View>
                        {matchingIcon(thisInserat.category)}
                    </View>
                    <Text className="text-lg font-medium text-gray-200 line-clamp-1 w-10/12 break-all" numberOfLines={1}>
                        {thisInserat.title}
                    </Text>
                    </TouchableOpacity>
              
                <View className="px-2">
                    <Image
                        className="w-full h-40  rounded-t-lg"
                        source={{
                            
                            uri: thisInserat.images[0].url
                        }}
                    />

                </View>
                <View className=" bg-[#1a1d29] border-t border-b border-gray-800">
                    <View className="w-full  p-4 py-4">
                        <View className="flex flex-row gap-x-2">
                            <View>
                                <FontAwesome name="location-arrow" size={20} color="red" />
                            </View>
                            <Text className="text-md font-semibold text-gray-200 line-clamp-1 w-10/12 break-all" numberOfLines={1}>
                                {//@ts-ignore
                                thisInserat.address.postalCode} 
                                <Text className="text-xs" numberOfLines={1}> { //@ts-ignore
                                thisInserat.address.locationString}  </Text>
                            </Text>
                        </View>
                    </View>
                    <View className="w-full bg-[#1a1d29] p-4 py-4">
                        <View>
                            <Text className="text-md font-bold text-gray-200 line-clamp-1 w-10/12 break-all" numberOfLines={1}>
                                {thisInserat.price} <Text className="text-xs text-gray-300">/Tag</Text> €
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity className="flex flex-row py-2 px-2 items-center gap-x-4 bg-[#151720]"
            onPress={() => {router.push(`/profile/${thisInserat?.user?.id}`)}}
                >
                    <View className="flex ">
                        <Image
                            className="w-12 h-12 rounded-full "
                            source={{
                                
                                uri: thisInserat.user?.image ? thisInserat.user?.image : "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg"
                            }}
                        />
                    </View>
                    <Text className="text-base font-semibold text-gray-200 line-clamp-1 w-10/12 break-all" numberOfLines={1}>
                        {//@ts-ignore
                        thisInserat.user?.name} 
                    </Text>
                </TouchableOpacity>
                
            </View>
            
        </View>
    );
}

export default InseratCard;