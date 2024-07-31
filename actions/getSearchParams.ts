import { useLocalSearchParams } from "expo-router";

export const getSearchParamsFunction = (currentCategory? : string, currentCategory2? : string) => {

    const searchParams = useLocalSearchParams();

    const params = {
        category: searchParams.category,
        title: searchParams.title,
        location: searchParams.location,
        periodBegin: searchParams.periodBeginv,
        periodEnd: searchParams.periodEnd,
        startTime : searchParams.startTime,
        endTime : searchParams.endTime,
        startDateDynamic : searchParams.startDateDynamic,
        endDateDynamic : searchParams.endDateDynamic,
        reqTime : searchParams.reqTime,
        dynamicSearch : searchParams.dynamicSearch,
        /*
        page : searchParams.get("page"),
        */
        start : searchParams.start,
        end : searchParams.end,
        license : searchParams.license,
        amount: searchParams.amount,
        //Sort
        filter : searchParams.filter,
        //Conditions
        reqAge : searchParams.reqAge,
        caution: searchParams.caution,

        //PKW
        brand : searchParams.brand,
        thisBrand : searchParams.thisBrand,
        
        seats : searchParams.seats,
        seatsMax : searchParams.seatsMax,
        fuel : searchParams.fuel,
        transmission : searchParams.transmission,
        type : searchParams.type,
        doors : searchParams.doors,
        doorsMax : searchParams.doorsMax,
        power : searchParams.power,
        powerMax : searchParams.powerMax,
        freeMiles : searchParams.freeMiles,
        extraCost : searchParams.extraCost,
        ahk : searchParams.ahk,

        //LKW
        lkwBrand : searchParams.lkwBrand,
        application : searchParams.application,
        loading : searchParams.loading,
        drive : searchParams.drive,
        weightClass : searchParams.weightClass,
        weightClassMax : searchParams.weightClassMax,

        //TRAILER
        coupling : searchParams.coupling,
        extraType : searchParams.extraType,
        axis : searchParams.axis,
        axisMax : searchParams.axisMax,
        brake : searchParams.brake,

        //TRANSPORT
        transportBrand : searchParams.transportBrand,


        //Loading
        volume : searchParams.volume,

        loading_h : searchParams.loading_h,
        loading_l : searchParams.loading_l,
        loading_b : searchParams.loading_b,

        radius : searchParams.radius,

        user : searchParams.user,
        
        //ELSE
        inseratId : searchParams.inseratId,

        initial : searchParams.initial,
        initialMax : searchParams.initialMax

    }
    if (currentCategory && params.hasOwnProperty(currentCategory)) {
        //@ts-ignore
        delete params[currentCategory];
        if (currentCategory2 && params.hasOwnProperty(currentCategory2)) {
            //@ts-ignore
            delete params[currentCategory2];
          } 
      }
      
    return params;

}