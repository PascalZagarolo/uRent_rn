import { favourite, inserat, userTable } from "@/db/schema";
import { Globe2Icon, LockIcon, SearchIcon, XIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { cn } from "@/~/lib/utils";
import FavouriteRender from "./_favourites/favourites-render";


interface FavouritesTabProps {
    currentUser: typeof userTable.$inferSelect & {
        favourites: Array<typeof favourite.$inferSelect>;
    };
    
}

const FavouritesTab = ({ currentUser }: FavouritesTabProps) => {

    
    
    const [openDelete, setOpenDelete] = useState<string | null>(null);

   
    const [searchedTitle, setSearchedTitle] = useState<string>();
    const [prefilledTitle, setPrefilledTitle] = useState<string>();

    const [favourites, setFavourites] = useState<Array<typeof favourite.$inferSelect>>(currentUser?.favourites || []);

    useEffect(() => {
        const filterFavourites = () => {
            if (!searchedTitle) {
                setFavourites(currentUser?.favourites || []);
                return;
            }
            
            const filtered = favourites.filter(favourite =>
                favourite?.inserat?.title?.toLowerCase().includes(searchedTitle.toLowerCase())
            );
    
            setFavourites(filtered);
        };
    
        filterFavourites();
    }, [searchedTitle]);

    return (
        <View className="p-4">
            <View>
                <View>
                    <Text className="text-xl text-gray-200 font-semibold">
                        Favoriten 
                    </Text>
                    <Text className="text-xs text-gray-200/60 font-semibold">
                        Verwalte deine Favouriten und gespeicherten Inserate.

                    </Text>
                    <Text className="text-xs text-gray-200/60 font-semibold">

                       Optimal für Inserate, die du später nochmal anschauen möchtest.
                    </Text>
                </View>
                <View>
                    <View className="mt-4 flex flex-row items-center">
                        <TextInput
                            className="p-4 rounded-md rounded-r-none bg-[#292f42] w-3/4 text-gray-200"
                            placeholder="Suche nach gespeicherten Inseraten.."
                            value={prefilledTitle}
                            onChangeText={setPrefilledTitle}
                        />
                        <TouchableOpacity className="flex flex-row justify-center w-1/4 bg-[#202430] p-4 rounded-r-md"
                        onPress={() => {
                            setSearchedTitle(prefilledTitle);
                        }}
                        >
                            <SearchIcon size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex flex-row items-center mt-4 justify-between">
                        

                    </View>
                    <View className="pt-8">
                        {searchedTitle && (
                            <TouchableOpacity className="bg-[#252b3b] border border-indigo-800 rounded-2xl w-1/2 p-2.5 flex flex-row items-center shadow-lg"
                                onPress={() => {
                                    setSearchedTitle(undefined)
                                    setPrefilledTitle(undefined)
                                }}
                            >
                                <XIcon size={20} className="mr-2 text-gray-200" />
                                <Text className="text-sm font-semibold text-gray-200 text-center">
                                    Titel: {searchedTitle}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <SafeAreaView className="flex flex-col h-screen space-y-4 mt-8 mb-16">
                       {currentUser?.favourites?.length > 0 ? (
                            favourites.map((favourite) => (
                                <View key={favourite?.id}>
                                    <FavouriteRender 
                                    thisFavourite={favourite as any}
                                    
                                    />
                              </View>
                            ))
                       ) : (
                        <Text className="text-center text-gray-200/60">
                            Noch keine Inserate gespeichert..
                        </Text>
                       )}
                    </SafeAreaView>
                </View>
            </View>
            
        </View>
    );
}

export default FavouritesTab;