import { inserat, userTable } from "@/db/schema";
import { Globe2Icon, LockIcon, SearchIcon, XIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import InseratRender from "./_inserat/inserat-render";
import { cn } from "@/~/lib/utils";

interface InserateTabProps {
    currentUser: typeof userTable.$inferSelect;
}

const InserateTab = ({ currentUser }: InserateTabProps) => {

    const [renderedInserate, setRenderedInserate] = useState<typeof inserat.$inferSelect[]>();
    const [currentFilter, setCurrentFilter] = useState<string>();

    useEffect(() => {
        setRenderedInserate(currentUser?.inserat);
    },[currentUser])


    useEffect(() => {
        const filterInserate = () => {
            if(currentFilter === "public") {
                setRenderedInserate(currentUser?.inserat?.filter((inserat) => inserat.isPublic));
            } else if(currentFilter === "private") {
                setRenderedInserate(currentUser?.inserat?.filter((inserat) => !inserat.isPublic));
            } else {
                setRenderedInserate(currentUser?.inserat);
            }
        }

        filterInserate();
    },[currentFilter])

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
                        <TouchableOpacity className={cn("w-[45%] bg-indigo-800 rounded-md shadow-lg p-2.5 flex flex-row items-center",
                            currentFilter === "public" && "bg-indigo-800/60"
                        )}
                        onPress={() => {
                            if(currentFilter === "public") {
                                setCurrentFilter(undefined)
                            } else {
                                setCurrentFilter("public")
                            }
                        }}
                        >
                            <Globe2Icon size={20}  className={cn(
                                "mr-2 text-gray-200", currentFilter === "public" && "text-gray-200/60"
                            )} />
                            <Text className={cn
                            (
                                "text-base text-center font-semibold text-gray-200",
                                currentFilter === "public" && "text-gray-200/60"
                            )}>
                                Öffentlich 
                            </Text>
                            <Text className={cn("ml-auto mr-2 text-base font-medium text-gray-200", currentFilter === "public" && "text-gray-200/60")}>
                            {currentUser?.inserat?.filter((inserat) => inserat.isPublic).length}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity className={cn(
                            "w-[45%] bg-[#292f42] rounded-md shadow-lg p-2.5 flex flex-row items-center",
                            currentFilter === "private" && "bg-[#252a36]"
                        )}
                        onPress={() => {
                            if(currentFilter === "private") {
                                setCurrentFilter(undefined)
                            } else {
                                setCurrentFilter("private")
                            }
                        }}
                        >
                            <LockIcon size={20}  className={cn(
                                "mr-2 text-gray-200", currentFilter === "private" && "text-gray-200/60"
                            )} />
                            <Text className={cn("text-base text-gray-200 text-center font-semibold",
                            currentFilter === "private" && "text-gray-200/60"
                            )}>
                                Privat 
                            </Text>
                            <Text className={cn("ml-auto mr-2 text-base  font-medium text-gray-200",
                            currentFilter === "private" && "text-gray-200/60"
                            )}>
                            {currentUser?.inserat?.filter((inserat) => !inserat.isPublic).length}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="pt-8">
                        {currentFilter && (
                            <TouchableOpacity className="bg-[#252b3b] border border-indigo-800 rounded-2xl w-1/2 p-2.5 flex flex-row items-center shadow-lg"
                            onPress={() => {
                                setCurrentFilter(undefined)
                            }}
                            >
                                <XIcon size={20} className="mr-2 text-gray-200" />
                                <Text className="text-sm font-semibold text-gray-200 text-center">
                                    {currentFilter === "public" ? "Öffentlich" : "Privat"}
                                </Text>
                            </TouchableOpacity>
                        )}
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