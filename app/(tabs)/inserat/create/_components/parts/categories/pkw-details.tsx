import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, 
    Keyboard, TouchableWithoutFeedback } from "react-native";
import PkwBrand from "./pkw/pkw-brand";
import PkwSeats from "./pkw/pkw-seats";



interface PkwDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
   
}

const PkwDetails = forwardRef(({ thisInserat }: PkwDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
        }
    }));

    const [currentTitle, setCurrentTitle] = useState(thisInserat.title);
    
   const [currentBrand, setCurrentBrand] = useState(null);
   const [currentSeats, setCurrentSeats] = useState(null);

    

    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">
                

                <View className="w-full mt-4">
                    <PkwBrand label="Marke" currentValue={currentBrand} setValue={setCurrentBrand} />
                </View>
                <View className="w-full mt-4">
                    <PkwSeats label="Marke" currentValue={currentSeats} setValue={setCurrentSeats} />
                </View>
               
                
            </View>
        </TouchableWithoutFeedback>
    );
});

export default PkwDetails;