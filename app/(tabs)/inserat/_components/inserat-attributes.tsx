import { inserat } from "@/db/schema";
import { Text, View } from "react-native";
import PkwAttributeRender from "./inserat-attributes/pkw-attributes";
import { pkwAttribute } from '../../../../db/schema';

interface InseratAttributesProps {
    thisInserat : typeof inserat.$inferSelect
}

const InseratAttributes : React.FC<InseratAttributesProps> = ({
    thisInserat
}) => {
    return ( 
    <View className="border-t border-b border-gray-800">
        <View className="p-4">
            <View className="">
                <Text className="text-lg font-semibold text-gray-200">
                    Fahrzeugattribute
                </Text>
            </View>
            <View>
                {
                    {
                        "PKW" : <PkwAttributeRender attributes={thisInserat?.pkwAttribute} />,

                    }[thisInserat?.category]
                }                
            </View>
        </View>
    </View>
     );
}
 
export default InseratAttributes;