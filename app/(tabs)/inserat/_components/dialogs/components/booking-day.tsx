'use client';



import { booking, vehicle } from "@/db/schema";


import clsx from "clsx";
import { format, isAfter, isBefore, isSameDay, isToday } from "date-fns";



import { useEffect, useState } from "react";
import CalenderDayDetail from "./calendar-day-details";
import { Text, View } from "react-native";
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
}


const CalendarDay: React.FC<CalendarDayProps> = ({
    index,
    day,
    bookings,
    isMulti,
    vehicles
}) => {



    console.log(bookings);

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
    }, [bookings, isMulti, day, vehicles]);



    return (
        <>
            <View
                key={index}
                className={clsx("w-full h-full justify-center", {
                    "": isToday(day),
                    "font-black": isToday(day),
                    "dark:bg-rose-800 bg-rose-800 rounded-md shadow-lg": isCompletelyUnaivalable,
                    " bg-indigo-800 rounded-md shadow-lg": isPartiallyUnaivalable && !isCompletelyUnaivalable,
                    "hover:bg-[#1b1b1b]": !isCompletelyUnaivalable && !isPartiallyUnaivalable
                })}
            >
                {/* {!isCompletelyUnaivalable ? (
          <Text className="text-gray-200 text-center">{format(new Date(day), "d")}</Text>
        ) : (
          <CalenderDayDetail
            day_date={day}
            affectedBookings={bookings}
            setCompletelyUnaivalable={setIsCompletelyUnaivalable}
            setIsPartiallyUnaivalable={setIsPartiallyUnaivalable}
            isMulti={isMulti}
            vehicles={vehicles}
            showDialog={false}
          />
        )} */}

                <Text className="text-gray-200 text-center">{format(new Date(day), "d")}</Text>


            </View>
        </>

    );
}

export default CalendarDay;