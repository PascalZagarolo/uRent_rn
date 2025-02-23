
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


const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];



interface EventCalendarProps {
    onClose: () => void;
    thisInserat: typeof inserat.$inferSelect,
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
        currentDate? : Date
    }>({
        isOpen : false,
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
        <View className="flex-1 bg-black/80 justify-center items-center p-2">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="w-full"
            >
                {showDayDetail.isOpen ? (
                    <View className="container  p-4 border dark:border-none w-full bg-[#151821] rounded-lg">

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
                                    <TouchableOpacity key={dateKey} className="w-[14.28%] h-12 shadow-lg flex items-center justify-center"
                                    onPress={() => {
                                        setShowDayDetail({
                                            isOpen : true,

                                        })
                                    }}
                                    >
                                        <Text className="text-white">{format(day, "d")}</Text>
                                    </TouchableOpacity>
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