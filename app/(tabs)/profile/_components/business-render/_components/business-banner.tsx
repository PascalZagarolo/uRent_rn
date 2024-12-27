import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";

interface BusinessBannerRenderProps {
    thisImage: string | null;
    thisProfilePic: string | null
    thisUsername: string | null
    createdAt: string | null;
    setOpenImageDialog: (open: boolean) => void;
}

const BusinessBannerRender = ({ thisImage, thisProfilePic, thisUsername, createdAt, setOpenImageDialog }: BusinessBannerRenderProps) => {
    
    
    
    return (
        <View>
    <TouchableOpacity className="" onPress={() => {setOpenImageDialog(true)}}>
        <Image
            source={{ uri: thisImage }}
            className="w-full h-48 border-b border-black"
        />
    </TouchableOpacity>

    {/* Profile and Username Section */}
    <View className="absolute top-36 left-2 flex flex-row gap-x-8">
        {/* Profile Picture */}
        <View className="w-1/3">
            <Image
                source={{ uri: thisProfilePic }}
                className="w-28 h-28 rounded-full border border-black"
            />
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
    );
}

export default BusinessBannerRender;