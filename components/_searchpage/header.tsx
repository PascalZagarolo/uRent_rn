import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import SearchBar from "./search-bar";
import { userTable } from "@/db/schema";
import { useRef, useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { Drawer } from 'react-native-drawer-layout';
import { is } from "drizzle-orm";
import { SafeAreaView } from "react-native";
import { cn } from "@/~/lib/utils";
import { router } from "expo-router";
import CreateInseratPreview from "./_components/create-inserat-preview";
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
    : "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg";

  return (

    <View className="bg-[#202336] p-4 py-45 border-b border-gray-800 shadow-lg">
      <SafeAreaView className="flex flex-row items-center">
        
        <Text className="text-xl font-semibold text-gray-200">uRent</Text>

        {currentUser ? (

          <View className="ml-auto flex flex-row items-center space-x-8">
            <TouchableOpacity onPress={() => {setShowModal(true)}}>
              <Ionicons name="add-circle-outline" size={24} color="white" />

            </TouchableOpacity>
            <TouchableOpacity onPress={toggleNotifications}>
              <Ionicons name="notifications" size={24} color="white" />
              <View className={cn("absolute -top-1.5 -right-1.5 rounded-full px-1 py-0.5",
                unseenNotifications === 0 ? "" : "bg-rose-600"
              )}>
                <Text style={{ fontSize: 10, color: 'rgba(229, 231, 235, 0.9)' }}>{unseenNotifications}</Text>
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