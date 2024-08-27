import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";

interface ConfirmMailProps {
  confirmLink: string;
}

export const ConfirmUserDeletion: React.FC<ConfirmMailProps> = ({
  confirmLink,
}) => {
  const handlePress = () => {
    Linking.openURL(confirmLink);
  };

  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            source={{ uri: "https://example.com/uRent.png" }}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.hr} />
          <Text style={styles.paragraph}>
            Wir haben deine Anfrage zum Löschen deines Accounts, sowie aller
            damit verbundenen Daten erhalten.
          </Text>
          <Text style={styles.paragraph}>
            Drücke auf den Knopf um deinen Löschvorgang zu bestätigen. Gelöschte
            Daten können nicht wiederhergestellt werden, also sei dir sicher,
            dass du alle Daten gesichert hast, die du behalten möchtest.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Account löschen</Text>
          </TouchableOpacity>
          <View style={styles.hr} />
          <Text style={styles.paragraph2}>
            Wir möchten sicherstellen, dass Ihre uRent-Erfahrung reibungslos
            verläuft. Falls Sie Fragen oder Anliegen haben, zögern Sie bitte
            nicht, sich an unser Support-Team support@urent-rental.de zu wenden.{" "}
            <br />
            Wir stehen Ihnen jederzeit gerne zur Verfügung.
          </Text>
          <Text style={styles.paragraph2}>
            Wir freuen uns darauf, Ihnen bei der Erfüllung Ihrer Bedürfnisse im
            Bereich Mieten und Vermieten behilflich zu sein. <br />
          </Text>
          <Text style={styles.paragraph2}>— Das uRent Team</Text>
          <View style={styles.hr} />
          <Text style={styles.footer}>
            uRent UG (haftungsbeschränkt), Bozenerstr.26, 42659 Solingen, NRW,
            Deutschland
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ConfirmUserDeletion;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f6f9fc",
    flex: 1,
  },
  container: {
    backgroundColor: "#ffffff",
    margin: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  box: {
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  hr: {
    borderBottomColor: "#e6ebf1",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 20,
  },
  paragraph: {
    color: "#525f7f",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
    marginBottom: 10,
  },
  paragraph2: {
    color: "#525f7f",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 20,
    textAlign: "left",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#131420",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    color: "#8898aa",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
