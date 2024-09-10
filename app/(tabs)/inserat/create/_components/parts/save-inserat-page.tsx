import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
    Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback, StyleSheet,
    SafeAreaView,
    Platform
} from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'


interface SaveInseratPageProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const SaveInseratPage = forwardRef(({ thisInserat, refetchInserat }: SaveInseratPageProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
            console.log("Saving:");
        }
    }));

    const [currentAddress, setCurrentAddress] = useState(thisInserat.title);
    const [currentEmail, setCurrentEmail] = useState(thisInserat.description);
    const [currentPhone, setCurrentPhone] = useState(thisInserat.description);

    const [isFocused, setIsFocused] = useState(false);


    const usedKey = process.env.EXPO_PUBLIC_GOOGLE_CLOUD_SECRET;

    useEffect(() => {
        console.log(usedKey)
    }, [])


    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="items-center justify-center h-full flex-col">
            <KeyboardAvoidingView
                behavior="height" // or "height" depending on your needs
            >
                <View className="flex flex-col x w-full mt-4 h-full justify-centers items-center">
                    <View className="w-full mt-4 ">
                        <View className=" justify-center items-center">
                        <TouchableOpacity className="bg-indigo-800 w-full p-4 flex-row justify-center ml-auto rounded-md space-x-4">
                            <FontAwesome5 name="globe" size={24} color="white" />
                            <Text className="text-base font-semibold text-gray-200">
                                Inserat veröffentlichen
                            </Text>
                        </TouchableOpacity>
                        </View>
                        <View className="mt-4">
                        <TouchableOpacity className="bg-gray-800 w-full p-4 flex-row justify-center ml-auto rounded-md space-x-4">
                            <FontAwesome5 name="save" size={24} color="white" />
                            <Text className="text-base font-semibold text-gray-200">
                                Speichern & zur Startseite
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View className="mt-2">
                        <Text className="text-xs text-gray-200/40">
                             * Inserate können jederzeit bearbeitet und zwischen öffentlich und privat umgeschaltet werden.
                        </Text>
                    </View>
                </View>
                </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    );


},

);





export default SaveInseratPage;

