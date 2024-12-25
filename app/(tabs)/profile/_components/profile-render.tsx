import { businessAddress, userTable } from "@/db/schema";
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from "react-native";
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
        <KeyboardAvoidingView
        
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100} // Adjust based on your header height
    >
        <View className=" h-full w-full">
           
                <SafeAreaView>
                <View className="border-b border-gray-800 p-4 bg-[#181b27]">
                    <Text className="text-xl font-semibold text-gray-200">
                        {thisUser?.isBusiness ? "Vermieterdetails" : "Nutzerdetails"}
                    </Text>
                </View>
                </SafeAreaView>
               
                <ScrollView className=" bg-[#1F2332]">
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
                </ScrollView>
            
        </View>
        </KeyboardAvoidingView> 
     );
}
 
export default ProfileRender;