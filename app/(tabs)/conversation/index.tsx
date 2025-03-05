import { getCurrentUser } from "@/actions/getCurrentUser";
import DrawerContentProfile from "@/components/_drawercontent/drawer-content-profile";
import Footer from "@/components/_searchpage/footer";
import Header from "@/components/_searchpage/header";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { useAuth } from "../AuthProvider";
import { Drawer } from 'react-native-drawer-layout';
import ConversationSearchHeader from "./_components/conversation-search-header";
import { getConversations } from "@/actions/getConversations";
import ConversationsRenderedList from "./_components/conversations-rendered-list";
import DrawerNotifications from "@/components/_drawercontent/drawer-notifications";




const ConversationPage = () => {

    


 


    const { currentUser, isLoading } = useAuth();

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [currentConversations, setCurrentConversations] = useState([]);
    const [currentTag, setCurrentTag] = useState("");

    useMemo(() => {
        const load = async () => {
            const res = await getConversations(currentUser.id);
            setCurrentConversations(res);
        }

        load();
    }, [])

    const toggleDrawer = () => {
        setIsDrawerVisible(!isDrawerVisible);

    };

    const toggleNotifications = () => {
        setIsNotificationsVisible(!isNotificationsVisible);
        setIsDrawerVisible(false);
        
    }

    const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
    return (



        <View className="flex-1  bg-[#202336] w-full"

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
                <ScrollView className="flex flex-col">

                    <Header
                        currentUser={currentUser}
                        toggleDrawer={toggleDrawer}
                        toggleNotifications={toggleNotifications}
                    />

                    <View className="">
                        <ConversationSearchHeader
                            currentConversationsLength={currentConversations.length}
                            setCurrentTag={setCurrentTag}
                        />
                    </View>
                    <View className="">
                        <ConversationsRenderedList
                            foundConversations={currentConversations}
                        />
                    </View>
                    
                </ScrollView>
            </Drawer>
            </Drawer>
        </View>


    );
}

export default ConversationPage;