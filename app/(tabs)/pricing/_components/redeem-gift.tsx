import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const RedeemGiftCard = () => {
    return ( 
        <View>
            <View>
                <Text className="text-gray-200 text-xl font-bold">
                    Gutscheincode einlösen
                </Text>
                <Text className="text-gray-200/60 text-sm">
                    Falls du einen Gutschein / Rabattcode hast, kannst du diesen hier einlösen.
                </Text>
            </View>
            <View className="flex mt-4 flex-row items-center">
                <TextInput 
                className="text-base text-gray-200 p-2.5 bg-[#161b25] w-3/4 rounded-l-lg"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                placeholderTextColor={"gray"}
                />
                <TouchableOpacity className="w-1/4 bg-indigo-800 p-2.5 rounded-r-lg items-center justify-center">
                    <MaterialCommunityIcons name="send"  size={24} color="white"/>
                </TouchableOpacity>
                
            </View>
            <View className="flex flex-row items-center space-x-2 mt-2">
            <MaterialCommunityIcons name="information-outline" 
            size={20}
            color={"gray"}
            /> 
            <Text className="text-gray-200/60 underline">
                Woher kriege ich Gutschein- /Rabattcodes?
            </Text>
            </View>
        </View>
     );
}
 
export default RedeemGiftCard;