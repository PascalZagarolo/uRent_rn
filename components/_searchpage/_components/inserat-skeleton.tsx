import { View, Text } from 'react-native';


const InseratSkeleton = () => {
    return (
        <View className="bg-[#262a3bc5] w-full shadow-lg">
            <View>
                {/* Top bar skeleton */}
                <View className="flex flex-row gap-x-4 items-center px-4 py-4 w-full">
                    <View className="w-6 h-6 bg-gray-500 rounded-full animate-pulse" />
                    <View className="flex-1 h-5 bg-gray-600 rounded-md animate-pulse" />
                    <View className="w-6 h-6 bg-gray-500 rounded-md animate-pulse" />
                </View>

                {/* Image skeleton */}
                <View className="px-2">
                    <View className="w-full h-40 rounded-t-lg bg-gray-700 animate-pulse" />
                </View>

                {/* Address section skeleton */}
                <View className="bg-[#262a3bc5] w-full p-4 py-4">
                    <View className="flex flex-row gap-x-2 items-center">
                        <View className="w-5 h-5 bg-gray-500 rounded-full animate-pulse" />
                        <View className="flex-1 h-4 bg-gray-600 rounded-md animate-pulse" />
                    </View>
                </View>

                {/* Price skeleton */}
                <View className="w-full bg-[#262a3bc5] px-4 pb-2">
                    <View className="h-5 w-24 bg-gray-600 rounded-md animate-pulse" />
                </View>

                {/* User profile skeleton */}
                <View className="flex flex-row py-2.5 px-2 items-center gap-x-4 bg-[#1d1e25d7]">
                    <View className="w-10 h-10 bg-gray-500 rounded-full animate-pulse" />
                    <View className="flex-1 h-5 bg-gray-600 rounded-md animate-pulse" />
                </View>
            </View>
        </View>
    );
};

export default InseratSkeleton;
