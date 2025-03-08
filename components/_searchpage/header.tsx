import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image, Modal, Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { userTable } from "@/db/schema";
import {  useState } from "react";



import { cn } from "@/~/lib/utils";
import { router } from "expo-router";
import CreateInseratPreview from "./_components/create-inserat-preview";
import placeholderPicture from "@/assets/images";

interface HeaderProps {
  currentUser: typeof userTable.$inferSelect | any;
  toggleDrawer: () => void;
  toggleNotifications?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, toggleDrawer, toggleNotifications }) => {

  const [unseenNotifications, setUnseenNotifications] = useState(
    currentUser?.notifications.filter(n => !n.seen).length
  )

  const [showModal, setShowModal] = useState(false);
 

  const usedUrl = currentUser?.image
    ? currentUser.image
    : placeholderPicture;

  return (

    <View className="bg-[#1F2332] px-4 border-b border-gray-800 shadow-lg pt-4 mt-4">
      <SafeAreaView className={cn(
        "flex flex-row items-center mb-4",
        Platform.OS === "ios" ? "" : "pt-4"
      )}>
        
        <Text className="text-xl font-semibold text-gray-200">uRent</Text>

        {currentUser ? (

          <View className="ml-auto flex flex-row items-center space-x-8">
            <TouchableOpacity onPress={() => {setShowModal(true)}}>
              <Ionicons name="add-circle-outline" size={24} color="white" />

            </TouchableOpacity>
            <TouchableOpacity onPress={toggleNotifications}>
             {unseenNotifications > 0 ?  <Ionicons name="notifications" size={24} color="white" /> : <MaterialIcons name="notifications-none" size={24} color="white" />}
              <View className={cn("absolute -top-2 -right-2 rounded-full px-1 py-0.5",
                unseenNotifications > 0 ? "bg-rose-600" : ""
              )}>
                {unseenNotifications > 0 && (
                  <Text style={{ fontSize: 10, color: 'rgba(229, 231, 235, 0.9)' }}>{unseenNotifications}</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDrawer}>
              <Image
                source={{ uri: usedUrl }}
                alt="Profile Picture"
                className="w-10 h-10 rounded-full"
              />
            </TouchableOpacity>
          </View>

        ) : (
          <TouchableOpacity className="ml-auto" onPress={() => { router.push("/login") }}>
            <FontAwesome name="user-circle" size={24} color="white" />
          </TouchableOpacity>
        )}

      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}

      >
        <CreateInseratPreview 
        closeModal={() => setShowModal(false)}
        />
      </Modal>


    </View>

  );
};

export default Header;