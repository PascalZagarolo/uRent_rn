import { inserat, userTable } from "@/db/schema";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";
import { Image } from 'expo-image';
import placeholderPicture from "@/assets/images";


interface InseratCardProps {
    thisInserat: typeof inserat.$inferSelect & { user, images};
    currentUser: typeof userTable.$inferSelect;
    onFav: (inseratId: string) => void;
    isFaved: boolean;
}

const InseratCard: React.FC<InseratCardProps> = ({
    thisInserat,
    currentUser,
    onFav,
    isFaved
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
        <View className="bg-[#262a3bc5]  w-full shadow-lg ">
            <View>

                <TouchableOpacity
                    className="flex flex-row gap-x-4 items-center px-4 py-4 w-full"
                    onPress={() => { router.push(`/inserat/${thisInserat.id}`) }}
                >
                    <View>
                        {matchingIcon(thisInserat.category)}
                    </View>
                    <Text
                        className="text-lg font-medium text-gray-200 line-clamp-1 w-9/12 mr-4 break-all"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {thisInserat.title}
                    </Text>
                    <TouchableOpacity
                        className="w-1/12 justify-end ml-auto flex flex-row"
                        onPress={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // Prevents the event from reaching the parent
                            onFav(thisInserat.id);
                        }}
                    >
                        {isFaved ? (
                            <Ionicons size={24} name="bookmark" color="white" />
                        ) : (
                            <Ionicons size={24} name="bookmark-outline" color="white" />
                        )}
                    </TouchableOpacity>
                </TouchableOpacity>



                <View className="px-2">
                    <Image
                        className="w-full h-40  rounded-t-lg"
                        source={{

                            uri: thisInserat.images[0].url
                        }}
                    />
                
                </View>
                <View className=" bg-[#262a3bc5] ">
                    <View className="w-full  p-4 py-4">
                        <View className="flex flex-row gap-x-2">
                            <View>
                                <FontAwesome name="map-marker" size={20} color="red" />
                            </View>
                            <Text className="text-base font-semibold text-gray-200 line-clamp-1 w-10/12 break-all" numberOfLines={1}>
                                {//@ts-ignore
                                    thisInserat.address.postalCode} 
                                <Text className="text-sm" numberOfLines={1}> | { //@ts-ignore
                                    thisInserat.address.locationString}  </Text>
                            </Text>
                        </View>
                    </View>
                    <View className="w-full bg-[#262a3bc5] px-4 pb-2 ">
                        <View>
                            <Text className="text-lg font-bold text-gray-200 line-clamp-1 w-10/12 break-all" numberOfLines={1}>
                                {thisInserat.price} <Text className="text-xs text-gray-300">/Tag</Text> €
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity className="flex flex-row py-2.5 px-2 sm:px-0 items-center gap-x-4 sm:gap-x-0 sm:w-full bg-[#1d1e25d7]"
                    onPress={() => { router.push(`/profile/${thisInserat?.user?.id}`) }}
                >
                    <View className="flex ">
                    <Image
                            className="w-10 h-10 rounded-full "
                            source={{

                                uri: thisInserat.user?.image ? thisInserat.user?.image : 
                                placeholderPicture
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