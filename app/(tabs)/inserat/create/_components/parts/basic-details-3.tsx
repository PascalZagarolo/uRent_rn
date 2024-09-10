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



interface BasicDetails3Props {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat : () => void;
}

const BasicDetails3 = forwardRef(({ thisInserat, refetchInserat }: BasicDetails3Props, ref) => {

    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        onSave: async () => {
            try {
                console.log("2000")
                setIsLoading(true);
                const authToken = await SecureStorage.getItemAsync("authToken");
                
                const values = {
                    inseratId : thisInserat.id,
                    token : authToken,
                    category : currentCategory,
                    extraCategory : currentExtraCategory,
                    multi : isMulti,
                    amount : amount
                } 
                await editInseratBasic(values);
                await refetchInserat();
            } catch(e : any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }));

    const refRBSheet = useRef([]);

    const [currentCategory, setCurrentCategory] = useState<string>(thisInserat.category);
    const [currentExtraCategory, setCurrentExtraCategory] = useState<string>();
    const [isMulti, setIsMulti] = useState<boolean>(thisInserat.multi);
    const [amount, setAmount] = useState<number>(thisInserat.amount || 1);

    const pkwExtraCategories = [
        { value: null, label: "Beliebig" },
        { value: "CONTAINERTRANSPORT", label: "Containertransport" },
        { value: "FAHRZEUGTRANSPORT", label: "Fahrzeugtransport" },
        { value: "FLUESSIGKEITSTRANSPORT", label: "Fluessigkeitstransport" },
        { value: "KASTENWAGEN", label: "Kastenwagen" },
        { value: "KOFFERAUFBAU", label: "Kofferaufbau" },
        { value: "KUEHLAUFBAU", label: "Kuehlaufbau" },
        { value: "MOEBELTRANSPORT", label: "Moebeltransport" },
        { value: "MULDENKIPPER", label: "Muldenkipper" },
        { value: "PERSONENTRANSPORT", label: "Personentransport" },
        { value: "PLANE", label: "Plane" },
        { value: "PRITSCHE", label: "Pritsche" }
    ];

    const lkwExtraCategories = [
        { value: null, label: "Beliebig" },
        { value: "CONTAINERTRANSPORT", label: "Containertransport" },
        { value: "FAHRZEUGTRANSPORT", label: "Fahrzeugtransport" },
        { value: "FLUESSIGKEITSTRANSPORT", label: "Flüssigkeitstransport" },
        { value: "KOFFERAUFBAU", label: "Kofferaufbau" },
        { value: "KUEHLWAGEN", label: "Kühlwagen" },
        { value: "KRANWAGEN", label: "Kranwagen" },
        { value: "MOEBELTRANSPORT", label: "Moebeltransport" },
        { value: "PERSONENTRANSPORT", label: "Personentransport" },
        { value: "PLANWAGEN", label: "Planwagen" },
        { value: "PRITSCHENWAGEN", label: "Pritschenwagen" },
        { value: "SATTELSCHLEPPER", label: "Sattelschlepper" }
    ];

    const trailerExtraCategories = [
        { value: "CONTAINERTRANSPORT", label: "Containertransport" },
        { value: "FAHRZEUGTRANSPORT", label: "Fahrzeugtransport" },
        { value: "FLUESSIGKEITSTRANSPORT", label: "Fluessigkeitstransport" },
        { value: "KASTENWAGEN", label: "Kastenwagen" },
        { value: "KOFFERAUFBAU", label: "Kofferaufbau" },
        { value: "KUEHLAUFBAU", label: "Kuehlaufbau" },
        { value: "MOEBELTRANSPORT", label: "Moebeltransport" },
        { value: "MULDENKIPPER", label: "Muldenkipper" },
        { value: "PERSONENTRANSPORT", label: "Personentransport" },
        { value: "PLANE", label: "Plane" },
        { value: "PRITSCHE", label: "Pritsche" }
    ];

    const transportExtraCategories = [
        { value: null, label: "Beliebig" },
        { value: "ABSETZKIPPERAUFBAU", label: "Absetzkipperaufbau" },
        { value: "CONTAINERTRANSPORT", label: "Containertransport" },
        { value: "FAHRZEUGTRANSPORT", label: "Fahrzeugtransport" },
        { value: "FLUESSIGKEITSTRANSPORT", label: "Fluessigkeitstransport" },
        { value: "KIPPERAUFBAU", label: "Kipperaufbau" },
        { value: "KASTENWAGEN", label: "Kastenwagen" },
        { value: "KOFFERAUFBAU", label: "Kofferaufbau" },
        { value: "KUEHLAUFBAU", label: "Kuehlaufbau" },
        { value: "MOEBELTRANSPORT", label: "Moebeltransport" },
        { value: "MULDENKIPPER", label: "Muldenkipper" },
        { value: "PERSONENTRANSPORT", label: "Personentransport" },
        { value: "PLANE", label: "Plane" },
        { value: "PRITSCHE", label: "Pritsche" }
    ];


    const getExtraCategories = () => {
        switch (currentCategory) {
            case "PKW":
                return pkwExtraCategories;
                break;
            case "LKW":
                return lkwExtraCategories;
            case "TRAILER":
                return trailerExtraCategories;
            case "TRANSPORT":
                return transportExtraCategories;
            default:
                return [];
        }
    };

    function getLabelForValue(value, currentCategory) {
        let returnedLabel = "";

        switch (currentCategory) {
            case "PKW":
                returnedLabel = pkwExtraCategories.find((item) => item.value === value)?.label;
                break;
            case "LKW":
                returnedLabel = lkwExtraCategories.find((item) => item.value === value)?.label;
                break;
            case "TRAILER":
                returnedLabel = trailerExtraCategories.find((item) => item.value === value)?.label;
                break;
            case "TRANSPORT":
                returnedLabel = transportExtraCategories.find((item) => item.value === value)?.label;
                break;
            default:
                return "Beliebig";
        }

        return returnedLabel || "Beliebig";
    }

    useEffect(() => {
        setCurrentExtraCategory(null);
    }, [currentCategory])



    return (
        <TouchableWithoutFeedback className="" onPress={Keyboard.dismiss}>
            <>
                <View className="flex flex-col items-center w-full mt-4">
                    {/*
                <View className="w-full">
                    <Text className="text-lg font-semibold text-gray-200">
                        Titel
                    </Text>
                    <TextInput
                        placeholder="Titel deines Inserats..."
                        value={currentTitle}
                        onChangeText={(text) => setCurrentTitle(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg" />

                </View>
                */}



                    <View className="w-full">
                        <Text className="text-lg font-semibold text-gray-200">
                            Fahrzeugkategorie
                        </Text>
                        <View className="flex flex-col items-center space-y-4 mt-4">
                            <View className="flex flex-row items-center w-full justify-evenly">
                                <TouchableOpacity className={cn("bg-[#1a1e29] w-5/12 p-4 flex-col justify-center items-center rounded-md",
                                    currentCategory === "PKW" && "border border-indigo-800"
                                )}
                                    onPress={() => {
                                        currentCategory === "PKW" ? setCurrentCategory("") : setCurrentCategory("PKW")
                                    }}>
                                    <View className="flex justify-center">
                                        <Ionicons name="car-outline" size={32} color="#fff" />
                                    </View>
                                    <Text className={cn("text-gray-200/40 text-base font-medium text-center",
                                        currentCategory === "PKW" && "text-gray-200/90 font-semibold")}>
                                        PKW
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity className={cn("bg-[#1a1e29] w-5/12 p-4 flex-col justify-center items-center rounded-md",
                                    currentCategory === "LKW" && "border border-indigo-800"
                                )}
                                    onPress={() => {
                                        currentCategory === "LKW" ? setCurrentCategory("") : setCurrentCategory("LKW")
                                    }}>
                                    <View className="flex justify-center">
                                        <MaterialCommunityIcons name="truck" size={32} color="#fff" />
                                    </View>
                                    <Text className={cn("text-gray-200/40 text-base font-medium text-center",
                                        currentCategory === "LKW" && "text-gray-200/90 font-semibold")}>
                                        LKW
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex flex-row items-center w-full justify-evenly">
                                <TouchableOpacity className={cn("bg-[#1a1e29] w-5/12 p-4 flex-col justify-center items-center rounded-md",
                                    currentCategory === "TRAILER" && "border border-indigo-800"
                                )}
                                    onPress={() => {
                                        currentCategory === "TRAILER" ? setCurrentCategory("") : setCurrentCategory("TRAILER")
                                    }}>
                                    <View className="flex justify-center">
                                        <MaterialCommunityIcons name="truck-trailer" size={32} color="#fff" />
                                    </View>
                                    <Text className={cn("text-gray-200/40 text-base font-medium text-center",
                                        currentCategory === "TRAILER" && "text-gray-200/90 font-semibold")}>
                                        Anhänger
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity className={cn("bg-[#1a1e29] w-5/12 p-4 flex-col justify-center items-center rounded-md",
                                    currentCategory === "TRANSPORT" && "border border-indigo-800"
                                )}
                                    onPress={() => {
                                        currentCategory === "TRANSPORT" ? setCurrentCategory("") : setCurrentCategory("TRANSPORT")
                                    }}>
                                    <View className="flex justify-center">
                                        <MaterialCommunityIcons name="van-utility" size={32} color="#fff" />
                                    </View>
                                    <Text className={cn("text-gray-200/40 text-base font-medium text-center",
                                        currentCategory === "TRANSPORT" && "text-gray-200/90 font-semibold")}>
                                        Transporter
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View className="w-full mt-4">
                        <Text className="text-lg font-semibold text-gray-200">
                            Erw. Fahrzeugkategorie
                        </Text>
                        <TouchableOpacity className="bg-[#1a1d29] p-4 flex flex-row items-center rounded-md"
                            onPress={() => refRBSheet.current[1].open()}
                        >
                            <Text className={cn("text-base text-gray-200 font-semibold", !currentExtraCategory && "text-gray-200/40 font-medium")}>
                                {currentExtraCategory ? getLabelForValue(currentExtraCategory, currentCategory) : "Beliebig"}
                            </Text>
                            <View className="ml-auto">
                                <FontAwesome name="chevron-down" size={20} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="w-full mt-4">
                        <Text className="text-lg font-semibold text-gray-200">
                            Art des Inserates
                        </Text>
                        <TouchableOpacity className="bg-[#1a1d29] p-4 flex flex-row items-center rounded-md"
                            onPress={() => refRBSheet.current[2].open()}
                        >
                            <Text className={cn("text-base text-gray-200 font-semibold", )}>
                                {isMulti ? "Flotte" : "Einzel"}
                            </Text>
                            <View className="ml-auto">
                                <FontAwesome name="chevron-down" size={20} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="w-full mt-4">
                        <Text className="text-lg font-semibold text-gray-200">
                            Anzahl Fahrzeuge
                        </Text>
                       
                            <TextInput className={cn("text-base text-gray-200 font-semibold rounded-md p-4 bg-[#1f2330] w-full", 
                            !isMulti && "text-gray-200/40 font-medium")}
                            editable={isMulti}
                            value={isMulti ? amount.toString() : "1"}
                            onChangeText={(e) => setAmount(isMulti ? parseInt(e) || 0 : 1)}
                            />
                            

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
                            Führerschein auswählen
                        </Text>
                        <ScrollView className="h-[160px] w-full p-4 ">
                            <View className="flex flex-col justify-center space-y-4">
                                <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentExtraCategory(null);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                                {getExtraCategories().map((value) => (
                                    <TouchableOpacity className="w-full bg-[#232635] p-2" key={value.value}
                                        onPress={() => {
                                            setCurrentExtraCategory(value.value);
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
                            Art des Inserates
                        </Text>
                        <ScrollView className="h-[160px] w-full p-4 ">
                            <View className="flex flex-col justify-center space-y-4">
                                <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setIsMulti(false);
                                        refRBSheet.current[2].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        Einzel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setIsMulti(true);
                                        refRBSheet.current[2].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        Flotte
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </RBSheet>
            </>
        </TouchableWithoutFeedback>
    );
});

export default BasicDetails3;