import { ScaleIcon } from "lucide-react-native";
import { Text, View } from "react-native";

interface ImprintRenterProps {
    imprint: string;
}

const ImprintRender = ({ imprint } : ImprintRenterProps) => {
    return ( 
        <View>
            <View className="flex flex-row items-center">
                <ScaleIcon className="w-4 h-4 mr-4" />
                <Text className="text-lg font-semibold text-gray-200">
                    Impressum
                </Text>
            </View>
            <View className="mt-8">
                {imprint ? (
                    <Text className="text-gray-200/80 text-base">
                        {imprint}
                    </Text>
                ) : (
                    <Text className="text-gray-200/60 text-base">
                        Noch keine Angaben hinzugefügt
                    </Text>
                )}
            </View>
        </View>
     );
}
 
export default ImprintRender;