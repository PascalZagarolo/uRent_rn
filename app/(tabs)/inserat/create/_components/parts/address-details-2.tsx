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
import * as SecureStorage from 'expo-secure-store';
import { editAddress } from "@/actions/inserat/address/edit-address";


interface AddressDetails2Props {
    thisInserat: typeof inserat.$inferSelect;
    refetchInserat: () => void;
}

const AddressDetails2 = forwardRef(({ thisInserat, refetchInserat }: AddressDetails2Props, ref) => {

    const [isLoading, setIsLoading] = useState(false);

    console.log(thisInserat?.addressId + "!!!")

    useImperativeHandle(ref, () => ({
        onSave: async () => {
            try {
                console.log("2000")
                setIsLoading(true);
                const authToken = await SecureStorage.getItemAsync("authToken");
                
                const values = {
                    inseratId : thisInserat.id,
                    token : authToken,
                    postalCode : postalCode,
                    locationString : null,
                }
                console.log(values) 
                await editAddress(values);
                await refetchInserat();
            } catch(e : any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }));

    const [currentPostalCode, setCurrentPostalCode] = useState<string | null>();
    const [postalCode, setPostalCode] = useState<string | null>(thisInserat?.address?.postalCode ?? null);

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
                <View className="flex flex-row items-center justify-start mt-4 space-x-2">
                      
                       {postalCode ? (
                            <MaterialCommunityIcons name="check"
                            size={20} color={"green"} 
                            className="w-4 h-4 text-green-600 mr-4"
                            />
                        ) : (
                            <MaterialCommunityIcons name="close" color={"red"} 
                            className="w-4 h-4 text-rose-600 mr-4" size={20}
                            />
                        )}
                     
                        <Text className={cn("text-base text-gray-200", !postalCode && "text-gray-200/60")}>
                            {postalCode ? postalCode : "Postleitzahl noch nicht gesetzt"}
                        </Text>
                    </View>
                <View className="flex flex-col items-center w-full mt-4 ">
                    <View className="w-full ">
                        <Text className="text-lg font-semibold text-gray-200">
                            Postleitzahl
                        </Text>
                        <View style={{ width: '100%', height: '100%' }} >
                            <GooglePlacesAutocomplete
                                 
                                placeholder="Gib deine Postleitzahl ein.."
                                onPress={(data, details = null) => {
                                    
                                    console.log(details?.address_components[0]?.short_name)
                                    setPostalCode(details?.address_components[0]?.short_name ?? null)
                                }}
                                
                                debounce={200}
                                fetchDetails={true}
                                query={{
                                    key: usedKey,
                                    language: "de",
                                    location: "48.8566,2.3522",
                                    type:"(regions)",
                                    components: "country:de",
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
                                    placeholderTextColor : "gray",
                                    onFocus: () => setIsFocused(true),
                                    onBlur: () => setIsFocused(false),
                                    contextMenuHidden: true,
                                    inputMode: "numeric",
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



export default AddressDetails2;

