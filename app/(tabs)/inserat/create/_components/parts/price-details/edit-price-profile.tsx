import { priceprofile } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, TextInput, TouchableOpacity,
     TouchableWithoutFeedback, View, Text, 
     Keyboard} from "react-native";
import * as SecureStore from "expo-secure-store";
import { editPriceProfile } from "@/actions/inserat/priceprofiles/edit-price-profile";
import Toast from "react-native-toast-message";

interface EditPriceProfileProps {
    thisProfile : typeof priceprofile.$inferSelect;
    onEdit : (values : any) => void;
}

const EditPriceProfile = ({ thisProfile, onEdit } : EditPriceProfileProps) => {

    const [showModal, setShowModal] = useState(false);

    const [currentTitle, setCurrentTitle] = useState(thisProfile?.title);
    const [currentPrice, setCurrentPrice] = useState(thisProfile?.price);
    const [currentFreemiles, setCurrentFreemiles] = useState<any>(thisProfile?.freeMiles);
    const [currentExtraprice, setCurrentExtraprice] = useState(thisProfile?.extraCost);
    const [currentDescription, setCurrentDescription] = useState(thisProfile?.description);

    const [isLoading, setIsLoading] = useState(false);

    const isDisabled = !currentTitle || !currentPrice;

    const onSubmit = async () => {
        try {

            const authToken = await SecureStore.getItemAsync('authToken')

            const values = {
                title : currentTitle,
                description : currentDescription,
                price : currentPrice,
                freemiles : currentFreemiles,
                extraCost : currentExtraprice,
                token : authToken,
                profileId : thisProfile?.id,
            }

            await editPriceProfile(values);
            onEdit(values);
            setShowModal(false);
            Toast.show({
                text1: "Preisprofil bearbeitet",
                text2: "Dein Preisprofil wurde erfolgreich bearbeitet.",
                type: "success"
            })

        } catch(e : any) {
            console.log(e);
            return;
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <View>
            <TouchableOpacity onPress={() => {setShowModal(true)}}>
                <FontAwesome name="edit" size={24} color="white" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}

            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-center items-center bg-black/95">
            <View className="bg-[#151821] w-full rounded-lg overflow-hidden pb-4">
                <View className="flex flex-row items-center p-4">
                    <Text className="text-xl font-semibold text-gray-200">
                        Preisprofil bearbeiten
                    </Text>
                    <TouchableOpacity className="ml-auto">
                        <FontAwesome name="close" size={24} color="white" onPress={() => {setShowModal(false)}} />
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
                            Änderungen bearbeiten
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            
        </View>
        </TouchableWithoutFeedback>
            </Modal>
        </View>
     );
}
 
export default EditPriceProfile;