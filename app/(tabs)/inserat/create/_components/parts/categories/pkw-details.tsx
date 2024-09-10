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



interface PkwDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const PkwDetails = forwardRef(({ thisInserat, refetchInserat }: PkwDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
        }
    }));

    const [currentTitle, setCurrentTitle] = useState(thisInserat.title);
    
   const [currentBrand, setCurrentBrand] = useState(null);
   const [currentSeats, setCurrentSeats] = useState(null);
   const [currentExtratype, setCurrentExtratype] = useState(null);
   const [currentTransmission, setCurrentTransmission] = useState(null);

    

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