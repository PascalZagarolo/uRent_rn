import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

interface TimePickerDialogProps {
    refRBSheet: any; 
    onSelect: (time: string) => void; // Handle selected time
    startTime?: string; // Optional start time
    endTime?: string; // Optional end time
    onClose: () => void;
}

const TimePickerDialog = ({ refRBSheet, onSelect, onClose, startTime, endTime }: TimePickerDialogProps) => {
    // Parse startTime and endTime to minutes for comparison
    const startMinutes = startTime 
        ? parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]) 
        : 0;

    const endMinutes = endTime
        ? parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]) 
        : 24 * 60; // Default to end of the day if no endTime is provided

    const prefilledTimes = Array.from({ length: 96 }, (_, index) => {
        const minutes = index * 15;
        const hours = Math.floor(minutes / 60).toString().padStart(2, '0'); // Pad hours to two digits
        const remainingMinutes = (minutes % 60).toString().padStart(2, '0'); // Pad minutes to two digits
        const formattedTime = `${hours}:${remainingMinutes}`;
        
        return {
            string: formattedTime,
            value: minutes,
            isDisabled: minutes < startMinutes || minutes > endMinutes, // Disable times outside range
        };
    });

    return ( 
        <View>
            <RBSheet
                ref={refRBSheet}
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
                        Zeitpunkt auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4">
                        <View className="flex flex-col justify-center space-y-4">
                            {prefilledTimes.map((value) => (
                                <TouchableOpacity 
                                    className={`w-full p-2 ${
                                        value.isDisabled ? 'bg-gray-600' : 'bg-[#232635]'
                                    }`}
                                    key={value.value}
                                    onPress={() => { 
                                        if (!value.isDisabled) { // Only allow selection if not disabled
                                            onSelect(value.string); 
                                            onClose(); // Close the dialog after selection
                                        }
                                    }}
                                    disabled={value.isDisabled} // Disable the button
                                >
                                    <Text className={`text-center text-lg font-semibold ${
                                        value.isDisabled ? 'text-gray-400' : 'text-gray-200'
                                    }`}>
                                        {value.string} Uhr
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </RBSheet>
        </View>
    );
}

export default TimePickerDialog;
