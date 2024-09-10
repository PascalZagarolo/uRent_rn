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
import TrailerCoupling from "./trailer/trailer-coupling";
import TrailerLoading from "./trailer/trailer-loading";



interface TrailerDetails2Props {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const TrailerDetails2 = forwardRef(({ thisInserat, refetchInserat }: TrailerDetails2Props, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
        }
    }));



    const [currentCoupling, setCurrentCoupling] = useState(null);
    const [currentLoading, setCurrentLoading] = useState(null);
    
    


    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">


                <View className="w-full mt-4">
                    <TrailerCoupling label="Kupplungsart" currentValue={currentCoupling} setValue={setCurrentCoupling} />
                </View>
                <View className="w-full mt-4">
                    <TrailerLoading label="Ladevorrichtung" currentValue={currentLoading} setValue={setCurrentLoading} />
                </View>
                
            </View>
        </TouchableWithoutFeedback>
    );
});

export default TrailerDetails2;