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



interface TransportDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
   
}

const TransportDetails = forwardRef(({ thisInserat }: TransportDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
        }
    }));

    
    
   const [currentWeight, setCurrentWeight] = useState(null);
   const [currentBrand, setCurrentBrand] = useState(null);
   const [currentSeats, setCurrentSeats] = useState(null);
   const [currentTransmission, setCurrentTransmission] = useState(null);

    

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