import { CirclePlusIcon, XIcon } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import LocationDialogUpload from "./location-dialog-upload";

interface LocationDialogProps {
    onClose : () => void;
}

const LocationDialog = ({ onClose } : LocationDialogProps) => {

    const [title, setTitle] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [plz, setPLZ] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const onCreate = () => {
        try {

        } catch(e : any) {
            console.log(e);
        }
    }


    return (
        <View className="flex-1 justify-center items-center bg-black/80 p-4">
            <View className="bg-[#151821] w-full rounded-lg">
                
                <View className="flex flex-row items-center p-4">
                    <Text className="text-lg font-semibold text-gray-200">
                        Standort hinzufügen
                    </Text>
                    <TouchableOpacity className="ml-auto" onPress={onClose}>
                    <XIcon  />
                    </TouchableOpacity>
                </View>
                <View className="px-4">
              
                <LocationDialogUpload />
               
                    <Text className="text-base font-semibold text-gray-200 mt-4">
                        Titel
                    </Text>
                    <TextInput
                        placeholder="z.B. Autohaus Mömer"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg" />

                </View>
                <View className="p-4">
                    <Text className="text-base font-semibold text-gray-200">
                        Straße
                    </Text>
                    <TextInput
                        placeholder="Musterstraße 13"
                        value={street}
                        onChangeText={(text) => setStreet(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg" />

                </View>
                <View className="px-4 flex flex-row items-center space-x-4">
                    <View className="w-[48%]">
                        <Text className="text-base font-semibold text-gray-200">Stadt</Text>
                        <TextInput
                            placeholder="Musterstadt"
                            value={street}
                            onChangeText={(text) => setStreet(text)}
                            className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg"
                        />
                    </View>
                    <View className="w-[48%]">
                        <Text className="text-base font-semibold text-gray-200">Postleitzahl</Text>
                        <TextInput
                            placeholder="10100"
                            value={street}
                            onChangeText={(text) => setStreet(text)}
                            className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg"
                        />
                    </View>
                </View>
                <View className="py-4 px-4">
                    <TouchableOpacity className="px-4 flex flex-row justify-center items-center p-2.5 bg-indigo-800 rounded-md">
                    <CirclePlusIcon className="w-4 h-4 mr-2 text-gray-200" />
                        <Text className="text-sm font-semibold text-gray-200    rounded-lg text-center">
                            Standort hinzufügen
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

export default LocationDialog;