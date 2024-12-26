import { useSavedSearchParams } from "@/store";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { format, isAfter, isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar, } from 'react-native-calendars';


import Popover from 'react-native-popover-view';

const SelectDateFilter = () => {

  const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

  const [currentStartDate, setCurrentStartDate] = useState<Date | null>(currentObject["periodBegin"] ? new Date(currentObject["periodBegin"]) : null );
  const [currentEndDate, setCurrentEndDate] = useState<Date | null>(currentObject["periodEnd"] ? new Date(currentObject["periodEnd"]) : null);

  useEffect(() => {
    if(currentStartDate) {
      
      changeSearchParams("periodBegin", currentStartDate?.toISOString())
    } else {
      deleteSearchParams("periodBegin")
    }
  },[currentStartDate])

  useEffect(() => {
    if(currentEndDate) {
      changeSearchParams("periodEnd", currentEndDate?.toISOString())
    } else {
      deleteSearchParams("periodEnd")
    }
  },[currentEndDate])

  useEffect(() => {
    if(currentStartDate && currentEndDate && isAfter(currentStartDate,currentEndDate)) {
      setCurrentEndDate(currentStartDate);
    }
  },[currentStartDate, currentEndDate])

  

    /* 
    useEffect(() => {
      if(!currentObject["periodBegin"]) {
        setCurrentStartDate(null)
      }
  },[currentObject["periodBegin"]])

  useEffect(() => {
      if(!currentObject["periodEnd"]) {
        setCurrentEndDate(null)
      }
  },[currentObject["periodEnd"]])
    */

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
                    currentObject["periodBegin"] ? (
                      <Text className="text-base text-gray-200 font-semibold">{format(new Date(currentObject["periodBegin"]), "dd.MM.yy")}</Text>
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
                
                markingType="custom"
                  style={{

                    height: 350,
                    backgroundColor: '#1c1f2b',
                  }}
                  markedDates={
                    currentStartDate ? {
                      [format(currentStartDate, "yyyy-MM-dd")]: { selected: true, selectedColor: '#1c1f2b',
                      customStyles : {
                        container : {
                          backgroundColor: '#3730A3'
                        }
                      } }
                    } : {}	
                  }
                  onDayPress={(day) => { 
                     isSameDay(new Date(day.dateString), new Date(currentStartDate)) ? 
                     setCurrentStartDate(null) : setCurrentStartDate(new Date(day.dateString));
                   }}
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
                  <TouchableOpacity className="w-full bg-[#171a24] p-4 rounded-md flex flex-row">
                    {
                    currentObject["periodEnd"] ? (
                      <Text className="text-base text-gray-200 font-semibold">{format(new Date(currentObject["periodEnd"]), "dd.MM.yy")}</Text>
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
                markingType={'custom'}
                  style={{

                    height: 350,
                    backgroundColor: '#1c1f2b',
                  }}
                  markedDates={
                    currentEndDate ? {
                      [format(currentEndDate, "yyyy-MM-dd")]: { 
                        selected: true, selectedColor: '#1c1f2b',
                        customStyles : {
                          container : {
                            backgroundColor: '#3730A3'
                          }
                        }
                      
                      }
                    } : {}	
                  }
                  onDayPress={(day) => { 
                    isSameDay(new Date(day.dateString), new Date(currentEndDate)) ? 
                    setCurrentEndDate(null) : setCurrentEndDate(new Date(day.dateString));
                  }}
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