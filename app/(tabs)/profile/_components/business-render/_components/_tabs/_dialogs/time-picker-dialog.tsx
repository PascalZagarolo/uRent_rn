import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

interface TimePickerDialogProps {
    refRBSheet: any; 
    onSelect: (time: string) => void; // Handle selected time
    onClose: () => void;
}

const TimePickerDialog = ({ refRBSheet, onSelect, onClose }: TimePickerDialogProps) => {

    const prefilledTimes = Array.from({ length: 96 }, (_, index) => {
        const minutes = index * 15;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const formattedTime = `${hours}:${remainingMinutes.toString().padStart(2, '0')} Uhr`;
    
        return {
            string: formattedTime,
            value: minutes
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
                        Startpreis auswählen
                    </Text>
                    <ScrollView className="h-[160px] w-full p-4">
                        <View className="flex flex-col justify-center space-y-4">
                            {prefilledTimes.map((value) => (
                                <TouchableOpacity 
                                    className="w-full bg-[#232635] p-2"
                                    key={value.value}
                                    onPress={() => { 
                                        onSelect(value.string); 
                                        onClose();  // Close the dialog after selection
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
        </View>
    );
}

export default TimePickerDialog;
