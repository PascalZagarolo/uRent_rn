import { Scroll, XIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import TimePickerDialog from "./time-picker-dialog";
import BouncyCheckbox from "react-native-bouncy-checkbox";

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

    //! Todo: 1) Checkboxes funktionsfähig machen (nur wenn Aktiv "Geschlossen" unterstreichen), 2) Wenn Checkbox aktiv => Textfelder deaktivieren, 3) Werte speichern können

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
                                                        {openingTimes[day].start || "Von"}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <Text className="text-gray-200 text-base font-semibold">
                                                    -
                                                </Text>
                                            </View>
                                            <View className="w-5/12 p-2.5 py-4 rounded-md bg-[#222633]">
                                                <TouchableOpacity onPress={() => openTimePicker(day, 'end')}>
                                                    <Text className="text-gray-200 text-base font-semibold">
                                                        {openingTimes[day].end || "Bis"}
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

                                                isChecked={true}
                                                onPress={() => {}}
                                                disableText={true}
                                            />
                                            <Text className="text-gray-200 font-medium text-base underline">
                                                Geschlossen
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>

                        {/* Save Button */}
                        <View className="px-4 pb-4">
                            <TouchableOpacity className="mt-4 bg-indigo-800 rounded-md">
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
                    onClose={() => refRBSheet.current.close()}
                />
            </View>
        </TouchableWithoutFeedback>

    );
}

export default OpeningTimesDialog;
