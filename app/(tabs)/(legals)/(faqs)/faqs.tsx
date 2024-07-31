import Footer from "@/components/_searchpage/footer";
import Header from "@/components/_searchpage/header";
import { useRouter } from "expo-router";
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from "react-native";


const Faqs = () => {

    const router = useRouter();

    return (
        <SafeAreaView className="flex flex-1 bg-[#1F2332]">
            <ScrollView>
                <View>
                    <Header />
                </View>
                <View className="p-4">
                    <View>
                        <View>
                            <Text className="text-xl font-semibold text-gray-200">
                                FAQ - Häufig gestellte Fragen
                            </Text>
                        </View>
                        <View className="mt-4">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Willkommen bei den häufig gestellten Fragen (FAQs) von uRent!
                                </Text>
                            </View>
                            <View>
                                <Text className="text-sm text-gray-200/90">
                                    Wir haben diese Seite zusammengestellt, um Ihnen bei allen Fragen und Anliegen rund um unsere Mietservices weiterzuhelfen.
                                    Hier finden Sie Antworten auf die am häufigsten gestellten Fragen unserer Kunden, die Ihnen helfen können, Ihre Mieterfahrung so reibungslos wie möglich zu gestalten.
                                </Text>
                            </View>
                            <View className="mt-2">
                                <Text className="text-gray-200">
                                    Sollten Sie hier keine Antwort auf Ihre Frage finden oder weitere Unterstützung benötigen,
                                    zögern Sie bitte nicht, uns direkt zu kontaktieren.
                                    Unser Support-Team steht Ihnen unter der E-Mail-Adresse support@urent-rental.de gerne zur Verfügung.
                                </Text>
                            </View>
                            <View className="mt-2">
                                <Text className="text-gray-200 font-semibold">
                                    Vielen Dank, dass Sie sich für uRent entschieden haben!
                                </Text>
                            </View>
                        </View>
                        <View className="mt-8">
                            <View className="space-y-2">
                                <TouchableOpacity className="p-8 bg-[#181b27] rounded-md" onPress={() => {router.push(`/faqs/bedienung`)}}>
                                    <Text className="text-lg font-semibold text-gray-200 text-center">
                                        Bedienungshilfen
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="p-8 bg-[#181b27] rounded-md"
                                onPress={() => {router.push(`/faqs/bookings`)}}
                                >
                                    <Text className="text-lg font-semibold text-gray-200 text-center">
                                        uRent - Buchungssystem
                                    </Text>
                                </TouchableOpacity>
                                <View className="flex flex-row items-center justify-center space-x-4 px-2 w-full">
                                    <TouchableOpacity className="p-4 bg-[#181b27] rounded-md w-6/12" onPress={() => {router.push(`/faqs/mieter`)}}>
                                    <Text className="text-base font-semibold text-gray-200 text-center">
                                            FAQ
                                        </Text>
                                        <Text className="text-base font-semibold text-gray-200 text-center">
                                            Mieter
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="p-4 bg-[#181b27] rounded-md w-6/12" onPress={() => {router.push(`/faqs/vermieter`)}}>
                                    <Text className="text-base font-semibold text-gray-200 text-center">
                                            FAQ
                                        </Text>
                                        <Text className="text-base font-semibold text-gray-200 text-center">
                                            Vermieter
                                        </Text>
                                    </TouchableOpacity>
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

export default Faqs;