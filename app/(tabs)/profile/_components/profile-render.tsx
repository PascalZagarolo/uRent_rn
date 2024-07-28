import { userTable } from "@/db/schema";
import { Image, Text, View } from "react-native";
import ProfileDescription from "./profile-description";
import ProfileStandort from "./profile-standort";
import ProfileContact from "../profile-contact";
import ProfileOpeningTimes from "./profile-opening-times";
import ProfilePaymentMethods from "./profile-payments";
import { paymentMethods } from '../../../../db/schema';
import ProfileFaqs from "./profile-faqs";

interface ProfileRenderProps {
    thisUser : typeof userTable.$inferSelect | any;
}

const ProfileRender : React.FC<ProfileRenderProps> = ({
    thisUser
}) => {

    const usedDescription = thisUser?.isBusiness ? thisUser?.business?.description : thisUser?.description;
    
    console.log(thisUser.business?.faqs)

    return ( 
        <View className="bg-[#1F2332] h-full">
            <View>
                <View className="border-b border-gray-800 p-4 bg-[#181b27]">
                    <Text className="text-xl font-semibold text-gray-200">
                        {thisUser?.isBusiness ? "Vermieterdetails" : "Nutzerdetails"}
                    </Text>
                </View>
                <View className="p-4 flex flex-row items-center">
                    <View className="w-1/4">
                        <Image 
                        source={{uri : thisUser?.image}}
                        className="w-20 h-20 rounded-full"
                        />
                    </View>
                    <View className="w-3/4">
                    <Text className="text-lg font-semibold text-gray-200">
                    {thisUser?.name}
                    </Text>
                    {thisUser?.sharesRealName && (
                        <Text className="text-sm text-gray-200 font-medium">
                            {thisUser?.vorname} {thisUser?.nachname}
                        </Text>
                    )}
                    {thisUser?.sharesEmail && (
                        <Text className="text-sm text-gray-200 font-semibold">
                            {thisUser?.email}
                        </Text>
                    )}
                    </View>
                </View>
                <View>
                    <ProfileDescription 
                    thisDescription={usedDescription}
                    thisName={thisUser?.name}
                    />
                </View>
                {thisUser?.isBusiness && (
                    <ProfileStandort 
                    thisBusiness = {thisUser?.business }
                    />
                )}
                {thisUser?.isBusiness && (
                    <ProfileContact 
                    thisEmail={thisUser?.business?.email as string}
                    thisFax={thisUser?.business?.fax as string}
                    thisNumber={thisUser?.business?.telephone_number as string}
                    thisWebsite={thisUser?.business?.website as string}
                    />
                )}
                {thisUser?.isBusiness && (
                    <ProfileOpeningTimes 
                        thisOpeningTimes={thisUser?.business?.openingTimes as any}
                    />
                )}
                {thisUser?.isBusiness && (
                    <ProfilePaymentMethods 
                        thisPaymentMethods={thisUser.paymentMethods as any}
                    />
                )}
                {(thisUser?.isBusiness && thisUser?.business?.faqs > 0) && (
                    <ProfileFaqs 
                    thisQuestions={thisUser?.business?.faqs as any}
                    />
                )}
            </View>
        </View>
     );
}
 
export default ProfileRender;