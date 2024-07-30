import Footer from "@/components/_searchpage/footer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CheckBox } from "@rneui/base";
import { Input } from "@rneui/themed";
import { Feather } from "lucide-react-native";
import { useState } from "react";
import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity } from "react-native";


const ContactSite = () => {

    const [checkedConditions, setCheckedConditions] = useState(false);

    return (
        <SafeAreaView className="flex flex-1 bg-[#1F2332]">
            <ScrollView>
                <View className="p-4">
                    <View>
                        <Text className="text-xl font-semibold text-gray-200">
                            Kontaktmöglichkeiten
                        </Text>
                    </View>
                    <View className="mt-4">
                        <View>
                            <Text className="text-base text-gray-200">
                                Kontaktinformationen:
                            </Text>
                            <Text className="text-sm text-gray-200">
                                E-Mail: <Text className="tex-gray-200 font-semibold"> support@urent-rental.de</Text>
                            </Text>
                        </View>
                        <View className="mt-8">
                            <View className="flex flex-row items-center gap-x-4">
                                <MaterialCommunityIcons name="message-outline" size={24} color="#fff" />
                                <Text className="text-lg font-semibold text-gray-200">
                                    Kontaktformular
                                </Text>
                            </View>
                            <View>
                                <Text className="text-xs text-gray-200/60">
                                    Falls sie Fragen oder Anregungen haben, können sie uns gerne über das Kontaktformular kontaktieren.
                                    {"\n"}
                                    Wir werden uns so schnell wie möglich bei ihnen melden.
                                    
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className="mt-4 space-y-12">
                        <View>
                            <Text className="text-md font-semibold text-gray-200 px-2">
                                Name*
                            </Text>
                            <TextInput className=" border-b border-gray-500 rounded-md p-2.5 text-gray-200 mt-2" 
                            placeholder="Name"
                            />
                        </View>
                        <View>
                            <Text className="text-md font-semibold text-gray-200 px-2">
                                Deine Email-Addresse*
                            </Text>
                            <TextInput className=" border-b border-gray-500 rounded-md p-2.5 text-gray-200 mt-2" 
                            placeholder="E-Mail Addresse"
                            />
                        </View>
                        <View>
                            <Text className="text-md font-semibold text-gray-200 px-2">
                                Titel
                            </Text>
                            <TextInput className=" border-b border-gray-500 rounded-md p-2.5 text-gray-200 mt-2" 
                            placeholder="Email-Titel"
                            />
                        </View>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View className="mt-12">
                            <Text className="text-md font-semibold text-gray-200 px-2">
                                Inhalt
                            </Text>
                            <TextInput className=" bg-[#161923] rounded-md p-4 min-h-[240px] text-gray-200 mt-2" 
                            numberOfLines={4}
                            multiline={true}
                            placeholder="Beschreibe dein Anliegen"
                            />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {/* 
                    Add Checkbox for conditions
                    */}
                    <View className="mt-8  flex justify-end ml-auto">
                        <TouchableOpacity className="p-4 bg-indigo-800 w-40 rounded-md" onPress={() => {}}>
                            <Text className="text-center font-semibold text-gray-200">
                                Absenden
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Footer />
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}

export default ContactSite;