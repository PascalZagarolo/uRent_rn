import { inserat } from "@/db/schema";
import { Text, View } from "react-native";
import InseratPriceProfileDialog from './inserat-price-profile-dialog';

interface InseratPriceProfilesProps {
    thisInserat: typeof inserat.$inferSelect;
}

const InseratPriceProfiles: React.FC<InseratPriceProfilesProps> = ({
    thisInserat
}) => {
    return (
        <View>
            {thisInserat?.priceprofiles?.length > 0 && (
               <View>
                 <View>
                <Text className="px-4 text-lg text-gray-200 font-semibold">
                    Weitere Preisprofile
                </Text>
            </View>
            <View className="px-4">
                <View className="">
                {thisInserat?.priceprofiles.map((priceprofile, index) => (
                    <InseratPriceProfileDialog key={index} thisPriceProfile={priceprofile} />
                ))}
                </View>
            </View>
                </View>
            )}
        </View>
    );
}

export default InseratPriceProfiles;