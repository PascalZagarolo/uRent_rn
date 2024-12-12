import { Text, View } from "react-native";

interface BusinessdescriptionProps {
    thisDescription : string;
    isOwnProfile : boolean;
    username : string;
}

const Businessdescription = ({ thisDescription, isOwnProfile, username } : BusinessdescriptionProps) => {
    return ( 
        <View className="flex flex-col">
            <View>
                <Text className="text-base text-gray-200 font-semibold">
                    über {username}
                </Text>
            </View>
            <View className="">
                <Text className="text-gray-200/80 text-sm">
                    {thisDescription}
                </Text>
            </View>
        </View>
     );
}
 
export default Businessdescription;