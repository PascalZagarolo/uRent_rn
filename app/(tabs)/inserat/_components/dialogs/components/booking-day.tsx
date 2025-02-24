'use client';



import { booking, vehicle } from "@/db/schema";


import clsx from "clsx";
import { format, isAfter, isBefore, isSameDay, isToday } from "date-fns";



import { useEffect, useState } from "react";
import CalenderDayDetail from "./calendar-day-details";
import { Text, TouchableOpacity, View } from "react-native";
import { checkAvailableCalendar } from "@/hooks/inserat/checkAvailableCalendar";


interface Event {
    date: Date;
    title: string;

}

interface CalendarDayProps {
    index: number;
    day: Date;
    bookings: typeof booking.$inferSelect[];
    isMulti?: boolean;
    vehicles?: typeof vehicle.$inferSelect[];
    setCurrentDay : (day : Date, foundBookings : typeof booking.$inferSelect[]) => void;
}


const CalendarDay: React.FC<CalendarDayProps> = ({
    index,
    day,
    bookings,
    isMulti,
    vehicles,
    setCurrentDay
}) => {



    

    const [isCompletelyUnaivalable, setIsCompletelyUnaivalable] = useState(false);
    const [isPartiallyUnaivalable, setIsPartiallyUnaivalable] = useState(false);


    useEffect(() => {
        checkAvailableCalendar(
            bookings,
            setIsCompletelyUnaivalable,
            setIsPartiallyUnaivalable,
            isMulti ?? false, // Default to false if undefined
            day,
            vehicles
        );
    }, [bookings, isMulti, day, vehicles, index]);



    return (
        <>
            <TouchableOpacity
                key={index}
                className={clsx("w-full h-full justify-center", {
                    "": isToday(day),
                    "font-black": isToday(day),
                    "bg-rose-800 rounded-md shadow-lg": isCompletelyUnaivalable,
                    " bg-indigo-800 rounded-md shadow-lg": isPartiallyUnaivalable && !isCompletelyUnaivalable,
                    "hover:bg-[#1b1b1b]": !isCompletelyUnaivalable && !isPartiallyUnaivalable
                })}
                onPress={() => setCurrentDay(day, bookings)}
            >
                

                <Text className="text-gray-200 text-center">{format(new Date(day), "d")}</Text>


            </TouchableOpacity>
        </>

    );
}

export default CalendarDay;