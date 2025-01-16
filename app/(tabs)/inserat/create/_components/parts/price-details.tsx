import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
    Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Keyboard, TouchableWithoutFeedback,
    Modal
} from "react-native";
import CreatePriceProfile from "./price-details/create-price-detail";
import DeletePriceDetails from "./price-details/delete-price-details";
import EditPriceProfile from "./price-details/edit-price-profile";
import { editInseratBasic } from "@/actions/inserat/edit/edit-inserat-basic";
import * as SecureStorage from 'expo-secure-store';
import { updatePriceProfiles } from "@/actions/inserat/priceprofiles/update-price-profiles";



interface PriceDetailsProps {
    thisInserat: typeof inserat.$inferSelect | any;
    refetchInserat : () => void;
}

const PriceDetails = forwardRef(({ thisInserat, refetchInserat }: PriceDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: async () => {
            try {
                if(isLoading) return;
                setIsLoading(true);
                const authToken = await SecureStorage.getItemAsync("authToken");
                if(currentPrice !== thisInserat.price) {
                    const values = {
                        inseratId : thisInserat.id,
                        token : authToken,
                        price : currentPrice
                    }
                    await editInseratBasic(values);
                    await refetchInserat()
                }

                const { hasAdded, hasDeleted } = priceProfileChanged();

                if(hasAdded || hasDeleted) {
                    console.log("Price Profile has changed");
                    console.log(currentPriceProfiles);
                    const values = {
                        inseratId : thisInserat.id,
                        token : authToken,
                        priceProfiles : currentPriceProfiles
                    }

                    await updatePriceProfiles(values);
                    await refetchInserat();
                }

            } catch(e : any) {  
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }));



    const priceProfileChanged = (): { hasAdded: boolean, hasDeleted: boolean } => {
        let hasAdded = false;
        let hasDeleted = false;
    
        // Check if any profile in `thisInserat?.priceprofiles` is not in `currentPriceProfiles`
        if (thisInserat?.priceprofiles?.some((p) => !currentPriceProfiles?.some((current) => current.id === p.id))) {
            hasDeleted = true;
        }
    
        // Check if any profile in `currentPriceProfiles` is not in `thisInserat?.priceprofiles`
        if (currentPriceProfiles?.some((current) => !thisInserat?.priceprofiles?.some((p) => p.id === current.id))) {
            hasAdded = true;
        }
    
        return { hasAdded, hasDeleted };
    };
    

    const [currentPrice, setCurrentPrice] = useState(thisInserat.price);
    const [currentDescription, setCurrentDescription] = useState(thisInserat.description);
    const [currentCategory, setCurrentCategory] = useState(thisInserat.description);
    const [isLoading, setIsLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [currentPriceProfiles, setCurrentPriceProfiles] = useState(thisInserat.priceprofiles);

console.log(thisInserat.priceprofiles)

    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">
                <View className="w-full">
                    <Text className="text-lg font-semibold text-gray-200">
                        Preis (pro Tag)
                    </Text>
                    <TextInput
                        placeholder="Preis in EUR"
                        inputMode="numeric"
                        value={currentPrice}
                        onChangeText={(text) => setCurrentPrice(text)}
                        className="w-full bg-[#1f2330] text-gray-200 p-4 rounded-lg" />

                </View>

                <View className="w-full mt-8 ">
                    <Text className="text-lg font-semibold text-gray-200">
                        Meine Preisprofile
                    </Text>

                    <TouchableOpacity className="bg-indigo-800 w-full p-4 flex-row justify-center items-center rounded-md"
                        onPress={() => { setShowModal(true) }}
                    >
                        <View className="mr-4">
                            <FontAwesome5 name="plus" size={20} color="#fff" />
                        </View>
                        <Text className="text-gray-200 text-base font-medium text-center">
                            Preisprofil hinzufügen
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="w-full mt-4 h-full">
                    <Text className="text-lg text-gray-200 font-semibold">
                        Preisprofile verwalten ({currentPriceProfiles?.length})
                    </Text>
                    <View className="">
                        {currentPriceProfiles.length > 0 ? (
                            currentPriceProfiles.map((profile) => (
                                <View className="flex flex-row items-center w-full bg-[#1a1e29] p-4" key={profile.id}>
                                    <View className="flex-col w-3/4">
                                        <Text className="text-gray-200 text-base font-semibold">
                                            {profile?.title}
                                        </Text>
                                        <Text className="mt-2 text-gray-200/90 text-base font-medium">
                                            {profile?.price}€
                                        </Text>
                                        {profile?.freeMiles && (
                                            <Text className="mt-2 text-gray-200/90 text-base font-medium">
                                                {profile?.freeMiles} Freikilometer
                                            </Text>
                                        )}
                                    </View>
                                    <View className="w-1/4 flex flex-row items-center justify-evenly">
                                        <View>
                                            <EditPriceProfile 
                                            thisProfile={profile}
                                            onEdit={(profile) => {
                                                setCurrentPriceProfiles(currentPriceProfiles.map((p) => {
                                                    if(p.id === profile.id) {
                                                        return profile;
                                                    }
                                                    return p;
                                                }))
                                            }}
                                            />
                                        </View>
                                        <View>
                                        <DeletePriceDetails
                                        thisProfile={profile} 
                                        onDelete={(profile) => {
                                            setCurrentPriceProfiles(currentPriceProfiles.filter((p) => p.id !== profile.id));
                                        }}
                                        />
                                    </View>
                                    </View>
                                </View>
                            ))
                        ): (
                                <Text className = "text-center text-sm text-gray-200/40">
                            Noch keine Preisprofile hinzugefügt..
                    </Text>
                        )}
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}

            >
                <CreatePriceProfile 
                onClose={() => setShowModal(false)} 
                inseratId={thisInserat.id} 
                addPriceProfile={(profile) => {
                    
                    setCurrentPriceProfiles([...currentPriceProfiles, profile]);
                }}
                />
            </Modal>


        </View>
        </TouchableWithoutFeedback >
    );
});

export default PriceDetails;