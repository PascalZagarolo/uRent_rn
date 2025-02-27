import { userTable } from "@/db/schema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as SecureStorage from 'expo-secure-store';
import { redeemGiftCode } from "@/actions/subscriptions/redeem-giftcode/redeem";

interface RedeemGiftCardProps {
    currentUser : typeof userTable.$inferSelect;
}

const RedeemGiftCard = ({
    currentUser
} : RedeemGiftCardProps) => {

    const [error, setError] = useState("Etwas ist schief gelaufen.");
    const [success, setSuccess] = useState(null)

    const [currentInput, setCurrentInput] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const onRedeem = async () => {
        try {
            if(isLoading) return;
            setIsLoading(true);

            const authToken = await SecureStorage.getItemAsync("authToken");

            const res = await redeemGiftCode(
                currentInput,
                currentUser?.id,
                authToken
            );

            if(res?.error) {
                setError(res?.error)
            }
            

        } catch(e : any) {
            setError("Etwas ist schiefgelaufen")
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setError(null);
    },[currentInput])

    return ( 
        <View>
            <View>
                <Text className="text-gray-200 text-xl font-bold">
                    Gutscheincode einlösen
                </Text>
                <Text className="text-gray-200/60 text-sm">
                    Falls du einen Gutschein / Rabattcode hast, kannst du diesen hier einlösen.
                </Text>
            </View>
            <View className="flex mt-4 flex-row items-center">
                <TextInput 
                className="text-base text-gray-200 p-2.5 bg-[#161b25] w-3/4 rounded-l-lg"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                placeholderTextColor={"gray"}
                onChangeText={setCurrentInput}
                value={currentInput}
                />
                <TouchableOpacity className="w-1/4 bg-indigo-800 p-2.5 rounded-r-lg items-center justify-center"
                onPress={onRedeem}
                >
                    <MaterialCommunityIcons name="send"  size={24} color="white"/>
                </TouchableOpacity>
                
            </View>
            {error && (
                <View className="p-2.5 bg-rose-400/40 mt-2 border border-rose-600 flex flex-row items-center space-x-2">
                    <MaterialCommunityIcons 
                    name="alert"
                    size={20}
                    color={"white"}
                    />
                    <Text className="text-sm text-gray-200">
                        {error}
                    </Text>
                </View>
            )}
            <View className="flex flex-row items-center space-x-2 mt-2">
            <MaterialCommunityIcons name="information-outline" 
            size={20}
            color={"gray"}
            /> 
            <Text className="text-gray-200/60 underline">
                Woher kriege ich Gutschein- /Rabattcodes?
            </Text>
            </View>
        </View>
     );
}
 
export default RedeemGiftCard;