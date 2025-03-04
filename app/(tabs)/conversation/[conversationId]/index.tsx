import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../../AuthProvider";
import { useLocalSearchParams } from "expo-router";
import { getSelectedConversation } from "@/actions/getSelectedConversation";
import { ScrollView, View, Text, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { Drawer } from 'react-native-drawer-layout';
import DrawerContentProfile from "@/components/_drawercontent/drawer-content-profile";

import Header from "@/components/_searchpage/header";

import ConversationHeader from "./_components/conversation-header";
import ConversationFooter from "./_components/conversation-footer";
import MessageRender from "./_components/message-render";

import { socket } from "@/lib/utils/socketService";
import { set } from "date-fns";


const ConversationChatPage = () => {

    const { conversationId } = useLocalSearchParams<{ conversationId: string }>();

    const { currentUser, isLoading } = useAuth();

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [currentTag, setCurrentTag] = useState("");

    const scrollViewRef = useRef(null);

    const [renderedMessages, setRenderedMessages] = useState([]);

    const [otherUser, setOtherUser] = useState(null);



    const POLLING_INTERVAL = 5000; // Adjust the interval as needed

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            const res = await getSelectedConversation(conversationId);
            if (isMounted) {
                setCurrentConversation(res);
                setRenderedMessages(res?.messages
                    ?.filter((message) => message?.createdAt)
                    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
                );
            }
        };

        load(); // Initial load

        const intervalId = setInterval(load, POLLING_INTERVAL);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [conversationId]);


    useMemo(() => {
        setOtherUser(currentConversation?.user1Id === currentUser.id ? currentConversation?.user2 : currentConversation?.user1)
    }, [currentConversation])

    const toggleDrawer = () => {
        setIsDrawerVisible(!isDrawerVisible);
    };

    useEffect(() => {
        const handleMessageSend = (data) => {

            if (data.conversationId === conversationId) {
                console.log(data);
                setRenderedMessages((prevMessages) => [...prevMessages, data]);
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }
        };

        socket.on(conversationId, handleMessageSend);

        // Cleanup listener on component unmount
        return () => {
            socket.off(conversationId, handleMessageSend);
        };
    }, [socket, conversationId]);


    return (



        <View className="flex-1 bg-[#202336] w-full h-full">
            <Drawer
                open={isDrawerVisible}
                onOpen={() => setIsDrawerVisible(true)}
                onClose={() => setIsDrawerVisible(false)}
                drawerPosition="right"
                drawerType="front"
                renderDrawerContent={() => (
                    <DrawerContentProfile currentUser={currentUser}
                        closeModal={
                            () => setIsDrawerVisible(false)
                        }
                    />
                )}
            >

                {/* Header */}
                <Header currentUser={currentUser} toggleDrawer={toggleDrawer} />
                {(currentConversation && otherUser) && (
                    <ConversationHeader
                    username={otherUser?.name}
                    imageUrl={otherUser?.image}
                />
                )}

                {/* Message List */}
                <ScrollView className=" px-4  bg-[#222639]"
                    ref={scrollViewRef}
                >
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



            </Drawer>

            <View className="mt-auto items-end">
                <ConversationFooter
                    userId={currentUser?.id ?? ""}
                    conversationId={conversationId}
                    setRenderedMessages={(newMessage) => { setRenderedMessages((previous) => [...previous, newMessage]) }}
                />
            </View>

        </View>


    );
}

export default ConversationChatPage;