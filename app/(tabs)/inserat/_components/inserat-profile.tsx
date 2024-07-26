import { business, userTable } from "@/db/schema";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns/format";

import { Image, Text, View } from "react-native";

interface InseratProfileProps {
    thisUser : typeof userTable.$inferSelect;
    
}


const InseratProfile : React.FC<InseratProfileProps> = ({
    
    thisUser
}) => {

    const publicInserate = thisUser?.inserat.filter(inserat => inserat.isPublished);

    return ( 
        <View>
            <View className="flex flex-row items-center gap-x-4">
            <View>
                <Image source={{uri: thisUser.image }} style={{width: 50, height: 50}} />
            </View>
            <Text className="text-lg font-semibold text-gray-200">
                {thisUser.name}
            </Text>
            </View>
            <View className="mt-4 space-y-4">
            <View className="flex flex-row items-center gap-x-4 mb-4">
                        <MaterialIcons name="public" size={20} color="white" />
                        <Text className="text-gray-200 font-medium break-all line-clamp-1" numberOfLines={1}>
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
                
            </View>
        </View>
     );
}
 
export default InseratProfile;