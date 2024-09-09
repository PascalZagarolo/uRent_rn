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



interface TrailerDetailsProps {
    thisInserat: typeof inserat.$inferSelect;

}

const TrailerDetails = forwardRef(({ thisInserat }: TrailerDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
        }
    }));



    const [currentType, setCurrentType] = useState(null);
    const [currentWeight, setCurrentWeight] = useState(null);
    const [currentAxis, setCurrentAxis] = useState(null);
    const [currentBrake, setCurrentBrake] = useState(null);


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