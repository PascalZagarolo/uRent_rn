import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import SelectDashboardTab from "./_components/select-dashboard-tab";
import { useState } from "react";


const DashboardPage = () => {

    const router = useRouter();

    const [tab, setTab] = useState("inserat");

    return ( 
        <View className=" bg-[#181b27] h-screen">
            <SafeAreaView className="">
                <View className="border-b border-gray-800 p-4 bg-[#181b27] space-x-4 flex flex-row items-center">
                    <TouchableOpacity className="" onPress={() => {router.back()}}>
                        <ArrowLeft className="text-gray-200 w-4 h-4 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-semibold text-gray-200">
                        Dashboard
                    </Text>
                </View>
            </SafeAreaView >
            <View className="p-4">
                <View>
                    <SelectDashboardTab 
                    tab={tab}
                    setTab={setTab}
                    />
                </View>
            </View>
        </View>
     );
}
 
export default DashboardPage;