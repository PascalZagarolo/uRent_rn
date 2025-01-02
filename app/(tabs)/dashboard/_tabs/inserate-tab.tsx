import { inserat, userTable } from "@/db/schema";
import { Globe2Icon, LockIcon, SearchIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import InseratRender from "./_inserat/inserat-render";

interface InserateTabProps {
    currentUser: typeof userTable.$inferSelect;
}

const InserateTab = ({ currentUser }: InserateTabProps) => {

    const [renderedInserate, setRenderedInserate] = useState<typeof inserat.$inferSelect[]>();

    useEffect(() => {
        setRenderedInserate(currentUser?.inserat);
    },[currentUser])

    return (
        <View className="p-4">
            <View>
                <View>
                    <Text className="text-xl text-gray-200 font-semibold">
                        Meine Inserate ({currentUser?.inserat?.length})                   
                    </Text>
                    <Text className="text-xs text-gray-200/60 font-semibold">
                        Verwalte deine Anzeigen, indem du Inhalte änderst, löscht, bearbeitest oder ihre Sichtbarkeit anpasst.
                        
                    </Text>
                    <Text className="text-xs text-gray-200/60 font-semibold">
                        
                        Darüber hinaus kannst du hier ganz einfach die Verfügbarkeit deiner Fahrzeuge aktualisieren.
                    </Text>
                </View>
                <View>
                    <View className="mt-4 flex flex-row items-center">
                        <TextInput 
                        className="p-4   rounded-md rounded-r-none bg-[#292f42] w-3/4 text-gray-200"
                        placeholder="Suche nach Inseraten.."
                        />
                        <TouchableOpacity className="flex flex-row justify-center w-1/4 bg-[#202430] p-4 rounded-r-md">
                            <SearchIcon size={20} color="white"  />
                        </TouchableOpacity>
                    </View>
                    <View className="flex flex-row items-center mt-4 justify-between">
                        <TouchableOpacity className="w-[45%] bg-indigo-800 rounded-md shadow-lg p-2.5 flex flex-row items-center">
                            <Globe2Icon size={20} color="white" className="mr-2 " />
                            <Text className="text-base text-center font-semibold text-gray-200">
                                Öffentlich 
                            </Text>
                            <Text className="ml-auto mr-2 text-base font-medium text-gray-200">
                            {currentUser?.inserat?.filter((inserat) => !inserat.isPublic).length}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="w-[45%] bg-[#292f42] rounded-md shadow-lg p-2.5 flex flex-row items-center">
                            <LockIcon size={20} color="white" className="mr-2 " />
                            <Text className="text-base text-gray-200 text-center font-semibold">
                                Privat 
                            </Text>
                            <Text className="ml-auto mr-2 text-base  font-medium text-gray-200">
                            {currentUser?.inserat?.filter((inserat) => !inserat.isPublic).length}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <SafeAreaView className="flex flex-col h-screen space-y-4 mt-8 mb-16">
                        {renderedInserate?.map((inserat) => (
                            <View className="" key={inserat?.id}>
                                <InseratRender thisInserat={inserat} />
                            </View>
                        ))}
                    </SafeAreaView>
                </View>
            </View>
        </View>
    );
}

export default InserateTab;