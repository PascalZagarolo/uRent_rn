import { Image, Text, View } from "react-native";

interface BusinessBannerRenderProps {
    thisImage: string | null;
    thisProfilePic: string | null
    thisUsername: string | null
    createdAt: string | null
}

const BusinessBannerRender = ({ thisImage, thisProfilePic, thisUsername, createdAt }: BusinessBannerRenderProps) => {
    return (
        <View>
    {/* Banner Section */}
    <View>
        <Image
            source={{ uri: thisImage }}
            className="w-full h-48 border-b border-black"
        />
    </View>

    {/* Profile and Username Section */}
    <View className="absolute top-32 left-2 flex flex-row gap-x-8">
        {/* Profile Picture */}
        <View className="w-1/3">
            <Image
                source={{ uri: thisProfilePic }}
                className="w-32 h-32 rounded-full border border-black"
            />
        </View>

        {/* Username */}
        <View className="mt-20">
            <Text className="text-xl font-semibold text-gray-200">
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