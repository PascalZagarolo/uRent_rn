
import Footer from "@/components/_searchpage/footer";
import { Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/build/FontAwesome6";
import { Feather } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";

const Career = () => {
    return (
        <SafeAreaView className="flex flex-1 bg-[#1F2332]">
            <ScrollView>
                <View className="p-4">
                    <View>
                        <View className="flex flex-row items-center">
                            <View className="mr-4">
                                <FontAwesome name="suitcase" size={24} color="#fff" />
                            </View>
                            <Text className="text-xl font-semibold text-gray-200 flex flex-row items-center ">

                                Karriere bei uRent
                            </Text>
                        </View>
                        <View className="mt-4">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Wieso wir?
                                </Text>
                            </View>
                        </View>
                        <View>

                            <View className="bg-[#1a1d2a] rounded-md p-4 mt-4 ">
                                <View className="flex items-center justify-center mb-2">
                                    <Entypo name="light-bulb" size={32} color="white" />
                                    <Text className="ml-2 text-white text-base font-semibold">
                                        Innovative Athmosphäre
                                    </Text>
                                </View>
                                <Text className="text-white text-sm text-gray-200/90 text-left">
                                    Bei uns werden Kreativität und Innovation großgeschrieben. Wir ermutigen unsere
                                    Mitarbeiterinnen und Mitarbeiter,
                                    neue Ideen einzubringen und Lösungen zu entwickeln, die das Mieten revolutionieren.
                                </Text>
                            </View>

                            <View className="bg-[#1a1d2a] rounded-md p-4 mt-4 ">
                                <View className="flex items-center justify-center mb-2">
                                    <MaterialIcons name="trending-up" size={32} color="white" />
                                    <Text className="ml-2 text-white text-base font-semibold">
                                    Wachstumschancen
                                    </Text>
                                </View>
                                <Text className="text-white text-sm text-gray-200/90 text-left">
                                Wir bieten herausfordernde und spannende Karrieremöglichkeiten in einem schnell
                                 wachsenden Markt. Bei uns haben Sie die Möglichkeit, 
                                sich persönlich und beruflich weiterzuentwickeln und Ihre Fähigkeiten kontinuierlich auszubauen.
                                </Text>
                            </View>

                            <View className="bg-[#1a1d2a] rounded-md p-4 mt-4 ">
                                <View className="flex items-center justify-center mb-2">
                                <FontAwesome6 name="people-group" size={32} color="white" />
                                    <Text className="ml-2 text-white text-base font-semibold">
                                    Teamorientierte Kultur
                                    </Text>
                                </View>
                                <Text className="text-white text-sm text-gray-200/90 text-left">
                                Wir glauben an die Kraft des Teamworks und fördern eine Kultur der
                                 Zusammenarbeit, in der jeder Einzelne geschätzt wird und dazu beiträgt, unsere gemeinsamen Ziele zu erreichen.
                                </Text>
                            </View>

                        </View>
                        <View className="mt-4">
                            <View className="flex flex-row items-center gap-x-4">
                                <MaterialCommunityIcons name="account-check-outline" size={24} color="#fff" />
                                <Text className="text-lg font-semibold text-gray-200">
                                    Unsere Mission
                                </Text>
                            </View>
                            <View>
                                <View>
                                    <Text className="text-gray-200">
                                    Bei uRent ist unsere Mission klar definiert: Wir wollen das Mieten und Vermieten revolutionieren.

                                    Durch innovative Technologien und exzellenten 
                                    Kundenservice schaffen wir eine Plattform, die es allen ermöglicht,
                                     nahtlos Fahrzeuge zu mieten und zu vermieten.
                                    </Text>
                                </View>
                                <View className="p-4 space-y-2">
                                    <View>
                                        <Text className="text-gray-200 font-semibold">
                                        - Zugänglichkeit und Vielfalt
                                        </Text>
                                        <Text className="text-gray-200">
                                        Wir streben danach, das Mieten und Vermieten für jeden zugänglich zu machen, 
                                        unabhängig von finanziellen Möglichkeiten oder Standort.
                                        Unsere Plattform fördert Chancengleichheit, lokale Unternehmen 
                                        und reduziert gleichzeitig die Umweltbelastung durch übermäßigen Konsum.
                                        </Text>
                                    </View>

                                    <View>
                                        <Text className="text-gray-200 font-semibold">
                                        - Nachhaltigkeit und Vertrauen
                                        </Text>
                                        <Text className="text-gray-200">
                                        Wir setzen auf nachhaltige Praktiken und fördern eine Kultur des Vertrauens.
                                         Durch Transparenz und Zuverlässigkeit schaffen 
                                        wir eine vertrauenswürdige Plattform, die auf Verlässlichkeit und Kundenorientierung basiert.
                                        </Text>
                                    </View>

                                    <View>
                                        <Text className="text-gray-200 font-semibold">
                                        - Innovation und Zusammenarbeit
                                        </Text>
                                        <Text className="text-gray-200">
                                        Unser Fokus liegt auf kontinuierlicher Innovation und Zusammenarbeit.
                                        Wir arbeiten eng mit unserer Gemeinschaft zusammen, um neue Wege zu finden, 
                                        wie Menschen mieten und konsumieren können.
                                        </Text>
                                    </View>
                                    
                                </View>
                                <View className="">
                                        <Text className="text-gray-200 font-semibold">
                                        Gestalten Sie mit uns die Zukunft Werden Sie Teil von uRent und helfen Sie uns dabei, 
                                        die Zukunft des Mietens zu gestalten!
                                        </Text>
                                    </View>
                            </View>
                            <View className=" mt-8">
                                <View className=" border-b border-gray-600">
                                    <Text className="text-gray-200 text-lg font-semibold ">
                                        Offene Stellen
                                    </Text>
                                </View>
                                <View className="p-4">
                                    <Text className="text-gray-200 ">
                                    Aktuell haben wir keine offenen Stellen, aber wir sind immer offen für Bewerbungen, von motivierten Personen, die unsere Mission teilen.
                                    </Text>
                                    <Text className="mt-2 font-semibold text-gray-200">
                                    Senden Sie ihre Bewerbung gerne an karriere@urent-rental.de
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Footer />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Career;
