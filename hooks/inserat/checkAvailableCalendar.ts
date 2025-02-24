import { booking, vehicle } from "@/db/schema";
import { isAfter, isBefore, isSameDay } from "date-fns";

export const checkAvailableCalendar = (
    affectedBookings: typeof booking.$inferSelect[],
    setCompletelyUnaivalable : (value : boolean) => void,
    setIsPartiallyUnaivalable: (value : boolean) => void,
    isMulti : boolean,
    day_date: Date,
    vehicles?: typeof vehicle.$inferSelect[],
    
) => {

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
}