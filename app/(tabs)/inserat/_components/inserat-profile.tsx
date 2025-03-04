import { business, userTable } from "@/db/schema";
import { Feather, FontAwesome, FontAwesome5, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns/format";
import { useRouter } from "expo-router";

import { Image, Text, TouchableOpacity, View } from "react-native";
import { businessAddress } from '../../../../db/schema';
import placeholderPicture from "@/assets/images";

interface InseratProfileProps {
    thisUser: typeof userTable.$inferSelect & { inserat, business: typeof business.$inferSelect & { businessAddresses: typeof businessAddress.$inferSelect[] } };

}


const InseratProfile: React.FC<InseratProfileProps> = ({
    thisUser
}) => {

    console.log(thisUser?.business.businessAddresses?.length)

    const publicInserate = thisUser?.inserat.filter(inserat => inserat.isPublished);

    const foundMainAddress = thisUser?.business?.businessAddresses?.filter(address => address?.isPrimary);

    const router = useRouter();

    return (
        <View className="px-2 ">
            <View className="flex flex-row items-center gap-x-4">
                <Image source={{ uri: thisUser.image ?? placeholderPicture }}
                    className="w-10 h-10 rounded-full"
                />
                <Text className="text-lg font-semibold w-3/4 text-gray-200 break-all line-clamp-1" numberOfLines={1}>
                    {thisUser.name}
                </Text>
            </View>
            <View className=" mt-2 space-y-2">
                <View className="flex flex-row items-center gap-x-2">

                    <Text className="text-gray-200/80 font-semibold break-all line-clamp-1 text-md" numberOfLines={1}>
                        {publicInserate.length} Inserate online
                    </Text>
                </View>
                {(thisUser?.sharesRealName && (thisUser?.vorname || thisUser?.nachname)) && (
                    <View className="flex flex-row items-center gap-x-4">
                        <FontAwesome name="user-circle" size={16} color="white" />
                        <Text className="text-gray-200 font-medium break-all line-clamp-1" numberOfLines={1}>
                            {thisUser.vorname} {thisUser.nachname}
                        </Text>
                    </View>
                )}
                {thisUser?.sharesEmail && (
                    <View className="flex flex-row items-center gap-x-4">
                        <FontAwesome name="envelope" size={16} color="white" />
                        <Text className="text-gray-200 font-medium break-all line-clamp-1" numberOfLines={1}>
                            {thisUser.email}
                        </Text>
                    </View>
                )}
                {thisUser?.createdAt && (
                    <View className="flex flex-row items-center gap-x-4">

                        <Text className="text-gray-200/60 text-xs font-medium break-all line-clamp-1" numberOfLines={1}>
                            Mitglied seit: {format(new Date(thisUser.createdAt), "dd.MM.yyyy")}
                        </Text>
                    </View>
                )}
                {thisUser?.isBusiness && (
                    <View className=" w-full  border-gray-800 ">
                        {thisUser?.business.businessAddresses?.length > 0 && (
                            <View className="mt-4">
                                <View className="flex flex-row items-center gap-x-4">
                                    <FontAwesome name="map-marker" size={16} color="red" />
                                    <Text className="text-md font-semibold text-gray-200">
                                        Firmenstandort
                                    </Text>
                                </View>
                                <View className="mt-2">
                                    {foundMainAddress[0].image ? (
                                        <Image
                                            source={{ uri: foundMainAddress[0].image }}
                                            className="w-full h-32 object-cover shadow-lg rounded-md"
                                        />
                                    ) : (
                                        <View
                                            className="h-32 flex flex-row items-center justify-center"
                                        >
                                            <MaterialCommunityIcons name="image" size={20} color={"white"} />
                                        </View>
                                    )}
                                    <Text className="mt-2 ml-auto text-sm font-medium text-gray-200">
                                        {foundMainAddress[0]?.street ? foundMainAddress[0]?.street + ", " : ""}
                                        {foundMainAddress[0]?.postalCode} {foundMainAddress[0]?.city}
                                    </Text>
                                </View>
                            </View>
                        )}
                        {(thisUser?.business?.website || thisUser?.business?.email || thisUser?.business?.telephone_number || thisUser?.business?.fax) && (
                        <View className="py-4">
                            
                                <View className="w-full ">
                                <Text className="text-base font-semibold text-gray-200">
                                    Kontaktdaten
                                </Text>
                            </View>
                           
                            {thisUser?.business?.website && (
                                <View className="flex flex-row items-center mt-2">
                                    <View className="w-2/6 flex flex-row items-center gap-x-4">

                                        <Feather name="globe" size={16} color="white" />
                                        <Text className="text-md font-medium text-gray-200/80">
                                            Website
                                        </Text>
                                    </View>
                                    <View className="w-5/6">
                                        <Text className="text-md font-medium text-gray-200 ">
                                            {thisUser?.business?.website ? thisUser?.business?.website : "-"}
                                        </Text>
                                    </View>
                                </View>
                            )}

                            {thisUser?.business?.email && (
                                <View className="flex flex-row items-center mt-2">
                                    <View className="w-2/6 flex flex-row items-center gap-x-4">

                                        <View>
                                            <Ionicons name="mail-unread" size={16} color="white" />
                                        </View>
                                        <Text className="text-md font-medium text-gray-200/80">
                                            Email
                                        </Text>
                                    </View>
                                    <View className="w-4/6">
                                        <Text className="text-md font-medium text-gray-200">
                                            {thisUser?.business?.email ? thisUser?.business?.email : "-"}
                                        </Text>
                                    </View>
                                </View>
                            )}

                            {thisUser?.business?.telephone_number && (
                                <View className="flex flex-row items-center mt-2">
                                    <View className="w-2/6 flex flex-row items-center gap-x-4">

                                        <FontAwesome name="phone-square" size={16} color="white" />
                                        <Text className="text-md font-medium text-gray-200/80">
                                            Telefon
                                        </Text>
                                    </View>
                                    <View className="w-4/6">
                                        <Text className="text-md font-medium text-gray-200/80">
                                            {thisUser?.business?.telephone_number ? thisUser?.business?.telephone_number : "-"}
                                        </Text>
                                    </View>
                                </View>
                            )}
                            {thisUser?.business?.fax && (
                                <View className="flex flex-row items-center mt-2">
                                <View className="w-2/6 flex flex-row items-center gap-x-4">

                                    <FontAwesome5 name="fax" size={16} color="white" />
                                    <Text className="text-md font-medium text-gray-200/80">
                                        Fax
                                    </Text>
                                </View>
                                <View className="w-4/6">
                                    <Text className="text-md font-medium text-gray-200">
                                        {thisUser?.business?.fax ? thisUser?.business?.fax : "-"}
                                    </Text>
                                </View>
                            </View>
                            
                            )}
                            
                            </View> )}
                    </View>
                )}
                <TouchableOpacity onPress={() => { router.push(`/profile/${thisUser.id}`) }} className="bg-[#242635] 
                p-2 mt-2 rounded-md w-full flex justify-center flex-row space-x-4">
                    <FontAwesome name="user" size={16} color="white" />
                    <Text className="text-sm text-gray-200 font-semibold items-center flex justify-center text-center">
                        Zum Profil
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default InseratProfile;