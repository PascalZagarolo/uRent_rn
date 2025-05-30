import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
    Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback
} from "react-native";
import PkwBrand from "./pkw/pkw-brand";
import PkwSeats from "./pkw/pkw-seats";
import PkwExtraType from "./pkw/pkw-extra-type";
import PkwTransmission from "./pkw/pkw-transmission";
import PkwFuel from "./pkw/pkw-fuel";
import PkwDoors from "./pkw/pkw-doors";
import PkwAhk from "./pkw/pkw-ahk";
import LkwDrive from "./lkw/lkw-drive";
import LkwLoading from "./lkw/lkw-loading";
import * as SecureStorage from 'expo-secure-store';
import { changeLkwAttributes } from "@/actions/inserat/(categories)/lkwAttributes/change-lkw-attributes";



interface LkwDetails2Props {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat: () => void;
}

const LkwDetails2 = forwardRef(({ thisInserat, refetchInserat }: LkwDetails2Props, ref) => {

    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        onSave: async () => {
            try {
                if (isLoading) return;
                setIsLoading(true);
                const authToken = await SecureStorage.getItemAsync("authToken");

                const values = {
                    inseratId: thisInserat.id,
                    token: authToken,
                    transmission: currentTransmission,
                    drive: currentDrive,
                    fuel: currentFuel,
                    loading: currentLoading
                }

                await changeLkwAttributes(values);
                await refetchInserat();
            } catch (e: any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }));



    const [currentTransmission, setCurrentTransmission] = useState(thisInserat?.lkwAttribute?.transmission ?? null);
    const [currentDrive, setCurrentDrive] = useState(thisInserat?.lkwAttribute?.drive ?? null);
    const [currentFuel, setCurrentFuel] = useState(thisInserat?.lkwAttribute?.fuel ?? null);
    const [currentLoading, setCurrentLoading] = useState(thisInserat?.lkwAttribute?.loading ?? null);





    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">


                <View className="w-full mt-4">
                    <PkwTransmission label="Getriebe" currentValue={currentTransmission} setValue={setCurrentTransmission} />
                </View>
                <View className="w-full mt-4">
                    <LkwDrive label="Antrieb" currentValue={currentDrive} setValue={setCurrentDrive} />
                </View>
                <View className="w-full mt-4">
                    <PkwFuel label="Treibstoff" currentValue={currentFuel} setValue={setCurrentFuel} />
                </View>
                <View className="w-full mt-4">
                    <LkwLoading label="Ladevorrichtung" currentValue={currentLoading} setValue={setCurrentLoading} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});

export default LkwDetails2;