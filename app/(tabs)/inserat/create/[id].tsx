import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import BasicDetails from "./_components/parts/basic-details";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getThisInserat } from "@/actions/inserat/getThisInserat";
import BasicDetails2 from "./_components/parts/basic-details-2";

const InseratCreationPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [thisInserat, setThisInserat] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const loadInserat = async () => {
            try {
                const foundInserat = await getThisInserat(id);
                setThisInserat(foundInserat);
            } catch (e: any) {
                console.log("Fehler beim erhalten des Inserats");
            } finally {
                setIsLoading(false);
            }
        };
        loadInserat();
    }, [id]);

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    if (!thisInserat) {
        return (
            <View>
                <Text>Fehler beim Laden des Inserats.</Text>
            </View>
        );
    }

    const pageInfo = [
        {
            number: 0,
            title: "Grundlegende Details (1/2)",
            description: "Gebe die grundlegenden Details deines Inserats an, wie z.B. den Titel, die Kategorie und den Preis.",
            segment : <BasicDetails thisInserat={thisInserat} />
        },
        {
            number: 1,
            title: "Grundlegende Details (2/2)",
            description: "Gebe die weiteren Details deines Inserats an, wie z.B. die Beschreibung und Fotos.",
            segment : <BasicDetails2 thisInserat={thisInserat} />
        }
    ];

    return (
        <View className="flex flex-1 w-full bg-[#1F2332]">
            <SafeAreaView className="flex-1 flex w-full h-full">
                <View className="p-4 flex flex-row items-center space-x-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <FontAwesome name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-2xl text-gray-200 font-semibold">
                        Inserat erstellen
                    </Text>
                </View>
                <View className="h-10/12">
                <View className="px-4">
                    <Text className="text-lg font-semibold text-gray-200/90">
                        {pageInfo[currentPage].title}
                    </Text>
                    <Text className="text-gray-200/60 text-xs">
                        {pageInfo[currentPage].description}
                    </Text>
                </View>
                <View className="px-4 ">
                    {pageInfo[currentPage].segment}
                </View>
                </View>
                <View className=" flex flex-row items-center justify-evenly w-full px-4 mt-auto">
                    <TouchableOpacity className=" w-4/12 p-4 flex-col justify-center items-center rounded-md"
                    onPress={() => setCurrentPage(currentPage - 1)}
                    >
                        <Text className="text-gray-200 text-base font-medium text-center">
                            Zurück
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-indigo-800 w-8/12 p-4 flex-row justify-center
                                 space-x-2 items-center rounded-md"
                        onPress={() => setCurrentPage(currentPage + 1)}>
                   
                        <Text className="text-gray-200 text-sm font-medium text-center ">
                            {pageInfo[currentPage + 1]?.title}
                        </Text>
                        <View>
                            <FontAwesome name="chevron-right" size={16} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default InseratCreationPage;
