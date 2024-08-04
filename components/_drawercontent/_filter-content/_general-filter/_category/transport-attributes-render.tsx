import { View } from "react-native";
import PowerFilter from "../../_pkw-filter/power-filter";
import InitialFilter from "../../_pkw-filter/initial-filter";
import LoadingRoomFilter from "../../_pkw-filter/loading-room-filter";
import LoadingSizeFilter from "../../_lkw-filter/lkw-loading-size";
import TransportWeightClassFilter from "../../_transport-filter/transport-weightclass-filter";
import SeatsFilter from "../../_pkw-filter/seats-filter";
import DoorsFilter from "../../_pkw-filter/doors-filter";
import TransmissionFilter from "../../_pkw-filter/transmission-filter";
import LkwLoadingTypeFilter from "../../_lkw-filter/lkw-loading-type-filter";
import FuelFilter from "../../_pkw-filter/fuel-filter";
import LkwExtraTypeFilter from "../../_lkw-filter/lkw-extra-type";
import TransportBrandFilter from "../../_transport-filter/transport-brand-filter";
import LkwFuelFilter from "../../_lkw-filter/lkw-fuel-filter";
import TransportTransmissionFilter from "../../_transport-filter/transport-transmission-filter";

const TransportAttributesRender = () => {
    return (
        <View>
            <View className="flex items-center flex-row justify-center space-x-4">
                <View className="w-1/2">
                    <TransportBrandFilter />
                </View>
                <View className="w-1/2">
                <LkwLoadingTypeFilter />
                </View>
            </View>
            <View className="flex items-center flex-row justify-center space-x-4">
                <View className="w-1/2">
                    <LkwExtraTypeFilter />
                </View>
                <View className="w-1/2">
                    <LkwFuelFilter />
                </View>
            </View>
            <View className="flex items-center flex-row justify-center space-x-4">
                <View className="w-1/2">
                    <TransportTransmissionFilter />
                </View>
                <View className="w-1/2">
                    
                </View>
            </View>
            <View>
                <DoorsFilter />
            </View>
            <View>
                <SeatsFilter />
            </View>
            <View>
                <TransportWeightClassFilter />
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
            <View className="mt-4">
                <LoadingSizeFilter />
            </View>
        </View>
    );
}

export default TransportAttributesRender;