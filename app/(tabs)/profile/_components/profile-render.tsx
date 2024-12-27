import { businessAddress, userTable } from "@/db/schema";
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from "react-native";

import BusinessRender from "./business-render/business-render";
import ProfileRenderFull from "./profile-render/profile-render";


interface ProfileRenderProps {
    thisUser: typeof userTable.$inferSelect | any;
    isOwner: boolean;
    setOpenLocation: (open: boolean, id: string, type: any) => void;
    setOpenOpeningTimes: (open: boolean) => void;
    foundAddresses: typeof businessAddress.$inferSelect[];
    foundOpeningTimes : {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    }
}

const ProfileRender: React.FC<ProfileRenderProps> = ({
    thisUser,
    isOwner,
    setOpenLocation,
    setOpenOpeningTimes,
    foundAddresses,
    foundOpeningTimes
}) => {

    const usedDescription = thisUser?.isBusiness ? thisUser?.business?.description : thisUser?.description;

    return (



        


            <ScrollView className=" bg-[#1F2332] h-full">
                <KeyboardAvoidingView

                    keyboardVerticalOffset={100}
                    behavior="position"
                >
                    {thisUser?.isBusiness ? (
                        <BusinessRender
                            thisUser={thisUser}
                            isOwner={isOwner}
                            foundAddresses={foundAddresses}
                            setOpenLocation={(value1, value2, value3) => setOpenLocation(value1, value2, value3)}
                            setOpenOpeningTimes={(value) => setOpenOpeningTimes(value)}
                            foundOpeningTimes={foundOpeningTimes}
                        />
                    ) : (
                        <ProfileRenderFull />
                    )}
                </KeyboardAvoidingView>

            </ScrollView>
        



    );
}

export default ProfileRender;