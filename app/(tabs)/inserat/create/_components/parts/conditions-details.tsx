import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { set } from "date-fns";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import {
    Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback,
    ScrollView
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import * as SecureStorage from 'expo-secure-store';
import { editInseratBasic } from "@/actions/inserat/edit/edit-inserat-basic";



interface ConditionsDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat: () => void;
}

const ConditionsDetails = forwardRef(({ thisInserat, refetchInserat }: ConditionsDetailsProps, ref) => {

    const hasChanged = () => {
        if (String(thisInserat?.license ?? "") != String(currentLicense ?? "")) return true;
        if (String(thisInserat?.reqAge ?? "") != String(currentReqAge ?? "")) return true;
        if (String(thisInserat?.caution ?? "") != String(currentCaution ?? "")) return true;
    }

    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        onSave: async () => {
            try {
                if (isLoading) return;
                setIsLoading(true);

                if (hasChanged) {
                    const token = await SecureStorage.getItemAsync("authToken");

                    const values = {
                        inseratId: thisInserat.id,
                        token: token,
                        license: currentLicense,
                        reqAge: currentReqAge,
                        caution: currentCaution,
                    }

                    await editInseratBasic(values);
                    refetchInserat();
                }
            } catch (e: any) {
                console.log(e);
                throw e;
            } finally {
                setIsLoading(false);
            }
        }
    }));

    const refRBSheet = useRef([]);

    const [currentLicense, setCurrentLicense] = useState(thisInserat?.license ?? null);
    const [currentReqAge, setReqAge] = useState(thisInserat?.reqAge ?? null);
    const [currentCaution, setCaution] = useState(thisInserat?.caution ?? null);

    const reqAge = [
        { value: null, label: "Beliebig" },
        { value: "18", label: "18" },
        { value: "19", label: "19" },
        { value: "20", label: "20" },
        { value: "21", label: "21" },
        { value: "22", label: "22" },
        { value: "23", label: "23" },
        { value: "24", label: "24" },
        { value: "25", label: "25" },
        { value: "26", label: "26" },
        { value: "27", label: "27" },
        { value: "28", label: "28" },
        { value: "29", label: "29" },
        { value: "30", label: "30" },

    ];


    const licenseObject = [
        {
            value: "B", label: "B"
        },
        {
            value: "BE", label: "BE"
        },
        {
            value: "C1", label: "C1"
        },
        {
            value: "C", label: "C"
        },
        {
            value: "CE", label: "CE"
        },
        {
            value: "CE1", label: "CE1"
        },

    ]












    return (
        <TouchableWithoutFeedback className="" onPress={Keyboard.dismiss}>
            <>
                <View className="flex flex-col items-center w-full mt-4">

                    <View className="w-full">
                        <Text className="text-lg font-semibold text-gray-200">
                            Kaution
                        </Text>
                        <TextInput
                            placeholder="Gebe deine Kaution an..."
                            value={currentCaution}
                            placeholderTextColor={"gray"}
                            keyboardType="numeric"
                            onChangeText={(text) => setCaution(text)}
                            className="w-full bg-[#1f2330] text-gray-200 p-4 rounded-lg" />

                    </View>





                    <View className="w-full mt-4">
                        <Text className="text-lg font-semibold text-gray-200">
                            Mindestalter
                        </Text>
                        <TouchableOpacity className="bg-[#1a1e29] p-4 flex flex-row items-center rounded-md"
                            onPress={() => refRBSheet.current[1].open()}
                        >
                            <Text className={cn("text-base text-gray-200 font-semibold", !currentReqAge && "text-gray-200/40 font-medium")}>
                                {currentReqAge ? currentReqAge : "Beliebig"}
                            </Text>
                            <View className="ml-auto">
                                <FontAwesome name="chevron-down" size={20} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="w-full mt-4">
                        <Text className="text-lg font-semibold text-gray-200">
                            Führerscheinklasse
                        </Text>
                        <TouchableOpacity className="bg-[#1a1e29] p-4 flex flex-row items-center  rounded-md"
                            onPress={() => refRBSheet.current[2].open()}
                        >
                            <Text className={cn("text-base text-gray-200 font-semibold", !currentLicense && "text-gray-200/40 font-medium")}>
                                {currentLicense ? currentLicense : "Beliebig"}
                            </Text>
                            <View className="ml-auto">
                                <FontAwesome name="chevron-down" size={20} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>



                </View>
                <RBSheet
                    ref={ref => (refRBSheet.current[1] = ref)}

                    customStyles={{
                        wrapper: {
                            backgroundColor: 'transparent',
                        },
                        container: {
                            backgroundColor: '#1F2332',
                            borderTopColor: '#2D3748', // Gray-800 color
                            borderTopWidth: 2,

                        }
                    }}

                    customModalProps={{
                        animationType: 'slide',
                        statusBarTranslucent: true,
                    }}
                    customAvoidingViewProps={{
                        enabled: false,
                    }}>
                    <View className="p-4">
                        <Text className="text-base font-semibold text-gray-200">
                            Mindestalter auswählen
                        </Text>
                        <ScrollView className="h-[160px] w-full p-4 ">
                            <View className="flex flex-col justify-center space-y-4">
                                <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setReqAge(null);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                                {reqAge.map((value) => (
                                    <TouchableOpacity className="w-full bg-[#232635] p-2" key={value.value}
                                        onPress={() => {
                                            setReqAge(value.value);
                                            refRBSheet.current[1].close();
                                        }}
                                    >
                                        <Text className="text-center text-lg text-gray-200 font-semibold">
                                            {value.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </RBSheet>
                <RBSheet
                    ref={ref => (refRBSheet.current[2] = ref)}

                    customStyles={{
                        wrapper: {
                            backgroundColor: 'transparent',
                        },
                        container: {
                            backgroundColor: '#1F2332',
                            borderTopColor: '#2D3748', // Gray-800 color
                            borderTopWidth: 2,

                        }
                    }}

                    customModalProps={{
                        animationType: 'slide',
                        statusBarTranslucent: true,
                    }}
                    customAvoidingViewProps={{
                        enabled: false,
                    }}>
                    <View className="p-4">
                        <Text className="text-base font-semibold text-gray-200">
                            Führerschein auswählen
                        </Text>
                        <ScrollView className="h-[160px] w-full p-4 ">
                            <View className="flex flex-col justify-center space-y-4">
                                <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentLicense(null);
                                        refRBSheet.current[2].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                                {licenseObject.map((value) => (
                                    <TouchableOpacity className="w-full bg-[#232635] p-2" key={value.value}
                                        onPress={() => {
                                            setCurrentLicense(value.value as any);
                                            refRBSheet.current[2].close();
                                        }}
                                    >
                                        <Text className="text-center text-lg text-gray-200 font-semibold">
                                            {value.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </RBSheet>
            </>
        </TouchableWithoutFeedback>
    );
});

export default ConditionsDetails;