import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
    Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback,
    Modal
} from "react-native";
import CreatePriceProfile from "./price-details/create-price-detail";



interface PriceDetailsProps {
    thisInserat: typeof inserat.$inferSelect;

}

const PriceDetails = forwardRef(({ thisInserat }: PriceDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
            console.log("Saving:", currentTitle, currentDescription);
        }
    }));

    const [currentTitle, setCurrentTitle] = useState(thisInserat.price);
    const [currentDescription, setCurrentDescription] = useState(thisInserat.description);
    const [currentCategory, setCurrentCategory] = useState(thisInserat.description);

    const [showModal, setShowModal] = useState(false);




    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">
                <View className="w-full">
                    <Text className="text-lg font-semibold text-gray-200">
                        Preis (pro Tag)
                    </Text>
                    <TextInput
                        placeholder="Titel deines Inserats..."
                        value={currentTitle}
                        onChangeText={(text) => setCurrentTitle(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg mt-2" />

                </View>

                <View className="w-full mt-8 ">
                    <Text className="text-lg font-semibold text-gray-200">
                        Meine Preisprofile
                    </Text>

                    <TouchableOpacity className="bg-[#1a1e29] w-full p-4 flex-row justify-center items-center rounded-md mt-2"
                    onPress={() => {setShowModal(true)}}
                    >
                        <View className="mr-4">
                            <FontAwesome5 name="plus" size={20} color="#fff" />
                        </View>
                        <Text className="text-gray-200/60 text-base font-medium text-center">
                            Preisprofil hinzufügen
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="w-full mt-4 h-full">


                    <View className="mt-4">
                        <Text className="text-center text-sm text-gray-200/40">
                            Noch keine Preisprofile hinzugefügt..
                        </Text>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => {
                        setShowModal(false);
                    }}

                >
                    <CreatePriceProfile onClose={() => setShowModal(false)} inseratId={thisInserat.id}/>
                </Modal>


            </View>
        </TouchableWithoutFeedback>
    );
});

export default PriceDetails;