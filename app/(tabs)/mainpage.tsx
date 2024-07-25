import { getInserate } from "@/actions/getInserate";
import Header from "@/components/_searchpage/header";
import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";

const MainPage = () => {
    console.log("MainPage");
    const [inserate, setInserate] = useState([]);
    console.log(inserate)

    useEffect(() => {
        const load = async () => {
            const res = await getInserate();
            setInserate(res);
        }
        load();
    },[])

    return ( 
        <SafeAreaView className="flex-1  bg-[#1F2332]">
            <View className="">
            <Header/>
            </View>
        </SafeAreaView>
     );
}
 
export default MainPage;