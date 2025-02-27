import { FontAwesome } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

const FaqsPricingPage = () => {
    
    const faqs : { question : string, answer : string }[] = [
        {
            question : "Kann ich mein Abonnement später aufwerten?",
            answer : `Absolut! Wir unterstützen Flexibilität und verstehen, dass deine Bedürfnisse sich mit der Zeit ändern können. 
            Das Upgrade deines Abonnements ist ein einfacher Prozess. Du musst lediglich die Differenz zwischen deinem aktuellen Plan und dem gewünschten Plan zahlen. 
            Das bedeutet, dass du nahtlos zu einem umfangreicheren Service wechseln kannst, um noch mehr von unseren exklusiven Angeboten zu profitieren.`
        },
        {
            question : "Wie kann ich mein Abonnement aufwerten?",
            answer : `Um dein Abonnement aufzuwerten, bezahlst du hier lediglich die Differenz zwischen deinem aktuellen und dem gewünschten Plan.
            Der neue Plan wird sofort freigeschaltet, sodass du alle Features direkt nutzen kannst.
            Der Abrechnungszeitraum bleibt unverändert – wenn dein aktueller Abrechnungszeitraum beispielsweise noch 10 Tage umfasst, 
            gilt dies auch nach dem Upgrade auf den neuen Plan weiterhin.
            
            Falls dein Abonnement aktiv ist, wird der neue Plan erneuert, und der vollständige Preis wird für jeden Abo-Zyklus berechnet. Bereits gekündigte Abos bleiben jedoch weiterhin gekündigt, 
            auch nach einem Wechsel auf einen neuen Plan.`
        },
        {
            question : "Wie funktioniert die Abrechnung?",
            answer : `Die Abrechnung erfolgt monatlich. Sie werden zu Beginn jedes Abrechnungszeitraums automatisch belastet, 
            solange Sie Ihr Abonnement nicht vor Ablauf des aktuellen Zeitraums kündigen.`
        },
        {
            question : "Kann ich mein Abonnement jederzeit kündigen?",
            answer : `Ja, Sie können Ihr Abonnement jederzeit kündigen. 
            Die Kündigung tritt zum Ende des aktuellen Abrechnungszeitraums in Kraft. 
            Sie haben jedoch weiterhin Zugriff auf alle Features bis zum Ende dieses Zeitraums.`
        },
        {
            question : "Gibt es eine Kündigungsfrist für mein Abonnement?",
            answer : `Nein, es gibt keine Kündigungsfrist für Ihr Abonnement. 
            Sie können jederzeit vor Ablauf des aktuellen Abrechnungszeitraums kündigen, und die Kündigung tritt zum Ende dieses Zeitraums in Kraft. 
            Es gibt keine versteckten Gebühren oder zusätzlichen Verpflichtungen.`
        },
    ];

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const animations = useRef(faqs.map(() => new Animated.Value(0))).current; // ✅ Initialize animations properly

    const handlePress = (index: number) => {
        if (expandedIndex === index) {
            Animated.timing(animations[index], {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                setExpandedIndex(null);
            });
        }  else {
            if (expandedIndex !== null) {
                Animated?.timing(animations[expandedIndex], {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                })?.start();
            }
            Animated.timing(animations[index], {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
            setExpandedIndex(index);
        }
    };

    const provideClean = (input: string) => {
        return input
            .trim() // Remove leading/trailing spaces
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/(\r\n|\n|\r)/gm, " ");
    };

    return ( 
        <View>
            {faqs.map((faq, index) => (
                <View key={index} className="mt-4">
                    <TouchableOpacity onPress={() => handlePress(index)} className="flex flex-row items-center border-b border-gray-800 pb-2">
                        <Text className="text-base font-medium text-gray-200 w-11/12">
                            {faq.question}
                        </Text>
                        <View className="w-1/12 ml-2">
                            {expandedIndex === index ? (
                                <FontAwesome name="chevron-up" size={16} color="white" />
                            ) : (
                                <FontAwesome name="chevron-down" size={16} color="white" />
                            )}
                        </View>
                    </TouchableOpacity>
                    {expandedIndex === index && (
                        <Animated.View style={{
                            height: animations[index]?.interpolate({
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
    );
};
 
export default FaqsPricingPage;
