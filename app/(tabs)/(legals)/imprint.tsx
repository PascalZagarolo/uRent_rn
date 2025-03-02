import Footer from "@/components/_searchpage/footer";
import Header from "@/components/_searchpage/header";
import { View, Text, ScrollView, SafeAreaView } from "react-native";


const Imprint = () => {

    

    return (
        <SafeAreaView className="flex flex-1 bg-[#1F2332]">
            <ScrollView className=" ">
            
            <Header currentUser={undefined} toggleDrawer={function (): void {
                    throw new Error("Function not implemented.");
                } } />
            <View className="flex justify-center  p-4">
                <View className="sm:w-[1044px] w-full  rounded-md ">
                    <View className="  min-h-screen">


                        <View className=" mt-4  rounded-lg ">
                            <Text className="text-gray-200 text-2xl font-semibold flex items-center">
                                 Impressum <Text className="ml-auto text-sm"> (01.01.2024) </Text>
                            </Text>
                        </View>



                        <View className="">
                            <View className="">
                                <Text className="font-semibold text-lg text-gray-200">
                                    Angaben gemäß § 5 TMG
                                </Text>
                                <Text className="mt-2 text-gray-200">
                                    uRent UG (haftungsbeschränkt)
                                </Text>
                                <Text className="mt-2 text-gray-200">
                                Bozenerstr. 26
                                </Text>
                                <Text className="mt-2 text-gray-200">
                                    42659 Solingen
                                </Text>
                                
                                <Text className="mt-4 text-lg font-semibold text-gray-200">
                                    Vertreten durch:
                                </Text>
                                <Text className="mt-2 text-base font-semibold text-gray-200">
                                    Pascal Zagarolo
                                </Text>
                                <Text className="mt-2 text-base font-semibold text-gray-200">
                                    Vincent Garber
                                </Text>
                                <View>
                                    <Text className="font-bold mt-4 text-gray-200">
                                        Kontakt:
                                    </Text>
                                    <View>
                                        <Text className="mt-2 text-gray-200">
                                            Telefon: x
                                        </Text>
                                        <Text className="mt-2 text-gray-200">
                                            Telefax: x
                                        </Text>
                                        <Text className="mt-2 text-gray-200">
                                            E-Mail: <Text >support@urent-rental.com</Text>
                                        </Text>
                                    </View>
                                    {/* 
                                    <View className="mt-4">
                                        <View className="font-bold">
                                            Umsatzsteuer-ID:
                                        </View>
                                        <View className="mt-2">
                                            Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: Musterustid.
                                        </View>

                                        <View className="font-bold mt-4">
                                            Wirtschafts-ID:
                                        </View>
                                        <View className="mt-2">
                                            Musterwirtschaftsid
                                        </View>

                                        <View className="font-bold mt-4">
                                            Aufsichtsbehörde:
                                        </View>
                                        <View className="mt-2">
                                            Musteraufsicht Musterstadt
                                        </View>
                                    </View>
                                    */}
                                </View>
                            </View>


                            <View className="mt-8">
                                <Text className="font-bold text-gray-200">
                                    Haftungsausschluss:
                                </Text>
                                <View className="mt-2">
                                    <Text className="font-medium text-lg text-gray-200">
                                        Haftung für Inhalte
                                    </Text>
                                    <Text className="text-gray-200">
                                        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
                                        Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
                                        Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
                                        10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                                        Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                                        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
                                        bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
                                        konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
                                        Inhalte umgehend entfernen.
                                    </Text>
                                </View>
                            </View>

                            <View className="mt-4">
                                <View className="mt-2">
                                    <Text className="font-medium text-lg text-gray-200">
                                        Haftung für Links
                                    </Text>
                                    <Text className="text-gray-200">
                                        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
                                        Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                                        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                                        wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
                                        Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
                                        jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                                        Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                                    </Text>
                                </View>
                            </View>



                            <View className="mt-4">
                                <View className="mt-2">
                                    <Text className="font-medium text-lg text-gray-200">
                                        Urheberrecht
                                    </Text>
                                    <Text className="text-gray-200">
                                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                                        Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                                        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                                        Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit
                                        die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
                                        beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                                        Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
                                        Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                                    </Text>
                                </View>
                            </View>



                            <View className="mt-4">
                                <View className="mt-2">
                                    <Text className="font-medium text-lg text-gray-200">
                                        Datenschutz
                                    </Text>
                                    <Text className="text-gray-200">
                                        Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren
                                        Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt
                                        dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung
                                        nicht an Dritte weitergegeben.
                                        Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
                                        Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
                                        möglich.
                                        Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung
                                        von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich
                                        widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der
                                        unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
                                    </Text>
                                </View>
                            </View>



                            <View className="mt-4">
                                <View className="mt-2">
                                    <Text className="font-medium text-lg text-gray-200">
                                        Google Analytics
                                    </Text>
                                    <Text className="text-gray-200">
                                        Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. (&apos;Google&apos;). Google Analytics
                                        verwendet sog. &apos;Cookies&apos;, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der
                                        Benutzung der Website durch Sie ermöglicht. Die durch den Cookie erzeugten Informationen über Ihre Benutzung
                                        dieser Website (einschließlich Ihrer IP-Adresse) wird an einen Server von Google in den USA übertragen und
                                        dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um
                                        Reports über die Websiteaktivitäten für die Websitebetreiber zusammenzustellen und um weitere mit der
                                        Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese
                                        Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte
                                        diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten
                                        der Google in Verbindung bringen. Sie können die Installation der Cookies durch eine entsprechende Einstellung
                                        Ihrer Browser Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls
                                        nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website
                                        erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen
                                        Art und Weise und zu dem zuvor benannten Zweck einverstanden.
                                    </Text>
                                </View>
                            </View>



                            <View className="mt-4">
                                <View className="mt-2">
                                    <Text className="font-medium text-lg text-gray-200">
                                        Google AdSense
                                    </Text>
                                    <Text className="text-gray-200">
                                        Diese Website benutzt Google Adsense, einen Webanzeigendienst der Google Inc., USA (&apos;Google&apos;). Google Adsense
                                        verwendet sog. &apos;Cookies&apos; (Textdateien), die auf Ihrem Computer gespeichert werden und die eine Analyse der
                                        Benutzung der Website durch Sie ermöglicht. Google Adsense verwendet auch sog. &apos;Web Beacons&apos; (kleine
                                        unsichtbare Grafiken) zur Sammlung von Informationen. Durch die Verwendung des Web Beacons können einfache
                                        Aktionen wie der Besucherverkehr auf der Webseite aufgezeichnet und gesammelt werden. Die durch den Cookie
                                        und/oder Web Beacon erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer
                                        IP-Adresse) werden an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese
                                        Informationen benutzen, um Ihre Nutzung der Website im Hinblick auf die Anzeigen auszuwerten, um Reports über
                                        die Websiteaktivitäten und Anzeigen für die Websitebetreiber zusammenzustellen und um weitere mit der
                                        Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese
                                        Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte
                                        diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten
                                        der Google in Verbindung bringen. Das Speichern von Cookies auf Ihrer Festplatte und die Anzeige von Web
                                        Beacons können Sie verhindern, indem Sie in Ihren Browser-Einstellungen &apos;keine Cookies akzeptieren&apos; wählen
                                        (Im MS Internet-Explorer unter &apos;Extras {'>'} Internetoptionen {'>'} Datenschutz{'>'} Einstellung&apos;; im Firefox unter
                                        &apos;Extras {'>'} Einstellungen {'>'} Datenschutz {'>'} Cookies&apos;); wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall
                                        gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung
                                        dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor
                                        beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.
                                    </Text>
                                </View>
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

export default Imprint;