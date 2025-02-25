import Header from "@/components/_searchpage/header";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import * as SecureStorage from 'expo-secure-store';
import { getCurrentUserMainPage } from "@/actions/retrieveUser/main-page/getUserMainPage";

import DrawerNotifications from "@/components/_drawercontent/drawer-notifications";
import DrawerContentProfile from "@/components/_drawercontent/drawer-content-profile";
import { Drawer } from "react-native-drawer-layout";
import PricingHeader from "./_components/pricing-header";
import ActionHeader from "./_components/action-header";
import PlanOptions from "./_components/plan-options";

const PricingPage = () => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        const loadUser = async () => {
            try {
                const jwtString = await SecureStorage.getItemAsync("authToken");
                if (!jwtString) {
                    setCurrentUser(null);
                }
                const foundUser = await getCurrentUserMainPage(jwtString);
                if (foundUser) {
                    setCurrentUser(foundUser);

                } else {
                    setCurrentUser(null)
                }
            } catch (e: any) {
                console.log(e);
            }
        }

        loadUser();

    }, [])

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);


    const toggleDrawer = () => {
        setIsDrawerVisible(!isDrawerVisible);
        setIsFilterVisible(false);
        setIsNotificationsVisible(false);
    };

    const toggleNotifications = () => {
        setIsNotificationsVisible(!isNotificationsVisible);
        setIsDrawerVisible(false);
        setIsFilterVisible(false);
    }



    return (
        <View className="flex-1 h-full  bg-[#1f2332] w-full">
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



                    <Header
                        toggleDrawer={toggleDrawer}
                        toggleNotifications={toggleNotifications}
                        currentUser={currentUser}
                    />

                    <ScrollView className="p-4">
                        <PricingHeader />
                        <ActionHeader />
                       <View className="mt-8">
                       <PlanOptions />
                       </View>





                    </ScrollView>
                </Drawer>
            </Drawer>
        </View>
    );
}

export default PricingPage;