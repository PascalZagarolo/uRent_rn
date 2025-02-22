
import { booking, vehicle } from "@/db/schema";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { format, isAfter, isBefore, isSameDay } from "date-fns";
import { de } from "date-fns/locale";

import { useEffect } from "react";
import { Text, View } from "react-native";



interface CalenderDayDetailProps {
    day_date: Date;
    affectedBookings: typeof booking.$inferSelect[];
    setCompletelyUnaivalable: (value: boolean) => void;
    setIsPartiallyUnaivalable: (value: boolean) => void;
    isMulti?: boolean;
    vehicles?: typeof vehicle.$inferSelect[];
    showDialog?: boolean;
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
                    break;
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

    const checkBooked = (number: string) => {
        if (appointedTimes.includes(Number(number))) {
            return true;
        }
    }

    const renderSegments = () => {
        const segments = [];
        
    
        for (let hour = 0; hour <= 23; hour++) {
            segments.push(
                <View
                key={hour}
                className="dark:bg-[#1a1a1a] bg-white text-sm flex  flex-row h-full items-start shadow-sm overflow-hidden"
            >
                {/* Left Section: Time Display */}
                <View className="w-2/5 bg-[#222222] text-white shadow-md h-full flex justify-center items-center">
                    <Text className="p-2.5 font-semibold">{hour}:00 Uhr</Text>
                </View>
            
                {/* Right Section: Booking Slots */}
                <View className="h-full ml-auto w-3/5 flex flex-col ">
                    {/* First Slot */}
                    <View
                        className={`h-10 flex items-center justify-between p-2.5  
                            ${checkBooked(String(hour * 60)) ? "bg-red-600 text-white" : "bg-[#222222] dark:text-gray-200"} 
                            ${!checkBooked(String((hour * 60) + 30)) ? "rounded-b-none" : "rounded-b-none"}`}
                    >
                        {!checkBooked(String(hour * 60)) && checkBooked(String((hour * 60) - 30)) && (
                            <Text className="text-sm text-gray-200 font-semibold">Verfügbar ab {hour}:00 Uhr</Text>
                        )}
                    </View>
            
                    {/* Second Slot */}
                    <View
                        className={`h-10 flex items-center justify-between p-2.5  
                            ${checkBooked(String((hour * 60) + 30)) ? "bg-red-600 text-white" : "bg-[#222222] dark:text-gray-200"} 
                            ${!checkBooked(String((hour * 60) + 60)) ? "rounded-t-none border-b-4 border-[#1a1a1a]" : "rounded-b-none"}`}
                    >
                        {!checkBooked(String((hour * 60) + 30)) && checkBooked(String((hour * 60))) && (
                            <View className="flex items-center">
                                <MaterialCommunityIcons name="check" className="w-4 h-4 mr-2 text-green-500" />
                                <Text className="text-sm text-gray-200 font-semibold">Verfügbar ab {hour}:30 Uhr</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
            

            );
        }
    
        // Scroll to 8:00 segment on initial render
        
    
        return segments;
    };

   
    
    if(showDialog) {
        return (
            <View>
                <Text>
                    {format(new Date(day_date), "d")}
                </Text>
        
                <View className="p-0 dark:border-none dark:bg-[#191919]">
                    <View className="h-[520px] overflow-y-auto no-scrollbar">
                        <View className="font-medium text-sm flex items-center gap-x-2 px-4 pt-6">
                            <MaterialCommunityIcons name="calendar-blank" className="w-4 h-4 text-indigo-800" />
                            <Text className="font-semibold">
                                {format(new Date(day_date), "d. MMMM yyyy", { locale: de })}{" "}
                            </Text>
                            <Text className="dark:text-gray-200">Verfügbarkeitsübersicht</Text>
                        </View>
                        <Text className="px-4 text-xs dark:text-gray-200/60">
                            Finde heraus, wann das Inserat verfügbar ist, und wann nicht.
                        </Text>
        
                        <View className="mt-4">
                        {renderSegments()}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    
}

export default CalenderDayDetail;