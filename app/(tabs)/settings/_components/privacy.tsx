import { changeUser } from "@/actions/user/change-user";
import { userTable } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { set } from "date-fns";
import * as SecureStore from "expo-secure-store"

import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useAuth } from "../../AuthProvider";

interface PrivacyPartProps {
    currentUser: typeof userTable.$inferSelect;
}

const PrivacyPart: React.FC<PrivacyPartProps> = ({
    currentUser
}) => {

    const [shareRealname, setShareRealname] = useState(currentUser?.sharesRealName);
    const [shareEmail, setShareEmail] = useState(currentUser?.sharesEmail);
    const [sharePhone, setSharePhone] = useState(currentUser?.sharesPhoneNumber);

    const [allowNewsletter, setAllowNewsletter] = useState(currentUser?.newsletter);

    const [hasChanged, setHasChanged] = useState(false);

    const { refetchUser } = useAuth();

    useEffect(() => {
        if (currentUser?.sharesRealName !== shareRealname) {
            setHasChanged(true);
        } else if (currentUser?.sharesEmail !== shareEmail) {
            setHasChanged(true);
        } else if (currentUser?.sharesPhoneNumber !== sharePhone) {
            setHasChanged(true);
        } else if (currentUser?.newsletter !== allowNewsletter) {
            setHasChanged(true);
        }
        else {
            setHasChanged(false);
        }
    }, [shareRealname, shareEmail, sharePhone, allowNewsletter]);

    const onSubmit = async () => {
        try {
            const values = {
                sharesRealName: shareRealname,
                sharesEmail: shareEmail,
                sharesPhoneNumber: sharePhone,
                newsletter : allowNewsletter
            }

            const foundToken = await SecureStore.getItemAsync("authToken");

            await changeUser(values, foundToken);

            refetchUser();
            setHasChanged(false);


        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <View>
            <View className="flex flex-row items-center gap-x-4">
                <MaterialCommunityIcons name="incognito" size={24} color="white" />
                <Text className="text-lg font-semibold text-gray-200">
                    Privatsphäre
                </Text>
            </View>
            <View className="flex flex-col justify-center mt-8 space-y-4">
                <View className="flex flex-row items-center w-full">
                    <View className="w-1/4">
                        <BouncyCheckbox
                            size={24}
                            fillColor="blue"
                            unFillColor="#FFFFFF"
                            className="flex justify-center items-center"

                            isChecked={shareEmail}
                            onPress={(isChecked: boolean) => { setShareEmail(isChecked) }}
                            disableText={true}
                        />
                    </View>
                    <View>
                        <Text className="text-base text-gray-200/90 font-semibold">
                            E-Mail teilen
                        </Text>
                    </View>
                </View>
                <View className="flex flex-row items-center w-full">
                    <View className="w-1/4 flex justify-center items-center">
                        <BouncyCheckbox
                            size={24}
                            fillColor="blue"
                            unFillColor="#FFFFFF"
                            className="flex justify-center items-center"
                            isChecked={shareRealname}
                            onPress={(isChecked: boolean) => { setShareRealname(isChecked) }}
                            disableText={true}
                        />
                    </View>
                    <View className="w-8/12">
                        <Text className="text-base text-gray-200/90 font-semibold">
                            Echten Namen teilen
                        </Text>
                    </View>
                </View>

                <View className="flex flex-row items-center w-full">
                    <View className="w-1/4">
                        <BouncyCheckbox
                            size={24}
                            fillColor="blue"
                            unFillColor="#FFFFFF"
                            className="flex justify-center items-center"
                            isChecked={sharePhone}
                            onPress={(isChecked: boolean) => { setSharePhone(isChecked) }}
                            disableText={true}
                        />
                    </View>
                    <View>
                        <Text className="text-base text-gray-200/90 font-semibold">
                            Telefonnummer teilen
                        </Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text className="text-base font-semibold text-gray-200">
                            Datennutzung
                        </Text>
                    </View>
                    <View className="flex flex-row items-center w-full mt-4">
                        <View className="w-1/4">
                            <BouncyCheckbox
                                size={24}
                                fillColor="blue"
                                unFillColor="#FFFFFF"
                                className="flex justify-center items-center"
                                isChecked={allowNewsletter}
                                onPress={(isChecked: boolean) => { setAllowNewsletter(isChecked) }}
                                disableText={true}
                            />
                        </View>
                        <View className="flex flex-col w-3/4">
                            <Text className="text-base text-gray-200/90 font-semibold">
                                Newsletter und Werbe-Emails
                            </Text>
                            <Text className="text-sm text-gray-200/60">
                            Ich möchte per E-Mail von uRent Angebote erhalten, 
                            an Umfragen teilnehmen und Informationen über Produkte und Dienstleistungen von uRent erhalten.
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="w-full">
                    <TouchableOpacity className={cn("p-4 bg-indigo-800 rounded-md", !hasChanged && "bg-indigo-800/10")}
                        onPress={onSubmit}
                        disabled={!hasChanged}>
                        <Text className={cn("text-center text-gray-200 text-sm font-semibold", !hasChanged && "text-gray-200/60")}>
                            Änderungen speichern
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default PrivacyPart;