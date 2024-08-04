import { useSavedSearchParams } from "@/store";
import { cn } from "@/~/lib/utils";
import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

interface DynamicSearchReqTimeProps{
    disabled : boolean;
}

const DynamicSearchReqTime : React.FC<DynamicSearchReqTimeProps> = ({
    disabled
}) => {

    const [currentReqTime, setCurrentReqTime] = useState<any>();
    

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const refRBSheet = useRef([]);

    const prefilledValues = [
        {
            value : "1h",
            string : "1 Stunde"
        },
        {
            value : "4h",
            string : "4 Stunden"
        },
        {
            value : "1d",
            string : "1 Tag"
        },
        {
            value : "3d",
            string : "3 Tage"
        },
        {
            value : "1w",
            string : "1 Woche"
        },
        {
            value : "2w",
            string : "2 Wochen"
        },
        {
            value : "1m",
            string : "1 Monat"
        }

    ];

    useEffect(() => {
        if(currentReqTime) {
            changeSearchParams("reqTime", currentReqTime)
        } else {
            deleteSearchParams("reqTime")
        }
    },[currentReqTime])

    useEffect(() => {
        if(!currentObject["reqTime"]) {
            setCurrentReqTime(null)
        }
    },[currentObject["reqTime"]])

    

    

    function getFittingString  (value: string)  {
        switch(value) {
            case "1h":
                return "1 Stunde";
            case "4h":
                return "4 Stunden";
            case "1d":
                return "1 Tag";
            case "3d":
                return "3 Tage";
            case "1w":
                return "1 Woche";
            case "2w":
                return "2 Wochen";
            case "1m":
                return "1 Monat";
                default:
                    return value;    
        }
    }

    return (
        <View>
            <View>
                <View className="flex flex-row w-full mt-2 justify-center  px-6">
                    <View className="">
                        <Text className="text-base font-semibold text-gray-200">
                            Mietdauer 
                        </Text>
                        <TouchableOpacity className={cn("w-full bg-[#171a24] p-4 rounded-md flex flex-row", disabled ? "bg-[#1c212c]" : "")}
                        disabled={disabled}
                        onPress={() => refRBSheet.current[1].open()}
                        >
                            {
                                currentReqTime ? (
                                    <Text className="text-base text-gray-200 font-semibold">{getFittingString(currentReqTime)}</Text>
                                ) : (
                                    <Text className="text-base text-gray-200/60 line-clamp-1" numberOfLines={1}>Wähle die gewünschte Mietdauer..</Text>
                                )
                            }
                            <View className="ml-auto justify-end">
                                <Feather name="clock" size={24} color="gray" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    

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
                        Gewünschte Mietdauer
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4 ">
                        <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                                    onPress={() => {
                                        setCurrentReqTime(null);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        -
                                    </Text>
                                </TouchableOpacity>
                            {prefilledValues.map((value) => (
                                <TouchableOpacity className="w-full bg-[#232635] p-2" key={value.value}
                                    onPress={() => {
                                        setCurrentReqTime(value.value);
                                        refRBSheet.current[1].close();
                                    }}
                                >
                                    <Text className="text-center text-lg text-gray-200 font-semibold">
                                        {value.string}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </RBSheet>

            
        </View >
    );
}

export default DynamicSearchReqTime;