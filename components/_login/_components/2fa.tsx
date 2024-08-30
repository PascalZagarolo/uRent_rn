import { checkFor2fa } from "@/actions/user/check-2fa";
import { userTable } from "@/db/schema";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import * as SecureStore from 'expo-secure-store';
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useAuth } from "@/app/(tabs)/AuthProvider";

interface TwoFaProps {
    foundUser : typeof userTable.$inferSelect;
}

const Twofa : React.FC<TwoFaProps> = ({
    foundUser
}) => {

    const [currentCode, setCurrentCode] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const { refetchUser } = useAuth();

    const router = useRouter();

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const res = await checkFor2fa({
                email : foundUser.email,
                token : currentCode
            })

            SecureStore.setItem("authToken", res.token);
            Toast.show({
                type: 'success',
                text1: 'Erfolgreich eingeloggt',
                visibilityTime: 4000
            })
            router.replace("/");
            refetchUser();
        } catch(e : any) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View>
            <View>
                
            </View>
            <View className="mt-4">
                <Text className="text-md text-gray-200 font-semibold">
                    2FA Code
                </Text>
                <View className="flex flex-row items-center w-full">
                    <TextInput
                        className="bg-[#2A2E3D] text-gray-200 p-4 rounded-md  mt-2 w-full"
                        value={currentCode}
                        onChangeText={setCurrentCode}
                    />
                </View>
            </View>
            <View className="mt-8">
                <TouchableOpacity className='px-8 py-4 rounded-md w-full bg-white  justify-center'
                    onPress={onSubmit}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#000" />
                    ) : (
                        <Text className='justify-center text-gray-800 text-center font-semibold'>
                            Code eingeben
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Twofa;