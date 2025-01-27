import { priceprofile } from "@/db/schema";

import { Text, View } from "react-native";


interface InseratPriceProfileDialogProps {
  thisPriceProfile: typeof priceprofile.$inferSelect
}

const InseratPriceProfileDialog: React.FC<InseratPriceProfileDialogProps> = ({
  thisPriceProfile
}) => {
  return (
    <View className="w-full bg-[#1F2332] rounded-md p-2 mt-2">
      <View>
        <Text className="text-sm font-semibold text-gray-200">
          {
            thisPriceProfile?.title
          }
        </Text>
      </View>
      <View className="mt-2 flex flex-row items-center">
          <Text className="w-1/2 font-normal text-gray-300">
            Preis : <Text className="text-md font-semibold text-gray-200">
            {thisPriceProfile?.price} €
            </Text>
          </Text>

          <Text className="w-1/2 font-normal text-gray-300">
            Freikilometer : <Text className="text-md font-semibold text-gray-200">
            {thisPriceProfile?.freeMiles} km
            </Text>
          </Text>
      </View>
      
    </View>
  );
}

export default InseratPriceProfileDialog;