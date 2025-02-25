import { createInitialInserat } from "@/actions/inserat/create-initial-inserat";
import { cn } from "@/~/lib/utils";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store"
interface CreateInseratPreviewProps {
    closeModal: () => void;
}

const CreateInseratPreview: React.FC<CreateInseratPreviewProps> = ({
    closeModal
}) => {


    const [currentTitle, setCurrentTitle] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [isDisabled, setIsDisabled] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if (currentCategory.trim() !== "" && currentTitle.trim() !== "" && !isLoading) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [currentCategory, currentTitle, isLoading])

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            const foundToken = await SecureStore.getItemAsync("authToken");

            const values = {
                category: currentCategory,
                title: currentTitle,
                token : foundToken
            }

            const res = await createInitialInserat(values);

            

            
            closeModal();
            router.push(`/inserat/create/${res.inseratId}`)


        } catch (e: any) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View className="flex-1 justify-center items-center bg-black/80">
            <View className="bg-[#151821] w-full rounded-lg overflow-hiddens">
                <View className="flex flex-row items-center p-4">
                    <Text className="text-xl font-semibold text-gray-200">
                        Inserat erstellen
                    </Text>
                    <TouchableOpacity className="ml-auto">
                        <FontAwesome name="close" size={24} color="white" onPress={closeModal} />
                    </TouchableOpacity>
                </View>
                <View className="p-4">
                    <Text className="text-base font-semibold text-gray-200">
                        Titel
                    </Text>
                    <TextInput
                        placeholder="Titel deines Inserats..."
                        value={currentTitle}
                        onChangeText={(text) => setCurrentTitle(text)}
                        className="w-full bg-[#1a1e29] text-gray-200 p-4 rounded-lg" />

                </View>
                <View className="p-4">
                    <Text className="text-base font-semibold text-gray-200">
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

                        <View className=" ml-auto w-full">
                            <TouchableOpacity className={cn("bg-indigo-800 p-4 rounded-md ml-auto w-2/3",
                                isDisabled && "bg-indigo-800/50"
                            )}
                                onPress={onSubmit}
                                disabled={isDisabled}
                            >
                                <Text className={cn("text-gray-200 text-base font-semibold text-center",
                                    isDisabled && "text-gray-200/50"
                                )}>
                                    Inserat erstellen
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default CreateInseratPreview;