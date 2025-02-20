import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface BookingCalendar {
    setShowBookings : (value) => void;
}

const BookingCalendar = ({ setShowBookings } : BookingCalendar) => {
    return ( 
        <View className="px-4 py-4">
            <TouchableOpacity className="bg-indigo-800  shadow-lg rounded-xl flex justify-center flex-row space-x-2 items-center p-2.5"
            onPress={() => {setShowBookings(true)}}
            >
            <MaterialCommunityIcons name="calendar" size={20} color={"white"} />
            <Text className="text-gray-200 font-semibold">
                Verfügbarkeit anschauen
            </Text>
        </TouchableOpacity>
        </View>
     );
}
 
export default BookingCalendar;