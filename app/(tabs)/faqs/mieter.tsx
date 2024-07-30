import Footer from "@/components/_searchpage/footer";
import Header from "@/components/_searchpage/header";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { SafeAreaView, View, ScrollView, Text, Animated, TouchableOpacity } from "react-native";


const FaqsMieter = () => {

    interface FAQ {
        question: string;
        answer: string;
    }

    const mietQuestions: FAQ[] = [
        {
            question: "Wie kann ich ein Fahrzeug über Ihre Plattform mieten?",
            answer: "Auf der Startseite finden Sie oben links einen Button, mit dem Sie ein neues Inserat erstellen können."
        },
        {
            question: "Welche Dokumente und Informationen werden für die Buchung benötigt?",
            answer: `Für die Buchung benötigen Sie einen gültigen Führerschein und in einigen Fällen weitere Identitätsnachweise. Die genauen Anforderungen können je nach Vermieter variieren. Bitte beachten Sie, dass Sie möglicherweise auch eine Kredit- oder Debitkarte benötigen, 
            um die Buchung abzuschließen.`
        },
        {
            question: "Wie funktioniert die Bezahlung?",
            answer: `Die Bezahlung erfolgt in der Regel direkt an den Vermieter, 
            nicht über unsere Plattform. Die genauen Zahlungsdetails werden Ihnen vom Vermieter mitgeteilt, 
            sobald Ihre Buchungsanfrage akzeptiert wurde. Sie können je nach Vereinbarung Barzahlung, Kredit- oder Debitkarte verwenden.`
        },
        {
            question: "Gibt es eine Kaution?",
            answer: `In einigen Fällen kann der Vermieter eine Kaution verlangen, um das gemietete Fahrzeug abzuholen. 
            Die Höhe der Kaution variiert je nach Vermieter und Fahrzeugtyp. Die Kaution wird in der Regel bei der Rückgabe des Fahrzeugs zurückerstattet, 
            sofern keine Schäden oder Verstöße gegen die Mietbedingungen vorliegen.`
        },
        {
            question: "Was passiert, wenn das gemietete Fahrzeug Schäden aufweist?",
            answer: `Wir empfehlen allen Benutzern, den Zustand des Fahrzeugs bei der Abholung zu überprüfen und eventuelle Schäden zu dokumentieren. 
            Im Falle von Schäden während der Mietdauer sollten Sie den Vermieter umgehend informieren. 
            Der Vermieter wird die Schadensregelung gemäß den vereinbarten Mietbedingungen vornehmen.`
        },
        {
            question: "Kann ich meine Buchung stornieren?",
            answer: `Die Stornierungsbedingungen variieren je nach Vermieter und Buchung. 
            Sie können die spezifischen Stornierungsbedingungen während des Buchungsvorgangs einsehen. 
            Vergewissern sie sich vor Antreten ihrer Buchung über die Stornierungsbedingungen des Vermieters. 
            Bitte beachten Sie, dass möglicherweise Stornierungsgebühren anfallen, wenn Sie Ihre Buchung nicht rechtzeitig stornieren.`
        },
        {
            question: "Wie kann ich den Kundenservice erreichen, wenn ich Hilfe benötige?",
            answer: `Unser Kundenservice-Team steht Ihnen zur Verfügung, um Ihnen bei Fragen oder Problemen zu helfen. 
            Bitte kontaktieren Sie uns per E-Mail oder über das Nachrichtensystem auf unserer Plattform.
            Wir werden uns bemühen, Ihre Anfragen so schnell wie möglich zu beantworten und Ihnen bei der Lösung Ihrer Probleme zu helfen. `
        },
        {
            question : "Welche Art von Fahrzeugen kann ich auf Ihrer Plattform mieten?",
            answer: `Auf unserer Plattform finden Sie eine Vielzahl von Fahrzeugen, darunter Personenwagen, 
            Transporter und Lieferwagen. Die Verfügbarkeit kann je nach Standort und Vermieter variieren.`
        },
        {
            question : "Gibt es Altersbeschränkungen für die Fahrzeugmiete?",
            answer: `Die Altersanforderungen für die Fahrzeugmiete können je nach Vermieter und Fahrzeugtyp variieren. 
            In der Regel müssen Sie jedoch mindestens 18 Jahre alt sein und über einen gültigen Führerschein verfügen. 
            Einige Vermieter können auch eine Mindestaltergrenze festlegen.`
        },
        {
            question : "Kann ich ein Fahrzeug für eine längere Zeit mieten?",
            answer: `Ja, viele Vermieter bieten die Möglichkeit, Fahrzeuge für längere Zeiträume zu mieten, 
            einschließlich Wochenenden, 
            Wochen oder sogar Monaten. Die Mietkosten können je nach Dauer und Fahrzeugtyp variieren.`
        },
        {
            question : "Wie erfolgt die Übergabe und Rückgabe des Fahrzeugs?",
            answer: `Die Übergabe und Rückgabe des Fahrzeugs erfolgt persönlich zwischen Ihnen und dem Vermieter. 
            Der genaue Standort und die Einzelheiten zur Übergabe werden Ihnen vom Vermieter mitgeteilt, sobald Ihre Buchungsanfrage akzeptiert wurde.`
        },
        {
            question : "Sind die Fahrzeuge versichert?",
            answer: `Viele Vermieter bieten Versicherungsoptionen für gemietete Fahrzeuge an. 
            Die genauen Versicherungsdetails können je nach Vermieter und Fahrzeugtyp variieren. Wir empfehlen Ihnen dringend, 
            sich über die Versicherungsoptionen zu informieren und gegebenenfalls zusätzlichen Versicherungsschutz abzuschließen.`
        },
        {
            question : "Kann ich Zusatzleistungen wie Kindersitze oder Navigationssysteme hinzufügen?",
            answer: `Einige Vermieter bieten zusätzliche Ausstattungen und Dienstleistungen wie Kindersitze, 
            Navigationssysteme oder Winterreifen gegen eine zusätzliche Gebühr an. 
            Die Verfügbarkeit und die Kosten für Zusatzleistungen können je nach Vermieter variieren.`
        },
        {
            question : "Was passiert, wenn das gemietete Fahrzeug eine Panne hat?",
            answer: `Im Falle einer Panne während der Mietdauer sollten Sie den Vermieter umgehend informieren. 
            Viele Vermieter bieten einen Pannendienst oder eine 24-Stunden-Hilfehotline an, 
            um Ihnen in solchen Situationen zu helfen. Bitte beachten Sie auch die Mietbedingungen des Vermieters in Bezug auf Pannen und Schäden.`
        },
        {
            question : "Kann ich das gemietete Fahrzeug an einem anderen Ort zurückgeben?",
            answer: `Die Rückgabeoptionen können je nach Vermieter variieren. 
            Einige Vermieter bieten die Möglichkeit der Einwegmiete an, während andere die Rückgabe des Fahrzeugs am selben Ort, 
            an dem es abgeholt wurde, verlangen.
             Bitte klären Sie diese Details vorab mit dem Vermieter.`
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
        mietQuestions.forEach(() => {
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
                                Mietübersicht - FAQ
                            </Text>
                        </View>
                        <View>
                            <Text  className="text-md text-gray-200">
                                Häufig gestellte Fragen von Mietern auf uRent
                            </Text>
                        </View>
                        <View className="mt-12">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Inserate erstellen/verwalten:
                                </Text>
                            </View>
                            <View>
                                {mietQuestions.map((faq, index) => (
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

export default FaqsMieter;