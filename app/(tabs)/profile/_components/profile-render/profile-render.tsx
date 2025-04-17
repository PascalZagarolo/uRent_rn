import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import ProfileDescription from "./_components/profile-description";
import TransformProfile from "./_components/transform-profile";
import placeholderPicture from "@/assets/images";



interface ProfileRenderFullProps {
    imageUrl : string | null;
    thisProfilePic: string | null
    thisUsername: string | null
    createdAt: string | null;
    setOpenImageDialog: (open: boolean) => void;
    setOpenSwitchProfile: (open: boolean) => void;
    setOpenReportModal: (open: boolean) => void;
    thisDescription: string | null;
    ownProfile: boolean;
}

const ProfileRenderFull = ({ imageUrl, thisProfilePic, thisUsername, createdAt, setOpenImageDialog, thisDescription, ownProfile, setOpenSwitchProfile }: ProfileRenderFullProps) => {



    return (
        <View className="flex flex-col" >
            <View>

            {ownProfile && (
                    <View className="">
                    <TransformProfile 
                    setOpenSwitchProfile={setOpenSwitchProfile}
                    />
                </View>
                )}
                <View className="w-full h-48 bg-gray-800 border-b border-black" />



                {/* Profile and Username Section */}
                <View className="absolute top-64 left-2 flex flex-row gap-x-8">
                    {/* Profile Picture */}
                    <View className="w-1/3">
                        <TouchableOpacity className="" onPress={() => { setOpenImageDialog(true) }}>
                            <Image
                                source={{ uri: imageUrl ? imageUrl : placeholderPicture }}
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
            <View className="mt-24 px-4">
            <ProfileDescription thisDescription={thisDescription}  username={thisUsername} isOwnProfile={ownProfile} />
            </View>
            
        </View>
    );
}

export default ProfileRenderFull;