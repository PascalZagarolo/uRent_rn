import { businessAddress, userTable } from "@/db/schema";
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from "react-native";

import BusinessRender from "./business-render/business-render";
import ProfileRenderFull from "./profile-render/profile-render";
import { format, set } from 'date-fns';


interface ProfileRenderProps {
    thisUser: typeof userTable.$inferSelect | any;
    currentUser : typeof userTable.$inferSelect | any;
    isOwner: boolean;
    imageUrl : string;
    bannerUrl : string;
    setOpenLocation: (open: boolean, id: string, type: any) => void;
    setOpenOpeningTimes: (open: boolean) => void;
    setOpenDialogImage: (open: boolean) => void;
    setOpenDialogBanner: (open: boolean) => void;
    setOpenSwitchProfile: (open: boolean) => void;
    setOpenReportModal: (open: boolean) => void;
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
    currentUser,
    isOwner,
    imageUrl,
    bannerUrl,
    setOpenLocation,
    setOpenOpeningTimes,
    setOpenDialogBanner,
    setOpenReportModal,
    foundAddresses,
    foundOpeningTimes,
    setOpenDialogImage,
    setOpenSwitchProfile
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
                            imageUrl = {imageUrl}
                            bannerUrl = {bannerUrl}
                            thisUser={thisUser}
                            currentUser={currentUser}
                            isOwner={isOwner}
                            foundAddresses={foundAddresses}
                            setOpenDialogImage={(open) => setOpenDialogImage(open)}
                            setOpenReportModal={(open) => setOpenReportModal(open)}
                            setOpenLocation={(value1, value2, value3) => setOpenLocation(value1, value2, value3)}
                            setOpenOpeningTimes={(value) => setOpenOpeningTimes(value)}
                            setOpenDialogBanner={(open) => setOpenDialogBanner(open)}
                            foundOpeningTimes={foundOpeningTimes}
                        />
                    ) : (
                        <ProfileRenderFull 
                        imageUrl = {imageUrl}
                        thisUsername={thisUser?.name}
                        thisProfilePic={thisUser?.image}
                        createdAt={format(new Date(thisUser?.createdAt), "dd.MM.yyyy")}
                        setOpenImageDialog={(open) => setOpenDialogImage(open)}
                        setOpenReportModal={(open) => setOpenReportModal(open)}
                        setOpenSwitchProfile={(open) => setOpenSwitchProfile(open)}
                        thisDescription={usedDescription}
                        ownProfile={isOwner}
                        />
                    )}
                </KeyboardAvoidingView>

            </ScrollView>
        



    );
}

export default ProfileRender;