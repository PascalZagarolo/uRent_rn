import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View, TouchableOpacity, Modal, TextInput } from "react-native";



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

    const [showModal, setShowModal] = useState(false);

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
                                placeholder="Nutzername.."
                                className="p-4 bg-[#101219] rounded-md text-gray-200/80 font-medium"
                                />
                            </View>

                            <View>
                                <Text className="text-lg font-semibold text-gray-200/90">
                                    Nachname
                                </Text>
                                <TextInput
                                value={currentLastName}
                                placeholder="Nutzername.."
                                className="p-4 bg-[#101219] rounded-md text-gray-200/80 font-medium"
                                />
                            </View>

                            <View>
                                <TouchableOpacity className="bg-indigo-800 p-2.5 rounded-md items-center justify-center">
                                    <Text className="text-lg font-semibold text-white">
                                        Speichern
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>

            </Modal>
        </View>
    );
}

export default ChangeName;