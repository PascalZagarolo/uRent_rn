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
import PkwFuel from "./pkw/pkw-fuel";
import PkwDoors from "./pkw/pkw-doors";
import PkwAhk from "./pkw/pkw-ahk";
import LkwDrive from "./lkw/lkw-drive";
import LkwLoading from "./lkw/lkw-loading";



interface LkwDetails2Props {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const LkwDetails2 = forwardRef(({ thisInserat, refetchInserat }: LkwDetails2Props, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
        }
    }));



    const [currentTransmission, setCurrentTransmission] = useState(null);
    const [currentDrive, setCurrentDrive] = useState(null);
    const [currentFuel, setCurrentFuel] = useState(null);
    const [currentLoading, setCurrentLoading] = useState(null);





    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">


                <View className="w-full mt-4">
                    <PkwTransmission label="Getriebe" currentValue={currentTransmission} setValue={setCurrentTransmission} />s
                </View>
                <View className="w-full mt-4">
                    <LkwDrive label="Antrieb" currentValue={currentDrive} setValue={setCurrentDrive} />
                </View>
                <View className="w-full mt-4">
                    <PkwFuel label="Treibstoff" currentValue={currentFuel} setValue={setCurrentFuel} />
                </View>
                <View className="w-full mt-4">
                    <LkwLoading label="Ladevorrichtung" currentValue={currentLoading} setValue={setCurrentLoading} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});

export default LkwDetails2;