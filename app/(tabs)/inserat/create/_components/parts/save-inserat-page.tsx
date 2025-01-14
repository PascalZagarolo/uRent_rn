import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { GlobeIcon, MessageSquareWarningIcon } from "lucide-react-native";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
    Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback, StyleSheet,
    SafeAreaView,
    Platform,
    ScrollView
} from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

type neededInputsType = {
    name: string;
    description: string;
    page: number;
    isMissing: boolean;
}
interface SaveInseratPageProps {
    thisInserat: typeof inserat.$inferSelect;
    neededInputs: neededInputsType[];
    refetchInserat: () => void;
}

const SaveInseratPage = forwardRef(({ thisInserat, neededInputs, refetchInserat }: SaveInseratPageProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
            console.log("Saving:");
        }
    }));

    const missingInputs = neededInputs.filter(neededInput => neededInput.isMissing)


    const usedKey = process.env.EXPO_PUBLIC_GOOGLE_CLOUD_SECRET;

    useEffect(() => {
        console.log(usedKey)
    }, [])

    const renderMissingInputs = (inputField: neededInputsType) => {
        return (
            <View className="p-2.5 rounded-md bg-[#222435] shadow-lg flex flex-row" key={inputField?.name}>
                <View className="w-1/4 p-4">
                    <MessageSquareWarningIcon size={24} className="text-rose-600" />
                </View>
                <View className="w-3/4 flex flex-col">
                <View>
                    <Text className="text-gray-200 text-base font-semibold">
                        {inputField?.name}
                    </Text>
                </View>
                <View>
                    <Text className="text-gray-200/60 text-sm font-medium">
                        {inputField?.description}
                    </Text>
                </View>
                </View>
            </View>
        )
    }

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="items-center justify-center h-full flex-col">
            <KeyboardAvoidingView
                behavior="height" // or "height" depending on your needs
            >
                <View className="flex flex-col x w-full mt-4 h-full justify-centers items-center">
                    <View className="w-full mt-4 ">
                        <View className=" justify-center items-center">
                            <TouchableOpacity className={cn(
                                "bg-indigo-800 w-full p-4 flex-row justify-center ml-auto rounded-md space-x-4",
                                missingInputs?.length > 0 && "bg-indigo-800/20"
                            )}>
                                <GlobeIcon size={24} className={cn("text-gray-200", missingInputs?.length > 0 && "text-gray-200/40")} />
                                <Text className={cn("text-base font-semibold text-gray-200", missingInputs?.length > 0 && "text-gray-200/40")}>
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
                    <View className="mt-16 w-full">
                        <Text className="text-lg text-gray-200">
                            Folgende Felder fehlen noch:
                        </Text>
                        <ScrollView className="h-72 mt-4 flex flex-col space-y-4">
                            {missingInputs?.length > 0 && (
                                missingInputs?.map((neededInput, index) => (
                                    renderMissingInputs(neededInput)
                                ))
                            )}
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    );


},

);





export default SaveInseratPage;

