import { Feather, FontAwesome } from "@expo/vector-icons";
import { format } from "date-fns";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';


import Popover from 'react-native-popover-view';

const SelectDateFilter = () => {

  const [currentStartDate, setCurrentStartDate] = useState<Date | null>(null);
  const [currentEndDate, setCurrentEndDate] = useState<Date | null>(null);

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
                <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row">
                  {
                    currentStartDate ? (
                      <Text className="text-base text-gray-200 font-semibold">{format(new Date(currentStartDate), "dd.MM.yy")}</Text>
                    ) : (
                      <Text className="text-base text-gray-200/60">Start</Text>
                    )
                  }
                  <View className="ml-auto justify-end">
                    <Feather name="calendar" size={24} color="gray" />
                  </View>
                </TouchableOpacity>
              )}>
              <View className="w-[320px] ">
                <Calendar
                  style={{

                    height: 350,
                    backgroundColor: '#1c1f2b',
                  }}
                  markedDates={
                    currentStartDate ? {
                      [format(currentStartDate, "yyyy-MM-dd")]: { selected: true, selectedColor: '#1c1f2b' }
                    } : {}	
                  }
                  onDayPress={(day) => { setCurrentStartDate(new Date(day.dateString)) }}
                />
              </View>
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
                    {
                    currentEndDate ? (
                      <Text className="text-base text-gray-200 font-semibold">{format(new Date(currentEndDate), "dd.MM.yy")}</Text>
                    ) : (
                      <Text className="text-base text-gray-200/60">Ende</Text>
                    )
                }
                    <View className="ml-auto justify-end">
                      <Feather name="calendar" size={24} color="gray" />
                    </View>
                  </TouchableOpacity>
                )}>
                <View className="w-[320px] ">
                <Calendar
                  style={{

                    height: 350,
                    backgroundColor: '#1c1f2b',
                  }}
                  markedDates={
                    currentEndDate ? {
                      [format(currentEndDate, "yyyy-MM-dd")]: { selected: true, selectedColor: '#1c1f2b' }
                    } : {}	
                  }
                  onDayPress={(day) => { setCurrentEndDate(new Date(day.dateString)) }}
                />
              </View>
              </Popover>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SelectDateFilter;