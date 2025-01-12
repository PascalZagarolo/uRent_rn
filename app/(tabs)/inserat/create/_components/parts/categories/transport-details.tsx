import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, 
    Keyboard, TouchableWithoutFeedback } from "react-native";
import PkwBrand from "./pkw/pkw-brand";
import PkwSeats from "./pkw/pkw-seats";
import PkwExtraType from "./pkw/pkw-extra-type";
import PkwTransmission from "./pkw/pkw-transmission";
import LkwWeightclass from "./lkw/lkw-weightclass";
import LkwAxis from "./lkw/lkw-axis";
import LkwBrand from "./lkw/lkw-brand";
import TransportWeightclass from "./transport/transport-weightclass";
import TransportBrand from "./transport/transport-brand";
import * as SecureStorage from 'expo-secure-store';
import { changeTransportAttributes } from "@/actions/inserat/(categories)/transportAttributes/change-transport-attributes";




interface TransportDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const TransportDetails = forwardRef(({ thisInserat, refetchInserat }: TransportDetailsProps, ref) => {

    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        onSave: async () => {
            try {
                if(isLoading) return;
                setIsLoading(true);
                const authToken = await SecureStorage.getItemAsync("authToken");
                
                const values = {
                    inseratId : thisInserat.id,
                    token : authToken,
                    brand: currentBrand,
                    seats: currentSeats,
                    weightClass : currentWeight,
                    transmission : currentTransmission
                }
                
                await changeTransportAttributes(values);
                await refetchInserat();
            } catch(e : any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }));

    
    
   const [currentWeight, setCurrentWeight] = useState(thisInserat?.transportAttributes?.weightClass || null);
   const [currentBrand, setCurrentBrand] = useState(thisInserat?.transportAttributes?.brand || null);
   const [currentSeats, setCurrentSeats] = useState(thisInserat?.transportAttributes?.seats || null);
   const [currentTransmission, setCurrentTransmission] = useState(thisInserat?.transportAttributes?.transmission || null);

    

    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">
                

                <View className="w-full mt-4">
                    <TransportWeightclass label="Gewichtsklasse" currentValue={currentWeight} setValue={setCurrentWeight} />
                </View>
                <View className="w-full mt-4">
                    <TransportBrand label="Transporter Marke" currentValue={currentBrand} setValue={setCurrentBrand} />
                </View>
                <View className="w-full mt-4">
                <PkwSeats label="Anzahl der Sitze" currentValue={currentSeats} setValue={setCurrentSeats} />
                </View>
                <View className="w-full mt-4">
                    <PkwTransmission label="Getriebe" currentValue={currentTransmission} setValue={setCurrentTransmission} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});

export default TransportDetails;