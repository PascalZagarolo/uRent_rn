import { businessAddress } from "@/db/schema";
import { MapPinCheckInsideIcon, MountainIcon, PlusCircleIcon, PlusIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";


interface LocationTabProps {
    foundAddresses : typeof businessAddress.$inferSelect[];
    isOwn : boolean;
    setOpenLocation : (open : boolean, id : string) => void;
}

const LocationTab = ({ foundAddresses, isOwn, setOpenLocation } : LocationTabProps) => {
    
    const RenderedAddress = (title : string, postalCode : string, city : string, street : string, imageUrl : string) => {
        return (
            <View>
                <View>
                    <Image
                        source={{ uri: imageUrl }}
                        className="w-full h-40 object-cover rounded-t-md" 
                        />
                </View>
                <View className=" bg-[#2a2f3d] shadow-xl rounded-b-md p-4">
                    <View className="flex flex-row items-center">
                        <Text className="text-lg font-semibold text-gray-200 w-3/4 line-clamp-1">
                            {title}
                        </Text>
                       
                    </View>
                    <View className="mt-2 flex flex-row items-center">
                        <MapPinCheckInsideIcon className="w-4 h-4 text-rose-600" />
                        <Text className="ml-4 text-gray-200 font-semibold text-base">
                            {street}, {postalCode}  {city}
                        </Text>
                    </View>
                    
                </View>
            </View>
        )
    }

    return ( 
        <View>
            <View className="flex flex-row items-center">
            <MountainIcon className="w-4 h-4 mr-4" />
            {isOwn && (
                <Text className="text-lg font-semibold text-gray-200">
                    Standort
                </Text>
            )}
                {isOwn && (
                    <TouchableOpacity className="ml-auto p-2.5" onPress={() => {setOpenLocation(true, null)}}>
                        <PlusCircleIcon className="w-4 h-4 ml-auto text-gray-200" />
                    </TouchableOpacity>
                )}
            </View>
            {foundAddresses?.length > 0 ? (
                <View className="mt-8 space-y-8">
                {foundAddresses.map(address => (
                    RenderedAddress(address.title, String(address.postalCode ?? ""), address.city, address.street, address.image)
                ))}
            </View>
            ) : (
                <View className="mt-8 space-y-8">
                    <Text className="text-base text-gray-200/60">
                        Keine Standorte hinzugefügt..
                        
                    </Text>
            </View>
            )}
        </View>
     );
}
 
export default LocationTab;