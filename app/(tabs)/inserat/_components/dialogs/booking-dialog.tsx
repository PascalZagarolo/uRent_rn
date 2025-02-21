
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
    });

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
        return receivedBookings?.reduce((acc: { [key: string]: typeof booking.$inferSelect[] }, pBooking: typeof booking.$inferSelect) => {
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
                <View className="container mx-auto p-4 border dark:border-none h-[500px] bg-[#151821]">
                    <View className="mb-4 flex items-center">
                        <TouchableOpacity onPress={decreaseMonth} className="" >
                            <MaterialCommunityIcons name="arrow-left" className="w-4 h-4  hover:cursor-pointer" />
                        </TouchableOpacity>
                        <View className="text-center font-semibold w-[160px]">{format(currentDate, "MMMM yyyy", { locale: de })}</View>
                        <TouchableOpacity onPress={increaseMonth} className="" >
                            <MaterialCommunityIcons name="arrow-right" className="w-4 h-4  hover:cursor-pointer" />
                        </TouchableOpacity>
                        <View className="ml-auto">
                        </View>
                    </View>
                    <View className="grid grid-cols-7 gap-2 ">
                        {WEEKDAYS.map((day) => {
                            return (
                                <View key={day} className="font-bold text-center bg-gray-200 dark:bg-[#0F0F0F]">
                                    {day}
                                </View>
                            );
                        })}
                        {Array.from({ length: startingDayIndex }).map((_, index) => {
                            return (
                                <View
                                    key={`empty-${index}`}
                                    className="  p-2 text-center dark:bg-[#171717]"
                                />
                            );
                        })}
                        {/* */}
                    </View>
                    <View className="mt-2">
                        <Text className="text-sm text-gray-200/60">
                        *Klicke auf Tage um ihre vollständige Verfügbarkeit zu sehen.
                        </Text>
                    </View>
                    <View className="mt-2 space-y-2">
                        <View className="flex flex-row items-center gap-x-2">
                            <View className="bg-indigo-800 w-4 h-4 rounded-md"/>
                            <Text className="text-sm text-gray-200/80 font-semibold">Teilweise Belegte Tage</Text>
                        </View>
                        <View className="flex flex-row items-center gap-x-2">
                        <View className="bg-rose-600 w-4 h-4 rounded-md"/>
                            <Text className="text-sm text-gray-200/80 font-semibold">Vollständig Belegte Tage</Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default BookingCalendar;