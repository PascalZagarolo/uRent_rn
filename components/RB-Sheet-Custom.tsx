import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

type givenType = {
    value: any;
    string: string;
};

interface RbSheetCustomProps {
    prefilledValues: givenType[];
    currentValue: any;
    setCurrentValue: (value: any) => void;
    index: number;
    title: string;
    refRBSheet: React.MutableRefObject<any[]>; // New prop
}

const RbSheetCostum: React.FC<RbSheetCustomProps> = ({
    prefilledValues,
    currentValue,
    setCurrentValue,
    index,
    title,
    refRBSheet // Accept the new prop
}) => {
    return ( 
        <RBSheet
            ref={ref => (refRBSheet.current[index] = ref)}

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
            }}
        >
            <View className="p-4">
                <Text className="text-base font-semibold text-gray-200">
                    {title}
                </Text>
                <ScrollView className="h-[160px] w-full p-4 ">
                    <View className="flex flex-col justify-center space-y-4">
                        <TouchableOpacity className="w-full bg-[#232635] p-2"
                            onPress={() => {
                                setCurrentValue(null);
                                refRBSheet.current[index].close();
                            }}
                        >
                            <Text className="text-center text-lg text-gray-200 font-semibold">
                                -
                            </Text>
                        </TouchableOpacity>
                        {prefilledValues.map((object) => (
                            <TouchableOpacity className="w-full bg-[#232635] p-2 flex flex-row items-center justify-center" key={object.value}
                                onPress={() => {
                                    setCurrentValue(object.value);
                                    refRBSheet.current[index].close();
                                }}
                            >
                                <Text className="text-center text-lg text-gray-200 font-semibold ">
                                    {object.string}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </RBSheet>
     );
}
 
export default RbSheetCostum;
