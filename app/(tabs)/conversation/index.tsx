import { getCurrentUser } from "@/actions/getCurrentUser";
import DrawerContentProfile from "@/components/_drawercontent/drawer-content-profile";
import Footer from "@/components/_searchpage/footer";
import Header from "@/components/_searchpage/header";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useAuth } from "../AuthProvider";
import { Drawer } from 'react-native-drawer-layout';
import ConversationSearchHeader from "./_components/conversation-search-header";


const ConversationPage = () => {



    const { currentUser, isLoading } = useAuth();

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    const [currentTag, setCurrentTag] = useState("");

    const toggleDrawer = () => {
        setIsDrawerVisible(!isDrawerVisible);

    };

    return (
        <SafeAreaView className="flex-1  bg-[#1F2332] w-full">

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
                <Header
                    currentUser={currentUser}
                    toggleDrawer={toggleDrawer}
                />
                <View className="">
                    <ConversationSearchHeader />
                </View>
                <View className="mt-4">
                    <Footer />
                </View>
            </Drawer>

        </SafeAreaView>
    );
}

export default ConversationPage;