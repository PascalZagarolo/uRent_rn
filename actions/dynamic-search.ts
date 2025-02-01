
import { createDateWithTime } from '@/hooks/date/combine-date-with-minutes';
import { addDays, differenceInHours, format, isAfter, isBefore, isSameDay, subDays, toDate } from 'date-fns';






export function dynamicSearch(
    pBookings: any[],
    startTime: string,
    endTime: string,
    startDateDynamic: Date,
    endDateDynamic: Date,
    reqTime: string,
    pInserat: any

) {


    const filterAvailability = ((pInserat: any) => {

        const checkMinTime = checkFitsMinTime(pInserat, startTime, endTime, startDateDynamic, endDateDynamic);

        if (!checkMinTime) {
            return false;
        }

        //save found availabilities in array => can be type of Hours, days, weeks, months => e.g 3d => then check length of array, array.length >= reqTime.number -1
        //return true if length is >= reqTime.number -1 then break, else false
        //Sliding Window approach
        const foundAvailability: string[] = [];

        const regAmount = Number(reqTime.slice(0, -1));


        if (pInserat.bookings.length === 0) {
            
            return true;
        }

        //set start and date to same date if the user only provides one
        const usedPeriodBegin = new Date(startDateDynamic);
        const usedPeriodEnd = new Date(endDateDynamic);

        let startDateAppointments = new Set<any>();
        let endDateAppointments = new Set<any>();

        let startingPoint = addDays(usedPeriodBegin, regAmount - 1);
        




        for (let windowEnd = startingPoint; (isBefore(windowEnd, usedPeriodEnd) || isSameDay(windowEnd, usedPeriodEnd));
            windowEnd = addDays(windowEnd, 1)) {
                

            if (String(startTime) != "undefined" || String(endTime) != "undefined") {
               
                const usedStartTime = String(startTime) != "undefined" ? startTime : endTime;
                const usedEndTime = String(endTime) != "undefined" ? endTime : startTime;
                
                let windowStart = subDays(windowEnd, regAmount);
                let isAvailable = true;

                for (const booking of pInserat.bookings) {
                    //booking starts AND ends before the searched Period
                    if (!(booking.startDate <= windowStart) || !(booking.endDate <= windowStart)
                        //booking starts or ends on the first OR last day of the searched period
                        || (isSameDay(booking.startDate, windowStart) || isSameDay(booking.endDate, windowStart)
                            || isSameDay(booking.endDate, windowStart) || isSameDay(booking.startDate, windowStart))
                        //booking
                        && (!(booking.endDate > windowEnd) || !(booking.startDate > windowEnd))
                    ) {
                        if ((isSameDay(booking.startDate, windowStart) && (isSameDay(booking.endDate, windowStart))) || isSameDay(booking.endDate, windowStart)) {
                            let usedStart;
                            if (isSameDay(booking.startDate, booking.endDate)) {
                                usedStart = booking.startPeriod;
                            } else {
                                usedStart = "0"
                            }

                            for (let i = Number(usedStart); i <= Number(booking.endPeriod); i = i + 30) {

                                startDateAppointments.add(i);
                            }
                            if (startDateAppointments.has("1440") && !isSameDay(windowStart, windowEnd)) {
                                isAvailable = false;
                            }
                        } else if ((isSameDay(booking.endDate, windowEnd) && isSameDay(booking.startDate, windowEnd))
                            || isSameDay(booking.startDate, windowEnd)) {

                            let usedEnd;

                            if (isSameDay(booking.startDate, booking.endDate)) {
                                usedEnd = booking.endPeriod;
                            } else {

                                usedEnd = "1440";
                            }

                            for (let i = Number(booking.startPeriod); i <= Number(usedEnd); i = i + 30) {

                                endDateAppointments.add(i);
                            }
                            if (endDateAppointments.has("0") && !isSameDay(windowStart, windowEnd)) {
                                isAvailable = false;
                            } else if (booking.endDate > windowEnd && booking.startDate > windowEnd) {

                            }
                        } else if (isAfter(booking.endDate, windowEnd) && isAfter(booking.startDate, windowEnd)) {

                        }
                        else {

                            isAvailable = false;
                        }
                    }
                }

                
                if ((usedStartTime || usedEndTime)) {
                    if (usedStartTime) {
                        let usedEnd;
                        
                        if (isSameDay(windowStart, windowEnd) && usedEndTime) {
                            usedEnd = usedEndTime;
                        } else {
                            usedEnd = "1440";
                        }

                        for (let i = Number(usedStartTime); i <= Number(usedEnd); i = i + 30) {
                            if (startDateAppointments.has(Number(i))) {
                                isAvailable = false;
                            }
                        }
                    }
                    if (endTime) {
                        let usedEnd;
                        if (isSameDay(windowStart, windowEnd) && usedStartTime) {
                            usedEnd = usedStartTime;
                        } else {
                            usedEnd = "0";
                        }


                        for (let i = Number(usedEndTime); i >= Number(usedEnd); i = i - 30) {
                            if (endDateAppointments.has(Number(i))) {
                                isAvailable = false;
                            }
                        }
                    }
                }
                if (isAvailable) {
                    
                    return true;

                }
            } else {
                
                for (let usedTime = 0; usedTime < 1440; usedTime = usedTime + 30) {
                    //let windowStart = new Date(windowEnd.getDay() - regAmount + 1);
                    
                    let windowStart = subDays(windowEnd, regAmount);
                    
                    let isAvailable = true;
                    const usedStartTime = usedTime;
                    const usedEndTime = usedTime + 30;
                    for (const booking of pInserat.bookings) {
                        //booking starts AND ends before the searched Period
                        if (!(booking.startDate <= windowStart) || !(booking.endDate <= windowStart)
                            //booking starts or ends on the first OR last day of the searched period
                            || (isSameDay(booking.startDate, windowStart) || isSameDay(booking.endDate, windowStart)
                                || isSameDay(booking.endDate, windowStart) || isSameDay(booking.startDate, windowStart))
                            //booking
                            && (!(booking.endDate > windowEnd) || !(booking.startDate > windowEnd))
                        ) {
                            if ((isSameDay(booking.startDate, windowStart) && (isSameDay(booking.endDate, windowStart))) || isSameDay(booking.endDate, windowStart)) {
                                let usedStart;
                                if (isSameDay(booking.startDate, booking.endDate)) {
                                    usedStart = booking.startPeriod;
                                } else {
                                    usedStart = "0"
                                }

                                for (let i = Number(usedStart); i <= Number(booking.endPeriod); i = i + 30) {

                                    startDateAppointments.add(i);
                                }
                                if (startDateAppointments.has("1440") && !isSameDay(windowStart, windowEnd)) {
                                    isAvailable = false;
                                }
                            } else if ((isSameDay(booking.endDate, windowEnd) && isSameDay(booking.startDate, windowEnd))
                                || isSameDay(booking.startDate, windowEnd)) {

                                let usedEnd;

                                if (isSameDay(booking.startDate, booking.endDate)) {
                                    usedEnd = booking.endPeriod;
                                } else {

                                    usedEnd = "1440";
                                }

                                for (let i = Number(booking.startPeriod); i <= Number(usedEnd); i = i + 30) {

                                    endDateAppointments.add(i);
                                }
                                if (endDateAppointments.has("0") && !isSameDay(windowStart, windowEnd)) {
                                    isAvailable = false;
                                } else if (booking.endDate > windowEnd && booking.startDate > windowEnd) {

                                }
                            } else if (isAfter(booking.endDate, windowEnd) && isAfter(booking.startDate, windowEnd)) {

                            }
                            else {

                                isAvailable = false;
                            }
                        }
                    }


                    if ((usedStartTime || usedEndTime)) {
                        if (usedStartTime) {
                            let usedEnd;
                            
                            if (isSameDay(windowStart, windowEnd) && usedEndTime) {
                                usedEnd = usedEndTime;
                            } else {
                                usedEnd = "1440";
                            }

                            for (let i = Number(usedStartTime); i <= Number(usedEnd); i = i + 30) {
                                if (startDateAppointments.has(Number(i))) {
                                    isAvailable = false;
                                }
                            }
                        }
                        if (usedEndTime) {
                            let usedEnd;
                            if (isSameDay(windowStart, windowEnd) && usedStartTime) {
                                usedEnd = usedStartTime;
                            } else {
                                usedEnd = "0";
                            }


                            for (let i = Number(usedEndTime); i >= Number(usedEnd); i = i - 30) {
                                if (endDateAppointments.has(Number(i))) {
                                    isAvailable = false;
                                }
                            }
                        }
                    }
                    if (isAvailable) {
                      
                        return true;

                    }
                }
            }
            startDateAppointments.clear();
            endDateAppointments.clear();
        }

        return false;
    })

    const filterAvailabilityHours = ((pInserat: any) => {
        console.log("....")
        const checkMinTime = checkFitsMinTime(pInserat, startTime, endTime, startDateDynamic, endDateDynamic);

        if (!checkMinTime) {
            console.log("....")
            return false;
        }

        //save found availabilities in array => can be type of Hours, days, weeks, months => e.g 3d => then check length of array, array.length >= reqTime.number -1
        //return true if length is >= reqTime.number -1 then break, else false
        //Sliding Window approach
        // const foundAvailability: string[] = [];




        if (pInserat.bookings.length === 0) {

            return true;
        }

        //set start and date to same date if the user only provides one
        const usedPeriodBegin = new Date(startDateDynamic);
        const usedPeriodEnd = new Date(endDateDynamic);

        let startDateAppointments = new Set<any>();
        let endDateAppointments = new Set<any>();



        const addedTime = Number(reqTime.slice(0, 1));








        for (let windowEnd = usedPeriodBegin; (isBefore(windowEnd, usedPeriodEnd) || isSameDay(windowEnd, usedPeriodEnd));
            windowEnd = addDays(windowEnd, 1)) {

            //give it the lowest startTime 0:00 Uhr if user didnt select any
            const retrievedStartTime = String(startTime) == "undefined" ? 0 : Number(startTime);
            const retrievedEndTime = String(endTime) == "undefined" ? 1440 : Number(endTime);


            let windowStart = windowEnd;

            for (let usedStartTime = retrievedStartTime; usedStartTime + (addedTime * 60) <= retrievedEndTime; usedStartTime = usedStartTime + (addedTime * 60)) {

                const usedEndTime = usedStartTime + (addedTime * 60);


                let isAvailable = true;

                for (const booking of pInserat.bookings) {
                    //booking starts AND ends before the searched Period
                    if (!(booking.startDate <= windowStart) || !(booking.endDate <= windowStart)
                        //booking starts or ends on the first OR last day of the searched period
                        || (isSameDay(booking.startDate, windowStart) || isSameDay(booking.endDate, windowStart)
                            || isSameDay(booking.endDate, windowStart) || isSameDay(booking.startDate, windowStart))
                        //booking
                        && (!(booking.endDate > windowEnd) || !(booking.startDate > windowEnd))
                    ) {
                        if ((isSameDay(booking.startDate, windowStart) && (isSameDay(booking.endDate, windowStart))) || isSameDay(booking.endDate, windowStart)) {
                            let usedStart;
                            if (isSameDay(booking.startDate, booking.endDate)) {
                                usedStart = booking.startPeriod;
                            } else {
                                usedStart = "0"
                            }

                            for (let i = Number(usedStart); i <= Number(booking.endPeriod); i = i + 30) {

                                startDateAppointments.add(i);
                            }
                            if (startDateAppointments.has("1440") && !isSameDay(windowStart, windowEnd)) {
                                isAvailable = false;
                            }
                        } else if ((isSameDay(booking.endDate, windowEnd) && isSameDay(booking.startDate, windowEnd))
                            || isSameDay(booking.startDate, windowEnd)) {

                            let usedEnd;

                            if (isSameDay(booking.startDate, booking.endDate)) {
                                usedEnd = booking.endPeriod;
                            } else {

                                usedEnd = "1440";
                            }

                            for (let i = Number(booking.startPeriod); i <= Number(usedEnd); i = i + 30) {

                                endDateAppointments.add(i);
                            }
                            if (endDateAppointments.has("0") && !isSameDay(windowStart, windowEnd)) {
                                isAvailable = false;
                            } else if (booking.endDate > windowEnd && booking.startDate > windowEnd) {

                            }
                        } else if (isAfter(booking.endDate, windowEnd) && isAfter(booking.startDate, windowEnd)) {

                        }
                        else {
                            console.log(booking.endDate, windowEnd)
                            console.log(booking.startDate, windowEnd)
                            console.log(pInserat.title)
                            isAvailable = false;
                        }
                    }
                }


                if ((usedStartTime || usedEndTime)) {
                    if (usedStartTime) {
                        let usedEnd;

                        if (isSameDay(windowStart, windowEnd) && usedEndTime) {
                            usedEnd = usedEndTime;
                        } else {
                            usedEnd = "1440";
                        }

                        for (let i = Number(usedStartTime); i <= Number(usedEnd); i = i + 30) {
                            if (startDateAppointments.has(Number(i))) {
                                isAvailable = false;
                            }
                        }
                    }
                    if (usedEndTime) {
                        let usedEnd;
                        if (isSameDay(windowStart, windowEnd) && usedStartTime) {
                            usedEnd = usedStartTime;
                        } else {
                            usedEnd = "0";
                        }


                        for (let i = Number(usedEndTime); i >= Number(usedEnd); i = i - 30) {
                            if (endDateAppointments.has(Number(i))) {
                                isAvailable = false;
                            }
                        }
                    }
                }
                if (isAvailable) {

                    return true;

                }
                startDateAppointments.clear();
                endDateAppointments.clear();

            }


        }

        return false;
    })


    //use cautios!!! => not tested yet
    const filterAvailabilityMulti = ((pInserat: any) => {

        const checkMinTime = checkFitsMinTime(pInserat, startTime, endTime, startDateDynamic, endDateDynamic);

        if (!checkMinTime) {
            console.log("...")
            return false;
        }

        const regAmount = Number(reqTime.slice(0, -1));
        

        for (let i = 0; !isAfter(addDays(startDateDynamic, i + (regAmount - 1)), endDateDynamic); i++) {

            const usedStartDate = new Date(addDays(startDateDynamic, i));

            const usedEndDate = new Date(addDays(startDateDynamic, i + regAmount - 1));

           

            const usedVehicles = pInserat?.vehicles;
            if (String(startTime) != "undefined" || String(endTime) != "undefined") {

                const usedStartTime = String(startTime) != "undefined" ? startTime : endTime;
                const usedEndTime = String(endTime) != "undefined" ? endTime : startTime;

                for (const vehicle of usedVehicles) {

                    let startDateAppointments = new Set<any>();
                    let endDateAppointments = new Set<any>();
    
                    let isAvailable = true;
    
                    for (const booking of vehicle?.bookings) {
                        //booking starts AND ends before the searched Period
                        if (!(booking.startDate <= usedStartDate) || !(booking.endDate <= usedStartDate)
                            //booking starts or ends on the first OR last day of the searched period
                            || (isSameDay(booking.startDate, usedStartDate) || isSameDay(booking.endDate, usedStartDate)
                                || isSameDay(booking.endDate, usedStartDate) || isSameDay(booking.startDate, usedStartDate))
                            //booking
                            && (!(booking.endDate > usedEndDate) || !(booking.startDate > usedEndDate))
                        ) {
                            if ((isSameDay(booking.startDate, usedStartDate) &&
                                (isSameDay(booking.endDate, usedStartDate))) ||
                                isSameDay(booking.endDate, usedStartDate)) {
    
                                let usedStart;
    
                                if (isSameDay(booking.startDate, booking.endDate)) {
                                    usedStart = booking.startPeriod;
                                } else {
                                    usedStart = "0"
                                }
    
                                for (let i = Number(usedStart); i <= Number(booking.endPeriod); i = i + 30) {
                                    startDateAppointments.add({ number: i, bookingId: booking.id });
                                }
                                if ([...startDateAppointments].some(appointment => appointment.number === "1440") && !isSameDay(usedStartDate, usedEndDate)) {
    
                                    isAvailable = false;
                                }
                            } else if ((isSameDay(booking.endDate, usedEndDate) && isSameDay(booking.startDate, usedEndDate))
                                || isSameDay(booking.startDate, usedEndDate)) {
    
                                let usedEnd;
    
                                if (isSameDay(booking.startDate, booking.endDate)) {
                                    usedEnd = booking.endPeriod;
                                } else {
    
                                    usedEnd = "1440";
                                }
    
                                for (let i = Number(booking.startPeriod); i <= Number(usedEnd); i = i + 30) {
    
                                    endDateAppointments.add({ number: i, bookingId: booking.id });
                                }
                                if ([...endDateAppointments].some(appointment => appointment.number === "0") && !isSameDay(usedStartDate, usedEndDate)) {
    
    
                                    isAvailable = false;
    
                                } else if (booking.endDate > usedEndDate && booking.startDate > usedEndDate) {
    
                                }
                            } else if (booking.endDate > usedEndDate && booking.startDate > usedEndDate) {
    
                            }
                            else {
    
    
                                isAvailable = false;
                            }
                        }
                    }
    
                    if (startDateAppointments.size !== 0 || endDateAppointments.size !== 0 && (startTime || endTime)) {
                        if (usedStartTime) {
                            let usedEnd;
    
                            if (isSameDay(usedStartDate, usedEndDate) && usedEndTime) {
                                usedEnd = usedEndTime;
                            } else {
                                usedEnd = "1440";
                            }
    
                            for (let i = Number(usedStartTime); i <= Number(usedEnd); i = i + 30) {
                                if ([...startDateAppointments].some(appointment => appointment.number === Number(i))) {
    
    
    
                                    isAvailable = false;
                                }
                            }
                        }
                        if (endTime) {
    
                            let usedEnd;
    
                            if (isSameDay(usedStartDate, usedEndDate) && usedStartTime) {
                                usedEnd = usedStartTime;
                            } else {
                                usedEnd = "0";
                            }
    
    
    
                            for (let i = Number(usedEndTime); i >= Number(usedEnd); i = i - 30) {
                                if ([...endDateAppointments].some(appointment => appointment.number === Number(i))) {
    
                                    isAvailable = false;
                                }
    
    
                            }
                        }
                    }
    
    
    
    
                    if (isAvailable) {
                        return true;
                    }
                }
            } else {
                for (let usedTime = 0; usedTime < 1440; usedTime = usedTime + 30) {
                    const usedStartTime = usedTime;
                    const usedEndTime = usedTime;
                    for (const vehicle of usedVehicles) {

                        let startDateAppointments = new Set<any>();
                        let endDateAppointments = new Set<any>();
        
                        let isAvailable = true;
        
                        for (const booking of vehicle?.bookings) {
                            //booking starts AND ends before the searched Period
                            if (!(booking.startDate <= usedStartDate) || !(booking.endDate <= usedStartDate)
                                //booking starts or ends on the first OR last day of the searched period
                                || (isSameDay(booking.startDate, usedStartDate) || isSameDay(booking.endDate, usedStartDate)
                                    || isSameDay(booking.endDate, usedStartDate) || isSameDay(booking.startDate, usedStartDate))
                                //booking
                                && (!(booking.endDate > usedEndDate) || !(booking.startDate > usedEndDate))
                            ) {
                                if ((isSameDay(booking.startDate, usedStartDate) &&
                                    (isSameDay(booking.endDate, usedStartDate))) ||
                                    isSameDay(booking.endDate, usedStartDate)) {
        
                                    let usedStart;
        
                                    if (isSameDay(booking.startDate, booking.endDate)) {
                                        usedStart = booking.startPeriod;
                                    } else {
                                        usedStart = "0"
                                    }
        
                                    for (let i = Number(usedStart); i <= Number(booking.endPeriod); i = i + 30) {
                                        startDateAppointments.add({ number: i, bookingId: booking.id });
                                    }
                                    if ([...startDateAppointments].some(appointment => appointment.number === "1440") && !isSameDay(usedStartDate, usedEndDate)) {
        
                                        isAvailable = false;
                                    }
                                } else if ((isSameDay(booking.endDate, usedEndDate) && isSameDay(booking.startDate, usedEndDate))
                                    || isSameDay(booking.startDate, usedEndDate)) {
        
                                    let usedEnd;
        
                                    if (isSameDay(booking.startDate, booking.endDate)) {
                                        usedEnd = booking.endPeriod;
                                    } else {
        
                                        usedEnd = "1440";
                                    }
        
                                    for (let i = Number(booking.startPeriod); i <= Number(usedEnd); i = i + 30) {
        
                                        endDateAppointments.add({ number: i, bookingId: booking.id });
                                    }
                                    if ([...endDateAppointments].some(appointment => appointment.number === "0") && !isSameDay(usedStartDate, usedEndDate)) {
        
        
                                        isAvailable = false;
        
                                    } else if (booking.endDate > usedEndDate && booking.startDate > usedEndDate) {
        
                                    }
                                } else if (booking.endDate > usedEndDate && booking.startDate > usedEndDate) {
        
                                }
                                else {
        
        
                                    isAvailable = false;
                                }
                            }
                        }
        
                        if (startDateAppointments.size !== 0 || endDateAppointments.size !== 0 && (usedStartTime || usedEndTime)) {
                            if (usedStartTime) {
                                let usedEnd;
        
                                if (isSameDay(usedStartDate, usedEndDate) && usedEndTime) {
                                    usedEnd = usedEndTime;
                                } else {
                                    usedEnd = "1440";
                                }
        
                                for (let i = Number(usedStartTime); i <= Number(usedEnd); i = i + 30) {
                                    if ([...startDateAppointments].some(appointment => appointment.number === Number(i))) {
        
        
        
                                        isAvailable = false;
                                    }
                                }
                            }
                            if (endTime) {
        
                                let usedEnd;
        
                                if (isSameDay(usedStartDate, usedEndDate) && usedStartTime) {
                                    usedEnd = usedStartTime;
                                } else {
                                    usedEnd = "0";
                                }
        
        
        
                                for (let i = Number(usedEndTime); i >= Number(usedEnd); i = i - 30) {
                                    if ([...endDateAppointments].some(appointment => appointment.number === Number(i))) {
        
                                        isAvailable = false;
                                    }
        
        
                                }
                            }
                        }
        
        
        
        
                        if (isAvailable) {
                       
                            return true;
                        }
                    }
                }
            }

        }

        return false;

    })


    const filterAvailabilityMultiHours = ((pInserat: any) => {

        const checkMinTime = checkFitsMinTime(pInserat, startTime, endTime, startDateDynamic, endDateDynamic);

        if (!checkMinTime) {
            console.log("...")
            return false;
        }

        const usedVehicles = pInserat?.vehicles;

        for (const vehicle of usedVehicles) {


            for (let i = 0; ((isBefore(addDays(startDateDynamic, i), endDateDynamic) || isSameDay(addDays(startDateDynamic, i), endDateDynamic))); i++) {

                const usedStartDate = new Date(addDays(startDateDynamic, i));
                const usedEndDate = usedStartDate;





                let startDateAppointments = new Set<any>();
                let endDateAppointments = new Set<any>();

                let isAvailable = true;

                const addedTime = Number(reqTime.slice(0, 1));
                //give it the lowest startTime 0:00 Uhr if user didnt select any
                const retrievedStartTime = String(startTime) == "undefined" ? 0 : Number(startTime);
                const retrievedEndTime = String(endTime) == "undefined" ? 1440 : Number(endTime);


                for (let usedStartTime = retrievedStartTime; usedStartTime + (addedTime * 60) <= retrievedEndTime; usedStartTime = usedStartTime + (addedTime * 60)) {


                    const usedEndTime = usedStartTime + (addedTime * 60);
                    let isAvailable = true;

                    for (const booking of vehicle?.bookings) {
                        //booking starts AND ends before the searched Period
                        if (!(booking.startDate <= usedStartDate) || !(booking.endDate <= usedStartDate)
                            //booking starts or ends on the first OR last day of the searched period
                            || (isSameDay(booking.startDate, usedStartDate) || isSameDay(booking.endDate, usedStartDate)
                                || isSameDay(booking.endDate, usedStartDate) || isSameDay(booking.startDate, usedStartDate))
                            //booking
                            && (!(booking.endDate > usedEndDate) || !(booking.startDate > usedEndDate))
                        ) {
                            if ((isSameDay(booking.startDate, usedStartDate) && (isSameDay(booking.endDate, usedStartDate))) || isSameDay(booking.endDate, usedStartDate)) {
                                let usedStart;
                                if (isSameDay(booking.startDate, booking.endDate)) {
                                    usedStart = booking.startPeriod;
                                } else {
                                    usedStart = "0"
                                }

                                for (let i = Number(usedStart); i <= Number(booking.endPeriod); i = i + 30) {

                                    startDateAppointments.add(i);
                                }
                                if (startDateAppointments.has("1440") && !isSameDay(usedStartDate, usedEndDate)) {
                                    isAvailable = false;
                                }
                            } else if ((isSameDay(booking.endDate, usedEndDate) && isSameDay(booking.startDate, usedEndDate))
                                || isSameDay(booking.startDate, usedEndDate)) {

                                let usedEnd;

                                if (isSameDay(booking.startDate, booking.endDate)) {
                                    usedEnd = booking.endPeriod;
                                } else {

                                    usedEnd = "1440";
                                }

                                for (let i = Number(booking.startPeriod); i <= Number(usedEnd); i = i + 30) {

                                    endDateAppointments.add(i);
                                }
                                if (endDateAppointments.has("0") && !isSameDay(usedStartDate, usedEndDate)) {
                                    isAvailable = false;
                                } else if (booking.endDate > usedEndDate && booking.startDate > usedEndDate) {

                                }
                            } else if (isAfter(booking.endDate, usedEndDate) && isAfter(booking.startDate, usedEndDate)) {
                                console.log("...")
                            }
                            else {

                                isAvailable = false;
                            }
                        }
                    }


                    if ((usedStartTime || usedEndTime)) {
                        if (usedStartTime) {
                            let usedEnd;

                            if (isSameDay(usedStartDate, usedEndDate) && usedEndTime) {
                                usedEnd = usedEndTime;
                            } else {
                                usedEnd = "1440";
                            }

                            for (let i = Number(usedStartTime); i <= Number(usedEnd); i = i + 30) {
                                if (startDateAppointments.has(Number(i))) {
                                    isAvailable = false;
                                }
                            }
                        }
                        if (usedEndTime) {
                            let usedEnd;
                            if (isSameDay(usedStartDate, usedEndDate) && usedStartTime) {
                                usedEnd = usedStartTime;
                            } else {
                                usedEnd = "0";
                            }


                            for (let i = Number(usedEndTime); i >= Number(usedEnd); i = i - 30) {
                                if (endDateAppointments.has(Number(i))) {
                                    isAvailable = false;
                                }
                            }
                        }
                    }
                    if (isAvailable) {
                        return true;

                    }

                }
                startDateAppointments.clear();
                endDateAppointments.clear();
            }


        }

        return false;
    })


    const requireHours = [
        "1h",
        "4h"
    ]

    let isAvailable;

    const isHourBased = requireHours.includes(reqTime);

    if (pInserat?.multi) {
        isAvailable = isHourBased ? filterAvailabilityMultiHours(pInserat) : filterAvailabilityMulti(pInserat);
    } else {
        isAvailable = isHourBased ? filterAvailabilityHours(pInserat) : filterAvailability(pInserat);
    }

    return isAvailable;


}




export const checkFitsMinTime = (pInserat, startTime, endTime, periodBegin, periodEnd) => {
    try {
        if (!pInserat?.minTime) {
            console.log(pInserat?.minTime)
            return true;
        }

        const usedStartTime = startTime ? Number(startTime) : 0;
        const usedEndTime = endTime ? Number(endTime) : 1440;


        const usedStartDate = createDateWithTime(periodBegin, usedStartTime);
        const usedEndDate = createDateWithTime(periodEnd, usedEndTime);



        const diffrence = differenceInHours(new Date(usedEndDate), new Date(usedStartDate));

        if (pInserat?.minTime > diffrence) {
            return false;
        } else {
            return true;
        }

    } catch (e) {
        console.log(e);
        return false; // Return false if an error occurs
    }
};