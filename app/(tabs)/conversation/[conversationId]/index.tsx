import { getCurrentUser } from "@/actions/getCurrentUser";
import DrawerContentProfile from "@/components/_drawercontent/drawer-content-profile";
import Footer from "@/components/_searchpage/footer";
import Header from "@/components/_searchpage/header";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { Drawer } from 'react-native-drawer-layout';

import { getConversations } from "@/actions/getConversations";
import { useAuth } from "../../AuthProvider";
import { useLocalSearchParams } from "expo-router";
import { getSelectedConversation } from "@/actions/getSelectedConversation";



const ConversationChatPage = () => {

    const { id } = useLocalSearchParams<{ id: string }>();

    const { currentUser, isLoading } = useAuth();

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [currentConversations, setCurrentConversations] = useState(null);
    const [currentTag, setCurrentTag] = useState("");

    useMemo(() => {
        const load = async () => {
            const res = await getSelectedConversation(id);
            setCurrentConversations(res);
        }

        load();
    },[])

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
                   
                </View>
                <View className="">
                
                </View>
                <View className="">
                    <Footer />
                </View>
                </ScrollView>
            </Drawer>
            
        </View>
        
       
    );
}

export default ConversationChatPage;