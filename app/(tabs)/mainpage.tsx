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



const MainPage = () => {
    console.log("MainPage");
    const [inserate, setInserate] = useState([]);


    useEffect(() => {
        const load = async () => {
            const res = await getInserate();
            setInserate(res);
        }
        load();
    }, [])

    const { currentUser, isLoading } = useAuth();

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerVisible(!isDrawerVisible);
        setIsFilterVisible(false);
    };

    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible);
        setIsDrawerVisible(false);
    }

    console.log(currentUser)

    if (isLoading) {
        return <ActivityIndicator />;
    }

    return (
        <SafeAreaView className="flex-1  bg-[#1F2332] w-full">
            <Drawer
                open={isFilterVisible}
                onOpen={() => { setIsFilterVisible(true) }}
                onClose={() => { setIsFilterVisible(false) }}
                drawerPosition="left"
                drawerType="slide"
                drawerStyle={{ width: '100%' }}
                renderDrawerContent={() => {
                    return (
                        <DrawerSearchFilter
                            toggleFilter={toggleFilter}
                        />
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
                            />
                        )
                    }}
                >
                    <ScrollView className=" ">



                        <View className="">
                            <Header
                                toggleDrawer={toggleDrawer}
                                currentUser={currentUser}
                            />
                        </View>
                        <View className="p-2">
                            <FilterBubbles
                            toggleFilter={toggleFilter}
                                currentResults={inserate.length as number}
                            />
                        </View>
                        {inserate.map((pInserat) => (
                            <View key={pInserat.id} className="border-t border-b border-gray-800 mb-2">
                                <InseratCard thisInserat={pInserat} />
                            </View>
                        ))}
                        <View className="mt-4">
                            <Footer />
                        </View>



                    </ScrollView>
                </Drawer>
            </Drawer>
        </SafeAreaView>
    );
}

export default MainPage;