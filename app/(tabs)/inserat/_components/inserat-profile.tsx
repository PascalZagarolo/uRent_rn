import { business, userTable } from "@/db/schema";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns/format";
import { useRouter } from "expo-router";

import { Image, Text, TouchableOpacity, View } from "react-native";

interface InseratProfileProps {
    thisUser : typeof userTable.$inferSelect;
    
}


const InseratProfile : React.FC<InseratProfileProps> = ({
    
    thisUser
}) => {

    const publicInserate = thisUser?.inserat.filter(inserat => inserat.isPublished);

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