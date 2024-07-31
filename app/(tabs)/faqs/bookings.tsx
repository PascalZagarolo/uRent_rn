import Footer from "@/components/_searchpage/footer";
import Header from "@/components/_searchpage/header";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"

const BookingFaq = () => {

    const router = useRouter();

    return (
        <SafeAreaView className="flex flex-1 bg-[#1F2332]">
            <ScrollView>
                <View>
                    <Header />
                    <View />

                    <View className="p-4">
                        <View>
                            <TouchableOpacity className=" pb-8  gap-x-4 rounded-md "
                                onPress={() => { router.push('/faqs') }}>
                                <View className="flex flex-row items-center border-gray-600 border rounded-md p-2 gap-x-4">
                                    <View className="">
                                        <FontAwesome name="arrow-left" size={20} color="white" />
                                    </View>

                                    <Text className="text-sm font-semibold text-gray-200">
                                        zurück zur FAQs-Übersicht
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className="text-gray-200 text-xl font-semibold">
                                Das Buchungssystem - Häufig gestellte Fragen
                            </Text>
                        </View>
                        <View className="mt-8 space-y-8">

                            <View>
                                <View>
                                    <Text className="text-lg font-semibold text-gray-200">
                                    Der Buchungskalender
                                    </Text>
                                </View>
                                <View className="mt-2">
                                    <Text className="text-sm font-semibold text-gray-200">
                                    Neben der Verwaltung aller  Fahrzeuge, dem Eintragen von Buchungen hast Du vor allem die Möglichkeit, 
                                    dir alle Daten strukturiert anzeigen zu lassen. Wenn Du ein Inserat, bzw. ein Fahrzeug bei einem Flotteninserat ausgewählt hast,
                                    werden alle eingegebenen Buchungsdaten in der Monatsansicht und Tagesansicht dargestellt. 
                                    <Text>
                                    Darüber hinaus kann durch klicken auf die jeweiligen Buchungen eine detaillierte Übersicht geöffnet werden. 
                                    Du hast also die Möglichkeit, Dein Mietgeschehen immer im Blick zu behalten.
                                    </Text>
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <View>
                                    <Text className="text-lg font-semibold text-gray-200">
                                    Einfluss von Verfügbarkeiten und Buchungen auf die Inserats Darstellung
                                    </Text>
                                </View>
                                <View className="mt-2">
                                    <Text className="text-sm font-semibold text-gray-200">
                                    Ein großer Vorteil beim Eintragen von Verfügbarkeiten ist die Übersicht für den Mieter. 
                                    Das regelmäßige Verwalten von Buchungen und Verfügbarkeiten dient nämlich nicht nur der persönlichen Darstellung und Übersicht, 
                                    sondern hat auch Einfluss auf die Darstellung des Fahrzeugs im entsprechenden Inserat. 
                                    <Text>
                                    Potentielle Mieter kriegen dort in Form eines Verfügbarkeitskalenders alle verfügbaren Tage angezeigt. 
                                    So wird der Mietprozess deutlich verkürzt und Anfragen zu belegten Tagen werden vermieden. 
                                    Wenn Flotteninserate verwaltet werden, wird dem Mieter automatisch, wenn möglich ein verfügbares Fahrzeug angezeigt.
                                    </Text>
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <View>
                                    <Text className="text-lg font-semibold text-gray-200">
                                    Der Unterschied zwischen Buchungen und Verfügbarkeiten
                                    </Text>
                                </View>
                                <View className="mt-2">
                                    <Text className="text-sm font-semibold text-gray-200">
                                    Buchungen und Verfügbarkeiten haben zunächst den selben Einfluss auf die Darstellung der Verfügbarkeit im entsprechenden Inserat für den Mieter. 
                                    Die Unterscheidung liegt in der persönlichen Darstellung.
                                    <Text>
                                    Der Vorteil beim Erstellen von Buchungen ist, dass hier deutlich mehr Informationen beispielsweise 
                                    zum Mieter und zum Fahrzeug eingetragen werden können, welche dann zusätzlich zur Verfügbarkeit 
                                    im persönlichen Buchungskalender einsehbar sind. Das Erstellen von Verfügbarkeiten dient hingegen dem lediglich 
                                    schnellen Eintragen der Zeitspanne, 
                                    in der ein Fahrzeug nicht verfügbar ist.
                                    </Text>
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <View>
                                    <Text className="text-lg font-semibold text-gray-200">
                                    Flotteninserate & Fahrzeuge
                                    </Text>
                                </View>
                                <View className="mt-2">
                                    <Text className="text-sm font-semibold text-gray-200">
                                    Bei mehreren identischen Fahrzeugen kann ein Flotteninserat erstellt werden, um die Verwaltung zu vereinfachen.
                                    <Text>
                                    Flotteninserate ermöglichen es, die einzelnen Fahrzeuge im Detail zu verwalten und gleichzeitig nur ein Inserat zu erstellen.
                                     Zudem hilft es, stehts den Überblick zu behalten, da jedes Fahrzeug seine eigenen Buchungen und Verfügbarkeiten haben kann. 
                                     Dem Mieter wird dabei automatisch, wenn möglich immer ein Verfügbares Fahrzeug angezeigt. Dies vereinfacht das regelmäßige 
                                     Verwalten von Verfügbarkeiten und Buchungen und verkürzt den Mietprozess, 
                                    da potentielle Mieter zeitlich passende Anfragen stellen.
                                    </Text>
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <View>
                                    <Text className="text-lg font-semibold text-gray-200">
                                    Die Verwaltung von Anfragen
                                    </Text>
                                </View>
                                <View className="mt-2">
                                    <Text className="text-sm font-semibold text-gray-200">
                                    Um den Mietprozess noch weiter zu verkürzen, hat der Mieter die Möglichkeit Buchungsanfragen zu stellen. 
                                    Diese können entweder im Chat oder direkt auf der Buchungs-Seite eingesehen werden. 
                                    <Text>
                                    Auf der Buchungsseite ergibt sich der große Vorteil, Schnellanfragen direkt einzusehen, 
                                    eine passende auszuwählen und diese anschließend direkt zu verwalten.
                                    </Text>
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

export default BookingFaq;