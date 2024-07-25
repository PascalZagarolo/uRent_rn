import { getInserate } from "@/actions/getInserate";
import Header from "@/components/_searchpage/header";
import InseratCard from "@/components/_searchpage/inserat-card";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

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

    console.log(inserate.length)

    return (
        <SafeAreaView className="flex-1  bg-[#1F2332]">
            <View className="">
                <Header />
            </View>
            <ScrollView className=" space-y-4">
                {inserate.map((pInserat) => (
                    <View key={pInserat.id}>
                        <InseratCard thisInserat={pInserat} />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default MainPage;