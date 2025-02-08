import { inserat, userTable } from "@/db/schema";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { address } from '../../db/schema';
import { useRouter } from "expo-router";
import { BookmarkIcon, StarIcon } from "lucide-react-native";


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
        <View className="bg-[#2b2e41]  w-full">
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
                        className="w-1/12"
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
                <View className=" bg-[#2b2e41] border-t border-b border-gray-800">
                    <View className="w-full  p-4 py-4">
                        <View className="flex flex-row gap-x-2">
                            <View>
                                <FontAwesome name="location-arrow" size={20} color="red" />
                            </View>
                            <Text className="text-base font-semibold text-gray-200 line-clamp-1 w-10/12 break-all" numberOfLines={1}>
                                {//@ts-ignore
                                    thisInserat.address.postalCode} 
                                <Text className="text-sm" numberOfLines={1}> | { //@ts-ignore
                                    thisInserat.address.locationString}  </Text>
                            </Text>
                        </View>
                    </View>
                    <View className="w-full bg-[#2b2e41] px-4 pb-2 ">
                        <View>
                            <Text className="text-lg font-bold text-gray-200 line-clamp-1 w-10/12 break-all" numberOfLines={1}>
                                {thisInserat.price} <Text className="text-xs text-gray-300">/Tag</Text> €
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity className="flex flex-row py-2.5 px-2 items-center gap-x-4 bg-[#151720]"
                    onPress={() => { router.push(`/profile/${thisInserat?.user?.id}`) }}
                >
                    <View className="flex ">
                    <Image
                            className="w-10 h-10 rounded-full "
                            source={{

                                uri: thisInserat.user?.image ? thisInserat.user?.image : "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
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