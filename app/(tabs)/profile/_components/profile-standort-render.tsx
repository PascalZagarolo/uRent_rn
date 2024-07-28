import { businessAddress } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

interface ProfileStandortRenderProps {
    thisAddress : typeof businessAddress.$inferSelect;
}

const ProfileStandortRender : React.FC<ProfileStandortRenderProps>  = ({
    thisAddress
}) => {

    

    return ( 
        <View className={cn("bg-[#181b27] rounded-md p-4", thisAddress.isPrimary && "border border-rose-800")}>
            
            <View className="mt-2">
                <Image 
                source={{uri : thisAddress?.image}}
                className="w-full h-32"
                />
            </View>
            <View className="mt-2">
                <Text className="text-sm text-gray-200 space-x-2 flex flex-row items-center line-clamp-1" numberOfLines={1}>
                    <View className="mr-2">
                        <FontAwesome name="location-arrow" size={20} color="#f8f8f8" />
                    </View>
                   {thisAddress?.street}, {thisAddress?.postalCode} {thisAddress?.city}
                </Text>
            </View>
        </View>
     );
}
 
export default ProfileStandortRender;