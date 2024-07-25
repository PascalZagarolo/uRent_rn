import { SafeAreaView, Text, View } from "react-native";
import Header from "./_components/header";


const MainPage = () => {
    return ( 
        <SafeAreaView className="flex-1  bg-[#1F2332]">
            <View className="">
            <Header/>
            </View>
        </SafeAreaView>
     );
}
 
export default MainPage;