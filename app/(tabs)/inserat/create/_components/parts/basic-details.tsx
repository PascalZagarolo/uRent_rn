import { inserat } from "@/db/schema";
import { cn } from "@/~/lib/utils";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, 
    Keyboard, TouchableWithoutFeedback } from "react-native";



interface BasicDetailsProps {
    thisInserat: typeof inserat.$inferSelect;
   
}

const BasicDetails = forwardRef(({ thisInserat }: BasicDetailsProps, ref) => {

    useImperativeHandle(ref, () => ({
        onSave: () => {
            console.log("Child onSave called");
            console.log("Saving:", currentTitle, currentDescription);
        }
    }));

    const [currentTitle, setCurrentTitle] = useState(thisInserat.title);
    const [currentDescription, setCurrentDescription] = useState(thisInserat.description);
    const [currentCategory, setCurrentCategory] = useState(thisInserat.description);
   

    

    return (
        <TouchableWithoutFeedback className="" onPress={Keyboard.dismiss}>
            <View className="flex flex-col items-center w-full mt-4">
                <View className="w-full">
                    <Text className="text-lg font-semibold text-gray-200">
                        Titel
                    </Text>
                    <TextInput
                        placeholder="Titel deines Inserats..."
                        value={currentTitle}
                        onChangeText={(text) => setCurrentTitle(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg" />

                </View>

                <View className="w-full mt-4">
                    <Text className="text-lg font-semibold text-gray-200">
                        Beschreibung
                    </Text>
                    <KeyboardAvoidingView >
                    <TextInput
                        placeholder="Beschreibe dein Fahrzeug... Farbe, Zustand, etc."
                        value={currentDescription}
                        onChangeText={(text) => setCurrentDescription(text)}
                        multiline={true}
                        numberOfLines={8}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg h-[200px]"
                        textAlignVertical="top"
                    />
                    </KeyboardAvoidingView>

                </View>

               {/*
                <View className="mt-4 w-full">
                    <Text className="text-lg font-semibold text-gray-200">
                        Fahrzeugkategorie
                    </Text>
                    <View className="flex flex-col items-center space-y-4 ">
                        <View className="flex flex-row items-center w-full justify-evenly">
                            <TouchableOpacity className={cn("bg-[#1a1e29] w-5/12 p-4 flex-col justify-center items-center rounded-md",
                                currentCategory === "PKW" && "border border-indigo-800"
                            )}
                                onPress={() => {
                                    currentCategory === "PKW" ? setCurrentCategory("") : setCurrentCategory("PKW")
                                }}>
                                <View className="flex justify-center">
                                    <Ionicons name="car-outline" size={32} color="#fff" />
                                </View>
                                <Text className={cn("text-gray-200/40 text-base font-medium text-center",
                                    currentCategory === "PKW" && "text-gray-200/90 font-semibold")}>
                                    PKW
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity className={cn("bg-[#1a1e29] w-5/12 p-4 flex-col justify-center items-center rounded-md",
                                currentCategory === "LKW" && "border border-indigo-800"
                            )}
                                onPress={() => {
                                    currentCategory === "LKW" ? setCurrentCategory("") : setCurrentCategory("LKW")
                                }}>
                                <View className="flex justify-center">
                                    <MaterialCommunityIcons name="truck" size={32} color="#fff" />
                                </View>
                                <Text className={cn("text-gray-200/40 text-base font-medium text-center",
                                    currentCategory === "LKW" && "text-gray-200/90 font-semibold")}>
                                    LKW
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View className="flex flex-row items-center w-full justify-evenly">
                            <TouchableOpacity className={cn("bg-[#1a1e29] w-5/12 p-4 flex-col justify-center items-center rounded-md",
                                currentCategory === "TRAILER" && "border border-indigo-800"
                            )}
                                onPress={() => {
                                    currentCategory === "TRAILER" ? setCurrentCategory("") : setCurrentCategory("TRAILER")
                                }}>
                                <View className="flex justify-center">
                                    <MaterialCommunityIcons name="truck-trailer" size={32} color="#fff" />
                                </View>
                                <Text className={cn("text-gray-200/40 text-base font-medium text-center",
                                    currentCategory === "TRAILER" && "text-gray-200/90 font-semibold")}>
                                    Anhänger
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity className={cn("bg-[#1a1e29] w-5/12 p-4 flex-col justify-center items-center rounded-md",
                                currentCategory === "TRANSPORT" && "border border-indigo-800"
                            )}
                                onPress={() => {
                                    currentCategory === "TRANSPORT" ? setCurrentCategory("") : setCurrentCategory("TRANSPORT")
                                }}>
                                <View className="flex justify-center">
                                    <MaterialCommunityIcons name="van-utility" size={32} color="#fff" />
                                </View>
                                <Text className={cn("text-gray-200/40 text-base font-medium text-center",
                                    currentCategory === "TRANSPORT" && "text-gray-200/90 font-semibold")}>
                                    Transporter
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                        

                    </View>
                    
                </View>
               */}
                
            </View>
        </TouchableWithoutFeedback>
    );
});

export default BasicDetails;