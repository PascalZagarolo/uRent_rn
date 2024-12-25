import { Text } from "react-native";
import { View } from "react-native";


interface LetterRestrictionProps {
    inputLength: number;
    limit: number;
}

const LetterRestriction = ({
    inputLength,
    limit
} : LetterRestrictionProps) => {
    return (
        <View className="ml-auto flex flex-row items-center">
            <Text className="text-xs text-gray-200/60 text-right">
                {inputLength ?? 0}
            </Text>
            <Text className="text-xs text-gray-200/60 text-right">
/
            </Text>
            <Text className="text-xs text-gray-200/60 text-right">
{limit ?? 0}
            </Text>
        </View>
    );
}

export default LetterRestriction;