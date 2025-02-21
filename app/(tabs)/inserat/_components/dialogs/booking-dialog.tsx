
import {

    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    startOfMonth,
} from "date-fns";

import { useEffect, useMemo, useState } from "react";







import { de } from 'date-fns/locale';

import { booking, inserat } from "@/db/schema";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CalendarDay from "./components/booking-day";


const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];



interface EventCalendarProps {
    thisInserat: typeof inserat.$inferSelect,
    receivedBookings: typeof booking.$inferSelect[]
}

const BookingCalendar = ({ receivedBookings, thisInserat }: EventCalendarProps) => {

    const [currentFilter, setCurrentFilter] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const [currentMonth, setCurrentMonth] = useState(0);



    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    }) ?? [];

    const startingDayIndex = getDay(firstDayOfMonth);

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

    const eventsByDate = useMemo(() => {
        if (!receivedBookings) return {}; // Ensure it's always an object
    
        return receivedBookings.reduce((acc: { [key: string]: typeof booking.$inferSelect[] }, pBooking: typeof booking.$inferSelect) => {
            const startDate = new Date(pBooking.startDate);
            const endDate = new Date(pBooking.endDate);
            const currentDate = new Date(startDate);
    
            while (currentDate <= endDate) {
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
        <View className="flex-1 bg-black/80 justify-center items-center p-4">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="w-full"
            >
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
                            <TouchableOpacity className="ml-auto items-end flex justify-end">
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
                    <View className="w-full">
                        {/* Render Weekday Headers */}
                        <View className="flex-row">
                            {WEEKDAYS.map((day) => (
                                <View key={day} className="flex-1 font-bold text-center bg-[#232535] p-2.5">
                                    <Text className="text-white text-center">{day}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Render Empty Days for Offset */}
                        <View className="flex-row flex-wrap">
                            {Array.from({ length: startingDayIndex }).map((_, index) => (
                                <View key={`empty-${index}`} className="w-4 h-4 p-2.5 bg-[#171717]" />
                            ))}
                        </View>

                        {daysInMonth.map((day, index) => {
                            const dateKey = format(day, "yyyy-MM-dd");
                            const todaysEvents = eventsByDate[dateKey] || [];
                            return (
                                <View key={index} className="">
                                     <CalendarDay
                                        index={index}
                                        day={day}
                                        key={dateKey}
                                        bookings={todaysEvents}
                                        isMulti={thisInserat?.multi}
                                        vehicles={thisInserat?.vehicles}
                                    /> 
                                </View>
                            );
                        })}
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
            </KeyboardAvoidingView>
        </View>
    );
};

export default BookingCalendar;