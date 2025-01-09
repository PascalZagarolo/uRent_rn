import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
    Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback, StyleSheet,
    SafeAreaView,
    Platform
} from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'


interface AddressDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat: () => void;
}

const AddressDetails = forwardRef(({ thisInserat, refetchInserat }: AddressDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
            console.log("Saving:");
        }
    }));

    const [currentAddress, setCurrentAddress] = useState(thisInserat.title);
    const [currentEmail, setCurrentEmail] = useState(thisInserat.description);
    const [currentPhone, setCurrentPhone] = useState(thisInserat.description);

    const [isFocused, setIsFocused] = useState(false);


    const usedKey = process.env.EXPO_PUBLIC_GOOGLE_CLOUD_SECRET;

    useEffect(() => {
        console.log(usedKey)
    }, [])


    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="h-full">
            <KeyboardAvoidingView
                className="h-full"

                behavior="height" // or "height" depending on your needs
            >
                <View className="flex flex-col items-center w-full mt-4 ">
                    <View className="w-full mt-4">
                        <Text className="text-lg font-semibold text-gray-200">
                            Addresse
                        </Text>
                        <View style={{ width: '100%', height: '100%' }} >
                            <GooglePlacesAutocomplete
                                placeholder="Gib deine Adresse ein.."
                                onPress={(data, details = null) => {
                                    console.log("Coming from Address UseState: ", data);
                                    console.log(details)
                                }}
                                debounce={200}
                                fetchDetails={true}
                                query={{
                                    key: usedKey,
                                    language: "de",
                                    location: "48.8566,2.3522",
                                }}
                                styles={{
                                    container: styles.container,
                                    textInputContainer: styles.textInputContainer,
                                    textInput: styles.textInput,
                                    listView: styles.listView,
                                    row: styles.row,
                                    loader: styles.loader,
                                    description: styles.description,
                                    predefinedPlacesDescription: styles.predefinedPlacesDescription,
                                    separator: styles.separator,
                                    poweredContainer: styles.poweredContainer,
                                    powered: styles.powered,
                                }}
                                textInputProps={{
                                    onFocus: () => setIsFocused(true),
                                    onBlur: () => setIsFocused(false),
                                }}
                            />
                        </View>

                    </View>



                    


                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    );


},

);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInputContainer: {
        width: "100%",
        backgroundColor: "#1a1e29",  // Match the background color
        borderRadius: 10,
        padding: 0,

        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        height: 56,
        borderRadius: 10,
        marginLeft: 8,
        paddingLeft: 10,
        backgroundColor: "#1a1e29",
        color: "white",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        width: "100%",
    },
    listView: {
        backgroundColor: "#1a1e29",
        borderRadius: 10,
        elevation: 3,
    },
    row: {
        backgroundColor: "#1a1e29",
        borderBottomColor: "#1a1e29",

        padding: 13,
        height: 44,
        flexDirection: "row",
        alignItems: "center",
    },
    loader: {
        flexDirection: "row",
        justifyContent: "flex-end",
        height: 20,
    },
    description: {
        color: "white",
    },
    predefinedPlacesDescription: {
        color: "#1faadb",

    },
    separator: {
        height: 0,
    },
    poweredContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#1a1e29",
        borderBottomLeftRadius: 10,
        backgroundColor: "#1a1e29",
    },
    powered: {
        borderTopColor: "#1a1e29",
        tintColor: "white",
    },
});



export default AddressDetails;

