import { Text, View } from "react-native";
import BusinessBannerRender from "./_components/business-banner";
import { userTable, businessAddress } from '@/db/schema';
import { format } from "date-fns";
import Businessdescription from "./_components/business-description";
import ContentBusinessRender from "./_components/content";


interface BusinessRenderProps {
    thisUser: typeof userTable.$inferSelect;
    isOwner: boolean;
    setOpenLocation: (open: boolean, id: string, type: string) => void;
    foundAddresses : typeof businessAddress.$inferSelect[];
}

const BusinessRender = ({ thisUser, isOwner, setOpenLocation, foundAddresses }: BusinessRenderProps) => {

    

    return (
        <View>
            <View className="flex flex-col min-h-screen">
                <View>
                    <BusinessBannerRender
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
                <View>
                    <ContentBusinessRender 
                    thisUser={thisUser}
                    isOwn={isOwner}
                    setOpenLocation={(value1, value2, value3) => setOpenLocation(value1, value2, value3)}
                    foundAddresses={foundAddresses}
                    />
                </View>
            </View>
        </View>
    );
}

export default BusinessRender;