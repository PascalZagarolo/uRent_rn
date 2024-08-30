import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import BasicDetails from "./_components/parts/basic-details";

const InseratCreationPage = () => {

    const [currentPage, setCurrentPage] = useState(0);

    return ( 
        <SafeAreaView className="flex-1 flex w-full h-full">
            <View>
                <BasicDetails />
            </View>
        </SafeAreaView>
     );
}
 
export default InseratCreationPage;