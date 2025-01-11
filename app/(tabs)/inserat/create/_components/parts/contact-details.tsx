import RbSheetCostum from "@/components/RB-Sheet-Custom";
import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import * as SecureStorage from 'expo-secure-store';
import {
    Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback
} from "react-native";
import { editInseratBasic } from "@/actions/inserat/edit/edit-inserat-basic";



interface ContactDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const ContactDetails = forwardRef(({ thisInserat, refetchInserat }: ContactDetailsProps, ref) => {

    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        onSave: async () => {
            try {
                console.log("2000")
                setIsLoading(true);
                const authToken = await SecureStorage.getItemAsync("authToken");
                
                const values = {
                    inseratId : thisInserat.id,
                    token : authToken,
                    emailAddress : currentEmail,
                    phoneNumber : currentPhone
                } 
                await editInseratBasic(values);
                await refetchInserat();
            } catch(e : any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }));


    const [currentEmail, setCurrentEmail] = useState(thisInserat.emailAddress);
    const [currentPhone, setCurrentPhone] = useState(thisInserat.phoneNumber);

    const refRBSheet = useRef([]);




    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">
                <View className="w-full">
                    <Text className="text-lg font-semibold text-gray-200">
                        Email-Addresse
                    </Text>
                    <View className="flex flex-row w-full">
                        <TextInput
                            className="w-10/12 bg-[#1f2330] rounded-l-md text-base text-gray-200/90 p-4 font-semibold"
                            placeholder="Gebe deine Email-Addresse ein.."

                            value={currentEmail}
                            
                            onChangeText={(text) => setCurrentEmail(text)}
                        />
                        <TouchableOpacity
                            className="w-2/12 flex justify-center items-center rounded-r-md bg-[#1a1d29]"
                            onPress={() => { refRBSheet.current[1].open() }}
                        >
                            <FontAwesome name="chevron-down" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                </View>

                <View className="w-full mt-8 h-full">
                    <Text className="text-lg font-semibold text-gray-200">
                        Telefonnummer
                    </Text>
                    <View className="flex flex-row w-full">
                        <TextInput
                            placeholder="Gebe deine Telefonnummer ein.."
                            value={currentPhone}
                            onChangeText={(text) => setCurrentPhone(text)}
                            keyboardType="numeric"
                            className="w-10/12 bg-[#1f2330] rounded-l-md text-base text-gray-200/90 p-4 font-semibold"
                        />
                        <TouchableOpacity
                            className="w-2/12 flex justify-center items-center rounded-r-md bg-[#1a1d29]"
                            onPress={() => { refRBSheet.current[1].open() }}
                        >
                            <FontAwesome name="chevron-down" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                </View>

                <RbSheetCostum
                    index={1}
                    title="Email-Addresse auswählen"
                    prefilledValues={[]}
                    setCurrentValue={setCurrentEmail}
                    currentValue={currentEmail}
                    refRBSheet={refRBSheet}
                />

                <RbSheetCostum
                    index={2}
                    title="Telefonnummer auswählen"
                    prefilledValues={[]}
                    setCurrentValue={setCurrentPhone}
                    currentValue={currentPhone}
                    refRBSheet={refRBSheet}
                />

            </View>
        </TouchableWithoutFeedback>
    );
});

export default ContactDetails;