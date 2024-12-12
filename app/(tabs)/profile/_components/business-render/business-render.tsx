import { Text, View } from "react-native";
import BusinessBannerRender from "./_components/business-banner";
import { userTable } from "@/db/schema";
import { format } from "date-fns";
import Businessdescription from "./_components/business-description";
import ContentBusinessRender from "./_components/content";

interface BusinessRenderProps {
    thisUser: typeof userTable.$inferSelect;
}

const BusinessRender = ({ thisUser }: BusinessRenderProps) => {

    

    return (
        <View>
            <View className="flex flex-col h-full">
                <View>
                    <BusinessBannerRender
                        thisImage={thisUser?.business?.businessImages[0]?.url ?? null}
                        thisProfilePic={thisUser?.image}
                        thisUsername={thisUser?.name}
                        createdAt={format(new Date(thisUser?.createdAt), "dd.MM.yyyy")}
                    />
                </View>
                <View className="mt-24 px-4">
                    <Businessdescription
                        username={thisUser?.name}
                        isOwnProfile={true}
                        thisDescription={thisUser?.business?.description ?? ""}
                    />
                </View>
                <View>
                    <ContentBusinessRender />
                </View>
            </View>
        </View>
    );
}

export default BusinessRender;