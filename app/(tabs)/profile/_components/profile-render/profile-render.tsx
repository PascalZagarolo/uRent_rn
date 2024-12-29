import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import ProfileDescription from "../profile-description";

interface ProfileRenderFullProps {

    thisProfilePic: string | null
    thisUsername: string | null
    createdAt: string | null;
    setOpenImageDialog: (open: boolean) => void;
    thisDescription: string | null;
    ownProfile: boolean;
}

const ProfileRenderFull = ({ thisProfilePic, thisUsername, createdAt, setOpenImageDialog, thisDescription, ownProfile }: ProfileRenderFullProps) => {



    return (
        <View>
            <View>


                <View className="w-full h-48 bg-gray-800 border-b border-black" />



                {/* Profile and Username Section */}
                <View className="absolute top-36 left-2 flex flex-row gap-x-8">
                    {/* Profile Picture */}
                    <View className="w-1/3">
                        <TouchableOpacity className="" onPress={() => { setOpenImageDialog(true) }}>
                            <Image
                                source={{ uri: thisProfilePic ? thisProfilePic : "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg" }}
                                className="w-28 h-28 rounded-full border border-black"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Username */}
                    <View className="mt-14">
                        <Text className="text-xl font-semibold text-gray-200 break-all w-2/3">
                            {thisUsername}
                        </Text>
                        <Text className="text-sm text-gray-200/60">
                            Mitglied seit {createdAt}
                        </Text>
                    </View>
                </View>
            </View>
            <View className="mt-32 ">
                <ProfileDescription thisDescription={thisDescription}  thisName={thisUsername} />
            </View>
        </View>
    );
}

export default ProfileRenderFull;