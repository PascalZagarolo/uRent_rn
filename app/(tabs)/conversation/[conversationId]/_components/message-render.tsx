import { cn } from "@/~/lib/utils";
import { format } from "date-fns";
import { Text, View, Image } from "react-native";

interface MessageRenderProps {
    content?: string;
    imageUrl?: string;
    isOwn?: boolean;
    date?: any;
}

const MessageRender: React.FC<MessageRenderProps> = ({
    content,
    imageUrl,
    isOwn,
    date
}) => {
    return (
        <View
            className={cn(
                "flex flex-col max-w-[80%] mb-2",
                isOwn ? "ml-auto items-end" : "items-start"
            )}
        >
            <View
                className={cn(
                    "px-4 py-2 rounded-lg",
                    isOwn
                        ? "bg-[#1F2332] rounded-tr-none"
                        : "bg-[#262b3b] rounded-tl-none"
                )}
            >
                {imageUrl && (
                    <Image
                        source={{ uri: imageUrl }}
                        className="w-48 h-48 mb-2 rounded-lg object-fill"
                    />
                )}
                <Text
                    className={cn(
                        "text-base",
                        isOwn ? "text-gray-200" : "text-gray-300"
                    )}
                >
                    {content}
                </Text>
            </View>
            <Text className="text-xs text-gray-200/60 mt-1">
                {format(date, "HH:mm")}
            </Text>
        </View>
    );
};

export default MessageRender;
