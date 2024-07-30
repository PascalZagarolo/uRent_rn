import Footer from '@/components/_searchpage/footer';
import { ScrollView, Text, View, SafeAreaView, Linking } from 'react-native';

const DataPrivacy = () => {
    return ( 
        <SafeAreaView className="flex flex-1 bg-[#1F2332]">
        <ScrollView>
      <View className=" w-full  rounded-md  p-4">
        <View className="min-h-screen">
          <View className=" mt-4 rounded-lg">
            <Text className="text-gray-200 text-2xl font-semibold flex items-center">
              Datenschutzerklärung uRent UG
              <Text className="ml-auto text-sm text-gray-200"> (15.06.2024) </Text>
            </Text>
          </View>

          <View className=" text-sm ">
            <View className="">
              <Text className="font-semibold text-lg underline text-gray-200">
                1. Anwendungsbereich
              </Text>
              <Text className='text-gray-200'>
                Die hier aufgeführte Datenschutzerklärung ist für die Nutzung der Website
                und App uRent-rental.de sowie der uRent App.
                Unabhängig davon wie sie die Produkte (Website, App) aufrufen.
                Wir behalten uns das Recht vor die Datenschutzerklärung jederzeit zu ändern.
                Über jeweilige Änderungen werden sie über E-Mail informiert.
              </Text>

              <Text className="font-semibold text-lg underline mt-4 text-gray-200">
                2. Verantwortliche
              </Text>
              <Text className='text-gray-200'>
                Die uRent UG ist Betreiber des Services und der Produkte und
                verantwortlich im Sinne der Datenschutzgrundverordnung (DSGVO).
              </Text>

              <Text className="font-semibold text-lg underline mt-4 text-gray-200">
                3. Welche Daten wir speichern und verarbeiten
              </Text>
              <Text className='text-gray-200'>
                Wir speichern personenbezogene Daten wenn sie unsere Produkte nutzen,
                Sie ein Konto erstellen, wenn sie uRent Informationen senden z.B.
                Webformular und wenn sie ihr Konto mit Informationen füllen.
              </Text>

              <View className="">
                <Text className="font-semibold text-base text-gray-200">
                  3.1. Personenbezogene Datensätze welche gespeichert werden
                </Text>
                <View className="px-4 space-y-2">
                  <Text className='text-gray-200'>
                    - Daten welche zu ihrer Identifikation führen, wie anonymisierter Benutzername,
                    Anschrift, Telefonnummer und Email Adresse.
                    Wobei das angeben einer Email Adresse verpflichtend ist um ihr Konto zu verifizieren.
                  </Text>
                  <Text className='text-gray-200'>
                    - Inhalte die sie über unser Chat Tool austauschen
                  </Text>
                  <View className="flex flex-row gap-x-1">
                    <Text className='text-gray-200'>
                      - Zahlungsdaten werden durch unseren Partner Stripe verarbeitet die entsprechende Datenschutzerklärung finden sie
                    </Text>
                    <Text className="underline text-gray-200" onPress={() => Linking.openURL("https://stripe.com/de/privacy")}>
                      hier
                    </Text>
                  </View>
                  <Text className='text-gray-200'>
                    - Bei Meldung bezüglich einer Beschwerde werden folgende Daten an uns übermittelt:
                    Anonymisierter Benutzername,
                    Email Adresse sowie der Grund für die Beschwerde welcher über das Webformular von ihnen abgesendet wird.
                  </Text>
                </View>
              </View>

              <View className="">
                <Text className="font-semibold text-base text-gray-200">
                  3.2. Personenbezogene Datensätze welche automatisch gespeichert werden
                </Text>
                <View className="px-4 space-y-2">
                  <Text className='text-gray-200'>
                    - Daten welche durch Cookies und ähnlichen Technologien erhoben werden.
                    Diese Datensätze enthalten Geräte- und Nutzungsbezogene Informationen.
                  </Text>
                  <Text className='text-gray-200'>
                    - Daten zu Inseraten und Seiten welche sie aufrufen dazu zählt Dauer, Zeitpunkt und Häufigkeit.
                  </Text>
                  <Text className='text-gray-200'>
                    - Daten zu ihrem persönlichen Werbeinteraktionsverhalten dazu zählt: welchen Inhalt sie sehen, wie häufig sie
                    damit in Verbindung gekommen
                    sind und wie sie damit interagieren.z.B. Transaktion über uRent als Vermittler.
                  </Text>
                  <Text className='text-gray-200'>
                    - Geräte bezogene Daten: Dazu zählt Gerät (Modell, Betriebssystem, Version, Typ.)
                    sowie eine individuelle Geräte ID
                    um diese zuordnen zu können, sowie Cookie bezogene Daten dazu zählt z.B die Cookie ID
                  </Text>
                  <Text className='text-gray-200'>
                    - IP-Adresse von welcher das Gerät auf uRent zugreifen kann.
                  </Text>
                  <Text className='text-gray-200'>
                    - Ungefähre Standortdaten durch die IP sowie genaue Standortdaten um die Suche von Inseraten einzugrenzen.
                  </Text>
                  <Text className='text-gray-200'>
                    - Daten welche Suchaufträge sie freigegeben haben und welche Inserate sie gespeichert haben.
                  </Text>
                </View>
              </View>

              <Text className="font-semibold text-lg underline mt-4 text-gray-200">
                4. Rechtsgrundlage und Zweck der Datenverarbeitung
              </Text>
              <Text className='text-gray-200'>
                Wir verarbeiten Ihre personenbezogenen Daten aus verschiedenen Gründen
                und basierend auf unterschiedlichen Rechtsgrundlagen, die eine solche Verarbeitung zulassen.
                Ihre Daten werden unter anderem genutzt, um unsere Dienstleistungen bereitzustellen und zu verbessern,
                Ihnen ein personalisiertes Nutzungserlebnis auf unserer Website zu bieten, Sie bezüglich Ihres uRent-Kontos
                und unserer Dienstleistungen zu kontaktieren, Kundensupport zu leisten, Ihnen maßgeschneiderte Werbung und
                Marketingmitteilungen zu schicken sowie betrügerische oder illegale Aktivitäten zu erkennen, zu verhindern,
                zu begrenzen und zu untersuchen. Zu diesen Zwecken teilen wir
                Ihre Daten auch mit Dritten (einschließlich unserer Auftragsverarbeiter)
              </Text>
              <Text className="mt-2 text-gray-200">
                Wir verarbeiten Ihre personenbezogenen Daten, um den Vertrag, den wir mit Ihnen geschlossen haben, zu erfüllen und Ihnen
                unsere Dienstleistungen bereitzustellen (Art. 6 Abs. 1 lit. b) DSGVO). Dies umfasst folgende Zwecke:
              </Text>

              <View className=" space-y-2">
                <Text className='text-gray-200'>
                  - Bereitstellung und Nutzung unserer Dienstleistungen (einschließlich Abrechnung),
                  insbesondere zur Veröffentlichung und zum Teilen von Anzeigen, Profilen und anderen
                  Inhalten des Nutzers. Zudem umfasst dies die Vermittlung des Kontakts zu anderen Nutzern
                  mit passenden Angeboten, die Messung und Verbesserung der Qualität und des Erfolgs unserer
                  Dienstleistungen, die Sicherstellung der Sicherheit und Einsatzbereitschaft unserer Services
                  sowie die
                  Anpassung des Website- und Service-Inhalts basierend auf Ihren Aktivitäten, um Ihnen relevante Inhalte zu bieten.
                </Text>
                <Text className='text-gray-200'>
                  - Bereitstellung und Nutzung unserer Dienstleistungen (inklusive Abrechnung),
                  insbesondere zur Veröffentlichung und zum Teilen von Anzeigen, Profilen und anderen
                  Inhalten der Nutzer. Zudem umfasst dies die Vermittlung des Kontakts zu anderen Nutzern
                  mit passenden Angeboten, die Messung und Verbesserung der Qualität und des Erfolgs unserer Dienstleistungen,
                  die Sicherstellung der Sicherheit und Einsatzbereitschaft unserer Dienstleistungen
                  sowie die Anpassung des Inhalts der Website und Services basierend auf Ihren Aktivitäten,
                  um Ihnen relevante Inhalte präsentieren zu können.
                </Text>
                <Text className='text-gray-200'>
                  - Die Zahlung über uRent wird durch unseren kooperierenden Zahlungsdienstleister
                  „Stripe“ geleistet. Diese verarbeiten Ihre Daten zur Erfüllung des mit Ihnen geschlossenen
                  Vertrags sowie zur Erfüllung ihrer gesetzlichen Verpflichtungen. Die entsprechende Datenschutzerklärung finden sie hier.
                </Text>
                <Text className='text-gray-200'>
                  - Verhinderung, Erkennung, Eindämmung und Untersuchung von rechtswidrigen Handlungen,
                  die Ihre lebenswichtigen Interessen oder die lebenswichtigen Interessen einer
                  anderen natürlichen Person gefährden könnten, sofern keine entsprechende gesetzliche Verpflichtung bereits besteht
                </Text>
              </View>

              <Text className="font-semibold text-lg underline mt-4 text-gray-200">
                5. Löschung und Speicherdauer von Daten
              </Text>
              <Text className='text-gray-200'>
                Wir und unsere Dienstleister speichern Ihre personenbezogenen Daten gemäß den geltenden Datenschutzgesetzen, solange dies für die in dieser Datenschutzerklärung genannten Zwecke erforderlich ist. Weitere Informationen zu den Verarbeitungszwecken finden
                Sie unter "Zwecke und Rechtsgrundlagen der Datenverarbeitung".
                Nach Ablauf dieser Zeiträume löschen wir Ihre personenbezogenen Daten gemäß
                unseren Richtlinien zur Datenaufbewahrung und -löschung oder anonymisieren sie ordnungsgemäß.
                Eine Ausnahme gilt, wenn wir gesetzlich verpflichtet sind, Ihre personenbezogenen Daten länger aufzubewahren (z.B. zur Erfüllung rechtlicher Pflichten oder für Steuer-, Buchhaltungs- und Prüfzwecke). In Europa betragen die üblichen Aufbewahrungsfristen zwischen 6 und 10 Jahren (z.B. für Verträge, Mitteilungen und Geschäftsbriefe). Wenn gesetzlich zulässig oder erforderlich, schränken wir die Verarbeitung Ihrer Daten ein, anstatt sie zu löschen (z.B. durch Sperrung). Dies gilt insbesondere, wenn wir die betreffenden Daten noch für die weitere Vertragsabwicklung, Rechtsverfolgung oder Rechtsverteidigung benötigen oder ihre Aufbewahrung anderweitig gesetzlich vorgeschrieben oder erlaubt ist. Die maßgeblichen Kriterien für die Dauer der Einschränkung der Verarbeitung sind dann die gesetzlichen Verjährungs- bzw. Aufbewahrungsfristen. Nach Ablauf dieser Fristen werden die betreffenden Daten gelöscht.
                Die spezifischen Aufbewahrungsfristen für personenbezogene Daten sind in unseren Richtlinien zur Datenaufbewahrung dokumentiert.
                Die Dauer der Speicherung personenbezogener Daten kann je nach den von uns angebotenen Services und unseren gesetzlichen Verpflichtungen
                gemäß dem jeweiligen nationalen Recht variieren. Die folgenden Faktoren beeinflussen typischerweise die Speicherdauer:
              </Text>

              <View className=" space-y-2">
                <View>
                  <Text className="font-semibold text-gray-200">
                    1. Erforderlichkeit für die Bereitstellung unserer Services:
                  </Text>
                  <Text className='text-gray-200'>
                    Dazu zählen die Durchführung des Nutzungsvertrags mit Ihnen,
                    die Aufrechterhaltung und Verbesserung der Leistungsfähigkeit unserer Services, die Gewährleistung
                    der Sicherheit unserer Systeme und die Pflege korrekter Geschäfts-
                    und Finanzdokumente. Auf dieser Grundlage werden die meisten unserer Aufbewahrungsfristen festgelegt.
                  </Text>
                </View>

                <View>
                  <Text className="font-semibold text-gray-200">
                    2. Besondere Kategorien personenbezogener Daten:
                  </Text>
                  <Text className='text-gray-200'>
                    Bei der Speicherung besonderer Kategorien personenbezogener Daten
                    (z.B. rassische und ethnische Herkunft, politische Meinungen, religiöse Überzeugungen, Gewerkschaftszugehörigkeit, genetische Daten,
                    biometrische Daten, Gesundheitsdaten oder Daten zum Sexualleben oder der sexuellen Orientierung)
                    ist eine verkürzte Aufbewahrungsfrist in der Regel angemessen.
                  </Text>
                </View>

                <View>
                  <Text className="font-semibold text-gray-200">
                    3. Einwilligungsbasierte Verarbeitung personenbezogener Daten:
                  </Text>
                  <Text className='text-gray-200'>
                    Verarbeiten wir personenbezogene Daten auf Basis einer Einwilligung
                    (einschließlich Einwilligung in die verlängerte Speicherung), speichern wir die Daten für den Zeitraum, der
                    für die Verarbeitung entsprechend Ihrer Einwilligung erforderlich ist.
                  </Text>
                </View>

                <View>
                  <Text className="font-semibold text-gray-200">
                    4. Gesetzliche, vertragliche oder andere Verpflichtungen:
                  </Text>
                  <Text className='text-gray-200'>
                    Entsprechende Aufbewahrungspflichten können sich aus Gesetzen oder behördlichen Anordnungen
                    ergeben. Zudem kann es notwendig sein, personenbezogene Daten im Hinblick auf laufende oder zukünftige
                    Rechtsstreitigkeiten zu speichern. Personenbezogene Daten, die in Verträgen, Mitteilungen und Geschäftsbriefen enthalten sind,
                    können je nach nationalem Recht gesetzlichen Aufbewahrungspflichten unterliegen.
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
 
export default DataPrivacy;