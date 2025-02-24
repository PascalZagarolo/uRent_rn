
import {

    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isAfter,
    isBefore,
    isSameDay,
    startOfMonth,
} from "date-fns";

import { useMemo, useState } from "react";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";








import { booking, inserat } from "@/db/schema";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CalendarDay from "./components/booking-day";
import CalenderDayDetail from "./components/calendar-day-details";
import { de } from "date-fns/locale";



const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];



interface EventCalendarProps {
    onClose: () => void;
    thisInserat: typeof inserat.$inferSelect & { vehicles },
    receivedBookings: typeof booking.$inferSelect[]
}

const BookingCalendar = ({ receivedBookings, thisInserat, onClose }: EventCalendarProps) => {

    const [currentFilter, setCurrentFilter] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const [currentMonth, setCurrentMonth] = useState(0);

    const [showDayDetail, setShowDayDetail] = useState<{
        isOpen: boolean,
        currentDate?: Date,
        receivedBookings?: typeof booking.$inferSelect[],
    }>({
        isOpen: false,
    });

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    }) ?? [];

    const startingDayIndex = (getDay(firstDayOfMonth) + 6) % 7;



    const increaseMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const decreaseMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };



    // const eventsByDate = useMemo(() => {
    //     return receivedBookings?.reduce((acc: { [key: string]: typeof booking.$inferSelect[] }, pBooking: typeof booking.$inferSelect) => {
            
            
    //         const timeZone = 'Europe/Berlin';

    //         // Convert to Berlin timezone
    //         const endBerlin = toZonedTime(pBooking.endDate, timeZone);
            
    //         // Format the date correctly
    //         const formattedDate = format(endBerlin, "dd. MM");
            
    //         console.log(formattedDate);

    //         while (currentDate <= endBerlin || isSameDay(currentDate, endBerlin)) {
    //             const dateKey = format(currentDate, "yyyy-MM-dd");
    //             if (!acc[dateKey]) {
    //                 acc[dateKey] = [];
    //             }

    //             acc[dateKey].push(pBooking);

    //             currentDate.setDate(currentDate.getDate() + 1);
    //         }

    //         return acc;
    //     }, {});
    // }, [receivedBookings]);

    const eventsByDate = useMemo(() => {
        return receivedBookings?.reduce((acc: { [key: string]: typeof booking.$inferSelect[] }, pBooking : typeof booking.$inferSelect) => {
            const startDate = new Date(pBooking.startDate);
            const timeZone = 'Europe/Berlin';

    
            const endDate = new Date(toZonedTime(pBooking.endDate, timeZone));
            console.log(format(endDate, "dd. MM"))
            const currentDate = new Date(startDate);
            while (currentDate <= endDate || isSameDay(currentDate, endDate)) {
                const dateKey = format(currentDate, "yyyy-MM-dd");
                if (!acc[dateKey]) {
                    acc[dateKey] = [];
                }

                acc[dateKey].push(pBooking);

                currentDate.setDate(currentDate.getDate() + 1);
            }

            return acc;
        }, {});
    }, [receivedBookings]);

    return (
        <View className="flex-1 bg-black/80 justify-center items-center p-2">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="w-full"
            >
                {showDayDetail.isOpen ? (
                    <View className="container  p-4 border dark:border-none w-full bg-[#151821] rounded-lg">
                        <View className="mb-4 ">
                            {/* Header */}
                            <View className="flex flex-row justify-between items-center space-x-4 w-full">
                                <View className="flex flex-row items-center space-x-4">
                                    <MaterialCommunityIcons name="calendar" color={"white"} size={20} />
                                    <Text className="text-lg text-gray-200 text-left font-semibold">
                                        Verfügbarkeiten prüfen
                                    </Text>
                                </View>
                                <TouchableOpacity className="ml-auto items-end flex justify-end"
                                    onPress={onClose}
                                >
                                    <MaterialCommunityIcons name="close" size={20} color={"white"} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <CalenderDayDetail
                                    day_date={showDayDetail.currentDate}
                                    affectedBookings={showDayDetail.receivedBookings}
                                    isMulti={thisInserat?.multi}
                                    vehicles={thisInserat?.vehicles}
                                    setCompletelyUnaivalable={() => { }}
                                    setIsPartiallyUnaivalable={() => { }}
                                    showDialog={true}
                                />
                            </View>
                        </View>
                    </View>
                ) : (
                    <View className="container  p-4 border dark:border-none w-full bg-[#151821] rounded-lg">
                        <View className="mb-4 ">
                            {/* Header */}
                            <View className="flex flex-row justify-between items-center space-x-4 w-full">
                                <View className="flex flex-row items-center space-x-4">
                                    <MaterialCommunityIcons name="calendar" color={"white"} size={20} />
                                    <Text className="text-lg text-gray-200 text-left font-semibold">
                                        Verfügbarkeiten prüfen
                                    </Text>
                                </View>
                                <TouchableOpacity className="ml-auto items-end flex justify-end"
                                    onPress={onClose}
                                >
                                    <MaterialCommunityIcons name="close" size={20} color={"white"} />
                                </TouchableOpacity>
                            </View>


                            <View className="flex flex-row items-center space-x-4 mt-8">
                                <TouchableOpacity onPress={decreaseMonth} className="" >
                                    <MaterialCommunityIcons name="arrow-left" size={20} color={"white"} />
                                </TouchableOpacity>
                                <View className="text-center font-semibold w-[160px]">
                                    <Text className="text-lg text-gray-200/80 font-semibold">
                                        {format(currentDate, "MMMM yyyy", { locale: de })}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={increaseMonth} className="" >
                                    <MaterialCommunityIcons name="arrow-right" size={20} color={"white"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="w-full h-[340px]">
                            {/* Render Weekday Headers */}
                            <View className="flex-row w-full bg-[#232535] rounded-t-md shadow-lg">
                                {WEEKDAYS.map((day) => (
                                    <View key={day} className="flex-1  w-12 h-10 items-center justify-center">
                                        <Text className="text-white text-center font-bold">{day}</Text>
                                    </View>
                                ))}
                            </View>

                            <View className="flex-row flex-wrap w-full">
                                {/* Render Empty Days for Offset */}
                                {Array.from({ length: startingDayIndex }).map((_, index) => (
                                    <View key={`empty-${index}`} className="w-[14.28%] h-12 bg-[#161720]" />
                                ))}

                                {/* Render Days */}
                                {daysInMonth.map((day, index) => {
                                    const dateKey = format(day, "yyyy-MM-dd");
                                    const todaysEvents = eventsByDate[dateKey] || [];
                                    return (
                                        <View className="w-[14.28%] h-12 shadow-lg flex items-center justify-center">
                                            <CalendarDay
                                                index={index}
                                                day={day}
                                                key={dateKey}
                                                bookings={todaysEvents}
                                                isMulti={thisInserat?.multi}
                                                vehicles={thisInserat?.vehicles}

                                                setCurrentDay={(day, receivedBookings) => {
                                                    setShowDayDetail(
                                                        {
                                                            isOpen: true,
                                                            currentDate: day,
                                                            receivedBookings: receivedBookings
                                                        }
                                                    )
                                                }}
                                            />
                                        </View>
                                    );
                                })}
                            </View>

                        </View>


                        <View className="mt-auto">
                            <View className="mt-2">
                                <Text className="text-sm text-gray-200/60">
                                    *Klicke auf Tage um ihre vollständige Verfügbarkeit zu sehen.
                                </Text>
                            </View>
                            <View className="mt-2 space-y-2">
                                <View className="flex flex-row items-center gap-x-2">
                                    <View className="bg-indigo-800 w-4 h-4 rounded-md" />
                                    <Text className="text-sm text-gray-200/80 font-semibold">Teilweise Belegte Tage</Text>
                                </View>
                                <View className="flex flex-row items-center gap-x-2">
                                    <View className="bg-rose-600 w-4 h-4 rounded-md" />
                                    <Text className="text-sm text-gray-200/80 font-semibold">Vollständig Belegte Tage</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

export default BookingCalendar;