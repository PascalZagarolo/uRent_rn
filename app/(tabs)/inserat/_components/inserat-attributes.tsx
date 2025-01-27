import { inserat } from "@/db/schema";
import { Text, View } from "react-native";
import PkwAttributeRender from "./inserat-attributes/pkw-attributes";

import LkwAttributeRender from "./inserat-attributes/lkw-attributes";
import TransportAttributeRender from "./inserat-attributes/transport-attributes";
import TrailerAttributeRender from "./inserat-attributes/trailer-attributes";

interface InseratAttributesProps {
    thisInserat : typeof inserat.$inferSelect & { pkwAttribute, lkwAttribute, transportAttribute, trailerAttribute }
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
                        "LKW" : <LkwAttributeRender attributes={thisInserat?.lkwAttribute} />,
                        "TRANSPORT" : <TransportAttributeRender attributes={thisInserat?.transportAttribute} />,
                        "TRAILER" : <TrailerAttributeRender attributes={thisInserat?.trailerAttribute} />
                    }[thisInserat?.category]
                }                
            </View>
        </View>
    </View>
     );
}
 
export default InseratAttributes;