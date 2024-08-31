import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import BasicDetails from "./_components/parts/basic-details";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getThisInserat } from "@/actions/inserat/getThisInserat";

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
            description: "Gebe die grundlegenden Details deines Inserats an, wie z.B. den Titel, die Kategorie und den Preis."
        },
        {
            number: 1,
            title: "Weitere Details (2/2)",
            description: "Gebe die weiteren Details deines Inserats an, wie z.B. die Beschreibung und Fotos."
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
                <View className="px-4">
                    <Text className="text-lg font-semibold text-gray-200/90">
                        {pageInfo[currentPage].title}
                    </Text>
                    <Text className="text-gray-200/60 text-xs">
                        {pageInfo[currentPage].description}
                    </Text>
                </View>
                <View className="p-4">
                    <BasicDetails thisInserat={thisInserat} />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default InseratCreationPage;
