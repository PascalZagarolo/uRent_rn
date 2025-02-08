import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";

interface BusinessBannerRenderProps {
    thisImage: string | null;
    thisProfilePic: string | null
    thisUsername: string | null
    createdAt: string | null;
    setOpenImageDialog: (open: boolean) => void;
    setOpenDialogBanner: (open: boolean) => void;
}

const BusinessBannerRender = ({ thisImage, thisProfilePic, thisUsername, createdAt, setOpenImageDialog, setOpenDialogBanner }: BusinessBannerRenderProps) => {



    return (
        <View className="w-full">
    <TouchableOpacity onPress={() => { setOpenDialogBanner(true) }}>
        {thisImage ? (
            <Image
                source={{ uri: thisImage }}
                className="w-full h-48 border-b border-black"
            />
        ) : (
            <View className="w-full h-48 bg-gray-800 border-b border-black" />
        )}
    </TouchableOpacity>

    {/* Profile and Username Section */}
    <View className="absolute top-36 left-2 flex flex-row gap-x-4 items-center">
        {/* Profile Picture */}
        <View className="w-1/3">
            <TouchableOpacity
                className="rounded-full shadow-lg w-28 h-28 border border-gray-900"
                onPress={() => { setOpenImageDialog(true) }}
            >
                <Image
                    source={{
                        uri: thisProfilePic ? thisProfilePic :
                            "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
                    }}
                    className="w-full h-full rounded-full"
                />
            </TouchableOpacity>
        </View>

        {/* Username */}
        <View className="flex-1 mt-14">
            <Text
                className="text-xl font-semibold text-gray-200 break-all"
                numberOfLines={2} // Limits the username to a single line
                ellipsizeMode="tail" // Adds "..." if the text overflows
            >
                {`${thisUsername}`} 
            </Text>
            <Text className="text-sm text-gray-400">
                Mitglied seit {createdAt}
            </Text>
        </View>
    </View>
</View>

    );
}

export default BusinessBannerRender;