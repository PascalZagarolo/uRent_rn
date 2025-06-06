import { favourite, inserat, userTable } from "@/db/schema";

import { useEffect, useState } from "react";
import { Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";


import FavouriteRender from "./_favourites/favourites-render";
import Toast from "react-native-toast-message";
import { deleteFavourite } from "@/actions/favourites/delete-favourite";
import * as SecureStorage from 'expo-secure-store';
import { MaterialCommunityIcons } from "@expo/vector-icons";



interface FavouritesTabProps {
    currentUser: typeof userTable.$inferSelect & {
        favourites: Array<typeof favourite.$inferSelect>;
    };
    onReloadAll: () => void;
    
}

const FavouritesTab = ({ currentUser, onReloadAll }: FavouritesTabProps) => {

    
    
    const [isLoading, setIsLoading] = useState(false);

   
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
    }, [searchedTitle, currentUser]);


    const onUnFavorite = async (inseratId : string) => {
        try{

            if(isLoading) return;
            setIsLoading(true);

            const authToken = await SecureStorage.getItemAsync("authToken");

            await deleteFavourite(authToken, inseratId);
            Toast.show({
                type: "success",
                text1: "Erfolgreich",
                text2: "Inserat wurde erfolgreich aus deinen Favoriten entfernt."
            })
            onReloadAll();

        } catch(e : any) {
            console.log(e);
            Toast.show({
                type: "error",
                text1: "Fehler",
                text2: "Es ist ein Fehler aufgetreten.."
            })
        } finally {
            setIsLoading(false);
        }
    }

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
                            placeholderTextColor={"#E5E7EB"}
                        />
                        <TouchableOpacity className="flex flex-row justify-center w-1/4 bg-[#202430] p-4 rounded-r-md"
                        onPress={() => {
                            setSearchedTitle(prefilledTitle);
                        }}
                        >
                            <MaterialCommunityIcons name="search-web" size={20} color="white" />
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
                                <MaterialCommunityIcons name="close" size={20} className="mr-2 text-gray-200" />
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
                                    onDeFav={(inseratId) => onUnFavorite(inseratId)}
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