import { inserat } from "@/db/schema";
import { FontAwesome, Foundation, MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface InseratContactOptionsProps {
    thisInserat : typeof inserat.$inferSelect
}

const InseratContactOptions : React.FC<InseratContactOptionsProps> = ({
    thisInserat
}) => {
    return ( 
        <View className="">
            <View>
                <Text className=" text-lg text-gray-200 font-semibold flex flex-row items-center">
                  <View className="mr-2">
                <MaterialIcons name="contacts" size={16} color="white" />
                </View>  Kontaktinformationen
                </Text>
            </View>
            {thisInserat?.emailAddress || thisInserat?.phoneNumber ? (
                <View className=" w-full px-1 mt-4 space-y-2">
                {thisInserat?.emailAddress && (
                    <View className="w-full flex flex-row items-center gap-x-2">
                    <View>
                        <Foundation name="mail" size={20} color="white" />
                        </View>
                        <Text className="w-full  text-sm font-medium text-gray-200 ">
                        
                        {thisInserat?.emailAddress}
                        </Text>
                    </View>
                )}
                
                {thisInserat?.phoneNumber && (
                    <View className="w-full flex flex-row items-center gap-x-2">
                    <View>
                        <FontAwesome name="phone" size={20} color="white" />
                        </View>
                        <Text className="w-full  text-sm font-medium text-gray-200 ">
                        
                        {thisInserat?.phoneNumber}
                        </Text>
                    </View>
                )}

            </View>
            ) : (
                <View className="mt-4">
                    <Text className="text-sm text-gray-200/60">
                        Keine Kontaktdaten hinterlegt..
                    </Text>
                </View>
            )}
        </View>
     );
}
 
export default InseratContactOptions;