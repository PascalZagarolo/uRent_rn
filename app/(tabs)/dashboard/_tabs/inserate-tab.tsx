import { inserat, userTable } from "@/db/schema";

import { useEffect, useState } from "react";
import { Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import InseratRender from "./_inserat/inserat-render";
import { cn } from "@/~/lib/utils";
import DeleteInseratDialog from "../_dialogs/_inserat/delete-inserat-dialog";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

interface InserateTabProps {
    currentUser: typeof userTable.$inferSelect & {
        inserat: Array<typeof inserat.$inferSelect>;
    };
    reloadAll: () => void;
}

const InserateTab = ({ currentUser, reloadAll }: InserateTabProps) => {

    const [renderedInserate, setRenderedInserate] = useState<typeof inserat.$inferSelect[]>();
    const [currentFilter, setCurrentFilter] = useState<string>();
    const [currentTitle, setCurrentTitle] = useState<string>();
    const [prefilledTitle, setPrefilledTitle] = useState<string>();
    const [openDelete, setOpenDelete] = useState<string | null>(null);

    useEffect(() => {
        setRenderedInserate(currentUser?.inserat);
    }, [currentUser])


    useEffect(() => {
        const filterInserate = () => {
            let filteredInserate = currentUser?.inserat;

            if (currentFilter === "public") {
                filteredInserate = filteredInserate?.filter((inserat) => inserat.isPublished);
            } else if (currentFilter === "private") {
                filteredInserate = filteredInserate?.filter((inserat) => !inserat.isPublished);
            }

            if (currentTitle) {
                filteredInserate = filteredInserate?.filter((inserat) =>
                    inserat.title?.toLowerCase().includes(currentTitle.toLowerCase())
                );
            }

            setRenderedInserate(filteredInserate);
        };
        filterInserate();
    }, [currentFilter, currentTitle, currentUser?.inserat]);

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
                            className="p-4  text-sm rounded-md rounded-r-none bg-[#292f42] w-3/4 text-gray-200"
                            placeholder="Suche nach Inseraten.."
                            onChange={(e) => setPrefilledTitle(e.nativeEvent.text)}
                            placeholderTextColor={"#E5E7EB"}
                            value={prefilledTitle}
                            maxLength={100}
                        />
                        <TouchableOpacity className="flex flex-row justify-center w-1/4 bg-[#202430] p-4 rounded-r-md"
                            onPress={() => setCurrentTitle(prefilledTitle)}
                        >
                            <MaterialCommunityIcons name="search-web" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex flex-row items-center mt-4 justify-between">
                        <TouchableOpacity className={cn("w-[45%] bg-indigo-800 rounded-md shadow-lg p-2.5 flex flex-row items-center",
                            currentFilter === "public" && "bg-indigo-800/60"
                        )}
                            onPress={() => {
                                if (currentFilter === "public") {
                                    setCurrentFilter(undefined)
                                } else {
                                    setCurrentFilter("public")
                                }
                            }}
                        >
                            <View className="mr-4">
                            <Octicons name="globe" color={"white"} size={16} className={cn(
                                "mr-2 text-gray-200", currentFilter === "public" && "text-gray-200/60"
                            )} />
                            </View>
                            <Text className={cn
                                (
                                    "text-base text-center font-semibold text-gray-200",
                                    currentFilter === "public" && "text-gray-200/60"
                                )}>
                                Öffentlich
                            </Text>
                            <Text className={cn("ml-auto mr-2 text-base font-medium text-gray-200", currentFilter === "public" && "text-gray-200/60")}>
                                {currentUser?.inserat?.filter((inserat: any) => inserat.isPublic).length}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity className={cn(
                            "w-[45%] bg-[#292f42] rounded-md shadow-lg p-2.5 flex flex-row items-center",
                            currentFilter === "private" && "bg-[#252a36]"
                        )}
                            onPress={() => {
                                if (currentFilter === "private") {
                                    setCurrentFilter(undefined)
                                } else {
                                    setCurrentFilter("private")
                                }
                            }}
                        >
                            <View className="mr-4">
                            <MaterialCommunityIcons name="lock" size={16} color={"white"} className={cn(
                                "mr-2 text-gray-200", currentFilter === "private" && "text-gray-200/60"
                            )} />
                            </View>
                            <Text className={cn("text-base text-gray-200 text-center font-semibold",
                                currentFilter === "private" && "text-gray-200/60"
                            )}>
                                Privat
                            </Text>
                            <Text className={cn("ml-auto mr-2 text-base  font-medium text-gray-200",
                                currentFilter === "private" && "text-gray-200/60"
                            )}>
                                {currentUser?.inserat?.filter((inserat: any) => !inserat.isPublic).length}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="pt-4  w-full flex-wrap flex-row">
    {currentFilter && (
        <TouchableOpacity
            className="bg-[#252b3b] border border-indigo-800 rounded-2xl p-2.5 flex flex-row items-center shadow-lg mr-2 mb-2 mt-2"
            onPress={() => setCurrentFilter(undefined)}
        >
            <MaterialCommunityIcons name="close" size={20} className="mr-2 text-gray-200" />
            <Text className="text-sm font-semibold text-gray-200 text-center">
                Sichtbarkeit: {currentFilter === "public" ? "Öffentlich" : "Privat"}
            </Text>
        </TouchableOpacity>
    )}

    {currentTitle && (
        <TouchableOpacity
            className="bg-[#252b3b] border border-indigo-800 rounded-2xl p-2.5 flex flex-row items-center shadow-lg mr-2 mb-2 max-w-[80%] mt-2"
            onPress={() => {
                setCurrentTitle(undefined);
                setPrefilledTitle(undefined);
            }}
        >
            <MaterialCommunityIcons name="close" size={20} className="mr-2 text-gray-200" />
            <Text
                className="text-sm font-semibold text-gray-200 text-center break-all"
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                Titel: {currentTitle}
            </Text>
        </TouchableOpacity>
    )}
</View>


                    <SafeAreaView className="flex flex-col h-full space-y-4 mt-8 mb-16">
                        {renderedInserate?.map((inserat) => (
                            <View className="" key={inserat?.id}>
                                <InseratRender thisInserat={inserat} setOpenDeleteDialog={(value) => setOpenDelete(value)} />
                            </View>
                        ))}
                    </SafeAreaView>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={String(openDelete ?? "") != ""}
                onRequestClose={() => {
                    setOpenDelete("");
                }}

            >
                <DeleteInseratDialog
                    onClose={() => setOpenDelete(undefined)}
                    inseratId={openDelete}
                    onReload={reloadAll}
                />

            </Modal>
        </View>
    );
}

export default InserateTab;