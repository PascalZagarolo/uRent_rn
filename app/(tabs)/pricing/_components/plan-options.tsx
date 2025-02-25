import { Text } from "react-native";
import { ScrollView, View } from "react-native";

const PlanOptions = () => {

    type planOptionType = {
        title: string,
        description: string,
        attributes: string[]
    }

    const planOptions: planOptionType[] = [
        {
            title: "Basis",
            description: "Das Basis Paket für den Einstieg in die Welt von uRent.",
            attributes: []
        },
        {
            title: "Premium",
            description: "Für den ambitionierten Vermieter. Mehr Funktionen, mehr Möglichkeiten, mehr Kunden.",
            attributes: []
        },
        {
            title: "Enterprise",
            description: "Die All-in-One Lösung für ihr Unternehmen. Vermieten war noch nie so einfach.",
            attributes: []
        }
    ];

    const optionRender = (planOption: planOptionType) => {
        return (
            <View className="bg-[#2e324b] p-4 rounded-lg w-1/3">
                <Text className="text-gray-200 text-lg font-bold">
                    {planOption.title}
                </Text>
                <View className="mt-2">
                    <Text className="text-gray-200/60">
                        {planOption.description}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View className="w-full">
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="space-x-8">
                {planOptions.map(optionRender)}
            </ScrollView>
        </View>

    );
}

export default PlanOptions;