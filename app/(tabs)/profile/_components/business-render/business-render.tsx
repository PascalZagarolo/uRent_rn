import { Text, View } from "react-native";
import BusinessBannerRender from "./_components/business-banner";
import { userTable } from "@/db/schema";
import { format } from "date-fns";

interface BusinessRenderProps {
    thisUser : typeof userTable.$inferSelect;
}

const BusinessRender = ({ thisUser } : BusinessRenderProps) => {

    console.log(thisUser?.business);

    return ( 
        <View>
            <View className="flex flex-col ">
                <View>
                <BusinessBannerRender 
                    thisImage={thisUser?.business?.businessImages[0]?.url ?? null}
                    thisProfilePic={thisUser?.image}
                    thisUsername={thisUser?.name}
                    createdAt={format(new Date(thisUser?.createdAt), "dd.MM.yyyy")}
                    />
                </View>
            </View>
        </View>
     );
}
 
export default BusinessRender;