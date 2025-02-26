import Header from "@/components/_searchpage/header";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import * as SecureStorage from 'expo-secure-store';
import { getCurrentUserMainPage } from "@/actions/retrieveUser/main-page/getUserMainPage";

import DrawerNotifications from "@/components/_drawercontent/drawer-notifications";
import DrawerContentProfile from "@/components/_drawercontent/drawer-content-profile";
import { Drawer } from "react-native-drawer-layout";
import PricingHeader from "./_components/pricing-header";
import ActionHeader from "./_components/action-header";
import PlanOptions from "./_components/plan-options";
import ChooseAmount from "./_components/choose-amount";
import RedeemGiftCard from "./_components/redeem-gift";
import ComparisonTable from "./_components/comparison-table";

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


    const [basisPrice, setBasisPrice] = useState(25);
    const [premiumPrice, setPremiumPrice] = useState(25);
    const [enterprisePrice, setEnterprisePrice] = useState(25);

    const [basisDiffrence, setBasisDiffrence] = useState(0);
    const [premiumDiffrence, setPremiumDiffrence] = useState(0);
    const [enterpriseDiffrence, setEnterpriseDiffrence] = useState(0);

    useEffect(() => {
        // Function to calculate basis price based on currentInserat
        const calculateBasisPrice = () => {
            switch (currentInserat) {
                case 1:
                    return 29;
                case 5:
                    return 44;
                case 10:
                    return 50;
                case 15:
                    return 58;
                case 25:
                    return 73;
                case 35:
                    return 78;
                case 50:
                    return 87;
                case 65:
                    return 93;
                case 80:
                    return 101;
                case 100:
                    return 111;
                case 250:
                    return 122;
                default:
                    return /* Default calculation */;
            }
        };

        const calculatePremiumPrice = () => {
            switch (currentInserat) {
                case 1:
                    return 35;
                case 5:
                    return 53;
                case 10:
                    return 59;
                case 15:
                    return 70;
                case 25:
                    return 88;
                case 35:
                    return 95;
                case 50:
                    return 105;
                case 65:
                    return 112;
                case 80:
                    return 123;
                case 100:
                    return 133;
                case 250:
                    return 147;
                default:
                    return /* Default calculation */;
            }
        };

        const calculateEnterprisePrice = () => {
            switch (currentInserat) {
                case 1:
                    return 49;
                case 5:
                    return 74;
                case 10:
                    return 84;
                case 15:
                    return 90;
                case 25:
                    return 123;
                case 35:
                    return 132;
                case 50:
                    return 147;
                case 65:
                    return 157;
                case 80:
                    return 172;
                case 100:
                    return 187;
                case 250:
                    return 206;
            }
        };



        setBasisPrice(calculateBasisPrice());
        setPremiumPrice(calculatePremiumPrice());
        setEnterprisePrice(calculateEnterprisePrice());

        setBasisDiffrence((calculateBasisPrice() - currentUserWorth) > 10 ? (calculateBasisPrice() - currentUserWorth) : 10);
        setPremiumDiffrence((calculatePremiumPrice() - currentUserWorth) > 10 ? (calculatePremiumPrice() - currentUserWorth) : 10);
        setEnterpriseDiffrence((calculateEnterprisePrice() - currentUserWorth) > 10 ? (calculateEnterprisePrice() - currentUserWorth) : 10);
    }, [currentInserat]);

    const calculateBasisPrice = (amount: number) => {
        switch (amount) {
            case 1:
                return 29;
            case 5:
                return 44;
            case 10:
                return 50;
            case 15:
                return 58;
            case 25:
                return 73;
            case 35:
                return 78;
            case 50:
                return 87;
            case 65:
                return 93;
            case 80:
                return 101;
            case 100:
                return 111;
            case 250:
                return 122;
            default:
                return /* Default calculation */;
        }
    };

    const calculatePremiumPrice = (amount: number) => {
        switch (amount) {
            case 1:
                return 35;
            case 5:
                return 53;
            case 10:
                return 59;
            case 15:
                return 70;
            case 25:
                return 88;
            case 35:
                return 95;
            case 50:
                return 105;
            case 65:
                return 112;
            case 80:
                return 123;
            case 100:
                return 133;
            case 250:
                return 147;
            default:
                return /* Default calculation */;
        }
    };

    const calculateEnterpriseP = (amount: number) => {
        switch (amount) {
            case 1:
                return 49;
            case 5:
                return 74;
            case 10:
                return 84;
            case 15:
                return 90;
            case 25:
                return 123;
            case 35:
                return 132;
            case 50:
                return 147;
            case 65:
                return 157;
            case 80:
                return 172;
            case 100:
                return 187;
            case 250:
                return 206;
            default:
                return /* Default calculation */;
        }
    };

    let currentUserWorth: any;

    switch (currentUser?.subscription?.subscriptionType) {
        case "BASIS":
            currentUserWorth = calculateBasisPrice(currentUser?.subscription?.amount);
            break;
        case "PREMIUM":
            currentUserWorth = calculatePremiumPrice(currentUser?.subscription?.amount);
            break;
        case "ENTERPRISE":
            currentUserWorth = calculateEnterpriseP(currentUser?.subscription?.amount);
            break;
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
  className="flex-1"
>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView keyboardShouldPersistTaps="handled" className="p-4 " contentContainerStyle={{ paddingBottom: 48 }}>
      <PricingHeader />
      <ActionHeader />
      <View className="mt-8">
        <ChooseAmount setCurrentInserate={setCurrentInserat} currentValue={currentInserat} />
      </View>
      <View className="mt-8 ">
      <PlanOptions basisPrice={basisPrice} premiumPrice={premiumPrice} enterprisePrice={enterprisePrice} />
      </View>
      <View className="mt-4">
        <RedeemGiftCard />
       
      </View>
      <View className="mt-8">
        <ComparisonTable />
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