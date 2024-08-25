import { getCurrentUser } from "@/actions/getCurrentUser";
import DrawerContentProfile from "@/components/_drawercontent/drawer-content-profile";
import Footer from "@/components/_searchpage/footer";
import Header from "@/components/_searchpage/header";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useAuth } from "../AuthProvider";
import { Drawer } from 'react-native-drawer-layout';
import ConversationSearchHeader from "./_components/conversation-search-header";
import { getConversations } from "@/actions/getConversations";
import ConversationsRenderedList from "./_components/conversations-rendered-list";

import { PusherEvent } from "@pusher/pusher-websocket-react-native";


const ConversationPage = () => {

    const renewMessages = () => {

    } 


 


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
                <ScrollView>

                    <Header
                        currentUser={currentUser}
                        toggleDrawer={toggleDrawer}
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
                    <View className="">
                        <Footer />
                    </View>
                </ScrollView>
            </Drawer>

        </View>


    );
}

export default ConversationPage;