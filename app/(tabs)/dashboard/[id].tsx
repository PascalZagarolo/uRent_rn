import { useRouter } from "expo-router";

import { Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import SelectDashboardTab from "./_components/select-dashboard-tab";
import { useEffect, useState } from "react";
import InserateTab from "./_tabs/inserate-tab";
import * as SecureStorage from 'expo-secure-store';
import { getCurrentUserDashboard } from "@/actions/retrieveUser/dashboard-page/getUserDashboard";
import FavouritesTab from "./_tabs/favourites-tab";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/~/lib/utils";




const DashboardPage = () => {

    const router = useRouter();

    const [user, setUser] = useState(null);
    const [tab, setTab] = useState("inserat");
    

    const loadUser = async () => {
      
        try {
        const authToken = await SecureStorage.getItemAsync("authToken");

        if(!authToken) return router.push("/login");
        
        const currentUser = await getCurrentUserDashboard(authToken);
        
        if(currentUser) {
            setUser(currentUser);
        } else {
            setUser(null);
        }

        } catch(e : any) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadUser();
    },[])

    return ( 
        <View className=" bg-[#181b27] h-screen">
           <SafeAreaView className="">
                <View className={cn(
                    "border-b border-gray-800 p-4 bg-[#181b27] space-x-4 flex flex-row items-center",
                    Platform.OS === "ios" ? "mt-4" : "mt-8"
                )}>
                    <TouchableOpacity className="" onPress={() => {router.push("/")}}>
                        <MaterialCommunityIcons name="arrow-left" color={"white"} size={20} className="text-gray-200 w-4 h-4 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-semibold text-gray-200">
                        Dashboard
                    </Text>
                </View>
            </SafeAreaView > 
            <View className="">
                <View className="">
                    <SelectDashboardTab 
                    tab={tab}
                    setTab={setTab}
                    />
                </View>
                <ScrollView className="">
                    {
                        {
                            "inserat" : <InserateTab 
                                        currentUser = {user}
                                        reloadAll = {loadUser}
                                        />,
                            "favourites" : 
                            <FavouritesTab 
                            currentUser = {user}
                            onReloadAll={loadUser}
                            />
                        }[tab]
                    }
                </ScrollView>
            </View>
        </View>
     );
}
 
export default DashboardPage;