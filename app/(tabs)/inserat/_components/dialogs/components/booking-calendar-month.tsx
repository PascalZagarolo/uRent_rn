import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { format, startOfMonth, endOfMonth, addMonths, subMonths, eachDayOfInterval, getDay } from "date-fns";
import { de } from "date-fns/locale";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BookingCalendarMonth = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

    const daysInMonth = () => {
        let days = [];
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        const daysArray = eachDayOfInterval({ start, end });
        const startDayOfWeek = (getDay(start) + 6) % 7; // Adjust for Monday start

        // Fill empty slots for first week
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(null);
        }

        // Fill actual days
        days.push(...daysArray);

        return days;
    };

    const changeMonth = (direction) => {
        setCurrentMonth((prev) => (direction === 1 ? addMonths(prev, 1) : subMonths(prev, 1)));
    };

    return (
        <View className="p-4 h-[420px]">
            {/* Header */}
            <View className="flex flex-row space-x-4 items-center mb-4 ">
                <TouchableOpacity onPress={() => changeMonth(-1)}>
                    <MaterialCommunityIcons size={24} color={"white"} name="arrow-left-bold-circle-outline" />
                </TouchableOpacity>
                <Text className="text-gray-200 font-semibold text-lg w-36">
                    {format(currentMonth, "MMMM yyyy", { locale: de })}
                </Text>
                <TouchableOpacity onPress={() => changeMonth(1)}>
                    <MaterialCommunityIcons size={24} color={"white"} name="arrow-right-bold-circle-outline" />
                </TouchableOpacity>
            </View>
            
            {/* Weekday Headers */}
            <View className="flex flex-row bg-[#222531] shadow-lg py-4 rounded-md">
                {weekdays.map((day, index) => (
                    <View key={index} className="flex-1 items-center">
                        <Text className="text-gray-200 text-center">
                            {day}
                        </Text>
                    </View>
                ))}
            </View>
            
            {/* Calendar Grid */}
            <View className="flex flex-wrap flex-row mt-2">
                {daysInMonth().map((day, index) => (
                    <View key={index} className="w-[14.28%] h-12 flex items-center justify-center">
                        {day ? (
                            <Text className="text-gray-200">{format(day, "d")}</Text>
                        ) : null}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default BookingCalendarMonth;
