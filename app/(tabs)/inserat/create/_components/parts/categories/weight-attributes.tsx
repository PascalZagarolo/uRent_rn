import { inserat } from "@/db/schema";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
    Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback
} from "react-native";

import FurtherPower from "./further/power";
import FurtherInitial from "./further/initial";
import LoadingVolume from "./further/loading-volume";
import LoadingSize from "./further/loading-size";
import * as SecureStorage from 'expo-secure-store';
import { changePkwAttributes } from "@/actions/inserat/(categories)/pkwAttributes/change-pkw-attributes";
import { getYear, set } from "date-fns";
import WeightClass from "./weight/weightclass";
import PayloadCreation from "./weight/payload-creation";
import { changeLkwAttributes } from "@/actions/inserat/(categories)/lkwAttributes/change-lkw-attributes";
import { changeTransportAttributes } from '@/actions/inserat/(categories)/transportAttributes/change-transport-attributes';
import { changeTrailerAttributes } from "@/actions/inserat/(categories)/trailerAttributes/change-trailer-attributes";



interface WeightAttributesProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat: () => void;
}

const WeightAttributes = forwardRef(({ thisInserat, refetchInserat }: WeightAttributesProps, ref) => {

    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        onSave: async () => {
            try {
                console.log("Jetzt!!!")

                setIsLoading(true);
                const authToken = await SecureStorage.getItemAsync("authToken");

                const values = {
                    inseratId : thisInserat?.id,
                    token : authToken,
                    payload: payload,
                    weightClass: weightClass,

                }

                if (thisInserat?.category == "LKW") {
                    await changeLkwAttributes(values);
                } else if(thisInserat?.category == "TRANSPORT") {
                    await changeTransportAttributes(values);
                } else if(thisInserat?.category == "TRAILER") {
                    await changeTrailerAttributes(values);
                }

                await refetchInserat();
            } catch (e: any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }));



   
    console.log(thisInserat?.transportAttribute?.weightClass)
   
  

    const [weightClass, setWeightClass] = useState(() => {
        switch (thisInserat?.category) {
            case "TRANSPORT":
                // Return the weightClass based on the TRANSPORT category
                return thisInserat?.transportAttribute?.weightClass || null;
            case "LKW":
                // Handle another case
                return thisInserat?.lkwAttribute?.weightClass || null;
            case "TRAILER":
                // Another case
                return thisInserat?.trailerAttribute?.weightClass || null;
            default:
                // Default case if category doesn't match any of the above
                return null;
        }
    });
    const [payload, setPayload] = useState(() => {
        switch (thisInserat?.category) {
            case "TRANSPORT":
                // Return the weightClass based on the TRANSPORT category
                return thisInserat?.transportAttribute?.payload || null;
            case "LKW":
                // Handle another case
                return thisInserat?.lkwAttribute?.payload || null;
            case "TRAILER":
                // Another case
                return thisInserat?.trailerAttribute?.payload || null;
            default:
                // Default case if category doesn't match any of the above
                return null;
        }
    });
    

    

    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">
                
                <View className="w-full mt-4">
                    <WeightClass label="zul. Gesamtgewicht" currentValue={weightClass} setValue={setWeightClass} />
                </View>
                <View className="w-full mt-4">
                    <PayloadCreation label="Nutzlast" currentValue={payload} setValue={setPayload} />
                </View>

                
                    
            </View>
        </TouchableWithoutFeedback>
    );
});

export default WeightAttributes;