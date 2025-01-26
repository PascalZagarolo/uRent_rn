import { business, userTable } from "@/db/schema";
import { Feather, FontAwesome, FontAwesome5, Foundation, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns/format";
import { useRouter } from "expo-router";

import { Image, Text, TouchableOpacity, View } from "react-native";
import { businessAddress, address } from '../../../../db/schema';

interface InseratProfileProps {
    thisUser : typeof userTable.$inferSelect & { inserat, business : typeof business.$inferSelect & { businessAddresses : typeof businessAddress.$inferSelect[] } };
    
}


const InseratProfile : React.FC<InseratProfileProps> = ({
    thisUser
}) => {

    console.log(thisUser?.business.businessAddresses?.length)

    const publicInserate = thisUser?.inserat.filter(inserat => inserat.isPublished);

    const foundMainAddress = thisUser?.business?.businessAddresses?.filter(address => address?.isPrimary);

    const router = useRouter();

    return ( 
        <View>
            <View className="flex flex-row items-center gap-x-4">
            <Image source={{uri: thisUser.image }} style={{width: 50, height: 50}} 
                className="rounded-md"
                />
            <Text className="text-lg font-semibold w-3/4 text-gray-200 break-all line-clamp-1" numberOfLines={1}>
                {thisUser.name} 
            </Text>
            </View>
            <View className="mt-4 space-y-4">
            <View className="flex flex-row items-center gap-x-4">
                        <MaterialIcons name="public" size={20} color="white" className="text-indigo-800 bg-indigo-800" />
                        <Text className="text-gray-200 font-semibold break-all line-clamp-1 text-md" numberOfLines={1}>
                            {publicInserate.length} Inserate online
                        </Text>
                    </View>
                {(thisUser?.sharesRealName && (thisUser?.vorname || thisUser?.nachname)) && (
                    <View className="flex flex-row items-center gap-x-4">
                        <FontAwesome name="user-circle" size={20} color="white" />
                        <Text className="text-gray-200 font-medium break-all line-clamp-1" numberOfLines={1}>
                            {thisUser.vorname} {thisUser.nachname}
                        </Text>
                    </View>
                )}
                {thisUser?.sharesEmail && (
                    <View className="flex flex-row items-center gap-x-4">
                        <FontAwesome name="envelope" size={20} color="white" />
                        <Text className="text-gray-200 font-medium break-all line-clamp-1" numberOfLines={1}>
                            {thisUser.email}
                        </Text>
                    </View>
                )}
                {thisUser?.createdAt && (
                    <View className="flex flex-row items-center gap-x-4">
                        <FontAwesome name="calendar" size={20} color="white" />
                        <Text className="text-gray-200 font-medium break-all line-clamp-1" numberOfLines={1}>
                            Mitglied seit: {format(new Date(thisUser.createdAt), "dd.MM.yyyy")}
                        </Text>
                    </View>
                )}
{thisUser?.isBusiness && (
                    <View className="py-4 w-full border-b border-t border-gray-800">
                        {thisUser?.business.businessAddresses?.length > 0 && (
                            <View>
                                <View className="flex flex-row items-center gap-x-4">
                                    <FontAwesome name="map-marker" size={20} color="red" />
                                    <Text className="text-md font-semibold text-gray-200">
                                    Firmenstandort
                                    </Text>
                                </View>
                                <View className="mt-2">
                                    <Image
                                    source={{uri: foundMainAddress[0].image }}
                                    className="w-full h-32 object-cover"
                                    />
                                    <Text className="mt-2 ml-auto text-sm font-medium text-gray-200">
                                    {foundMainAddress[0]?.street ? foundMainAddress[0]?.street + ", " : ""} 
                                    {foundMainAddress[0]?.postalCode} {foundMainAddress[0]?.city}
                                    </Text>
                                </View>
                            </View>  
                        )}
                        <View className="py-4">
                            <View className="w-full mb-4">
                                <Text className="text-md font-semibold text-gray-200">
                                    Weitere Kontaktdaten
                                </Text>
                            </View>
                            <View className="flex flex-row items-center">
                                <View className="w-1/6 flex flex-row items-center gap-x-4">
                                    
                                    <Feather name="globe" size={20} color="white" />
                                    
                                </View>
                                <View className="w-5/6">
                                    <Text className="text-md font-medium text-gray-200 underline">
                                        {thisUser?.business?.website ? thisUser?.business?.website : "-"}
                                    </Text>
                                </View>
                            </View>

                            <View className="flex flex-row items-center mt-4">
                                <View className="w-2/6 flex flex-row items-center gap-x-4">
                                    
                                    <View>
                                    <Ionicons name="mail-outline" size={20} color="white" />
                                    </View>
                                    <Text className="text-md font-medium text-gray-200">
                                    Email
                                    </Text>
                                </View>
                                <View className="w-4/6">
                                    <Text className="text-md font-medium text-gray-200">
                                        {thisUser?.business?.email ? thisUser?.business?.email : "-"}
                                    </Text>
                                </View>
                            </View>
                            <View className="flex flex-row items-center mt-2">
                                <View className="w-2/6 flex flex-row items-center gap-x-4">
                                <View className="w-1/6">
                                    <FontAwesome name="phone" size={20} color="white" />
                                    </View>
                                    <Text className="text-md font-medium text-gray-200">
                                        Tel.
                                    </Text>
                                </View>
                                <View className="w-4/6">
                                    <Text className="text-md font-medium text-gray-200">
                                        {thisUser?.business?.telephone_number ? thisUser?.business?.telephone_number : "-"}
                                    </Text>
                                </View>
                            </View>
                            <View className="flex flex-row items-center mt-2">
                                <View className="w-2/6 flex flex-row items-center gap-x-4">
                                    
                                    <FontAwesome5 name="fax" size={20} color="white" />
                                    <Text className="text-md font-medium text-gray-200">
                                        Fax
                                    </Text>
                                </View>
                                <View className="w-4/6">
                                    <Text className="text-md font-medium text-gray-200">
                                        {thisUser?.business?.fax ? thisUser?.business?.fax : "-"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
)}
                <TouchableOpacity onPress={() => {router.push(`/profile/${thisUser.id}`)}} className="bg-[#242635] 
                p-2 mt-2 rounded-md w-full flex justify-center flex-row space-x-4">
                    <FontAwesome name="user" size={20} color="white" />
                        <Text className="text-sm text-gray-200 font-semibold items-center flex justify-center text-center">
                            Zum Profil
                        </Text>
                </TouchableOpacity>
            </View>
        </View>
     );
}
 
export default InseratProfile;