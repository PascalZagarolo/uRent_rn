import { changeUser } from "@/actions/user/change-user";
import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Text, View, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useAuth } from "@/app/(tabs)/AuthProvider";



interface ChangeNameProps {
    savedName: string;
    firstname: string;
    lastname: string;
}

const ChangeName: React.FC<ChangeNameProps> = ({
    savedName,
    firstname,
    lastname
}) => {

    const [currentName, setCurrentName] = useState(savedName);
    const [currentFirstName, setCurrentFirstName] = useState(firstname);
    const [currentLastName, setCurrentLastName] = useState(lastname);

    const [hasChanged, setHasChanged] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const { refetchUser } = useAuth();

    useMemo(() => {
        if(currentName !== savedName || currentFirstName !== firstname || currentLastName !== lastname) {
            setHasChanged(true);
        } else {
            setHasChanged(false);
        }
    },[currentName, currentFirstName, currentLastName]);

    const saveChanges = async () => {
        try {
            const values = {
                name : currentName,
                vornname: currentFirstName,
                nachname: currentLastName
            }

            const foundToken = await SecureStore.getItemAsync("authToken");

            await changeUser(values, foundToken);
            await refetchUser();
            setShowModal(false);
            
        } catch(e : any){
            console.log(e);
            return null;
        }
    }

    return (
        <View>
            <TouchableOpacity className="flex flex-row items-center" activeOpacity={0.7} onPress={() => {setShowModal(true)}}>
                <View className="flex flex-col w-10/12">
                    <Text className="text-gray-200 text-lg font-semibold line-clamp-1" numberOfLines={1}>
                        {savedName}
                    </Text>
                    <Text className="text-gray-200/60 text-sm line-clamp-1" numberOfLines={1}>
                        {firstname} {lastname}
                    </Text>
                </View>
                <View className="w-2/12 items-end">
                    <FontAwesome name="edit" size={24} color="white" />
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}

            >
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"} 
                    style={{ flex: 1 }}
                >
                <View className="flex-1 justify-center items-center bg-black/80">
                    <View className="bg-[#151821] w-full rounded-lg overflow-hidden pb-8">
                    <View className="flex flex-row items-center p-4">
                        <Text className="text-xl font-semibold text-gray-200">
                                Namen ändern
                            </Text>
                            <TouchableOpacity className="ml-auto">
                                <FontAwesome name="close" size={24} color="white" onPress={() => { setShowModal(false) }} />
                            </TouchableOpacity>
                        </View>
                        <View className="mt-4 px-4 space-y-4">
                            <View>
                                <Text className="text-lg font-semibold text-gray-200/90">
                                    Nutzername
                                </Text>
                                <TextInput
                                value={currentName}
                                onTextInput={(e) => setCurrentName(e.nativeEvent.text)}
                                placeholder="Nutzername.."
                                className="p-4 bg-[#101219] rounded-md text-gray-200/80 font-medium"
                                />
                            </View>

                            <View>
                                <Text className="text-lg font-semibold text-gray-200/90">
                                    Vorname
                                </Text>
                                <TextInput
                                value={currentFirstName}
                                onTextInput={(e) => setCurrentFirstName(e.nativeEvent.text)}
                                placeholder="Nutzername.."
                                className="p-4 bg-[#101219] rounded-md text-gray-200/80 font-medium"
                                />
                            </View>

                            <View>
                                <Text className="text-lg font-semibold text-gray-200/90">
                                    Nachname
                                </Text>
                                <KeyboardAvoidingView behavior="padding">
                                <TextInput
                                value={currentLastName}
                                onTextInput={(e) => setCurrentLastName(e.nativeEvent.text)}
                                placeholder="Nutzername.."
                                className="p-4 bg-[#101219] rounded-md text-gray-200/80 font-medium"
                                />
                                </KeyboardAvoidingView>
                            </View>

                            <View>
                                <TouchableOpacity className={cn("bg-indigo-800 p-2.5 rounded-md items-center justify-center",
                                !hasChanged && "bg-indigo-800/50"
                                )}
                                disabled={!hasChanged}
                                >
                                    <Text className={cn("text-lg font-semibold text-white", !hasChanged && "text-gray-200/60")}
                                    onPress={saveChanges}
                                    >
                                        Speichern
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}

export default ChangeName;