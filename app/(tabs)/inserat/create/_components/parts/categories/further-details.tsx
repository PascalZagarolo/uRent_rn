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
import { getYear } from "date-fns";



interface FurtherDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat: () => void;
}

const FurtherDetails = forwardRef(({ thisInserat, refetchInserat }: FurtherDetailsProps, ref) => {

    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        onSave: async () => {
            try {
                console.log("Jetzt!!!")

                setIsLoading(true);
                const authToken = await SecureStorage.getItemAsync("authToken");

                if (thisInserat?.category == "PKW") {
                    console.log("2001")
                    const values = {
                        inseratId: thisInserat.id,
                        token: authToken,
                        power: power,
                        initial: initial ? new Date(initial, 0, 1) : null,
                        loading_volume: volumeLiter,
                        loading_l: loadingL,
                        loading_b: loadingW,
                        loading_h: loadingH,

                    }
                    console.log(values)
                    await changePkwAttributes(values);
                }

                await refetchInserat();
            } catch (e: any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }));



    useEffect(() => {
        switch (thisInserat?.category) {
            case "PKW":
                setPower(thisInserat?.pkwAttribute?.power ?? null);
                setIntial(thisInserat?.pkwAttribute?.initial ? getYear(thisInserat?.pkwAttribute?.initial) : null);
                setVolumeLiter(thisInserat?.pkwAttribute?.loading_volume ?? null);
                setVolumeLiter(thisInserat?.pkwAttribute?.loading_volume ? Number(thisInserat?.pkwAttribute?.loading_volume ?? 0) / 1000 : null);
                setLoadingL(thisInserat?.pkwAttribute?.loading_l ?? null);
                setLoadingW(thisInserat?.pkwAttribute?.loading_b ?? null);
                setLoadingH(thisInserat?.pkwAttribute?.loading_h ?? null);
                break;
        }
    }, [])


    const [initial, setIntial] = useState(null);
    const [volumeLiter, setVolumeLiter] = useState(null);
    const [volumeCubic, setVolumeCubic] = useState(null);
    const [power, setPower] = useState(null);

    const [loadingL, setLoadingL] = useState(null);
    const [loadingW, setLoadingW] = useState(null);
    const [loadingH, setLoadingH] = useState(null);

    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">

                <View className="w-full mt-4">
                    <FurtherInitial label="Baujahr" currentValue={initial} setValue={setIntial} />
                </View>
                <View className="w-full mt-4">
                    <FurtherPower label="Leistung" currentValue={power} setValue={setPower} />
                </View>

                
                    <View className="w-full mt-4">
                        <LoadingVolume label="Ladevolumen"
                            currentValue={volumeLiter}
                            currentValue2={volumeCubic}
                            setValue={setVolumeLiter}
                            setValue2={setVolumeCubic}
                        />
                    </View>
               
                {thisInserat?.category != "PKW" && (
                <View className="w-full mt-4">
                    <LoadingSize label="Lademaße"
                        currentValue={loadingL}
                        currentValue2={loadingW}
                        currentValue3={loadingH}
                        setValue={setLoadingL}
                        setValue2={setLoadingW}
                        setValue3={setLoadingH}
                    />
                </View>
                 )}
            </View>
        </TouchableWithoutFeedback>
    );
});

export default FurtherDetails;