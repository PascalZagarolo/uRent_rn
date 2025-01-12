import { inserat } from "@/db/schema";


import { forwardRef, useImperativeHandle, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, 
    Keyboard, TouchableWithoutFeedback } from "react-native";

import PkwSeats from "./pkw/pkw-seats";

import LkwWeightclass from "./lkw/lkw-weightclass";
import LkwAxis from "./lkw/lkw-axis";
import LkwBrand from "./lkw/lkw-brand";
import * as SecureStorage from 'expo-secure-store';
import { changeLkwAttributes } from "@/actions/inserat/(categories)/lkwAttributes/change-lkw-attributes";




interface LkwDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const LkwDetails = forwardRef(({ thisInserat, refetchInserat }: LkwDetailsProps, ref) => {

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
                    axis : currentAxis
                }
                console.log("LKW")
                await changeLkwAttributes(values);
                await refetchInserat();
            } catch(e : any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }));

    
    
   const [currentWeight, setCurrentWeight] = useState(thisInserat?.lkwAttribute?.weightClass ?? null);
   const [currentAxis, setCurrentAxis] = useState(thisInserat?.lkwAttribute?.axis ?? null);
   const [currentBrand, setCurrentBrand] = useState(thisInserat?.lkwAttribute?.brand ?? null);
   const [currentSeats, setCurrentSeats] = useState(thisInserat?.lkwAttribute?.seats ?? null);

    

    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">
                

                <View className="w-full mt-4">
                    <LkwWeightclass label="Gewichtsklasse" currentValue={currentWeight} setValue={setCurrentWeight} />
                </View>
                <View className="w-full mt-4">
                    <LkwAxis label="Achsen" currentValue={currentAxis} setValue={setCurrentAxis} />
                </View>
                <View className="w-full mt-4">
                    <LkwBrand label="Lkw-Marke" currentValue={currentBrand} setValue={setCurrentBrand} />
                </View>
                <View className="w-full mt-4">
                    <PkwSeats label="Anzahl der Sitze" currentValue={currentSeats} setValue={setCurrentSeats} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});

export default LkwDetails;