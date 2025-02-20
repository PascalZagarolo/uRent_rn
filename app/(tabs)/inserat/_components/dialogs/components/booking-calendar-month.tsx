import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BookingCalendarMonth = () => {
    const [currentMonth, setCurrentMonth] = useState(moment().locale("de"));

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

    const daysInMonth = () => {
        let days = [];
        const startOfMonth = currentMonth.clone().startOf("month");
        const endOfMonth = currentMonth.clone().endOf("month");
        const startDayOfWeek = startOfMonth.isoWeekday();

        // Fill empty slots for first week
        for (let i = 1; i < startDayOfWeek; i++) {
            days.push(null);
        }

        // Fill actual days
        for (let day = startOfMonth; day.isBefore(endOfMonth) || day.isSame(endOfMonth); day.add(1, "day")) {
            days.push(day.clone());
        }
        return days;
    };

    const changeMonth = (direction) => {
        setCurrentMonth((prev) => prev.clone().add(direction, "month"));
    };

    return (
        <View className="p-4">
            {/* Header */}
            <View className="flex flex-row space-x-4 items-center mb-4 ">
                <TouchableOpacity onPress={() => changeMonth(-1)}>
                    <MaterialCommunityIcons size={24} color={"white"} name="arrow-left-bold-circle-outline" />
                </TouchableOpacity>
                <Text className="text-gray-200 font-semibold text-lg">
                    {currentMonth.format("MMMM YYYY")}
                </Text>
                <TouchableOpacity onPress={() => changeMonth(1)}>
                    <MaterialCommunityIcons size={24} color={"white"} name="arrow-right-bold-circle-outline" />
                </TouchableOpacity>
            </View>
            
            {/* Weekday Headers */}
            <View className="flex flex-row bg-indigo-800 py-4 rounded-md">
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
                            <Text className="text-gray-200">{day.format("D")}</Text>
                        ) : null}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default BookingCalendarMonth;
