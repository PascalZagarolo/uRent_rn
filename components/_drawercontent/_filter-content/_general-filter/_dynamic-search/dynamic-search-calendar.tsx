import { useSavedSearchParams } from "@/store";
import { cn } from "@/~/lib/utils";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { format, isAfter, isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';


import Popover from 'react-native-popover-view';



interface DynamicSearchCalendarProps {
  disabled?: boolean;
}

const DynamicSearchCalendar: React.FC<DynamicSearchCalendarProps> = ({
  disabled
}) => {

  const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

  const currentObject = useSavedSearchParams((state) => state.searchParams)

  const [currentStartDate, setCurrentStartDate] = useState<Date | null>(currentObject["startDateDynamic"] ? new Date(currentObject["startDateDynamic"]) : null);
  const [currentEndDate, setCurrentEndDate] = useState<Date | null>(currentObject["endDateDynamic"] ? new Date(currentObject["endDateDynamic"]) : null);

  useEffect(() => {
    if (currentStartDate) {
      console.log(currentStartDate + "!")
      changeSearchParams("startDateDynamic", currentStartDate?.toISOString())
    } else {
      deleteSearchParams("startDateDynamic")
    }
  }, [currentStartDate])

  useEffect(() => {
    if (currentEndDate) {
      changeSearchParams("endDateDynamic", currentEndDate?.toISOString())
    } else {
      deleteSearchParams("endDateDynamic")
    }
  }, [currentEndDate])

  useEffect(() => {
    if (currentStartDate && currentEndDate && isAfter(currentStartDate, currentEndDate)) {
      setCurrentEndDate(currentStartDate);
    }
  }, [currentStartDate, currentEndDate])

  

  /* 
  useEffect(() => {
    if(!currentObject["startDateDynamic"]) {
      setCurrentStartDate(null)
    }
},[currentObject["startDateDynamic"]])

useEffect(() => {
    if(!currentObject["endDateDynamic"]) {
      setCurrentEndDate(null)
    }
},[currentObject["endDateDynamic"]])
  */

  return (
    <View>
      <View className="">

        <View className="flex flex-row w-full mt-2 justify-center space-x-4 px-8">
          <View className="w-1/2">
            <Text className="text-base font-semibold text-gray-200">
              Mietbeginn
            </Text>
            <Popover
              from={(
                <TouchableOpacity className={cn("w-full bg-[#171a24] p-4 rounded-md flex flex-row", disabled && "bg-[#1c212c]")}>
                  {
                    currentObject["startDateDynamic"] ? (
                      <Text className="text-base text-gray-200 font-semibold">{format(new Date(currentObject["startDateDynamic"]), "dd.MM.yy")}</Text>
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
  
}}
theme={{
  calendarBackground: '#1c1f2b',
  dayTextColor: '#ffffff',
  monthTextColor: '#ffffff',
  textSectionTitleColor: '#ffffff',
  textDisabledColor: '#e5e7eb66'
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
                  <TouchableOpacity className={cn("w-full bg-[#171a24] p-4 rounded-md flex flex-row", disabled && "bg-[#1c212c]")}>
                    {
                      currentObject["endDateDynamic"] ? (
                        <Text className="text-base text-gray-200 font-semibold">{format(new Date(currentObject["endDateDynamic"]), "dd.MM.yy")}</Text>
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
                    markingType="custom"
                    style={{
     
                      height: 350,
                      
                    }}
                    theme={{
                      calendarBackground: '#1c1f2b',
                      dayTextColor: '#ffffff',
                      monthTextColor: '#ffffff',
                      textSectionTitleColor: '#ffffff',
                      textDisabledColor: '#e5e7eb66'
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

export default DynamicSearchCalendar;