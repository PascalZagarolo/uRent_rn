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
import LkwWeightclass from "./lkw/lkw-weightclass";
import LkwAxis from "./lkw/lkw-axis";
import LkwBrand from "./lkw/lkw-brand";
import TrailerTypeFilter from "@/components/_drawercontent/_filter-content/_trailer-filter/trailer-type-filter";
import TrailerType from "./trailer/trailer-type";
import TrailerWeightclass from "./trailer/trailer-weightclass";
import TrailerBrak from "./trailer/trailer-brake";
import * as SecureStorage from 'expo-secure-store';
import { changeTrailerAttributes } from "@/actions/inserat/(categories)/trailerAttributes/change-trailer-attributes";



interface TrailerDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const TrailerDetails = forwardRef(({ thisInserat, refetchInserat }: TrailerDetailsProps, ref) => {

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
                    type : currentType,
                    weightClass : currentWeight,
                    axis : currentAxis,
                    brake : currentBrake
                }
                
                await changeTrailerAttributes(values);
                await refetchInserat();
            } catch(e : any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }));



    const [currentType, setCurrentType] = useState(thisInserat?.trailerAttribute?.type ?? null);
    const [currentWeight, setCurrentWeight] = useState(thisInserat?.trailerAttribute?.weightClass ?? null);
    const [currentAxis, setCurrentAxis] = useState(thisInserat?.trailerAttribute?.axis ?? null);
    const [currentBrake, setCurrentBrake] = useState(thisInserat?.trailerAttribute?.brake ?? null);


    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">


                <View className="w-full mt-4">
                <TrailerType label="Anhängertyp" currentValue={currentType} setValue={setCurrentType} />
                </View>
                <View className="w-full mt-4">
                    <TrailerWeightclass label="Gewichtsklasse" currentValue={currentWeight} setValue={setCurrentWeight} />
                </View>
                <View className="w-full mt-4">
                    <LkwAxis label="Achsen" currentValue={currentAxis} setValue={setCurrentAxis} />
                </View>
                <View className="w-full mt-4">
                    <TrailerBrak label="Bremse" currentValue={currentBrake} setValue={setCurrentBrake} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});

export default TrailerDetails;