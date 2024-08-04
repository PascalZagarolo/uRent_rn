import { View } from "react-native";
import TrailerTypeFilter from "../../_trailer-filter/trailer-type-filter";
import TrailerExtraTypeFilter from "../../_trailer-filter/trailer-extra-type-filter";
import LkwLoadingTypeFilter from "../../_lkw-filter/lkw-loading-type-filter";
import TrailerLoadingTypeFilter from "../../_trailer-filter/trailer-loading-type-filter";
import TrailerBrakeFilter from "../../_trailer-filter/trailer-brake-filter";
import TrailerCouplingFilter from "../../_trailer-filter/trailer-coupling-filter";
import LkwAxisFilter from "../../_lkw-filter/lkw-axis";
import TrailerWeightClassFilter from "../../_trailer-filter/trailer-weightclass-filter";
import InitialFilter from "../../_pkw-filter/initial-filter";
import LoadingRoomFilter from "../../_pkw-filter/loading-room-filter";
import LoadingSizeFilter from "../../_lkw-filter/lkw-loading-size";

const TrailerAttributesRender = () => {
    return (
        <View>
            <View className="flex items-center flex-row justify-center space-x-4">
                <View className="w-1/2">
                    <TrailerTypeFilter />
                </View>
                <View className="w-1/2">
                    <TrailerExtraTypeFilter />
                </View>
            </View>
            <View className="flex items-center flex-row justify-center space-x-4">
                <View className="w-1/2">
                    <TrailerLoadingTypeFilter />
                </View>
                <View className="w-1/2">
                    <TrailerBrakeFilter />
                </View>
            </View>
            <View className="flex items-center flex-row justify-center space-x-4">
                <View className="w-1/2">
                    <TrailerCouplingFilter />
                </View>
                <View className="w-1/2">
                    
                </View>
            </View>
            <View className="">
                <LkwAxisFilter />
            </View>
            <View>
                <TrailerWeightClassFilter />
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

export default TrailerAttributesRender;