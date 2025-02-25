import Header from "@/components/_searchpage/header";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as SecureStorage from 'expo-secure-store';
import { getCurrentUserMainPage } from "@/actions/retrieveUser/main-page/getUserMainPage";

import DrawerNotifications from "@/components/_drawercontent/drawer-notifications";
import DrawerContentProfile from "@/components/_drawercontent/drawer-content-profile";
import { Drawer } from "react-native-drawer-layout";
import PricingHeader from "./_components/pricing-header";
import ActionHeader from "./_components/action-header";
import PlanOptions from "./_components/plan-options";
import ChooseAmount from "./_components/choose-amount";

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

    const [currentInserat, setCurrentInserat] = useState<number>(1);

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
        <View className="flex-1 bg-[#1f2332] w-full">
  <Drawer
    open={isNotificationsVisible}
    onOpen={() => setIsNotificationsVisible(true)}
    onClose={() => setIsNotificationsVisible(false)}
    drawerPosition="right"
    drawerType="slide"
    drawerStyle={{ width: "100%" }}
    renderDrawerContent={() => (
      <DrawerNotifications
        toggleDrawerNotifications={toggleNotifications}
        foundNotifications={currentUser?.notifications}
      />
    )}
  >
    <Drawer
      open={isDrawerVisible}
      onOpen={() => setIsDrawerVisible(true)}
      onClose={() => setIsDrawerVisible(false)}
      drawerPosition="right"
      drawerType="front"
      gestureHandlerProps={{ enabled: false }}
      renderDrawerContent={() => (
        <DrawerContentProfile
          currentUser={currentUser}
          closeModal={() => setIsDrawerVisible(false)}
        />
      )}
    >
      <Header
        toggleDrawer={toggleDrawer}
        toggleNotifications={toggleNotifications}
        currentUser={currentUser}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="p-4 flex-1" keyboardShouldPersistTaps="handled">
            <View className="min-h-screen">
              <PricingHeader />
              <ActionHeader />
              <View className="mt-8">
                <ChooseAmount 
                setCurrentInserate={setCurrentInserat}
                currentValue={currentInserat}
                />
              </View>
              <View className="mt-4">
                <PlanOptions 
                
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    </Drawer>
  </Drawer>
</View>

    );
}

export default PricingPage;