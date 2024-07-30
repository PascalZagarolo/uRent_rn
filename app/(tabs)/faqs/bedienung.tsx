import Footer from "@/components/_searchpage/footer";
import Header from "@/components/_searchpage/header";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { SafeAreaView, View, ScrollView, Text, Animated, TouchableOpacity } from "react-native";


const FaqsBedienung = () => {

    interface FAQ {
        question: string;
        answer: string;
    }

    const inseratQuestions: FAQ[] = [
        {
            question: "Wie erstelle ich ein Inserat?",
            answer: "Auf der Startseite finden Sie oben links einen Button, mit dem Sie ein neues Inserat erstellen können."
        },
        {
            question: "Wie lösche ich ein Inserat?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts. Dort finden Sie Ihre Inserate 
            im Dashboard unter „Meine Inserate“. Sie können nun Ihre Inserate bearbeiten, löschen und die Verfügbarkeit ändern.`
        },
        {
            question: "Wie ändere ich die Verfügbarkeit von einem Fahrzeug?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts. Dort finden Sie Ihre Inserate 
            im Dashboard unter „Meine Inserate“. Sie können nun Ihre Inserate bearbeiten, löschen und die Verfügbarkeit ändern.`
        },
        {
            question: "Wo kann ich meine Inserate bearbeiten?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts. Dort finden Sie Ihre Inserate 
            im Dashboard unter „Meine Inserate“. Sie können nun Ihre Inserate bearbeiten, löschen und die Verfügbarkeit ändern.`
        },
        {
            question: "Wann werden meine angegebenen Kontaktinformationen öffentlich angezeigt?",
            answer: `Die Kontaktinformationen, die Sie beim Erstellen oder Bearbeiten eines Inserats angeben, werden öffentlich gezeigt. 
            Sie können dies ändern, wenn Sie das Inserat im Dashboard unter „Meine Inserate“ bearbeiten und die Kontakt Angaben entfernen.`
        },
        {
            question: "Was genau sind Flotteninserate?",
            answer: `Flotteninserate sind für den Fall gedacht, indem Sie mehrere Fahrzeuge des gleichen Typs, mit den gleichen Fahrzeugattributen besitzen. 
            Ein Flotteninserat darf allerdings auch nur in diesem Fall angewandt werden. 
            Für den Vermieter erscheinen die Fahrzeuge in einem Inserat, allerdings lassen sich weiterhin Verfügbarkeiten und Buchungen für jedes einzelne Fahrzeug verwalten. 
            Dazu wählen Sie bei „Inserat erstellen“ unter Art des Inserats „Flotteninserat“ aus und geben dann die Anzahl an identischen Fahrzeugen an.`
        },
        {
            question: "Wie kann ich ein Inserat auswählen, damit es bei der Suche priorisiert wird?",
            answer: `Wenn Sie das Abonnement „Premium“ oder "Enterprise" besitzen, klicken Sie auf der Startseite auf Ihr Profilbild oben rechts. 
            Dort finden Sie Ihre Inserate im Dashboard unter "Meine Inserate". 
            Dort sehen Sie zunächst, 
            wie viele Inserate dem Abonnement entsprechend hervorgehoben werden können. 
            Suchen Sie anschließend ein Inserat, das veröffentlicht werden soll und klicken Sie links neben „Inserat bearbeiten“ auf "Hervorheben". 
            Die hervorgehobenen Inserate finden Sie oben auf der Seite, dort kann auch eine gewünschte Farbe ausgewählt werden und eine Hervorhebung wieder entfernt werden.`
        }
    ]


    const searchQuestions: FAQ[] = [
        {
            question: "Wie füge ich ein Inserat zu meinen Favoriten hinzu?",
            answer: `Wie Sie sich in der einzelnen Ansicht eines Inserats befinden, klicken Sie oben rechts auf „Anzeige vormerken“.`
        },
        {
            question: "Wo finde ich meine Favoriten?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts. Dort finden Sie im Dashboard Ihre Favoriten.`
        },
        {
            question: "Wie kann ich eine Suche speichern und wo finde ich diese?",
            answer: `Oben im Suchfilter finden Sie "Suche speichern". Nachdem Sie die Suche benannt haben, 
            finden Sie diese oben rechts in der Kopfzeile unter dem zugehörigen Symbol.`
        }

    ]

    const accountQuestions: FAQ[] = [
        {
            question: "Wo kann ich mich abmelden?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts. Dort können Sie sich im untersten Punkt abmelden.`
        },
        {
            question: "Wo kann ich meinen Account verwalten?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf 
            „Einstellungen“. Dort können Sie unter „Account“ Ihren Account verwalten.`
        },
        {
            question: "Wie kann ich meine E-Mail ändern?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Einstellungen“. Dort können Sie unter „Account“ Ihre Emails ändern. Nach dem Ändern müssen Sie diese bestätigen.`
        },
        {
            question: "Wie kann ich meinen Nutzernamen ändern?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild 
            oben rechts und dann auf „Einstellungen“. Dort können Sie unter „Account“ Ihren Nutzernamen ändern.`
        },
        {
            question: "Wie kann ich meinen Vor- und Nachnamen ändern?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild 
            oben rechts und dann auf „Einstellungen“. Dort können Sie unter „Account“ Ihren Vor- und Nachnamen ändern.`
        },
        {
            question: "Wie kann ich mein Passwort ändern?",
            answer: `Klicken Sie auf der Startseite auf 
            Ihr Profilbild oben rechts und dann auf „Einstellungen“. Dort können Sie unter „Sicherheit“ Ihr Passwort ändern.`
        },
        {
            question: "Wo kann ich meinen Account löschen?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf "Einstellungen".
            Dort können Sie unter „Account“ Ihren Account löschen.
            Anschließend werden Sie zur Sicherheit noch eine E-Mail bekommen, um das Löschen Ihres Accounts zu bestätigen, da der Vorgang unwiderruflich ist.`
        },
        {
            question: "Wie aktiviere oder deaktiviere ich die Zwei-Faktor Authentifizierung?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Einstellungen“. Dort können Sie unter „Sicherheit“ die Zwei-Faktor Authentifizierung aus- oder abwählen.`
        },
        {
            question: "Wo kann ich meine persönliche Datennutzung einstellen?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts 
            und dann auf „Einstellungen“. Dort können Sie unter „Privatsphäre“ Ihre persönliche Datennutzung verwalten.`
        },
        {
            question: "Wo kann ich meine öffentlich angezeigten Informationen verwalten?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Mein Profil“. Die dort angegebenen 
            Informationen werden für Nutzer bei Ihren Inseraten angezeigt. Beachten Sie, dass diese keine privaten Informationen aus 
            Ihrem Account sind, sondern lediglich auf Ihr privates oder gewerbliches, öffentliches Vermietungs-Profil abzielen.`
        }
    ]

    const profileQuestions: FAQ[] = [
        {
            question: "Wie und wozu stelle ich auf ein Gewerbe-Konto um?",
            answer: `Damit Sie Fotos, eine Beschreibung, Standorte, Öffnungszeiten und vieles 
            mehr zu Ihrer Fahrzeugvermietung hochladen können, klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann 
            auf „Mein Profil“. Dort können Sie oben auf der Seite auf ein Gewerbe-Konto umstellen. Dieser Vorgang ist kostenlos.`
        },
        {
            question: "Wo kann ich meine öffentlich angezeigten Informationen verwalten?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Mein Profil“. 
            Die dort angegebenen Informationen werden für Nutzer bei Ihren Inseraten angezeigt. Beachten Sie, dass diese keine privaten Informationen 
            aus Ihrem Account sind, sondern lediglich auf Ihr privates oder gewerbliches, öffentliches Vermietungs-Profil abzielen.`
        },
        {
            question: "Wie kann ich ein Profilbild hinzufügen?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Mein Profil“.
            Dort können Sie oben links Ihr Profilbild hinzufügen, entfernen und bearbeiten.`
        },
        {
            question: "Wie kann ich die Informationen bearbeiten, die für den Nutzer neben meinen Inseraten angezeigt werden?",
            answer: `Alle Bilder und Infos, die bei Standort eingetragen werden, sind die, die für die 
            Nutzer neben den Inseraten sichtbar sind.
            Falls Sie mehrere Standorte haben, kann ein Standort als primär festgelegt werden.
            Dieser wird neben deinen Inseraten angezeigt, sowie in deinem Profil hervorgehoben.
            Um einen Standort hinzuzufügen, klicken Sie auf der Startseite auf Ihr Profilbild oben rechts, 
            dann auf „Mein Profil“ und anschließend auf „Standort hinzufügen“.`
        },
        {
            question: "Wofür sind Standorte und wie füge ich sie hinzu?",
            answer: `Alle Bilder und Infos, die bei Standort eingetragen werden, sind die, 
            die für die Nutzer neben den Inseraten sichtbar sind.
            Falls Sie mehrere Standorte haben, kann ein Standort als primär festgelegt werden.
            Dieser wird neben deinen Inseraten angezeigt, sowie in deinem Profil hervorgehoben.
            Um einen Standort hinzuzufügen, klicken Sie auf der Startseite auf Ihr Profilbild oben rechts, 
            dann auf „Mein Profil“ und anschließend auf „Standort hinzufügen“.`
        },
        {
            question: "Wie kann ich Bilder hinzufügen, die Nutzer sehen, wenn sie mein Profil aufrufen?",
            answer: `klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Mein Profil“.
            Anschließend können Sie oben rechts die Bilder hinzufügen. 
            Beachten Sie, dass diese Bilder nicht neben den Inseraten angezeigt werden, 
            sondern nur auf Ihrer Profilseite. Andernfalls können Sie einen Standort erstellen.`
        },
    ]

    const dashboardQuestions: FAQ[] = [
        {
            question: "Was finde ich unter „Dashboard“?",
            answer: `Das Dashboard dient zur allgemeinen Verwaltung Ihrer Inserate, deren Verfügbarkeit, 
            der Eintragung von Buchungen und vielem mehr.`
        },
        {
            question: "Wo finde ich „Buchungen“ und wie kann ich es Nutzen?",
            answer: `Das Dashboard dient zur allgemeinen Verwaltung Ihrer Inserate, deren Verfügbarkeit, 
            der Eintragung von Buchungen und vielem mehr.`
        },
        {
            question: "Wo kann ich meine Inserate verwalten?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts. Dort finden Sie Ihre Inserate im Dashboard unter „Meine Inserate“. 
            Sie können nun Ihre Inserate bearbeiten, löschen und die Verfügbarkeit ändern.`
        },
        {
            question: "Wo finde ich meine Favoriten?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Einstellungen“. Dort können Sie unter „Favoriten“ Ihre Favoriten verwalten.`
        },

    ]

    const settingsQuestions: FAQ[] = [
        {
            question: "Wo finde ich meine Accounteinstellungen?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben 
            rechts und dann auf „Einstellungen“. Dort können Sie unter „Account“ Ihren Account verwalten.`
        },
        {
            question: "Wo finde ich meine Accounteinstellungen?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Einstellungen“. 
            Dort finden Sie die Privatsphäre Einstellungen.`
        },
        {
            question: "Wo finde ich meine Sicherheitseinstellungen?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Einstellungen“. Dort finden Sie die Sicherheitseinstellungen.`
        },

    ]

    const paymentQuestions: FAQ[] = [
        {
            question: "Wo kann ich meinen Zahlungsverkehr verwalten?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Dashboard“. 
            Sie können dort unter „Zahlungsverkehr“ alles zugehörige finden.`
        },
        {
            question: "Wie ändere ich meine Zahlungsmethode?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Dashboard“. 
            Sie können dort unter „Zahlungsverkehr“ in Ihrem aktuellen Plan unter „Abo verwalten“ die Zahlungsmethode ändern.`
        },
        {
            question: "Wie kann ich meinen Plan ändern?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Dashboard“. 
            Sie können dort unter „Zahlungsverkehr“ in Ihrem aktuellen Plan die „Plan ändern“ auswählen.`
        },
        {
            question: "Wie kann ich meinen Plan kündigen?",
            answer: `Klicken Sie auf der Startseite auf Ihr Profilbild oben rechts und dann auf „Dashboard“. 
            Sie können dort unter „Zahlungsverkehr“ in Ihrem aktuellen Plan unter „Abo verwalten“ Ihr Abonnementkündigen.`
        },
        {
            question: "Was wenn ich die dem Plan entsprechenden Funktionen nach dem Abonnieren nicht erhalten habe?",
            answer: `Kontaktieren Sie den Kundensupport. 
            Sie finden das Kontaktformular und unten auf der Startseite. Wir werden uns so schnell wie möglich mit Ihnen in Verbindung setzen.`
        },

    ]

    const supportQuestions: FAQ[] = [
        {
            question: "Wo kann ich eine Nachricht an den Support schreiben?Wo kann ich eine Nachricht an den Support schreiben?",
            answer: `Sie finden das Impressum, die allgemeinen Nutzungsbedingungen, das Kontaktformular unten in der Fußzeile. 
            Dort können Sie anschließend Ihren Grund auswählen und zusätzlich eine Beschreibung hinzufügen. 
            Sie können ausserdem auch direkt, eine Email an support@urent-rental.de senden. Der Support wird sich umgehend um Ihr Problem kümmern.`
        },

    ]

    const conversationQuestions: FAQ[] = [
        {
            question: "Wie kann ich einen Nutzer melden?",
            answer: `Wenn Sie unter Konversationen den entsprechenden Chat ausgewählt haben, 
            können Sie diesen oben rechts, durch klicken auf die drei Punkte, melden.`
        },
        {
            question: "Wie kann ich einen Nutzer blockieren?",
            answer: `Wenn Sie unter Konversationen den entsprechenden Chat ausgewählt haben, 
            können Sie diesen oben rechts, durch klicken auf die drei Punkte, blockieren.`
        },
        {
            question: "Wie kann ich einen blockierten Nutzer wieder freigeben?",
            answer: `Wenn Sie unter Konversationen den entsprechenden blockierten Chat ausgewählt haben, können Sie diesen oben rechts, 
            durch klicken auf die drei Punkte, die Blockierung aufheben.`
        },
    ]

    const impressumQuestions: FAQ[] = [
        {
            question: "Wo finde ich die allgemeinen Nutzungsbedingungen?",
            answer: `Sie finden das Impressum, die allgemeinen Nutzungsbedingungen und die Datenschutzerklärung auf jeder Seite ganz unten, im Footer.`
        },
        {
            question: "Wo finde ich die Datenschutz Informationen?",
            answer: `Sie finden das Impressum, die allgemeinen Nutzungsbedingungen und die Datenschutzerklärung auf jeder Seite ganz unten, im Footer.`
        },
        {
            question: "Wie kann ich mich bewerben?",
            answer: `Sie finden die Karriere Seite unten auf der Webseite in der Fußzeile.`
        },
    ]

    const faqs: FAQ[] = [
        ...impressumQuestions,
        ...conversationQuestions,
        ...supportQuestions,
        ...paymentQuestions,
        ...settingsQuestions,
        ...dashboardQuestions,
        ...profileQuestions,
        ...accountQuestions,
        ...searchQuestions,
        ...inseratQuestions

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

    if (!animations.length) {
        faqs.forEach(() => {
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
                                Bedienungshilfe uRent - FAQ
                            </Text>
                        </View>
                        <View>
                            <Text  className="text-md text-gray-200">
                                Häufig gestellte Fragen zu der Benutzeroberfläche und Bedienung von uRent.
                            </Text>
                        </View>
                        <View className="mt-12">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Inserate erstellen/verwalten:
                                </Text>
                            </View>
                            <View>
                                {inseratQuestions.map((faq, index) => (
                                    <View key={index} className="mt-4">
                                        <TouchableOpacity onPress={() => handlePress(index)} className="flex flex-row items-center border-b border-gray-800 pb-2">
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
                                                height: animations[index].interpolate({
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

                        <View className="mt-12">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Inserate erstellen/verwalten
                                </Text>
                            </View>
                            <View>
                                {searchQuestions.map((faq, index) => {
                                    const usedIndex = index + inseratQuestions.length;

                                    return (
                                        <View key={usedIndex} className="mt-4">
                                            <TouchableOpacity onPress={() => handlePress(usedIndex)} className="flex flex-row items-center border-b border-gray-800 pb-2">
                                                <Text className="text-base font-medium text-gray-200 w-11/12">
                                                    {faq.question}

                                                </Text>
                                                <View className="w-1/12 ml-2">
                                                    {expandedIndex === usedIndex ? (
                                                        <FontAwesome className="" name="chevron-up" size={16} color="white" />
                                                    ) : (
                                                        <FontAwesome className="" name="chevron-down" size={16} color="white" />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                            {expandedIndex === usedIndex && (
                                                <Animated.View style={{
                                                    height: animations[usedIndex].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, 100] // Adjust this value to fit your content height
                                                    })

                                                }} className="w-full mt-2">
                                                    <Text className="text-sm text-gray-400 text-left break-all break-words w-full">
                                                    {provideClean(faq.answer)}
                                                    </Text>
                                                </Animated.View>
                                            )}
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                        <View className="mt-12">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Mein Account:
                                </Text>
                            </View>
                            <View>
                                {accountQuestions.map((faq, index) => {
                                    const usedIndex = index + inseratQuestions.length + searchQuestions.length;

                                    return (
                                        <View key={usedIndex} className="mt-4">
                                            <TouchableOpacity onPress={() => handlePress(usedIndex)} className="flex flex-row items-center border-b border-gray-800 pb-2">
                                                <Text className="text-base font-medium text-gray-200 w-11/12">
                                                    {faq.question}

                                                </Text>
                                                <View className="w-1/12 ml-2">
                                                    {expandedIndex === usedIndex ? (
                                                        <FontAwesome className="" name="chevron-up" size={16} color="white" />
                                                    ) : (
                                                        <FontAwesome className="" name="chevron-down" size={16} color="white" />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                            {expandedIndex === usedIndex && (
                                                <Animated.View style={{
                                                    height: animations[usedIndex].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, 100] // Adjust this value to fit your content height
                                                    })

                                                }} className="w-full mt-2">
                                                    <Text className="text-sm text-gray-400 text-left break-all break-words w-full">
                                                    {provideClean(faq.answer)}
                                                    </Text>
                                                </Animated.View>
                                            )}
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                        <View className="mt-12">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Mein Profil verwalten:
                                </Text>
                            </View>
                            <View>
                                {profileQuestions.map((faq, index) => {
                                    const usedIndex = index + inseratQuestions.length + searchQuestions.length + accountQuestions.length;

                                    return (
                                        <View key={usedIndex} className="mt-4">
                                            <TouchableOpacity onPress={() => handlePress(usedIndex)} className="flex flex-row items-center border-b border-gray-800 pb-2">
                                                <Text className="text-base font-medium text-gray-200 w-11/12">
                                                    {faq.question}

                                                </Text>
                                                <View className="w-1/12 ml-2">
                                                    {expandedIndex === usedIndex ? (
                                                        <FontAwesome className="" name="chevron-up" size={16} color="white" />
                                                    ) : (
                                                        <FontAwesome className="" name="chevron-down" size={16} color="white" />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                            {expandedIndex === usedIndex && (
                                                <Animated.View style={{
                                                    height: animations[usedIndex].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, 100] // Adjust this value to fit your content height
                                                    })

                                                }} className="w-full mt-2">
                                                    <Text className="text-sm text-gray-400 text-left break-all break-words w-full">
                                                    {provideClean(faq.answer)}
                                                    </Text>
                                                </Animated.View>
                                            )}
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                        <View className="mt-12">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Einstellungen
                                </Text>
                            </View>
                            <View>
                                {settingsQuestions.map((faq, index) => {
                                    const usedIndex = index + inseratQuestions.length + searchQuestions.length + 
                                    accountQuestions.length + profileQuestions.length;

                                    return (
                                        <View key={usedIndex} className="mt-4">
                                            <TouchableOpacity onPress={() => handlePress(usedIndex)} className="flex flex-row items-center border-b border-gray-800 pb-2">
                                                <Text className="text-base font-medium text-gray-200 w-11/12">
                                                    {faq.question}

                                                </Text>
                                                <View className="w-1/12 ml-2">
                                                    {expandedIndex === usedIndex ? (
                                                        <FontAwesome className="" name="chevron-up" size={16} color="white" />
                                                    ) : (
                                                        <FontAwesome className="" name="chevron-down" size={16} color="white" />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                            {expandedIndex === usedIndex && (
                                                <Animated.View style={{
                                                    height: animations[usedIndex].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, 100] // Adjust this value to fit your content height
                                                    })

                                                }} className="w-full mt-2">
                                                    <Text className="text-sm text-gray-400 text-left break-all break-words w-full">
                                                    {provideClean(faq.answer)}
                                                    </Text>
                                                </Animated.View>
                                            )}
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                        <View className="mt-12">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Dashboard
                                </Text>
                            </View>
                            <View>
                                {dashboardQuestions.map((faq, index) => {
                                    const usedIndex = index + inseratQuestions.length + searchQuestions.length + 
                                    accountQuestions.length + profileQuestions.length + settingsQuestions.length;

                                    return (
                                        <View key={usedIndex} className="mt-4">
                                            <TouchableOpacity onPress={() => handlePress(usedIndex)} className="flex flex-row items-center border-b border-gray-800 pb-2">
                                                <Text className="text-base font-medium text-gray-200 w-11/12">
                                                    {faq.question}

                                                </Text>
                                                <View className="w-1/12 ml-2">
                                                    {expandedIndex === usedIndex ? (
                                                        <FontAwesome className="" name="chevron-up" size={16} color="white" />
                                                    ) : (
                                                        <FontAwesome className="" name="chevron-down" size={16} color="white" />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                            {expandedIndex === usedIndex && (
                                                <Animated.View style={{
                                                    height: animations[usedIndex].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, 100] // Adjust this value to fit your content height
                                                    })

                                                }} className="w-full mt-2">
                                                    <Text className="text-sm text-gray-400 text-left break-all break-words w-full">
                                                    {provideClean(faq.answer)}
                                                    </Text>
                                                </Animated.View>
                                            )}
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                        <View className="mt-12">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Zahlungsverkehr:
                                </Text>
                            </View>
                            <View>
                                {paymentQuestions.map((faq, index) => {
                                    const usedIndex = index + inseratQuestions.length + searchQuestions.length + 
                                    accountQuestions.length + profileQuestions.length + settingsQuestions.length + dashboardQuestions.length;

                                    return (
                                        <View key={usedIndex} className="mt-4">
                                            <TouchableOpacity onPress={() => handlePress(usedIndex)} className="flex flex-row items-center border-b border-gray-800 pb-2">
                                                <Text className="text-base font-medium text-gray-200 w-11/12">
                                                    {faq.question}

                                                </Text>
                                                <View className="w-1/12 ml-2">
                                                    {expandedIndex === usedIndex ? (
                                                        <FontAwesome className="" name="chevron-up" size={16} color="white" />
                                                    ) : (
                                                        <FontAwesome className="" name="chevron-down" size={16} color="white" />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                            {expandedIndex === usedIndex && (
                                                <Animated.View style={{
                                                    height: animations[usedIndex].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, 100] // Adjust this value to fit your content height
                                                    })

                                                }} className="w-full mt-2">
                                                    <Text className="text-sm text-gray-400 text-left break-all break-words w-full">
                                                    {provideClean(faq.answer)}
                                                    </Text>
                                                </Animated.View>
                                            )}
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                        <View className="mt-12">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Kundensupport:
                                </Text>
                            </View>
                            <View>
                                {supportQuestions.map((faq, index) => {
                                    const usedIndex = index + inseratQuestions.length + searchQuestions.length + 
                                    accountQuestions.length + profileQuestions.length + settingsQuestions.length + 
                                    dashboardQuestions.length + paymentQuestions.length;

                                    return (
                                        <View key={usedIndex} className="mt-4">
                                            <TouchableOpacity onPress={() => handlePress(usedIndex)} className="flex flex-row items-center border-b border-gray-800 pb-2">
                                                <Text className="text-base font-medium text-gray-200 w-11/12">
                                                    {faq.question}

                                                </Text>
                                                <View className="w-1/12 ml-2">
                                                    {expandedIndex === usedIndex ? (
                                                        <FontAwesome className="" name="chevron-up" size={16} color="white" />
                                                    ) : (
                                                        <FontAwesome className="" name="chevron-down" size={16} color="white" />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                            {expandedIndex === usedIndex && (
                                                <Animated.View style={{
                                                    height: animations[usedIndex].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, 100] // Adjust this value to fit your content height
                                                    })

                                                }} className="w-full mt-2">
                                                    <Text className="text-sm text-gray-400 text-left break-all break-words w-full">
                                                    {provideClean(faq.answer)}
                                                    </Text>
                                                </Animated.View>
                                            )}
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                        <View className="mt-12">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Konversationen:
                                </Text>
                            </View>
                            <View>
                                {conversationQuestions.map((faq, index) => {
                                    const usedIndex = index + inseratQuestions.length + searchQuestions.length + 
                                    accountQuestions.length + profileQuestions.length + settingsQuestions.length + 
                                    dashboardQuestions.length + paymentQuestions.length + supportQuestions.length;

                                    return (
                                        <View key={usedIndex} className="mt-4">
                                            <TouchableOpacity onPress={() => handlePress(usedIndex)} className="flex flex-row items-center border-b border-gray-800 pb-2">
                                                <Text className="text-base font-medium text-gray-200 w-11/12">
                                                    {faq.question}

                                                </Text>
                                                <View className="w-1/12 ml-2">
                                                    {expandedIndex === usedIndex ? (
                                                        <FontAwesome className="" name="chevron-up" size={16} color="white" />
                                                    ) : (
                                                        <FontAwesome className="" name="chevron-down" size={16} color="white" />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                            {expandedIndex === usedIndex && (
                                                <Animated.View style={{
                                                    height: animations[usedIndex].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, 100] // Adjust this value to fit your content height
                                                    })

                                                }} className="w-full mt-2">
                                                    <Text className="text-sm text-gray-400 text-left break-all break-words w-full">
                                                    {provideClean(faq.answer)}
                                                    </Text>
                                                </Animated.View>
                                            )}
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                        <View className="mt-12">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200">
                                    Impressum:
                                </Text>
                            </View>
                            <View>
                                {impressumQuestions.map((faq, index) => {
                                    const usedIndex = index + inseratQuestions.length + searchQuestions.length + 
                                    accountQuestions.length + profileQuestions.length + settingsQuestions.length + 
                                    dashboardQuestions.length + paymentQuestions.length + supportQuestions.length + conversationQuestions.length;

                                    return (
                                        <View key={usedIndex} className="mt-4">
                                            <TouchableOpacity onPress={() => handlePress(usedIndex)} className="flex flex-row items-center border-b border-gray-800 pb-2">
                                                <Text className="text-base font-medium text-gray-200 w-11/12">
                                                    {faq.question}

                                                </Text>
                                                <View className="w-1/12 ml-2">
                                                    {expandedIndex === usedIndex ? (
                                                        <FontAwesome className="" name="chevron-up" size={16} color="white" />
                                                    ) : (
                                                        <FontAwesome className="" name="chevron-down" size={16} color="white" />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                            {expandedIndex === usedIndex && (
                                                <Animated.View style={{
                                                    height: animations[usedIndex].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, 100] // Adjust this value to fit your content height
                                                    })

                                                }} className="w-full mt-2">
                                                    <Text className="text-sm text-gray-400 text-left break-all break-words w-full">
                                                    {provideClean(faq.answer)}
                                                    </Text>
                                                </Animated.View>
                                            )}
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                    </View>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    );
}

export default FaqsBedienung;