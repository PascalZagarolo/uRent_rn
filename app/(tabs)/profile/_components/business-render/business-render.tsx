import { View } from "react-native";
import BusinessBannerRender from "./_components/business-banner";
import { userTable, businessAddress } from '@/db/schema';
import { format } from "date-fns";
import Businessdescription from "./_components/business-description";
import ContentBusinessRender from "./_components/content";


interface BusinessRenderProps {
    thisUser: typeof userTable.$inferSelect & { business};
    isOwner: boolean;
    setOpenLocation: (open: boolean, id: string, type: string) => void;
    setOpenOpeningTimes: (open: boolean) => void;
    setOpenDialogImage: (open: boolean) => void;
    setOpenDialogBanner: (open: boolean) => void;
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

const BusinessRender = ({ thisUser, isOwner, setOpenLocation, setOpenOpeningTimes, foundAddresses, foundOpeningTimes, setOpenDialogImage, setOpenDialogBanner }: BusinessRenderProps) => {

    

    return (
        
      
            <View className="flex flex-col h-full">
                <View>
                    <BusinessBannerRender
                    setOpenImageDialog={(open) => setOpenDialogImage(open)}
                    setOpenDialogBanner={(open) => setOpenDialogBanner(open)}
                        thisImage={thisUser?.business?.businessImages[0]?.url ?? null}
                        thisProfilePic={thisUser?.image}
                        thisUsername={thisUser?.name}
                        createdAt={format(new Date(thisUser?.createdAt), "dd.MM.yyyy")}
                    />
                </View>
                <View className="mt-32 px-4">
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