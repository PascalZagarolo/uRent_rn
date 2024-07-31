import { FontAwesome } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "./search-bar";
import { userTable } from "@/db/schema";
import { useRef, useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { Drawer } from 'react-native-drawer-layout';
import { is } from "drizzle-orm";
interface HeaderProps {
  currentUser: typeof userTable.$inferSelect;
  toggleDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, toggleDrawer }) => {

    

  const usedUrl = currentUser?.image
    ? currentUser.image
    : "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png";

  return (
    
    <View className="bg-[#202336] p-4 border-b border-gray-700">
      <View className="flex flex-row items-center">
        <TouchableOpacity
          className="mr-4"
          
        >
          <FontAwesome name="bars" size={24} color="white" className="mr-4" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-200">uRent</Text>
        {currentUser ? (
          
            <TouchableOpacity className="ml-auto" onPress={toggleDrawer}>
          <Image
            source={{ uri: usedUrl }}
            alt="Profile Picture"
            className="w-12 h-12 rounded-full"
          />
        </TouchableOpacity>
         
        ) : (
          <View className="ml-auto">
            <FontAwesome name="user-circle" size={24} color="white" />
          </View>
        )}
      </View>
      <View className="mt-4">
        <SearchBar />
      </View>
      
      
    </View>
    
  );
};

export default Header;