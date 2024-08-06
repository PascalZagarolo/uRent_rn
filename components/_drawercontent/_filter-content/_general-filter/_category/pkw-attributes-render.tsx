import { View } from "react-native";
import BrandTypeFilter from "../../_pkw-filter/brand-and-type";
import SeatsFilter from "../../_pkw-filter/seats-filter";
import AhkFilter from "../../_pkw-filter/ahk-filter";
import FuelFilter from "../../_pkw-filter/fuel-filter";
import TransmissionFilter from "../../_pkw-filter/transmission-filter";
import DoorsFilter from "../../_pkw-filter/doors-filter";
import PowerFilter from "../../_pkw-filter/power-filter";
import InitialFilter from "../../_pkw-filter/initial-filter";
import LoadingRoomFilter from "../../_pkw-filter/loading-room-filter";


const PkwAttributeRender = () => {
    return ( 
        <View>
            
            <View>
                <BrandTypeFilter />
            </View>
            <View>
                <SeatsFilter />
            </View>
            <View>
                <AhkFilter />
            </View>
            <View className="flex items-center flex-row justify-center space-x-4">
            <View className="w-1/2">
                    <FuelFilter />
                </View>
                <View className="w-1/2">
                <TransmissionFilter />
                </View>
            </View>
            <View>
                <DoorsFilter />
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
 
export default PkwAttributeRender;