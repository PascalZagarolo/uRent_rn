import { View } from "react-native";
import BrandTypeFilter from "../../_pkw-filter/brand-and-type";
import SeatsFilter from "../../_pkw-filter/seats-filter";
import AhkFilter from "../../_pkw-filter/ahk-filter";
import FuelFilter from "../../_pkw-filter/fuel-filter";

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
            <View className="flex items-center flex-row">
                <View className="w-1/2">
                    <FuelFilter />
                </View>
            </View>
        </View>
     );
}
 
export default PkwAttributeRender;