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
import * as SecureStorage from 'expo-secure-store';
import { changePkwAttributes } from "@/actions/inserat/(categories)/pkwAttributes/change-pkw-attributes";



interface PkwDetails2Props {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const PkwDetails2 = forwardRef(({ thisInserat, refetchInserat }: PkwDetails2Props, ref) => {

    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        onSave: async () => {
            try {
                
                setIsLoading(true);
                const authToken = await SecureStorage.getItemAsync("authToken");
                
                const values = {
                    inseratId : thisInserat.id,
                    token : authToken,
                    fuel : currentFuel,
                    doors : currentDoors,
                    ahk : currentAhk
                }
                
                await changePkwAttributes(values);
                await refetchInserat();
            } catch(e : any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }));

    
    
    const [currentFuel, setCurrentFuel] = useState(thisInserat?.pkwAttribute?.fuel ?? null);
    const [currentDoors, setCurrentDoors] = useState(thisInserat?.pkwAttribute?.doors ?? null);
    const [currentAhk, setCurrentAhk] = useState(thisInserat?.pkwAttribute?.ahk ?? null);
    

    

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