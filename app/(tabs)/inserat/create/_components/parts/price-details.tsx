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



interface PriceDetailsProps {
    thisInserat: typeof inserat.$inferSelect | any;
    refetchInserat : () => void;
}

const PriceDetails = forwardRef(({ thisInserat, refetchInserat }: PriceDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
            console.log("Saving:", currentTitle, currentDescription);
        }
    }));

    const [currentTitle, setCurrentTitle] = useState(thisInserat.price);
    const [currentDescription, setCurrentDescription] = useState(thisInserat.description);
    const [currentCategory, setCurrentCategory] = useState(thisInserat.description);

    const [showModal, setShowModal] = useState(false);

    const [currentPriceProfiles, setCurrentPriceProfiles] = useState(thisInserat.priceprofiles);



    return (
        <TouchableWithoutFeedback className="h-full" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4 h-full">
                <View className="w-full">
                    <Text className="text-lg font-semibold text-gray-200">
                        Preis (pro Tag)
                    </Text>
                    <TextInput
                        placeholder="Titel deines Inserats..."
                        value={currentTitle}
                        onChangeText={(text) => setCurrentTitle(text)}
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
                        <Text className="text-gray-200/60 text-base font-medium text-center">
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
                    console.log(profile + 2)
                    setCurrentPriceProfiles([...currentPriceProfiles, profile]);
                }}
                />
            </Modal>


        </View>
        </TouchableWithoutFeedback >
    );
});

export default PriceDetails;