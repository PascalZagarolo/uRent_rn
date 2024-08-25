import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";



interface ChangeNameProps {
    savedName: string;
    firstname: string;
    lastname: string;
}

const ChangeName: React.FC<ChangeNameProps> = ({
    savedName,
    firstname,
    lastname
}) => {

    const [currentName, setCurrentName] = useState(savedName);
    const [currentFirstName, setCurrentFirstName] = useState()

    return (
        <View>
    <TouchableOpacity className="flex flex-row items-center" activeOpacity={0.7} onPress={() => {}}>
        <View className="flex flex-col w-10/12">
            <Text className="text-gray-200 text-lg font-semibold line-clamp-1" numberOfLines={1}>
                {savedName}
            </Text>
            <Text className="text-gray-200/60 text-sm line-clamp-1" numberOfLines={1}>
                {firstname} {lastname}
            </Text>
        </View>
        <View className="w-2/12 items-end">
            <FontAwesome name="edit" size={24} color="white" />
        </View>
    </TouchableOpacity>
</View>
    );
}

export default ChangeName;