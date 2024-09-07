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
import PkwFuel from "./pkw/pkw-fuel";
import PkwDoors from "./pkw/pkw-doors";
import PkwAhk from "./pkw/pkw-ahk";



interface PkwDetails2Props {
    thisInserat: typeof inserat.$inferSelect;
   
}

const PkwDetails2 = forwardRef(({ thisInserat }: PkwDetails2Props, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
        }
    }));

    
    
    const [currentFuel, setCurrentFuel] = useState(null);
    const [currentDoors, setCurrentDoors] = useState(null);
    const [currentAhk, setCurrentAhk] = useState(null);
    

    

    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">
                

                <View className="w-full mt-4">
                <PkwFuel label="Treibstoff" currentValue={currentFuel} setValue={setCurrentFuel} />  
                </View>
                <View className="w-full mt-4">
                    <PkwDoors label="Anzahl Türen" currentValue={currentDoors} setValue={setCurrentDoors} />
                </View>
                <View className="w-full mt-4">
                    <PkwAhk label="Anhängerkupplung" currentValue={currentAhk} setValue={setCurrentAhk} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});

export default PkwDetails2;