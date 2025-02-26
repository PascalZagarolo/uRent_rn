import { cn } from "@/~/lib/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import { ScrollView, View } from "react-native";


interface PlanOptionsProps {
    basisPrice: number;
    premiumPrice: number;
    enterprisePrice: number;
}

const PlanOptions = ({ basisPrice, premiumPrice, enterprisePrice }: PlanOptionsProps) => {

    type planOptionType = {
        title: string,
        description: string,
        headline: string,
        attributes: string[]
    }



    const planOptions: planOptionType[] = [
        {
            title: "Basis",
            description: "Das Basis Paket für den Einstieg in die Welt von uRent.",
            headline: "Perfekt zum Erreichen von Kunden und Ausbau der eigenen Marke.",
            attributes: ["uRent Basispaket", "Fahrzeuge und \nVerfügbarkeiten verwalten"]
        },
        {
            title: "Premium",
            description: "Für den ambitionierten Vermieter. \nMehr Funktionen, mehr Möglichkeiten,  \nmehr Kunden.",
            headline: "Erlebe das Potential von uRent. Präsentiere und Verwalte deinen Fuhrpark effizient.",
            attributes: ["uRent Basispaket", "Fahrzeuge und \nVerfügbarkeiten verwalten", "Priorisierung bei der Suche", "Farbliche Hervorhebung \nvon bis zu 1 Inserat"]
        },
        {
            title: "Enterprise",
            description: `Die All-in-One Lösung für ihr Unternehmen. Vermieten war noch nie so einfach.`,
            headline: "Fange dort an wo andere aufhören. \nVerwalte, Erreiche & Profitiere",
            attributes: ["uRent Basispaket", "Fahrzeuge und \nVerfügbarkeiten verwalten", "Priorisierung bei der Suche",
                "Farbliche Hervorhebung \nvon bis zu 1 Inserat", "uRent Mieter- & Buchungsverwaltungssystem", "Enterprise Betriebsstempel"]
        }
    ];

    const optionRender = (planOption: planOptionType) => {
        return (

            <View className={cn("  rounded-lg w-80 shadow-lg h-full bg-[#2e324b]",
                planOption.title == "Premium" && "border-2 border-indigo-800  "
            )}
                key={planOption.title}
            >
                {planOption.title == "Premium" && (
                    <View className="bg-indigo-800 p-2.5 flex flex-row items-center space-x-4">
                        <MaterialCommunityIcons
                            name="fire"
                            color={"white"}
                            size={20}
                        />
                        <Text className="text-gray-200 text-base font-semibold">
                            Am beliebtesten
                        </Text>
                    </View>
                )}
                <View className="p-4 ">

                    <Text className="text-gray-200 text-xl font-bold">
                        {planOption.title}
                    </Text>
                    <View className="pt-4">
                        <Text className="font-semibold text-gray-200 text-5xl">
                            {
                                {
                                    "Basis": basisPrice,
                                    "Premium": premiumPrice,
                                    "Enterprise": enterprisePrice
                                }[planOption.title]
                            } €
                        </Text>
                    </View>
                    <View className="">
                        <Text className="text-gray-200/60 w-full h-16 " numberOfLines={3}>
                            {planOption.description}
                        </Text>
                    </View>
                    <View className="py-4">
                        <Text className="text-gray-200 text-base font-semibold h-20">
                            {planOption.headline}
                        </Text>
                    </View>
                    <View>
                        <Text className="text-gray-200/80 font-semibold underline">
                            Enthält
                        </Text>
                    </View>
                    <View className="flex flex-col h-76 bg-[#2e324b]">
                        {planOption.attributes.map((attribute) => (
                            <View className="w-full flex flex-row space-x-2 py-2" key={attribute}>
                                <MaterialCommunityIcons
                                    name="check"
                                    size={24}
                                    color={"#3730a3"}
                                />
                                <Text className="text-gray-200 font-semibold text-lg">
                                    {attribute}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View className="w-full">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="pb-8">
            <View className="flex-row space-x-4">
                {planOptions.map(optionRender)}
            </View>
        </ScrollView>
    </View>

    );
}

export default PlanOptions;