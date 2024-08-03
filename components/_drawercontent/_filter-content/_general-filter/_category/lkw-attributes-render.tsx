import { View } from "react-native";
import PowerFilter from "../../_pkw-filter/power-filter";
import InitialFilter from "../../_pkw-filter/initial-filter";
import LoadingRoomFilter from "../../_pkw-filter/loading-room-filter";
import SeatsFilter from "../../_pkw-filter/seats-filter";
import TransmissionFilter from "../../_pkw-filter/transmission-filter";
import LkwBrandFilter from "../../_lkw-filter/lkw-brand-filter";

const LkwAttributesRender = () => {
    return (
        <View>
            <View className="flex items-center flex-row justify-center space-x-4">
            <View className="w-1/2">
                    <LkwBrandFilter />
                </View>
                <View className="w-1/2">
                <TransmissionFilter />
                </View>
            </View>
            <View>
                <SeatsFilter />
            </View>
            <View className="mt-4">
                <PowerFilter />
            </View>
            <View className="mt-4">
                <InitialFilter />
            </View>
            <View className="mt-4">
                <LoadingRoomFilter />
            </View>
        </View>
    );
}

export default LkwAttributesRender;