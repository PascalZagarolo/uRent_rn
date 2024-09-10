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
import FurtherPower from "./further/power";
import FurtherInitial from "./further/initial";
import LoadingVolume from "./further/loading-volume";
import LoadingSize from "./further/loading-size";



interface FurtherDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const FurtherDetails = forwardRef(({ thisInserat, refetchInserat }: FurtherDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
        }
    }));

    
   
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
                    <FurtherPower label="Leistung" currentValue={power} setValue={setPower} />
                </View>
                <View className="w-full mt-4">
                    <FurtherInitial label="Baujahr" currentValue={initial} setValue={setIntial} />
                </View>
                <View className="w-full mt-4">
                    <LoadingVolume label="Ladevolumen" 
                    currentValue={volumeLiter} 
                    currentValue2={volumeCubic} 
                    setValue={setVolumeLiter} 
                    setValue2={setVolumeCubic} 
                />
                </View>
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
            </View>
        </TouchableWithoutFeedback>
    );
});

export default FurtherDetails;