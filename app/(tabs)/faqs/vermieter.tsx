import Footer from "@/components/_searchpage/footer";
import Header from "@/components/_searchpage/header";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { SafeAreaView, View, ScrollView, Text, Animated, TouchableOpacity } from "react-native";


const FaqsVermieter = () => {

    interface FAQ {
        question: string;
        answer: string;
    }

    const vermietQuestions: FAQ[] = [
        {
            question : "Wie kann ich mein Fahrzeug auf Ihrer Plattform zur Vermietung anbieten?",
            answer: `Um Ihr Fahrzeug zur Vermietung anzubieten, müssen Sie sich zunächst auf unserer Plattform registrieren und ein Vermieterkonto erstellen. 
            Nach der Registrierung können Sie Ihr Fahrzeugprofil erstellen, Fotos hinzufügen, die Verfügbarkeit festlegen und den Mietpreis festlegen.`
        },
        {
            question : "Welche Art von Fahrzeugen kann ich auf Ihrer Plattform vermieten?",
            answer: `Sie können eine Vielzahl von Fahrzeugen auf unserer Plattform vermieten, darunter Personenwagen, Transporter und Lieferwagen. 
            Die genauen Fahrzeugtypen, die Sie vermieten können, hängen von den Richtlinien und Anforderungen unserer Plattform ab.`
        },
        {
            question : "Welche Dokumente und Informationen benötige ich als Vermieter?",
            answer: `Als Vermieter benötigen Sie einen gültigen Führerschein und möglicherweise weitere Identitätsnachweise. 
            Sie müssen auch das Fahrzeugregistrierungsdokument und die Versicherungsinformationen bereitstellen. 
            Die genauen Anforderungen können je nach Standort und Plattform variieren.`
        },
        {
            question : "Wie erfolgt die Abholung und Rückgabe des Fahrzeugs?",
            answer: `Sie als Vermieter sind verantwortlich für die Koordination der Übergabe und Rückgabe des Fahrzeugs mit dem Mieter.
             Sie können den genauen Standort und die Einzelheiten zur Übergabe festlegen. 
            Stellen Sie sicher, dass Sie klare Anweisungen bereitstellen, um einen reibungslosen Ablauf zu gewährleisten.`
        },
        {
            question : "Sind meine Fahrzeuge versichert, wenn sie vermietet sind?",
            answer: `Sie sind selber für die Versicherungsrechtlichen Aspekte verantwortlich. 
            Stellen Sie sicher, dass Sie sich über die angebotenen Versicherungsoptionen informieren und gegebenenfalls 
            zusätzlichen Versicherungsschutz in Betracht ziehen. 
            Klären Sie auch die Haftung im Falle von Schäden oder Unfällen während der Mietdauer.`
        },
        {
            question : "Was passiert, wenn das gemietete Fahrzeug beschädigt wird?",
            answer: `Im Falle von Schäden am gemieteten Fahrzeug sollten Sie die Situation mit dem Mieter klären 
            und die Schadensregelung gemäß den Mietbedingungen und Versicherungsrichtlinien durchführen. 
            Dokumentieren Sie den Zustand des Fahrzeugs vor und nach der Vermietung, um eventuelle Schäden zu belegen.`
        },
        {
            question : "Kann ich bestimmte Bedingungen und Anforderungen für die Fahrzeugmiete festlegen?",
            answer: `Als Vermieter haben Sie die Möglichkeit, bestimmte Bedingungen und Anforderungen für die Fahrzeugmiete festzulegen. 
            Dies kann die Mindestmietdauer, die Kilometerbegrenzung, die akzeptierten Zahlungsmethoden und andere Richtlinien umfassen. 
            Stellen Sie sicher, dass diese Bedingungen klar kommuniziert werden, um Missverständnisse zu vermeiden.`
        },
        {
            question : "Kann ich meinen eigenen Mietvertrag verwenden?",
            answer: `Ja, Sie können Ihren eigenen Mietvertrag verwenden, um die Bedingungen und Vereinbarungen zwischen Ihnen und dem Mieter festzulegen. 
            Stellen Sie sicher, dass Ihr Mietvertrag alle relevanten rechtlichen Anforderungen und Schutzmaßnahmen abdeckt.`
        },
        {
            question : "Wie wird die Preisgestaltung für meine Fahrzeuge festgelegt?",
            answer: `Sie haben die Möglichkeit, den Mietpreis für Ihre Fahrzeuge festzulegen. 
            Berücksichtigen Sie dabei Faktoren wie Fahrzeugtyp, Alter, Standort, Nachfrage und Mietdauer. Seien Sie wettbewerbsfähig, 
            aber stellen Sie sicher, dass der Preis angemessen ist, um Ihre Kosten zu decken und einen angemessenen Gewinn zu erzielen.`
        },
        {
            question : "Gibt es eine maximale Anzahl von Fahrzeugen, die ich vermieten kann?",
            answer: `Die maximale Anzahl von Fahrzeugen, 
            die Sie vermieten können, kann je nach Vermieterplattform und lokalen Vorschriften variieren. 
            Stellen Sie sicher, dass Sie die Regeln und Richtlinien Ihrer Plattform überprüfen und gegebenenfalls zusätzliche Genehmigungen einholen, 
            bevor Sie weitere Fahrzeuge hinzufügen.`
        },
        {
            question : "Wie werden Bewertungen und Rückmeldungen von Mietern behandelt?",
            answer: `Bewertungen und Rückmeldungen von Mietern sind wichtige Informationen für potenzielle zukünftige Mieter.
             Stellen Sie sicher, 
            dass Sie auf Bewertungen reagieren und Feedback ernst nehmen, um die Zufriedenheit der Mieter zu gewährleisten und Ihr Geschäft zu verbessern.`
        },
        {
            question : "Kann ich meine Fahrzeugliste aktualisieren oder ändern?",
            answer: `Ja, Sie können Ihre Fahrzeugliste jederzeit aktualisieren oder ändern. 
            Fügen Sie neue Fahrzeuge hinzu, aktualisieren Sie vorhandene Angebote oder passen Sie die Verfügbarkeit an. 
            Stellen Sie sicher, dass Sie Änderungen rechtzeitig vornehmen, um potenzielle Mieter nicht zu enttäuschen.`
        },
        {
            question : "Kann ich eine Kaution von den Mietern verlangen?",
            answer: `Ja, Sie können eine Kaution von den Mietern verlangen, 
            um Ihr Fahrzeug vor potenziellen Schäden oder Verlusten zu schützen. 
            Stellen Sie sicher, dass die Höhe der Kaution angemessen ist und dass Sie die Rückgabebedingungen klar kommunizieren.`
        },
        {
            question : "Wie kann ich den Kundenservice erreichen, wenn ich Hilfe benötige?",
            answer: `Unser Kundenservice-Team steht Ihnen zur Verfügung, um Ihnen bei Fragen oder Problemen zu helfen. 
            Bitte kontaktieren Sie uns per E-Mail oder über das Nachrichtensystem auf unserer Plattform. 
            Wir werden uns bemühen, Ihre Anfragen so schnell wie möglich zu beantworten und Ihnen bei der Lösung Ihrer Probleme zu helfen`
        },
        {
            question : "Wie läuft die Zahlung auf uRent ab?",
            answer: `Bei uRent liegt die vollständige Verantwortung für die Zahlungsabwicklung bei den Vermietern. 
            Ähnlich wie auf anderen gängigen Online-Plattformen behalten Vermieter die Kontrolle über den gesamten Zahlungsprozess.`
        },
    ]


    

    

    

    

    

    

    const [expandedIndex, setExpandedIndex] = useState(null);
    const animations = useRef([]).current;

    const provideClean = (input: string) => {
        const cleanAnswer = input
            .replace(/^\s+|\s+$/g, '')  // Remove leading and trailing spaces
            .replace(/\s+/g, ' ')       // Replace multiple spaces with a single space
            .replace(/(\r\n|\n|\r)/gm, " ");

            return cleanAnswer;
    }

    if (!animations?.length) {
        vermietQuestions.forEach(() => {
            animations.push(new Animated.Value(0));
        });
    }

    const handlePress = (index) => {
        if (expandedIndex === index) {
            Animated.timing(animations[index], {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                setExpandedIndex(null);
            });
        } else {
            if (expandedIndex !== null) {
                Animated.timing(animations[expandedIndex], {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
            Animated.timing(animations[index], {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
            setExpandedIndex(index);
        }
    };

    const router = useRouter()

    return (
        <SafeAreaView className="flex flex-1 bg-[#1F2332]">
            <ScrollView>
                <View>
                    <Header />
                </View>
                <View className="p-4">
                    <View>
                        <View>
                            <TouchableOpacity className=" pb-8  gap-x-4 rounded-md "
                            onPress={() => {router.push('/faqs')}}>
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
                            <Text className="text-xl font-semibold text-gray-200">
                                Vermietungsübersicht - FAQ
                            </Text>
                        </View>
                        <View>
                            <Text  className="text-md text-gray-200">
                                Häufig gestellte Fragen von Vermietern auf uRent
                            </Text>
                        </View>
                        <View className="mt-12">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Vermieten auf uRent:
                                </Text>
                            </View>
                            <View>
                                {vermietQuestions.map((faq, index) => (
                                    <View key={index} className="mt-4">
                                        <TouchableOpacity onPress={() => handlePress(index)} 
                                        className="flex flex-row items-center border-b border-gray-800 pb-2">
                                            <Text className="text-base font-medium text-gray-200 w-11/12">
                                                {faq.question}

                                            </Text>
                                            <View className="w-1/12 ml-2">
                                                {expandedIndex === index ? (
                                                    <FontAwesome className="" name="chevron-up" size={16} color="white" />
                                                ) : (
                                                    <FontAwesome className="" name="chevron-down" size={16} color="white" />
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                        {expandedIndex === index && (
                                            <Animated.View style={{
                                                height: animations[index ? index : 0].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, 100] // Adjust this value to fit your content height
                                                })
                                            }} className="mt-2">
                                                <Text className="text-sm text-gray-400">
                                                    {provideClean(faq.answer)}
                                                </Text>
                                            </Animated.View>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </View>

                        

                        

                        

                        

                        

                        

                    </View>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    );
}

export default FaqsVermieter;