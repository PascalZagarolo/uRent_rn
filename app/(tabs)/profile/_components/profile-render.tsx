import { businessAddress, userTable } from "@/db/schema";
import { Image, Text, View } from "react-native";
import ProfileDescription from "./profile-description";
import ProfileStandort from "./profile-standort";
import ProfileContact from "../profile-contact";
import ProfileOpeningTimes from "./profile-opening-times";
import ProfilePaymentMethods from "./profile-payments";
import { paymentMethods } from '../../../../db/schema';
import ProfileFaqs from "./profile-faqs";
import ProfileImprint from "./profile-imprint";
import { is } from 'drizzle-orm';
import BusinessRender from "./business-render/business-render";
import ProfileRenderFull from "./profile-render/profile-render";

interface ProfileRenderProps {
    thisUser : typeof userTable.$inferSelect | any;
    isOwner : boolean;
    setOpenLocation : (open : boolean, id : string, type : any) => void;
    foundAddresses : typeof businessAddress.$inferSelect[];
}

const ProfileRender : React.FC<ProfileRenderProps> = ({
    thisUser,
    isOwner,
    setOpenLocation,
    foundAddresses
}) => {
    
    const usedDescription = thisUser?.isBusiness ? thisUser?.business?.description : thisUser?.description;
    
    return ( 
        <View className="bg-[#1F2332] h-full w-full">
            <View>
                <View className="border-b border-gray-800 p-4 bg-[#181b27]">
                    <Text className="text-xl font-semibold text-gray-200">
                        {thisUser?.isBusiness ? "Vermieterdetails" : "Nutzerdetails"}
                    </Text>
                </View>
               
                {thisUser?.isBusiness ? (
                    <BusinessRender 
                    thisUser={thisUser}
                    isOwner={isOwner}
                    foundAddresses={foundAddresses}
                    setOpenLocation={(value1, value2, value3) => setOpenLocation(value1, value2, value3)}
                    />
                ) : (
                    <ProfileRenderFull />
                )}
            </View>
        </View>
     );
}
 
export default ProfileRender;