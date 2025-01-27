import { inserat } from "@/db/schema";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { format } from "date-fns";



import { useRouter } from "expo-router";
import InseratOptions from "./inserat-options";

interface InseratRenderProps {
    thisInserat: typeof inserat.$inferSelect & { user, address, images };
    currentUserId?: string;
    isFaved : boolean;
}

const InseratRender: React.FC<InseratRenderProps> = ({
    thisInserat,
    currentUserId,
    isFaved
}) => {

    const matchingIcon = (usedCategory: string) => {
        switch (usedCategory) {
            case "PKW":
                return <FontAwesome5 name="car" size={20} color="white" />;
            case "LKW":
                return <FontAwesome name="truck" size={20} color="white" />;
            case "TRANSPORT":
                return <MaterialCommunityIcons name="van-utility" size={20} color="white" />;
            case "TRAILER":
                return <MaterialCommunityIcons name="truck-trailer" size={20} color="white" />;

        }
    }

    function separatePrice(priceString) {
        // Remove the currency symbol and trim any extra spaces
        let price = priceString.replace('€', '').trim();

        // Split the price into integer and decimal parts
        let [integerPart, decimalPart] = price.split('.');

        // If there is no decimal part, set it to '00'
        if (!decimalPart) {
            decimalPart = '00';
        }

        // Return the integer and decimal parts
        return {
            integerPart: integerPart,
            decimalPart: decimalPart
        };
    }

    let { integerPart, decimalPart } = separatePrice(thisInserat?.price);

    const router = useRouter()

    return (
        <View>
            <View>
                <View className="">
                    <TouchableOpacity className="p-4 flex flex-row items-center" onPress={() => { router.push("/") }}>
                        <MaterialCommunityIcons className="w-4 h-4 text-gray-200" name="arrow-left" color={"white"} size={24} />
                        <Text className="text-sm ml-4 text-gray-200/80">
                            Zurück zur Startseite
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="p-4 py-4 w-full flex flex-row bg-[#1D1F2B] items-center">
                    <View className="w-2/12">
                        {matchingIcon(thisInserat?.category)}
                    </View>
                    <Text className="text-xl font-semibold text-gray-200 w-10/12 break-all line-clamp-1" numberOfLines={1}>
                        {thisInserat?.title}
                    </Text>
                </View>
                <View className="flex flex-row items-center p-2 ">
                    <View>
                        <Text className="text-gray-200 font-semibold">
                            <Text className="font-normal">erstellt am: </Text>{format(new Date(thisInserat?.createdAt), "dd.MM.yyyy")}
                        </Text>
                    </View>
                </View>
                {thisInserat?.images?.length > 0 && (
                    <View className="">
                    <Image
                        className="w-full h-60  rounded-t-md"
                        source={{
                            uri: thisInserat?.images[0]?.url,
                        }}
                    />
                </View>
                )}

                <View className="p-4 flex flex-row items-center">
                    <View className="mr-4">
                        <FontAwesome name="map-marker" size={24} color="red" className="mr-4" />
                    </View>
                    <Text className="flex flex-row text-base font-semibold items-center w-full break-all line-clamp-1 text-gray-200" numberOfLines={1}>
                        {thisInserat?.address?.postalCode} | {thisInserat?.address?.locationString}
                    </Text>
                </View>
                <View className="px-4 flex justify-end ml-auto items-center">
                    <Text className="text-gray-200 font-semibold text-xl items-center">
                        {integerPart}.<Text className="text-sm">{decimalPart}</Text> €
                    </Text>
                </View>
                <View className="py-2">
                    <InseratOptions
                    inseratId={thisInserat?.id}
                    currentUserId={currentUserId}
                    inseratUserId={thisInserat?.userId}
                    isFaved={isFaved}
                    />
                </View> 
                {/* <View>
                    <InseratPriceProfiles
                        thisInserat={thisInserat}
                    />
                </View>
                <View className="p-8">
                    <InseratConditions
                        thisInserat={thisInserat}
                    />
                </View>
                <View className="p-4">
                    <InseratContactOptions
                        thisInserat={thisInserat}
                    />
                </View>
                <View className="p-4">
                    <InseratDescription
                        description={thisInserat?.description}
                    />
                </View>
                <View className="">
                    <InseratAttributes
                        thisInserat={thisInserat}
                    />
                </View>
                <View className="p-4">
                    <InseratProfile
                        thisUser={thisInserat.user}
                    />
                </View>
                <View className="p-4">
                    <InseratMoreContent
                        username={thisInserat.user.name}
                        foundInserat={thisInserat.user.inserat}
                    />
                </View> */}
            </View>
        </View>
    );
}

export default InseratRender;