
import { booking, vehicle } from "@/db/schema";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { format, isAfter, isBefore, isSameDay } from "date-fns";
import { de } from "date-fns/locale";


import { ScrollView, Text, View } from "react-native";



interface CalenderDayDetailProps {
    day_date: Date;
    affectedBookings: typeof booking.$inferSelect[];
    isMulti?: boolean;
    vehicles?: typeof vehicle.$inferSelect[];
    showDialog?: boolean;
    setCompletelyUnaivalable : (value : boolean) => void;
    setIsPartiallyUnaivalable : (value : boolean) => void;
}

const CalenderDayDetail: React.FC<CalenderDayDetailProps> = ({
    day_date,
    affectedBookings,
    setCompletelyUnaivalable,
    setIsPartiallyUnaivalable,
    isMulti,
    vehicles,
    showDialog
}) => {

    let appointedTimes = [];

  
    



    if (isMulti) {

        const helpArray = [];

        if (affectedBookings.length === 0) {
            setCompletelyUnaivalable(false);
        }
        
        let index = 0;

        for (const vehicle of vehicles) {
            appointedTimes[index] = []
            //@ts-ignore
            for (const pBooking of vehicle?.bookings) {

                if (affectedBookings) {
                    //Buchung startet vor dem aktuellen Tag und endet nach dem aktuellen Tag, kompletter Tag ist belegt
                    if (isBefore(pBooking.startDate, day_date) && isAfter(pBooking.endDate, day_date)) {
                        for (let i = 0; i <= 1440; i = i + 30) {
                            appointedTimes[index].push(i);

                        }
                        
                    }
                    //Buchung liegt auf aktuellen Tag, Buchung started & endet am selben Tag
                    if (isSameDay(pBooking.startDate, day_date) && isSameDay(pBooking.startDate, pBooking.endDate)) {
                        for (let i = Number(pBooking.startPeriod); i <= Number(pBooking.endPeriod); i = i + 30) {
                            appointedTimes[index].push(i);
                        }
                    }

                    //Buchung startet am aktuellen Tag und endet nicht am aktuellen Tag
                    if (isSameDay(pBooking?.startDate, day_date) && isAfter(pBooking?.endDate, day_date)) {
                        for (let i = Number(pBooking.startPeriod); i <= 1440; i = i + 30) {
                            appointedTimes[index].push(i);
                        }
                    }

                    //Buchung endet am aktuellen Tag und startet nicht am aktuellen Tag
                    if (isSameDay(pBooking?.endDate, day_date) && isBefore(pBooking?.startDate, day_date)) {
                        for (let i = 0; i <= Number(pBooking.endPeriod); i = i + 30) {
                            appointedTimes[index].push(i);
                        }
                    }
                }
            }

            index++;
        }

        for (let i = 0; i <= 1440; i = i + 30) {

            let isAvailable = false;

            for (let j = 0; j < appointedTimes?.length; j++) {

                if (!appointedTimes[j].includes(i)) {
                    isAvailable = true;
                }
            }

            if (!isAvailable) {
                helpArray.push(i);
            }
        }



        appointedTimes = helpArray;

        let isAvailable = false;

        for (let i = 0; i < 1440; i = i + 30) {
            
            if (!helpArray.includes(i)) {
                isAvailable = true;
                setCompletelyUnaivalable(false);
                break;
            }
        }

        if (!isAvailable) {
            setCompletelyUnaivalable(true);
            
        } else if (appointedTimes.length === 0){
            setCompletelyUnaivalable(false);
        } else if(appointedTimes.length !== 1440){
            setIsPartiallyUnaivalable(true);
        }

        


    } else {
        
        for (const pBooking of affectedBookings) {
            if (affectedBookings) {
                
                //Buchung startet vor dem aktuellen Tag und endet nach dem aktuellen Tag, kompletter Tag ist belegt
                if (isBefore(pBooking.startDate, day_date) && isAfter(pBooking.endDate, day_date)) {
                    for (let i = 0; i <= 1440; i = i + 30) {
                        appointedTimes.push(i);
                    }
                    setCompletelyUnaivalable(true);
                   
                }
                //Buchung liegt auf aktuellen Tag, Buchung started & endet am selben Tag
                if (isSameDay(pBooking.startDate, day_date) && isSameDay(pBooking.startDate, pBooking.endDate)) {
                    for (let i = Number(pBooking.startPeriod); i <= Number(pBooking.endPeriod); i = i + 30) {
                        appointedTimes.push(i);
                    }
                }

                //Buchung startet am aktuellen Tag und endet nicht am aktuellen Tag
                if (isSameDay(pBooking?.startDate, day_date) && isAfter(pBooking?.endDate, day_date)) {
                    for (let i = Number(pBooking.startPeriod); i <= 1440; i = i + 30) {
                        appointedTimes.push(i);
                    }
                }
                
                //Buchung endet am aktuellen Tag und startet nicht am aktuellen Tag
                if (isSameDay(pBooking?.endDate, day_date) && isBefore(pBooking?.startDate, day_date)) {
                    for (let i = 0; i <= Number(pBooking.endPeriod); i = i + 30) {
                        
                        appointedTimes.push(i);
                    }
                }
            }



            for (let i = 0; i <= 1440; i = i + 30) {
                if (!appointedTimes.includes(i)) {
                    setCompletelyUnaivalable(false);
                    break;
                }
            }

            if(appointedTimes.length === 0){
                setCompletelyUnaivalable(false);
            } else if(appointedTimes?.length !== 0) {
                setIsPartiallyUnaivalable(true)
            }
        }
    }

    const checkBooked = (number: string | number) => {
        if (appointedTimes.includes(Number(number))) {
            return true;
        }
    }

  const renderSegments = () => {
    return Array.from({ length: 24 }).map((_, hour) => (
      <View key={hour} className="flex flex-row items-center">
        <View className="w-2/5 flex items-center">
          <Text className="font-bold text-white">{hour}:00 Uhr</Text>
        </View>
        <View className="w-3/5">
          <View className={`h-10 flex items-center justify-center px-2 ${checkBooked(hour * 60) ? 'bg-rose-600' : 'bg-[#222435]'}`}> 
            {!checkBooked(hour * 60) && checkBooked((hour * 60) - 30) && (
              <Text className="text-white font-bold">Verfügbar ab {hour}:00 Uhr</Text>
            )}
          </View>
          <View className={`h-10 flex items-center justify-center px-2 ${checkBooked((hour * 60) + 30) ? 'bg-rose-600' : 'bg-[#222435]'}`}> 
            {!checkBooked((hour * 60) + 30) && checkBooked(hour * 60) && (
              <View className="flex flex-row items-center">
                <MaterialCommunityIcons name="check" size={16} color="green" />
                <Text className="ml-2 text-white font-bold">Verfügbar ab {hour}:30 Uhr</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    ));
  };




    return (
        <View className="">
            
            <View className="mt-2">
                <ScrollView className="h-[500px]">
                    <View className="flex flex-row items-center py-2">
                        <MaterialCommunityIcons name="calendar-blank" size={20} color="white" />
                        <Text className="ml-2 font-bold text-white">{format(new Date(day_date), "d. MMMM yyyy", { locale: de })}</Text>
                    </View>
                    <Text className="text-sm text-gray-400">Verfügbarkeitsübersicht</Text>
                    {renderSegments()}
                </ScrollView>
            </View>
        </View>
    )


}

export default CalenderDayDetail;