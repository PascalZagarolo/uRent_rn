import { getInserate } from "@/actions/getInserate";
import Footer from "@/components/_searchpage/footer";
import Header from "@/components/_searchpage/header";
import InseratCard from "@/components/_searchpage/inserat-card";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { getCurrentUser } from "@/actions/getCurrentUser";
import { useAuth } from "./AuthProvider";

const MainPage = () => {
    console.log("MainPage");
    const [inserate, setInserate] = useState([]);


    useEffect(() => {
        const load = async () => {
            const res = await getInserate();
            setInserate(res);
        }
        load();
    }, [])

    const { currentUser, isLoading} = useAuth();

    

    console.log(currentUser)

    if (isLoading) {
        return <ActivityIndicator />;
      }

    return (
        <SafeAreaView className="flex-1  bg-[#1F2332]">
            
            <ScrollView className=" ">
                
            <View className="">
                <Header />
            </View>
                {inserate.map((pInserat) => (
                    <View key={pInserat.id} className="border-t border-b border-gray-800 mb-2">
                        <InseratCard thisInserat={pInserat} />
                    </View>
                ))}
                <View className="mt-4">
                    <Footer />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default MainPage;