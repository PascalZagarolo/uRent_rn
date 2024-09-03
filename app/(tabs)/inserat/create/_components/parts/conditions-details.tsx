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



interface ConditionsDetailsProps {
    thisInserat: typeof inserat.$inferSelect;

}

const ConditionsDetails = forwardRef(({ thisInserat }: ConditionsDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
            
        }
    }));

    const refRBSheet = useRef([]);

    const [currentLicense, setCurrentLicense] = useState(null);
    const [currentReqAge, setReqAge] = useState(null);
    const [currentCaution, setCaution] = useState(null);

    const reqAge = [
        { value: null, label: "Beliebig" },
        { value: "18", label: "18" },
        { value: "19", label: "18" },
        { value: "20", label: "18" },
        { value: "21", label: "18" },
        { value: "22", label: "18" },
        { value: "23", label: "18" },
        { value: "24", label: "18" },
        { value: "25", label: "18" },
        { value: "26", label: "18" },
        { value: "27", label: "18" },
        { value: "28", label: "18" },
        { value: "29", label: "18" },
        { value: "30", label: "18" },
        
    ];

    
    const licenseObject = [
        {
            value : "B", label : "B"
        },
        {
            value : "BE", label : "BE"
        },
        {
            value : "C1", label : "C1"
        },
        {
            value : "C", label : "C"
        },
        {
            value : "CE", label : "CE"
        },
        {
            value : "CE1", label : "CE1"
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
                        keyboardType="numeric"
                        onChangeText={(text) => setCaution(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg" />

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
                            <Text className={cn("text-base text-gray-200 font-semibold", )}>
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
                                            setCurrentLicense(value.value);
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