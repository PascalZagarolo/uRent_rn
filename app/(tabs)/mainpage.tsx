import { getInserate } from "@/actions/getInserate";
import Footer from "@/components/_searchpage/footer";
import Header from "@/components/_searchpage/header";
import InseratCard from "@/components/_searchpage/inserat-card";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { getCurrentUser } from "@/actions/getCurrentUser";
import { useAuth } from "./AuthProvider";
import FilterBubbles from "@/components/_searchpage/_components/filter-bubbles";
import { Drawer } from 'react-native-drawer-layout';
import DrawerContentProfile from "@/components/_drawercontent/drawer-content-profile";
import DrawerSearchFilter from "@/components/_drawercontent/drawer-search-filter";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import SearchBar from "@/components/_searchpage/search-bar";
import { useDrawerSettings } from "@/store";
import DrawerNotifications from "@/components/_drawercontent/drawer-notifications";
import { getCurrentUserMainPage } from "@/actions/retrieveUser/main-page/getUserMainPage";
import { useRouter } from "expo-router";
import { addFavourite } from "@/actions/favourites/add-favourite";
import Toast from "react-native-toast-message";
import { deleteFavourite } from "@/actions/favourites/delete-favourite";




const MainPage = () => {

    const [inserate, setInserate] = useState([]);

    const params = getSearchParamsFunction();

    const { addDrawer, deleteDrawer, openDrawers } = useDrawerSettings();


    useEffect(() => {
        console.log("MAINPAGEPAGEPAGEPAGE")
        const load = async () => {

            try {
                const res = await getInserate({
                    title: params?.["title"] as string,
                    thisCategory: params?.["category"] as any,
                    filter: params?.["filter"] as any,
                    start: Number(params?.["start"]),
                    end: Number(params?.["end"]),
                    page: Number(params?.["page"]),

                    periodBegin: params?.["periodBegin"] as any,
                    periodEnd: params?.["periodEnd"] as any,
                    startTime: params?.["startTime"] as any,
                    endTime: params?.["endTime"] as any,
                    startDateDynamic: params?.["startDateDynamic"] as any,
                    endDateDynamic: params?.["endDateDynamic"] as any,
                    reqTime: params?.["reqTime"] as any,

                    location: params?.["location"] as any,
                    amount: Number(params?.["amount"]),

                    reqAge: Number(params?.["reqAge"]),
                    reqLicense: params?.["reqLicense"],

                    thisBrand: params?.["thisBrand"] as any,
                    doors: Number(params?.["doors"]),
                    doorsMax: Number(params?.["doorsMax"]),
                    initial: new Date(params?.["initial"] as any),
                    initialMax: new Date(params?.["initialMax"] as any),
                    power: Number(params?.["power"]),
                    powerMax: Number(params?.["powerMax"]),
                    seats: Number(params?.["seats"]) || null,
                    seatsMax: Number(params?.["seatsMax"]) || null,
                    fuel: params?.["fuel"] as any,
                    transmission: params?.["transmission"] as any,
                    thisType: params?.["thisType"],
                    freeMiles: Number(params?.["freeMiles"]),
                    extraCost: Number(params?.["extraCost"]),

                    weightClass: Number(params?.["weightClass"]),
                    weightClassMax: Number(params?.["weightClassMax"]),
                    drive: params?.["drive"] as any,
                    loading: params?.["loading"] as any,
                    application: params?.["application"] as any,
                    lkwBrand: params?.["lkwBrand"] as any,

                    transportBrand: params?.["transportBrand"] as any,

                    trailerType: params?.["trailerType"],
                    coupling: params?.["coupling"] as any,
                    extraType: params?.["extraType"] as any,
                    axis: Number(params?.["axis"]),
                    axisMax: Number(params?.["axisMax"]),
                    brake: params?.["brake"] ? (String(params?.["brake"])?.toLowerCase() == 'true') : null,
                    ahk: params?.["ahk"] ? params?.["ahk"] as any : null,

                    volume: params?.["volume"] as any,
                    loading_l: params?.["loading_l"] as any,
                    loading_b: params?.["loading_b"] as any,
                    loading_h: params?.["loading_h"] as any,

                    radius: params?.["radius"] as any,
                    userId: params?.["userId"] as any,
                    caution: params?.["caution"] as any
                });

                setInserate(res);
            } catch (e: any) {
                console.log(e);
            }
        }

        load();
    }, [])

    useEffect(() => {

        const loadUser = async () => {
            try {
                const jwtString = await SecureStore.getItemAsync("authToken");
                if(!jwtString) {
                    setCurrentUser(null);
                }
                const foundUser = await getCurrentUserMainPage(jwtString);
                if(foundUser) {
                    setCurrentUser(foundUser);
                    setFavs(foundUser?.favourites);
                } else {
                    setCurrentUser(null)
                }
            } catch (e: any) {
                console.log(e);
            }
        }

        loadUser();

    }, [])

    const [currentUser, setCurrentUser] = useState(null);
    const [favs, setFavs] = useState([]);

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerVisible(!isDrawerVisible);
        setIsFilterVisible(false);
        setIsNotificationsVisible(false);
    };

    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible);
        setIsDrawerVisible(false);
        setIsNotificationsVisible(false);
    }

    const toggleNotifications = () => {
        setIsNotificationsVisible(!isNotificationsVisible);
        setIsDrawerVisible(false);
        setIsFilterVisible(false);
    }


    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const onFav = async (inseratId : string) => {
        try {
            if(isLoading) return;

            setIsLoading(true);

            if(!currentUser) {
                return router.push('/login');
            }

            const authToken = await SecureStore.getItemAsync("authToken");

            if(favs.find((fav : any) => fav.inseratId == inseratId)) {
            await deleteFavourite(authToken, inseratId);
            setFavs(favs.filter((fav : any) => fav.inseratId != inseratId));
            Toast.show({
                type: 'success',
                text1: 'Favorit entfernt',
                text2: 'Das Inserat wurde aus deinen Favoriten entfernt'
            })
            } else {
                await addFavourite(authToken, inseratId);
                setFavs([...favs, {inseratId}]);
                Toast.show({
                    type: 'success',
                    text1: 'Favorit hinzugefügt',
                    text2: 'Das Inserat wurde zu deinen Favoriten hinzugefügt'
                })
            }

        } catch(e : any) {
            Toast.show({
                type: 'error',
                text1: 'Fehler',
                text2: 'Favorit konnte nicht hinzugefügt werden'
            })
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <View className="flex-1  bg-[#1F2332] w-full">
             <Drawer
                open={isNotificationsVisible}
                onOpen={() => { setIsNotificationsVisible(true) }}
                onClose={() => { setIsNotificationsVisible(false) }}

                drawerPosition="right"
                drawerType="slide"
                drawerStyle={{ width: '100%' }}
                renderDrawerContent={() => {
                    return (
                        <DrawerNotifications
                            toggleDrawerNotifications={toggleNotifications}
                            foundNotifications={currentUser?.notifications}
                        />
                    )
                }}
            >
                <Drawer
                    open={isFilterVisible}
                    onOpen={() => { setIsFilterVisible(true) }}
                    onClose={() => { setIsFilterVisible(false) }}

                    drawerPosition="left"
                    drawerType="slide"
                    drawerStyle={{ width: '100%' }}
                    renderDrawerContent={() => {
                        return (
                            currentUser && (
                                <DrawerSearchFilter
                                    toggleFilter={toggleFilter}
                                    currentResults={inserate.length as number}
                                />
                            )
                        )
                    }}
                >
                    <Drawer
                        open={isDrawerVisible}
                        onOpen={() => { setIsDrawerVisible(true) }}
                        onClose={() => { setIsDrawerVisible(false) }}
                        drawerPosition="right"
                        drawerType="front"
                        renderDrawerContent={() => {
                            return (
                                <DrawerContentProfile
                                    currentUser={currentUser}
                                    closeModal={
                                        () => setIsDrawerVisible(false)
                                    }
                                />
                            )
                        }}
                    >
                        <View className=" bg-[#202336]">

                        </View>


                        <Header
                            toggleDrawer={toggleDrawer}
                            toggleNotifications={toggleNotifications}
                            currentUser={currentUser}
                        />

                        <ScrollView className=" ">




                            <View className="mt-4 px-2">
                                <SearchBar />
                            </View>
                            <View className="p-2">
                                <FilterBubbles
                                    toggleFilter={toggleFilter}
                                    currentResults={inserate.length as number}
                                />
                            </View>
                            {inserate.map((pInserat : any) => (
                                <View key={pInserat?.id} className="border-t border-b border-gray-800 mb-2">
                                    <InseratCard thisInserat={pInserat} currentUser={currentUser} onFav={(inseratId : string) => {onFav(inseratId)}} 
                                    isFaved={favs.find((fav : any) => fav.inseratId == pInserat?.id)}/>
                                </View>
                            ))}
                            <View className="mt-4">
                                <Footer />
                            </View>



                        </ScrollView>
                    </Drawer>
                </Drawer>
            </Drawer> 
        </View>
    );
}

export default MainPage;