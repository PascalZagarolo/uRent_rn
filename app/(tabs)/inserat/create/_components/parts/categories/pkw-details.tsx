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
import * as SecureStorage from 'expo-secure-store';
import { changePkwAttributes } from "@/actions/inserat/(categories)/pkwAttributes/change-pkw-attributes";



interface PkwDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const PkwDetails = forwardRef(({ thisInserat, refetchInserat }: PkwDetailsProps, ref) => {

    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        onSave: async () => {
            try {
                
                setIsLoading(true);
                const authToken = await SecureStorage.getItemAsync("authToken");
                
                const values = {
                    inseratId : thisInserat.id,
                    token : authToken,
                    brand: currentBrand,
                    seats: currentSeats,
                    type: currentExtratype,
                    transmission: currentTransmission
                }
                
                await changePkwAttributes(values);
                await refetchInserat();
            } catch(e : any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }));

  
    
   const [currentBrand, setCurrentBrand] = useState(thisInserat?.pkwAttribute?.brand ?? null);
   const [currentSeats, setCurrentSeats] = useState(thisInserat?.pkwAttribute?.seats ?? null);
   const [currentExtratype, setCurrentExtratype] = useState(thisInserat?.pkwAttribute?.type ?? null);
   const [currentTransmission, setCurrentTransmission] = useState(thisInserat?.pkwAttribute?.transmission ?? null);

    

    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">
                

                <View className="w-full mt-4">
                    <PkwBrand label="Marke" currentValue={currentBrand} setValue={setCurrentBrand} />
                </View>
                <View className="w-full mt-4">
                    <PkwSeats label="Anzahl der Sitze" currentValue={currentSeats} setValue={setCurrentSeats} />
                </View>
                <View className="w-full mt-4">
                    <PkwExtraType label="Fahrzeugtyp" currentValue={currentExtratype} setValue={setCurrentExtratype} />
                </View>
                <View className="w-full mt-4">
                    <PkwTransmission label="Getriebe" currentValue={currentTransmission} setValue={setCurrentTransmission} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});

export default PkwDetails;