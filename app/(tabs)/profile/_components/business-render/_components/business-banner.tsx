import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import Popover from "react-native-popover-view";

interface BusinessBannerRenderProps {
    isOwner: boolean;
    thisImage: string | null;
    thisProfilePic: string | null
    thisUsername: string | null
    createdAt: string | null;
    setOpenImageDialog: (open: boolean) => void;
    setOpenDialogBanner: (open: boolean) => void;
    setOpenReportModal: (open: boolean) => void;
}

const BusinessBannerRender = ({ isOwner, thisImage, thisProfilePic, thisUsername, createdAt, setOpenImageDialog, setOpenReportModal, setOpenDialogBanner }: BusinessBannerRenderProps) => {



    return (
        <View className="w-full">
            <TouchableOpacity onPress={() => {
                if (isOwner) {
                    setOpenDialogBanner(true)
                }
            }}>
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
            <View className="absolute top-36 left-2 flex flex-row  gap-x-2">
                {/* Profile Picture */}
                <View className="w-1/3">
                    <TouchableOpacity
                        className="rounded-full shadow-lg w-28 h-28 border border-gray-900"
                        onPress={() => {
                            if (isOwner) {
                                setOpenImageDialog(true)
                            }
                        }}
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
                <View className="flex flex-row items-center px-2 w-8/12">
                    <TouchableOpacity className="shadow-lg space-x-4 bg-indigo-800 p-2.5 w-8/12  rounded-md flex flex-row items-center">
                        <FontAwesome name="send"
                            size={16} color={"white"}
                        />
                        <Text className="text-gray-200 font-semibold">
                            Nachricht senden
                        </Text>
                    </TouchableOpacity>
                    
                    <Popover
                    
                        from={(
                            <TouchableOpacity className="shadow-lg   bg-[#30334d] p-2.5 w-10 rounded-lg flex flex-row items-center">
                        <MaterialCommunityIcons name="dots-vertical"
                            size={20} color={"white"}
                        />

                    </TouchableOpacity>
                        )}>
                            <View className="bg-[#30334d] rounded-md ">
                            <TouchableOpacity className="rounded-md flex flex-row items-center bg-[#30334d]  w-48 p-2.5 space-x-4 "
                            onPress={() => {setOpenReportModal(true)}}
                            >
                                <MaterialCommunityIcons name="alert" 
                                size={16} color={"white"}
                                />
                                <Text className="text-gray-200 text-sm font-semibold">
                                    Nutzer melden
                                </Text>
                            </TouchableOpacity>
                            </View>
                    </Popover>
                </View>
            </View>
            <View className="flex-1 mt-20 px-4">
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

    );
}

export default BusinessBannerRender;