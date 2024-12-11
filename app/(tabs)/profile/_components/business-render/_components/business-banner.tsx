import { Image, Text, View } from "react-native";

interface BusinessBannerRenderProps {
    thisImage: string | null;
    thisProfilePic: string | null
}

const BusinessBannerRender = ({ thisImage, thisProfilePic }: BusinessBannerRenderProps) => {
    return (
        <View>
            <View>
                <View>
                    <Image
                        source={{ uri: thisImage }}
                        className="w-full h-52"
                    />
                </View>
                <View className="absolute top-40 left-4">
                    <Image
                        source={{ uri: thisProfilePic }}
                        className="w-32 h-32 rounded-full border-4 border-black"
                    />
                </View>
            </View>
        </View>
    );
}

export default BusinessBannerRender;