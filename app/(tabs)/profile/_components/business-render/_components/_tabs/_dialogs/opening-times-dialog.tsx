import { Scroll, XIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import TimePickerDialog from "./time-picker-dialog";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { cn } from "@/~/lib/utils";
import Toast from "react-native-toast-message";
import * as SecureStorage from 'expo-secure-store';
import { editOpeningTimes } from "@/actions/business/openingTimes/route";
import { openingTimes } from "@/db/schema";

interface OpeningTimesRenderProps {
    onClose: () => void;
    foundTimes : typeof openingTimes.$inferSelect;
    setFoundTimes : (value) => void;
}

const OpeningTimesDialog = ({ onClose, foundTimes, setFoundTimes }: OpeningTimesRenderProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const prefilledTimes = {
        monday : foundTimes?.monday?.split(" - "),
        tuesday : foundTimes?.tuesday?.split(" - "),
        wednesday : foundTimes?.wednesday?.split(" - "),
        thursday : foundTimes?.thursday?.split(" - "),
        friday : foundTimes?.friday?.split(" - "),
        saturday : foundTimes?.saturday?.split(" - "),
        sunday : foundTimes?.sunday?.split(" - ")
    }

    console.log(prefilledTimes)

    const [openingTimes, setOpeningTimes] = useState({
        Montag: { start: prefilledTimes.monday[0], end: prefilledTimes.monday[1] },
        Dienstag: { start: prefilledTimes.tuesday[0], end: prefilledTimes.tuesday[1] },
        Mittwoch: { start: prefilledTimes.wednesday[0], end: prefilledTimes.wednesday[1] },
        Donnerstag: { start: prefilledTimes.thursday[0], end: prefilledTimes.thursday[1]  },
        Freitag: { start: prefilledTimes.friday[0], end: prefilledTimes.friday[1]  },
        Samstag: { start: prefilledTimes.saturday[0], end: prefilledTimes.saturday[1] },
        Sonntag: { start: prefilledTimes.sunday[0], end: prefilledTimes.sunday[1]  }
    });

    

    const onSave = async () => {
        try {
            setIsLoading(true);
            if(isLoading) return null;
            const values = {
                monday: (openingTimes.Montag.start ?? "") + " - " + (openingTimes.Montag.end ?? ""),
                tuesday: (openingTimes.Dienstag.start ?? "") + " - " + (openingTimes.Dienstag.end ?? ""),
                wednesday: (openingTimes.Mittwoch.start ?? "") + " - " + (openingTimes.Mittwoch.end ?? ""),
                thursday: (openingTimes.Donnerstag.start ?? "") + " - " + (openingTimes.Donnerstag.end ?? ""),
                friday: (openingTimes.Freitag.start ?? "") + " - " + (openingTimes.Freitag.end ?? ""),
                saturday: (openingTimes.Samstag.start ?? "") + " - " + (openingTimes.Samstag.end ?? ""),
                sunday: (openingTimes.Sonntag.start ?? "") + " - " + (openingTimes.Sonntag.end ?? ""),
            };

            const authToken = await SecureStorage.getItemAsync("authToken");
            await editOpeningTimes(values, authToken);
            onClose()
            setFoundTimes(
                {
                    monday: values.monday,
                    tuesday: values.tuesday,
                    wednesday: values.wednesday,
                    thursday: values.thursday,
                    friday: values.friday,
                    saturday: values.saturday,
                    sunday: values.sunday
                }
            )   
            Toast.show({
                type: "success",
                text1: "Erfolgreich",
                text2: "Öffnungszeiten wurden gespeichert"
            })
        } catch(e : any) {
            console.log(e);
            Toast.show({
                type: "error",
                text1: "Fehler",
                text2: "Öffnungszeiten konnten nicht gespeichert werden"
            })
        } finally {
            setIsLoading(false);
        }
    }

    //! Todo: 4) spätere Schließzeiten als Öffnungszeiten verhindern7) Zeiten vorbelegen 6) Zeiten direkt aktuleiisieren)

    const refRBSheet = useRef<any>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null); // Track the selected day
    const [selectedTimeType, setSelectedTimeType] = useState<'start' | 'end' | null>(null); // Track the time type (start or end)

    // Handler to update start/end times for a specific day
    const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
        setOpeningTimes(prevState => ({
            ...prevState,
            [day]: { ...prevState[day], [type]: value }
        }));
    };

    // Open TimePickerDialog for a specific day and time type
    const openTimePicker = (day: string, timeType: 'start' | 'end') => {
        setSelectedDay(day); // Set the day being edited
        setSelectedTimeType(timeType); // Set the time type (start or end)
        refRBSheet.current.open(); // Open the bottom sheet
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="h-full w-full justify-center items-center bg-black/80 p-4">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="w-full h-[600px]"
                >
                    <View className="bg-[#151821] w-full h-full rounded-lg flex-1">
                        <View className="flex flex-row items-center p-4 w-full">
                            <Text className="text-lg font-semibold text-gray-200">
                                Öffnungszeiten bearbeiten
                            </Text>
                            <TouchableOpacity className="ml-auto" onPress={onClose}>
                                <XIcon />
                            </TouchableOpacity>
                        </View>

                        {/* Day Section */}
                        <View className=" px-4 ">
                            <ScrollView className="h-[460px] w-full ">
                                {Object.keys(openingTimes).map((day) => (
                                    <View key={day}>
                                        <Text className="text-lg font-semibold text-gray-200/80">
                                            {day}
                                        </Text>
                                        <View className="mb-2 flex space-x-4 flex-row items-center justify-between">
                                            <View className="w-5/12 p-2.5 py-4 rounded-md bg-[#222633]">
                                                <TouchableOpacity onPress={() => openTimePicker(day, 'start')}>
                                                    <Text className="text-gray-200 text-base font-semibold">
                                                        {`${openingTimes[day].start} Uhr`|| "Von"}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <Text className="text-gray-200 text-base font-semibold">
                                                    -
                                                </Text>
                                            </View>
                                            <View className="flex flex-row items-center w-5/12 p-2.5 py-4 rounded-md bg-[#222633]">
                                                <TouchableOpacity onPress={() => openTimePicker(day, 'end')}>
                                                    <Text className="text-gray-200 text-base font-semibold">
                                                        {`${openingTimes[day].end} Uhr` || "Bis"}
                                                    </Text>
                                                    
                                                </TouchableOpacity>
                                              
                                            </View>
                                            
                                        </View>
                                        <View className="flex flex-row items-center space-x-4 py-4">
                                            <BouncyCheckbox
                                                size={24}
                                                fillColor="blue"
                                                unFillColor="#FFFFFF"
                                                className="flex justify-center items-center"
                                                
                                                isChecked={!openingTimes[day].start && !openingTimes[day].end}
                                                onPress={(e) => {
                                                    if(e) {
                                                        setOpeningTimes(prevState => ({
                                                            ...prevState,
                                                            [day]: { start: "", end: "" }
                                                        }));
                                                    }
                                                }}
                                                disableText={true}
                                            />
                                            <Text className={cn("font-medium text-gray-200/80 text-base", !openingTimes[day].start && "underline  text-gray-200" )}>
                                                Geschlossen
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>

                        {/* Save Button */}
                        <View className="px-4 pb-4">
                            <TouchableOpacity className="mt-4 bg-indigo-800 rounded-md" onPress={onSave}>
                                <Text className="text-base font-semibold text-center p-2.5 text-gray-200">
                                    Änderungen speichern
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>

                {/* TimePickerDialog for Time selection */}
                <TimePickerDialog
                    refRBSheet={refRBSheet}
                    onSelect={(time) => {
                        if (selectedDay && selectedTimeType) {
                            handleTimeChange(selectedDay, selectedTimeType, time); // Pass both day and time type (start or end)
                        }
                    }}
                    startTime={openingTimes[selectedDay]?.start}
                    endTime={openingTimes[selectedDay]?.end}
                    onClose={() => refRBSheet.current.close()}
                />
            </View>
        </TouchableWithoutFeedback>

    );
}

export default OpeningTimesDialog;
