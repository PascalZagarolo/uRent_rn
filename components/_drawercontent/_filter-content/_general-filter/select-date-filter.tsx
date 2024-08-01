import { Feather, FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import Popover from 'react-native-popover-view';

const SelectDateFilter = () => {
    return ( 
        <View>
            <View className="">
            <View className="flex flex-row items-center gap-x-4 p-4 bg-[#171923]">
                <FontAwesome name="calendar" size={24} color="#fff" />
                <Text className="text-lg font-semibold text-gray-200">
                    Mietzeitraum
                </Text>
                
            </View>
            <View className="flex flex-row w-full mt-2 justify-center space-x-4 px-8">
                    <View className="w-1/2">
                        <Text className="text-base font-semibold text-gray-200">
                            Mietbeginn
                        </Text>
                        <Popover 
      from={(
        <TouchableOpacity className="w-full bg-[#1c1f2b] p-4 rounded-md flex flex-row">
          <Text className="text-base text-gray-200">Start</Text>
          <View className="ml-auto justify-end">
          <Feather name="calendar" size={24} color="gray"  />
          </View>
        </TouchableOpacity>
      )}>
        <Text>This is the contents of the popover</Text>
    </Popover>
                    </View>
                    <View className="w-1/2">
                        <Text className="text-base font-semibold text-gray-200">
                            Mietende
                        </Text>
                        <View className="flex flex-row w-full">
                        <Popover 
      from={(
        <TouchableOpacity className="w-full bg-[#1c1f2b] p-4 rounded-md flex flex-row">
          <Text className="text-base text-gray-200">Ende</Text>
          <View className="ml-auto justify-end">
          <Feather name="calendar" size={24} color="gray"  />
          </View>
        </TouchableOpacity>
      )}>
        <Text>This is the contents of the popover</Text>
    </Popover>
                        </View>
                    </View>
            </View>
        </View>
        </View>
     );
}
 
export default SelectDateFilter;