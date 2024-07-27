import { inserat } from "@/db/schema";
import { Text, View, ScrollView  } from "react-native";

import MoreContentCard from "./more-content-card";
import { FontAwesome } from "@expo/vector-icons";


interface InseratMoreContentProps {
    username : string;
    foundInserat : typeof inserat.$inferSelect[];
}

const InseratMoreContent : React.FC<InseratMoreContentProps> = ({
    username,
    foundInserat
}) => {

    const matchingInserate = foundInserat.filter(inserat => inserat.isPublished);

    return ( 
        <View>
            <View>
                <Text className="text-lg text-gray-200 font-semibold">
                    Weitere Inhalte ({matchingInserate.length})
                </Text>
                <View className=" flex flex-row items-center space-x-4" >
                    <View className="">
                    <FontAwesome name="user-circle" size={20} color="white" />
                    </View>
                    <Text className="text-sm text-gray-200/80 font-semibold line-clamp-1 break-all " numberOfLines={1}>
                    {username} 
                    </Text>
                    </View>
            </View>
            <View className="mt-4">
                <ScrollView className="max-h-72 border-t-2 border-b-2 border-gray-600  space-y-4">
                    {matchingInserate.map(inserat => (
                        <View className="">
                            <MoreContentCard 
                        thisTitle={inserat.title}
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