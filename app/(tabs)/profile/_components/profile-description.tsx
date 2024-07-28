import { Text, View } from "react-native";

interface ProfileDescriptionProps {
    thisDescription : string;
    thisName : string;
}

const ProfileDescription : React.FC<ProfileDescriptionProps> = ({
    thisDescription,
    thisName
}) => {
    return ( 
        <View className="p-4">
            <View>
                <Text className="text-lg font-semibold text-gray-200">
                über {thisName}
                </Text>
            </View>
            <View>
                <Text className="text-sm text-gray-200/90 font-medium">
                {thisDescription}
                </Text>
            </View>
        </View>
     );
}
 
export default ProfileDescription;