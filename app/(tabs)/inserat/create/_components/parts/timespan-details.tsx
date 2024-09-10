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



interface TimespanDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const TimespanDetails = forwardRef(({ thisInserat, refetchInserat }: TimespanDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
            
        }
    }));

    const refRBSheet = useRef([]);

    

    const [currentMintime, setCurrentMintime] = useState<{ value, label}>(null);

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

    const hours = [
        { value : "1h", label : "1 Stunde" },
        { value : "2h", label : "2 Stunde" },
        { value : "3h", label : "3 Stunde" },
        { value : "4h", label : "4 Stunde" },
        { value : "5h", label : "5 Stunde" },
        { value : "6h", label : "6 Stunde" },
        { value : "7h", label : "7 Stunde" },
        { value : "8h", label : "8 Stunde" },
        { value : "9h", label : "9 Stunde" },
        { value : "10h", label : "10 Stunde" },
        { value : "11h", label : "11 Stunde" },
        { value : "12h", label : "12 Stunde" }
    ]

    const days = [
        { value : "1d", label : "1 Tag" },
        { value : "2d", label : "2 Tage" },
        { value : "3d", label : "3 Tage" },
        { value : "4d", label : "4 Tage" },
        { value : "5d", label : "5 Tage" },
        { value : "6d", label : "6 Tage" },
    ]

    const weeks = [
        { value : "1w", label : "1 Woche" },
        { value : "2w", label : "2 Wochen" },
        { value : "3w", label : "3 Wochen" },
        { value : "4w", label : "4 Wochen" },
    ]

    const months = [
        { value : "1m", label : "1 Monat" },
        { value : "2m", label : "2 Monate" },
        { value : "3m", label : "3 Monate" },
        { value : "4m", label : "4 Monate" },
        { value : "5m", label : "5 Monate" },
        { value : "6m", label : "6 Monate" },
        { value : "7m", label : "7 Monate" },
        { value : "8m", label : "8 Monate" },
        { value : "9m", label : "9 Monate" },
        { value : "10m", label : "10 Monate" },
        { value : "11m", label : "11 Monate" },
        { value : "12m", label : "12 Monate" }
    ]

    const years = [
        { value : "1y", label : "1 Jahr" },
        { value : "2y", label : "2 Jahre" },
        { value : "3y", label : "3 Jahre" },
    ]

    
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
                
                
                



                    
                    <View className="w-full mt-4">
                        <Text className="text-lg font-semibold text-gray-200">
                            Mindestmietdauer
                        </Text>
                        <TouchableOpacity className="bg-[#1a1e29] p-4 flex flex-row items-center rounded-md"
                            onPress={() => refRBSheet.current[1].open()}
                        >
                            <Text className={cn("text-base text-gray-200 font-semibold", !currentMintime && "text-gray-200/40 font-medium")}>
                                {currentMintime ? currentMintime.label : "Beliebig"}
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
                                        setCurrentMintime(null);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <Text className="text-xl text-gray-200 font-semibold">
                                    Stunden
                                </Text>
                                {hours.map((value) => (
                                    <TouchableOpacity className="w-full bg-[#232635] p-2" key={value.value}
                                        onPress={() => {
                                            setCurrentMintime({ value: value.value, label: value.label });
                                            refRBSheet.current[1].close();
                                        }}
                                    >
                                        <Text className="text-center text-lg text-gray-200 font-semibold">
                                            {value.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                <Text className="text-xl text-gray-200 font-semibold">
                                    Tage
                                </Text>
                                {days.map((value) => (
                                    <TouchableOpacity className="w-full bg-[#232635] p-2" key={value.value}
                                        onPress={() => {
                                            setCurrentMintime({ value: value.value, label: value.label });
                                            refRBSheet.current[1].close();
                                        }}
                                    >
                                        <Text className="text-center text-lg text-gray-200 font-semibold">
                                            {value.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                <Text className="text-xl text-gray-200 font-semibold">
                                    Wochen
                                </Text>
                                {weeks.map((value) => (
                                    <TouchableOpacity className="w-full bg-[#232635] p-2" key={value.value}
                                        onPress={() => {
                                            setCurrentMintime({ value: value.value, label: value.label });
                                            refRBSheet.current[1].close();
                                        }}
                                    >
                                        <Text className="text-center text-lg text-gray-200 font-semibold">
                                            {value.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                <Text className="text-xl text-gray-200 font-semibold">
                                    Monate
                                </Text>
                                {months.map((value) => (
                                    <TouchableOpacity className="w-full bg-[#232635] p-2" key={value.value}
                                        onPress={() => {
                                            setCurrentMintime({ value: value.value, label: value.label });
                                            refRBSheet.current[1].close();
                                        }}
                                    >
                                        <Text className="text-center text-lg text-gray-200 font-semibold">
                                            {value.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                <Text className="text-xl text-gray-200 font-semibold">
                                    Jahre
                                </Text>
                                {years.map((value) => (
                                    <TouchableOpacity className="w-full bg-[#232635] p-2" key={value.value}
                                        onPress={() => {
                                            setCurrentMintime({ value: value.value, label: value.label });
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
                
            </>
        </TouchableWithoutFeedback>
    );
});

export default TimespanDetails;