import { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import BasicDetails from "./_components/parts/basic-details";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getThisInserat } from "@/actions/inserat/getThisInserat";
import BasicDetails2 from "./_components/parts/basic-details-2";
import BasicDetails3 from "./_components/parts/basic-details-3";
import PriceDetails from "./_components/parts/price-details";

const InseratCreationPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [thisInserat, setThisInserat] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const router = useRouter();

    const basicDetailsRef = useRef(null);
    const basicDetails2Ref = useRef(null);
    const basicDetails3Ref = useRef(null);
    const priceDetails = useRef(null);

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
            description: "Gebe die grundlegenden Details deines Inserats an, wie z.B. den Titel und Beschreibung.",
            segment : <BasicDetails thisInserat={thisInserat} ref={basicDetailsRef}/>
        },
        {
            number: 1,
            title: "Bilder hochladen - Grundlegende Details (2/2)",
            description: `Halte hochgeladene Fotos, um sie zu verschieben.
            `,
            segment : <BasicDetails2 thisInserat={thisInserat} ref={basicDetails2Ref} />
        },
        {
            number : 2,
            title : "Zusätzliche Details",
            description : "Füge zusätzliche Details hinzu, wie Preis, Fahrzeugkategorie etc. um dein Inserat zu vervollständigen.",
            segment : <BasicDetails3 thisInserat={thisInserat} ref={basicDetails3Ref} />
        },
        {
            number : 3,
            title : "Preisdetails",
            description : "Gebe die Preisdetails deines Inserats an.",
            segment : <PriceDetails thisInserat={thisInserat} ref={priceDetails} />
        }
    ];

    const handleNext = () => {
        if (basicDetailsRef.current) {
            basicDetailsRef.current.onSave(); 
        }
        setCurrentPage((prevPage) => prevPage + 1); 
    };

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
                <View className="flex-grow">
                <View className="px-4">
                    <Text className="text-2xl font-semibold text-gray-200/90">
                        {pageInfo[currentPage].title}
                    </Text>
                    <Text className="text-gray-200/60 text-xs">
                        {pageInfo[currentPage].description}
                    </Text>
                </View>
                <View className="px-4">
                    {pageInfo[currentPage].segment}
                </View>
                </View>
                <View className=" flex flex-row items-center justify-evenly w-full px-4 mt-auto h-1/12">
                    <TouchableOpacity className=" w-4/12 p-4 flex-col justify-center items-center rounded-md"
                    onPress={() => setCurrentPage(currentPage - 1)}
                    >
                        <Text className="text-gray-200 text-base font-medium text-center">
                            Zurück
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-indigo-800 w-8/12 p-4 flex-row justify-center
                                 space-x-2 items-center rounded-md"
                        onPress={handleNext}>
                   
                        <Text className="text-gray-200 text-sm font-medium text-center ">
                            Speichern & Weiter
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
