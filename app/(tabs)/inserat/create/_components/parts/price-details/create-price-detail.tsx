import { FontAwesome } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import { useState } from "react";
import { set } from 'date-fns';
import { Keyboard } from "react-native";
import { cn } from "@/~/lib/utils";
import * as SecureStore from 'expo-secure-store';
import { addPriceProfile } from "@/actions/inserat/priceprofiles/add-price-profile";
import Toast from "react-native-toast-message";

interface CreatePriceProfileProps {
    onClose: () => void;
    addPriceProfile: (values: any) => void;
    inseratId : string;
}

const CreatePriceProfile = ({ onClose, inseratId, addPriceProfile }: CreatePriceProfileProps) => {
    const [currentTitle, setCurrentTitle] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentFreemiles, setCurrentFreemiles] = useState(null);
    const [currentExtraprice, setCurrentExtraprice] = useState(null);
    const [currentDescription, setCurrentDescription] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        try {

            const authToken = await SecureStore.getItemAsync('authToken');

            if(!authToken) {
                return null;
            }

            const values = {
                title : currentTitle,
                description : currentDescription,
                price : currentPrice,
                freeMiles : currentFreemiles,
                extraCost : currentExtraprice,
                token : authToken,
                inseratId : inseratId,
            }

            const added = await addPriceProfile(values);
            await addPriceProfile(values);
            onClose();
            Toast.show({
                text1: "Preisprofil hinzugefügt",
                text2: "Dein Preisprofil wurde erfolgreich hinzugefügt.",
                type: "success"
            })

        } catch(e : any) {
            console.log(e);
            return;
        } finally {
            setIsLoading(false);
        }
    }

    const isDisabled = !currentTitle || !currentPrice;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-center items-center bg-black/95">
            <View className="bg-[#151821] w-full rounded-lg overflow-hidden pb-4">
                <View className="flex flex-row items-center p-4">
                    <Text className="text-xl font-semibold text-gray-200">
                        Preisprofil hinzufügen
                    </Text>
                    <TouchableOpacity className="ml-auto">
                        <FontAwesome name="close" size={24} color="white" onPress={onClose} />
                    </TouchableOpacity>
                </View>
                <View className="flex flex-col space-y-4 px-4">
                <View className="w-full">
                    <Text className="text-base font-semibold text-gray-200">
                        Zeitraum*
                    </Text>
                    <TextInput
                        placeholder="z.B. pro Stunde, pro Tag, pro Woche..."
                        value={currentTitle}
                        onChangeText={(text) => setCurrentTitle(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg mt-2" />

                </View>

                <View className="w-full">
                    <Text className="text-base font-semibold text-gray-200">
                        Preis*
                    </Text>
                    <TextInput
                        placeholder="Preis pro Zeitraum.."
                        keyboardType="numeric"
                        value={currentPrice}
                        onChangeText={(text) => setCurrentPrice(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg mt-2" />
                    
                </View>

                <View className="w-full">
                    <Text className="text-base font-semibold text-gray-200">
                        Freikilometer
                    </Text>
                    <TextInput
                        placeholder="z.B. 100km"
                        value={currentFreemiles}
                        onChangeText={(text) => setCurrentFreemiles(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg mt-2" />

                </View>

                <View className="w-full">
                    <Text className="text-base font-semibold text-gray-200">
                        Preis pro zusätzlicher Kilometer
                    </Text>
                    <TextInput
                        placeholder="z.B. 0.50€ / km"
                        value={currentExtraprice}
                        onChangeText={(text) => setCurrentExtraprice(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg mt-2" />

                </View>

                <View className="w-full">
                    <Text className="text-base font-semibold text-gray-200">
                        Weitere Informationen
                    </Text>
                    <TextInput
                        placeholder="Erwähne falls nötig noch weitere Informationen.."
                        value={currentDescription}
                        onChangeText={(text) => setCurrentDescription(text)}
                        multiline={true}
                        numberOfLines={8}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg h-[120px]"
                        textAlignVertical="top"
                    />
<Text className="text-xs text-gray-200/60 text-right">
                        Pflichtfelder sind mit einem * gekennzeichnet.
                    </Text>
                </View>
               
                    
                
                <View className="mt-4">
                    <TouchableOpacity className="rounded-md" onPress={onSubmit} disabled={isDisabled}>
                        <Text className={cn("text-center text-base font-semibold text-gray-200 bg-indigo-800 p-4", 
                        isDisabled && "text-gray-200/60 bg-indigo-800/20")}>
                            Preisprofil hinzufügen
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            
        </View>
        </TouchableWithoutFeedback>
    );
}

export default CreatePriceProfile;