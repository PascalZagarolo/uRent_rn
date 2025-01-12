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
import PkwFuel from "./pkw/pkw-fuel";
import PkwDoors from "./pkw/pkw-doors";
import TransportLoading from "./transport/transport-loading";
import * as SecureStorage from 'expo-secure-store';
import { changeTransportAttributes } from "@/actions/inserat/(categories)/transportAttributes/change-transport-attributes";



interface TransportDetails2Props {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const TransportDetails2 = forwardRef(({ thisInserat, refetchInserat }: TransportDetails2Props, ref) => {

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
                    fuel : currentFuel,
                    doors : currentDoors,
                    loading : currentLoading
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

    
    
   const [currentFuel, setCurrentFuel] = useState(thisInserat?.transportAttribute?.fuel || null);
   const [currentDoors, setCurrentDoors] = useState(thisInserat?.transportAttribute?.doors || null);
   const [currentLoading, setCurrentLoading] = useState(thisInserat?.transportAttribute?.loading || null);
   

    

    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">
                

                <View className="w-full mt-4">
                    <PkwFuel label="Kraftstoff" currentValue={currentFuel} setValue={setCurrentFuel} />
                </View>
                <View className="w-full mt-4">
                    <PkwDoors label="Transporter Marke" currentValue={currentDoors} setValue={setCurrentDoors} />
                </View>
                <View className="w-full mt-4">
                <TransportLoading label="Anzahl der Sitze" currentValue={currentLoading} setValue={setCurrentLoading} />
                </View>
                
            </View>
        </TouchableWithoutFeedback>
    );
});

export default TransportDetails2;