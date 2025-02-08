import { userTable } from "@/db/schema";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ChangeProfilePic from "./_account-settings/change-profilepic";
import ChangeName from "./_account-settings/change-name";


interface AccountPartProps {
    currentUser : typeof userTable.$inferSelect;
}

const AccountPart : React.FC<AccountPartProps> = ({
    currentUser
}) => {
    return ( 
        <View>
            <View>
                <View className="flex flex-row items-center gap-x-4">
                    <FontAwesome5 name="user" size={20} color="white" />
                    <Text className="text-lg font-semibold text-gray-200">
                        Account verwalten
                    </Text>
                </View>
                <View className="mt-8 px-4">
                    <ChangeName 
                    savedName = {currentUser.name}
                    firstname={currentUser.vorname}
                    lastname={currentUser.nachname}
                    />
                </View>
                <View className="mt-8">
                    <ChangeProfilePic 
                    savedImage = {currentUser.image}
                    />
                </View>
                <View>
                    <Text>

                    </Text>
                </View>
            </View>
        </View>
     );
}
 
export default AccountPart;