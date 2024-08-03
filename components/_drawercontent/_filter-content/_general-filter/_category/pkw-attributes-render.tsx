import { View } from "react-native";
import BrandTypeFilter from "../../_pkw-filter/brand-and-type";
import SeatsFilter from "../../_pkw-filter/seats-filter";
import AhkFilter from "../../_pkw-filter/ahk-filter";

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
        </View>
     );
}
 
export default PkwAttributeRender;