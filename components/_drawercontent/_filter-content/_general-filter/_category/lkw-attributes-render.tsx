import { View } from "react-native";
import PowerFilter from "../../_pkw-filter/power-filter";
import InitialFilter from "../../_pkw-filter/initial-filter";
import LoadingRoomFilter from "../../_pkw-filter/loading-room-filter";
import SeatsFilter from "../../_pkw-filter/seats-filter";
import TransmissionFilter from "../../_pkw-filter/transmission-filter";
import LkwBrandFilter from "../../_lkw-filter/lkw-brand-filter";
import LkwWeightClassFilter from "../../_lkw-filter/lkw-weightclass-filter";
import LkwExtraTypeFilter from "../../_lkw-filter/lkw-extra-type";
import LkwLoadingTypeFilter from "../../_lkw-filter/lkw-loading-type-filter";
import LkwDriveFilter from "../../_lkw-filter/lkw-drive-filter";
import LkwFuelFilter from "../../_lkw-filter/lkw-fuel-filter";
import LkwAxisFilter from "../../_lkw-filter/lkw-axis";
import LoadingSizeFilter from "../../_lkw-filter/lkw-loading-size";

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
            <View className="">
                <LkwWeightClassFilter />
            </View>
            <View className="flex items-center flex-row justify-center space-x-4">
            <View className="w-1/2">
                    <LkwExtraTypeFilter />
                </View>
                <View className="w-1/2">
                <LkwLoadingTypeFilter />
                </View>
            </View>
            <View className="flex items-center flex-row justify-center space-x-4">
            <View className="w-1/2">
                    <LkwDriveFilter />
                </View>
                <View className="w-1/2">
                <LkwFuelFilter />
                </View>
            </View>
            <View className="">
                <LkwAxisFilter />
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
            <View className="mt-4">
                <LoadingSizeFilter />
            </View>
        </View>
    );
}

export default LkwAttributesRender;