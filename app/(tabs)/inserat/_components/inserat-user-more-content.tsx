import { images, inserat } from "@/db/schema";
import { Text, View, ScrollView } from "react-native";

import MoreContentCard from "./more-content-card";
import { FontAwesome } from "@expo/vector-icons";


interface InseratMoreContentProps {
    username: string;
    foundInserat: typeof inserat.$inferSelect[] & { images: typeof images.$inferSelect } | any;
}

const InseratMoreContent: React.FC<InseratMoreContentProps> = ({
    username,
    foundInserat
}) => {

    const matchingInserate = foundInserat.filter(inserat => inserat.isPublished);

    return (
        <View>
            <View className="mb-2">
                <Text className="text-lg text-gray-200 font-semibold">
                    Weitere Inhalte ({matchingInserate?.length})
                </Text>
                <Text className="text-sm text-gray-200/60 font-semibold line-clamp-1 break-all underline" numberOfLines={1}>
                    von {username}
                </Text>
            </View>
            <View className="max-h-72">
                <ScrollView className="border-t-2 border-b-2 border-gray-600 space-y-4"
                nestedScrollEnabled
                >
                    {matchingInserate.map(inserat => (
                        <View className="" key={inserat?.id ?? ""}>
                            <MoreContentCard
                                thisTitle={inserat.title}
                                thisPrice={inserat.price}
                                inseratId={inserat.id}
                                thisImages={inserat.images}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

export default InseratMoreContent;