import { Text, View } from "react-native";
import { paymentMethods } from '../../../../db/schema';
import { Entypo } from "@expo/vector-icons";

interface ProfilePaymentMethodsProps {
    thisPaymentMethods: typeof paymentMethods.$inferSelect | any;
}

const ProfilePaymentMethods: React.FC<ProfilePaymentMethodsProps> = ({
    thisPaymentMethods
}) => {

    

    return (
        <View className="p-4">
            <View className="">
                <Text className="text-gray-200 font-semibold text-lg">
                    Der Vermieter nimmt an:
                </Text>
            </View>
            <View className="mt-2">

            <View className="flex flex-row justify-center items-center space-x-1">
    {thisPaymentMethods?.paypal && (
        <View className="flex flex-col justify-center items-center w-1/3 bg-[#181b27] p-2 rounded-md">
            <Entypo name="paypal" size={24} color="white" />
            <Text className="text-md text-gray-200 font-semibold mt-2">
                Paypal
            </Text>
        </View>
    )}

    {thisPaymentMethods?.creditCard && (
        <View className="flex flex-col justify-center items-center w-1/3 bg-[#181b27] p-2 rounded-md">
            <Entypo name="credit-card" size={24} color="white" />
            <Text className="text-md text-gray-200 font-semibold mt-2">
                Kreditkarte
            </Text>
        </View>
    )}

    {thisPaymentMethods?.barGeld && (
        <View className="flex flex-col justify-center items-center w-1/3 bg-[#181b27] p-2 rounded-md">
            <Entypo name="creative-commons-share" size={24} color="white" />
            <Text className="text-md text-gray-200 font-semibold mt-2">
                Bargeld
            </Text>
        </View>
    )}
</View>

            </View>
        </View>
    );
}

export default ProfilePaymentMethods;