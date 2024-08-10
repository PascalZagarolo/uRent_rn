import { useMemo, useState } from "react";
import { useAuth } from "../../AuthProvider";
import { useLocalSearchParams } from "expo-router";
import { getSelectedConversation } from "@/actions/getSelectedConversation";
import { ScrollView, View, Text, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { Drawer } from 'react-native-drawer-layout';
import DrawerContentProfile from "@/components/_drawercontent/drawer-content-profile";

import Header from "@/components/_searchpage/header";
import Footer from "@/components/_searchpage/footer";
import ConversationHeader from "./_components/conversation-header";
import ConversationFooter from "./_components/conversation-footer";
import MessageRender from "./_components/message-render";


const ConversationChatPage = () => {

    const { conversationId } = useLocalSearchParams<{ conversationId: string }>();

    const { currentUser, isLoading } = useAuth();

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [currentTag, setCurrentTag] = useState("");

    const [renderedMessages, setRenderedMessages] = useState([]);

    const [otherUser, setOtherUser] = useState(null);

    useMemo(() => {
        const load = async () => {
            const res = await getSelectedConversation(conversationId);
            setCurrentConversation(res);
            setRenderedMessages(res?.messages.filter((message) => message?.createdAt).sort((a, b) => {
                return a.createdAt > b.createdAt ? 1 : -1;
            }));
        }

        load();
    }, [])

    useMemo(() => {
        setOtherUser(currentConversation?.user1Id === currentUser.id ? currentConversation?.user2 : currentConversation?.user1)
    }, [currentConversation])

    const toggleDrawer = () => {
        setIsDrawerVisible(!isDrawerVisible);

    };

    return (



        <View className="flex-1 bg-[#202336] w-full h-full">
        <Drawer
            open={isDrawerVisible}
            onOpen={() => setIsDrawerVisible(true)}
            onClose={() => setIsDrawerVisible(false)}
            drawerPosition="right"
            drawerType="front"
            renderDrawerContent={() => (
                <DrawerContentProfile currentUser={currentUser} />
            )}
        >
            <SafeAreaView className="h-full">
                {/* Header */}
                <Header currentUser={currentUser} toggleDrawer={toggleDrawer} />
                {(currentConversation && otherUser) && (
                    <ConversationHeader
                        username={otherUser?.name}
                        imageUrl={otherUser?.image}
                    />
                )}

                {/* Message List */}
                <ScrollView className="flex-1 gap-y-2 px-4  bg-[#222639]">
                    {renderedMessages.slice(renderedMessages.length - 10, renderedMessages.length).map((message, index) => (
                        <View className="w-full" key={index}>
                            <MessageRender
                                content={message.content}
                                imageUrl={message.image}
                                isOwn={message.senderId === currentUser.id}
                                date={message.createdAt}
                            />
                        </View>
                    ))}
                </ScrollView>

                {/* Footer (Input Area) */}
                
            </SafeAreaView>
            
        </Drawer>
        <KeyboardAvoidingView behavior="padding">
                    <ConversationFooter 
                    conversationId={conversationId}
                    />
                </KeyboardAvoidingView>
    </View>


    );
}

export default ConversationChatPage;