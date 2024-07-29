import { businessAddress } from "@/db/schema";
import { Text, View } from "react-native";
import ProfileStandortRender from "./profile-standort-render";
import { cn } from "@/~/lib/utils";
import { Entypo, FontAwesome } from "@expo/vector-icons";

interface ProfileStandortProps {
    thisBusiness : typeof businessAddress.$inferSelect[] | any;
}

const ProfileStandort : React.FC<ProfileStandortProps> = ({
    thisBusiness
}) => {
    return ( 
        <View className={cn("p-4")}>
            <View>
                <Text className="text-lg font-semibold text-gray-200">
                   <Entypo className="" name="location" size={20} /> Standort
                </Text>
            </View>
            <View className="">
                {
                    thisBusiness?.businessAddresses.length === 0 ? (
                        <Text className="mt-2 text-gray-200/60">
                            Keine Standorte hinzugefügt..
                        </Text>
                    ) : (
                        thisBusiness?.businessAddresses.map((address) => (
                           
                                <View className="mt-2" key={address.id}>
                                    <ProfileStandortRender key={address.id}
                                thisAddress = {address}
                            />
                                </View>
                            
                        ))
                    )
                }
            </View>
        </View>
     );
}
 
export default ProfileStandort;