import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking"; // ✅ Import Linking for opening URLs

const LearnMoreButton = () => {
    const openInBrowser = () => {
        Linking.openURL("https://www.urent-rental.de/pricing"); // ✅ Correct URL opening
    };

    return ( 
        <TouchableOpacity 
            onPress={openInBrowser} // ✅ Attach function to button
            className="bg-indigo-800 flex flex-row items-center p-2.5 shadow-lg w-full rounded-md"
            style={{ gap: 10 }} // ✅ Alternative for space-x-4
        >
            <MaterialCommunityIcons name="information-outline" size={20} color={"white"} />
            <Text className="text-gray-200/90 font-semibold">
                Mehr erfahren
            </Text>
        </TouchableOpacity>
    );
};

export default LearnMoreButton;
