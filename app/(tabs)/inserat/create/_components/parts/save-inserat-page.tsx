import { publishInserat } from "@/actions/inserat/publish/publish-inserat";
import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
    Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback, StyleSheet,
    SafeAreaView,
    Platform,
    ScrollView
} from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import * as SecureStorage from 'expo-secure-store';
import Toast from "react-native-toast-message";

type neededInputsType = {
    name: string;
    description: string;
    page: number;
    isMissing: boolean;
}
interface SaveInseratPageProps {
    thisInserat: typeof inserat.$inferSelect;
    neededInputs: neededInputsType[];
    setCurrentPage : (newPage : number) => void;
    refetchInserat: () => void;
}

const SaveInseratPage = forwardRef(({ thisInserat, neededInputs, setCurrentPage, refetchInserat }: SaveInseratPageProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
            console.log("Saving:");
        }
    }));

    const router = useRouter();

    const missingInputs = neededInputs.filter(neededInput => neededInput.isMissing)


    const usedKey = process.env.EXPO_PUBLIC_GOOGLE_CLOUD_SECRET;


    const [isLoading, setIsLoading] = useState(false);

    const onRelease = async () => {
        try {
            if(isLoading) return;
            setIsLoading(true);
            
            const token = await SecureStorage.getItemAsync("authToken");

            const values = {
                inseratId : thisInserat?.id,
                token: token       
            }

            if(thisInserat?.isPublished) {
                await publishInserat(thisInserat?.id);
                Toast.show({
                    text1: "Inserat wurde veröffentlicht",
                    text2: "Dein Inserat ist nun öffentlich sichtbar",
                    type: "success",
                    visibilityTime: 2000,
                    autoHide: true,
                    position: "bottom",
                    bottomOffset: 50
                })
                
                router.push(`/inserat/${thisInserat?.id}`);
            } else {
                await publishInserat(thisInserat?.id);
            }

        } catch(e : any) {
            console.log();
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        console.log(usedKey)
    }, [])

    const renderMissingInputs = (inputField: neededInputsType) => {
        return (
            <TouchableOpacity className=" rounded-md bg-[#222435] shadow-lg flex flex-row" key={inputField?.name} 
            onPress={() => setCurrentPage(inputField?.page)}
            >
                <View className="w-1/4 items-center flex flex-row justify-center shadow-lg rounded-lg p-4 bg-[#1d1e2c] mr-4">
                    <MaterialCommunityIcons name="alert-decagram-outline" color={"red"} size={24} className="text-rose-600" />
                </View>
                <View className="w-3/4 p-2.5 flex flex-col">
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
            </TouchableOpacity>
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
                                "bg-indigo-800 w-full p-4 flex-row justify-center items-center ml-auto rounded-md space-x-4",
                                missingInputs?.length > 0 && "bg-indigo-800/20"
                            )}>
                                <MaterialCommunityIcons name="earth" color={"gray"} size={20} className={cn("text-gray-200", missingInputs?.length > 0 && "text-gray-200/40")} />
                                <Text className={cn("text-base font-semibold text-gray-200", missingInputs?.length > 0 && "text-gray-200/40")}>
                                    Inserat veröffentlichen
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="mt-4">
                            <TouchableOpacity className="bg-[#222435] border-indigo-800 border items-center w-full p-4 flex-row justify-center ml-auto rounded-md space-x-4"
                            onPress={() => {
                                router.push(`/dashboard/${thisInserat?.userId}`)
                            }}
                            >
                                <FontAwesome5 name="save" size={20} color="white" />
                                <Text className="text-base font-semibold text-gray-200">
                                    Speichern & zum Dashboard
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
                    {missingInputs?.length > 0 ? (
                        <Text className="text-lg text-gray-200 font-semibold">
                            Folgende Felder fehlen noch:
                        </Text>
                    ) : (
                        <View className="flex flex-row items-center space-x-4 w-full">
                            <View>
                                <MaterialCommunityIcons name="check" size={24} className="text-emerald-600"/>
                            </View>
                            <Text className="text-sm text-gray-200/60">
                            Dein Inserat ist bereit zur Veröffentlichung
                        </Text>
                        </View>
                    )}
                        <ScrollView className="h-72  flex flex-col space-y-4">
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

