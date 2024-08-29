import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "./search-bar";
import { userTable } from "@/db/schema";
import { useRef, useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { Drawer } from 'react-native-drawer-layout';
import { is } from "drizzle-orm";
import { SafeAreaView } from "react-native";
import { cn } from "@/~/lib/utils";
import { router } from "expo-router";
interface HeaderProps {
  currentUser: typeof userTable.$inferSelect | any;
  toggleDrawer: () => void;
  toggleNotifications?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, toggleDrawer, toggleNotifications }) => {

  const [unseenNotifications, setUnseenNotifications] = useState(
    currentUser?.notifications.filter(n => !n.seen).length
  )

  const usedUrl = currentUser?.image
    ? currentUser.image
    : "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png";

  return (

    <View className="bg-[#202336] p-4 border-b border-gray-800">
      <SafeAreaView className="flex flex-row items-center">
        <TouchableOpacity
          className="mr-4 p-4"
          
        >
          <FontAwesome name="bars" size={24} color="white" className="mr-4" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-200">uRent</Text>

        {currentUser ? (

          <View className="ml-auto flex flex-row items-center space-x-8">
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
                className="w-12 h-12 rounded-full"
              />
            </TouchableOpacity>
          </View>

        ) : (
          <TouchableOpacity className="ml-auto" onPress={() => { router.push("/login")}}>
            <FontAwesome name="user-circle" size={24} color="white" />
          </TouchableOpacity>
        )}

      </SafeAreaView>



    </View>

  );
};

export default Header;