import Footer from "@/components/_searchpage/footer";
import { FontAwesome, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, View, Text } from "react-native";

const AboutUs = () => {
    return (
        <SafeAreaView className="flex flex-1 bg-[#1F2332]">
            <ScrollView>
                <View className="p-4">
                    <View>
                        <Text className="text-xl font-semibold text-gray-200">
                            Über uns
                        </Text>
                    </View>
                    <View className="mt-4">
                        <View>
                            <Text className="text-lg font-semibold text-gray-200">
                                Wer wir sind
                            </Text>
                        </View>
                        <View className="">
                            <View>
                                <Text className="text-sm text-gray-200">
                                    Willkommen bei uRent - der Mobilitätsplattform, die die Art und Weise,
                                    wie Menschen sich fortbewegen, revolutioniert. Unser Ziel ist es, Mobilität
                                    so einfach und effizient wie möglich zu gestalten,
                                    indem wir eine vielfältige Auswahl an Fahrzeugen anbieten und den Buchungsprozess transparent gestalten.
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="mt-2">
                        <View>
                            <Text className="text-lg font-semibold text-gray-200">
                                Unsere Lösungen
                            </Text>
                        </View>
                        <View className="px-4 space-y-2">
                            <View>
                                <Text className="text-sm text-gray-200">
                                    - Schneller Zugang zur Online Präsenz durch einfaches Erstellen von Inseraten
                                </Text>
                            </View>
                            <View>
                                <Text className="text-sm text-gray-200">
                                    - Mehr Reichweite und schnelle Kontaktaufnahme mit Mietern durch unsere Plattform
                                </Text>
                            </View>
                            <View>
                                <Text className="text-sm text-gray-200">
                                    - Vereinfachung des Mietprozess durch Direkt-Anfragen und Online Chat
                                </Text>
                            </View>
                            <View>
                                <Text className="text-sm text-gray-200">
                                    - Einfaches Verwalten von Fahrzeugen Verfügbarkeiten,
                                    Mietern und Buchungen mit unserem Buchungs-Verwaltungssystem
                                </Text>
                            </View>
                            <View>
                                <Text className="text-sm text-gray-200">
                                    - Gleichzeitge Darstellung deiner Termine mit diversen gewünschten Informationen durch unseren Buchungs-Kalender
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="mt-4">
                        <View>
                            <Text className="text-lg font-semibold text-gray-200">
                                Warum uRent?
                            </Text>
                        </View>
                        <View className="space-y-4">

                            <View className="bg-[#1a1d2a] rounded-md p-4 mt-4">
                                <View className="flex items-center justify-center mb-2">
                                    <FontAwesome name="lightbulb-o" size={32} color="white" />
                                    <Text className="ml-2 text-white text-base font-semibold">
                                        Innovation
                                    </Text>
                                </View>
                                <Text className="text-white text-sm text-gray-200/90 text-left">
                                    Wir sind Vorreiter einer neuen Ära der Mobilität.
                                    Durch die Nutzung innovativer Technologien und einer modernen
                                    Plattformarchitektur schaffen wir eine reibungslose und benutzerfreundliche Erfahrung für unsere Nutzer.
                                    Wir sind ständig auf der Suche nach neuen Wegen, um deine Mobilitätsbedürfnisse
                                    zu erfüllen und deine Reise mit uRent zu verbessern.
                                    Denn warum solltest du dich mit weniger zufriedengeben, wenn du das Beste verdienst?
                                </Text>
                            </View>

                            <View className="bg-[#1a1d2a] rounded-md p-4">
                                <View className="flex items-center justify-center mb-2">
                                    <MaterialCommunityIcons name="weight-lifter" size={32} color="white" />
                                    <Text className="ml-2 text-white text-base font-semibold">
                                        Einfachheit
                                    </Text>
                                </View>
                                <Text className="text-white text-sm text-gray-200/90 text-left">
                                    "Keep it simple".
                                    Unsere Plattform wurde entwickelt, um dir eine stressfreie Erfahrung zu bieten.
                                    Der Buchungsprozess ist einfach und intuitiv.
                                    Und falls du doch mal Hilfe brauchst,
                                    steht unser engagiertes Team jederzeit bereit,
                                    um dir weiterzuhelfen.
                                </Text>
                            </View>

                            <View className="bg-[#1a1d2a] rounded-md p-4">
                                <View className="flex items-center justify-center mb-2">
                                    <MaterialCommunityIcons name="transition-masked" size={32} color="white" />
                                    <Text className="ml-2 text-white text-base font-semibold">
                                        Transparenz
                                    </Text>
                                </View>
                                <Text className="text-white text-sm text-gray-200/90 text-left">
                                    Bei uRent legen wir großen Wert darauf, Transparenz in jedem Schritt des Buchungsprozesses zu bieten.
                                    Wir bieten klare Informationen zu den Fahrzeugen,
                                    den Vermietern und den Buchungsbedingungen, damit du genau weißt, was dich erwartet.
                                    Kein Schnickschnack, keine Überraschungen - nur klare und ehrliche Informationen,
                                    damit du die besten Entscheidungen treffen kannst.
                                </Text>
                            </View>

                            <View className="bg-[#1a1d2a] rounded-md p-4">
                                <View className="flex items-center justify-center mb-2">
                                    <FontAwesome6 name="people-group" size={32} color="white" />
                                    <Text className="ml-2 text-white text-base font-semibold">
                                        Vielfalt
                                    </Text>
                                </View>
                                <Text className="text-white text-sm text-gray-200/90 text-left">
                                    Mit uRent hast du Zugang zu einer breiten Palette von Fahrzeugen für jede Gelegenheit.
                                    Ob du ein Auto für den täglichen Gebrauch,
                                    einen Transporter für den Umzug
                                    oder einen Anhänger für den Transport von Gütern benötigst - bei uns findest du das passende Fahrzeug.
                                    Und das Beste? Alles nur ein paar Klicks entfernt!
                                </Text>
                            </View>

                            <View className="bg-[#1a1d2a] rounded-md p-4">
                                <View className="flex items-center justify-center mb-2">
                                    <FontAwesome name="leaf" size={32} color="white" />
                                    <Text className="ml-2 text-white text-base font-semibold">
                                        Nachhaltigkeit
                                    </Text>
                                </View>
                                <Text className="text-white text-sm text-gray-200/90 text-left">
                                    Nachhaltigkeit liegt uns am Herzen.
                                    Mit uRent unterstützt du lokale Unternehmen und hilfst, den CO2-Ausstoß zu senken.
                                    Durch das Mieten statt Besitzen werden vorhandene Ressourcen effizienter genutzt und unnötige Fahrzeuge auf den Straßen reduziert.
                                    Weniger Fahrzeuge bedeuten weniger Emissionen und eine umweltfreundlichere Mobilität.
                                    Wähle uRent und trage zu einer nachhaltigeren Zukunft bei.
                                </Text>
                            </View>

                            <View className="bg-[#1a1d2a] rounded-md p-4">
                                <View className="flex items-center justify-center mb-2">
                                    <FontAwesome6 name="handshake" size={32} color="white" />
                                    <Text className="ml-2 text-white text-base font-semibold">
                                        Geschäftliche Lösungen
                                    </Text>
                                </View>
                                <Text className="text-white text-sm text-gray-200/90 text-left">
                                    Wir bieten maßgeschneiderte Lösungen für geschäftliche Mobilitätsbedürfnisse,
                                    sei es für Flottenmanagement, Transportlogistik oder temporäre Fahrzeugvermietungen.
                                    Mit uRent wird die Verwaltung und Nutzung von Fahrzeugen für Unternehmen so einfach wie nie zuvor.
                                </Text>
                            </View>

                        </View>
                    </View>
                </View>
                <View className="">
                    <Footer />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AboutUs;