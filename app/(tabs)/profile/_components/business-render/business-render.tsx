import { View } from "react-native";
import BusinessBannerRender from "./_components/business-banner";
import { userTable, businessAddress } from '@/db/schema';
import { format } from "date-fns";
import Businessdescription from "./_components/business-description";
import ContentBusinessRender from "./_components/content";


interface BusinessRenderProps {
    imageUrl : string | null;
    bannerUrl : string | null;
    thisUser: typeof userTable.$inferSelect & { business };
    currentUser : typeof userTable.$inferSelect | any;
    isOwner: boolean;
    setOpenLocation: (open: boolean, id: string, type: string) => void;
    setOpenOpeningTimes: (open: boolean) => void;
    setOpenDialogImage: (open: boolean) => void;
    setOpenDialogBanner: (open: boolean) => void;
    setOpenReportModal: (open: boolean) => void;
    foundAddresses : typeof businessAddress.$inferSelect[];
    
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

const BusinessRender = ({ thisUser, currentUser, bannerUrl, imageUrl, isOwner, setOpenLocation, setOpenOpeningTimes, setOpenReportModal, foundAddresses, foundOpeningTimes, setOpenDialogImage, setOpenDialogBanner }: BusinessRenderProps) => {

    

    return (
        
      
            <View className="flex flex-col h-full">
                <View>
                    <BusinessBannerRender
                    isOwner={isOwner}
                    thisUserId={thisUser ? thisUser?.id : null}
                    currentUserId={currentUser ? currentUser?.id : null }
                    setOpenImageDialog={(open) => setOpenDialogImage(open)}
                    setOpenReportModal={(open) => setOpenReportModal(open)}
                    setOpenDialogBanner={(open) => setOpenDialogBanner(open)}
                        thisImage={bannerUrl ?? null}
                        thisProfilePic={imageUrl}
                        thisUsername={thisUser?.name}
                        createdAt={format(new Date(thisUser?.createdAt), "dd.MM.yyyy")}
                    />
                </View>
                <View className="mt-8 px-4">
                    <Businessdescription
                        username={thisUser?.name}
                        isOwnProfile={isOwner}
                        thisDescription={thisUser?.business?.description ?? ""}
                    />
                </View>
                <View className="">
                <ContentBusinessRender 
                    thisUser={thisUser}
                    isOwn={isOwner}
                    setOpenLocation={(value1, value2, value3) => setOpenLocation(value1, value2, value3)}
                    setOpenOpeningTimes={(value) => setOpenOpeningTimes(value)}
                    foundAddresses={foundAddresses}
                    foundOpeningTimes={foundOpeningTimes}
                    />
                </View>
            </View>
      
    );
}

export default BusinessRender;