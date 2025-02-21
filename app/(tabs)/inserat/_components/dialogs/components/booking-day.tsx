'use client';



import { booking, vehicle } from "@/db/schema";


import clsx from "clsx";
import { format, isToday } from "date-fns";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import CalenderDayDetail from "./calendar-day-details";


interface Event {
  date: Date;
  title: string;
  
}

interface CalendarDayProps {
  index: number;
  day: Date;
  bookings: typeof booking.$inferSelect[];
  isMulti ?: boolean;
  vehicles ?: typeof vehicle.$inferSelect[];
}


const CalendarDay: React.FC<CalendarDayProps> = ({
  index,
  day,
  bookings,
  isMulti,
  vehicles
}) => {

  const searchParams = useSearchParams();



  const [isCompletelyUnaivalable, setIsCompletelyUnaivalable] = useState(false);
  const [isPartiallyUnaivalable, setIsPartiallyUnaivalable] = useState(false);




  

  return (
    <>


      <div
        key={index}
        className={clsx("dark:bg-[#0F0F0F]  p-4 text-center rounded-md ", {
          "bg-gray-200": isToday(day),
          "font-black": isToday(day),
          "dark:bg-rose-800 bg-rose-800 hover:bg-rose-900": isCompletelyUnaivalable,
          "dark:bg-indigo-800 bg-indigo-500 hover:bg-indigo-900": isPartiallyUnaivalable && !isCompletelyUnaivalable,
          "hover:bg-[#1b1b1b]": !isCompletelyUnaivalable && !isPartiallyUnaivalable
        })}
      >
        {isCompletelyUnaivalable ? (
          <>{format(new Date(day), "d")}</>
        ) : (
          <CalenderDayDetail
            day_date={day}
            affectedBookings={bookings}
            setCompletelyUnaivalable={setIsCompletelyUnaivalable}
            setIsPartiallyUnaivalable={setIsPartiallyUnaivalable}
            isMulti={isMulti}
            vehicles={vehicles}
          />
        )}



      </div>
    </>

  );
}

export default CalendarDay;