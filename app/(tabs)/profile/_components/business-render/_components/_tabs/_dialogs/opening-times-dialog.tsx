import { XIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import TimePickerDialog from "./time-picker-dialog";

interface OpeningTimesRenderProps {
    onClose: () => void;
}

const OpeningTimesDialog = ({ onClose }: OpeningTimesRenderProps) => {
    const [openingTimes, setOpeningTimes] = useState({
        Montag: { start: "", end: "" },
        Dienstag: { start: "", end: "" },
        Mittwoch: { start: "", end: "" },
        Donnerstag: { start: "", end: "" },
        Freitag: { start: "", end: "" },
        Samstag: { start: "", end: "" },
        Sonntag: { start: "", end: "" }
    });

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
                >
                    <View className="bg-[#151821] w-full rounded-lg">
                        <View className="flex flex-row items-center p-4 w-full">
                            <Text className="text-lg font-semibold text-gray-200">
                                Öffnungszeiten bearbeiten
                            </Text>
                            <TouchableOpacity className="ml-auto" onPress={onClose}>
                                <XIcon />
                            </TouchableOpacity>
                        </View>

                        {/* Day Section */}
                        <View className="px-4">
                            {Object.keys(openingTimes).map((day) => (
                                <View key={day}>
                                    <Text className="text-lg font-semibold text-gray-200/80">
                                        {day}
                                    </Text>
                                    <View className=" mb-2 flex space-x-4 flex-row items-center justify-between">
                                        <View className="w-5/12 p-2.5 rounded-md bg-[#222633]">
                                            <TouchableOpacity onPress={() => openTimePicker(day, 'start')}>
                                                <Text className="text-gray-200 text-base font-semibold">
                                                    {openingTimes[day].start || "Von"}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text className="text-gray-200 text-base font-semibold">
                                                -
                                            </Text>
                                        </View>
                                        <View className="w-5/12 p-2.5 rounded-md bg-[#222633]">
                                            <TouchableOpacity onPress={() => openTimePicker(day, 'end')}>
                                                <Text className="text-gray-200 text-base font-semibold">
                                                    {openingTimes[day].end || "Bis"}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                            <View>
                                <TouchableOpacity className="mt-4 bg-indigo-800 rounded-md mb-4">
                                    <Text className="text-base font-semibold text-center p-2.5 text-gray-200">
                                    Änderungen speichern
                                    </Text>
                                </TouchableOpacity>
                            </View>
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
                    onClose={() => refRBSheet.current.close()} 
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default OpeningTimesDialog;
