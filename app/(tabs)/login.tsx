import BackToMain from "@/components/_login/back-to-main";
import MainForm from "@/components/_login/main-form";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text, SafeAreaView } from "react-native";

const LoginPage = () => {
    return (
        <View className="bg-[#1F2332] h-full w-full">
            <SafeAreaView className="flex-1 items-center justify-center bg-[#1F2332] sm:max-w-[600px] w-full mx-auto">
                <BackToMain />

                <View className="px-4">
                    <MainForm />
                </View>
            </SafeAreaView>
        </View>
    );
}

export default LoginPage;