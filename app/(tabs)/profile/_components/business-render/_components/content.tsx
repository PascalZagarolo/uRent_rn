import { cn } from "@/~/lib/utils";
import { useState } from "react";
import { Button, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import ContentTab from "./_tabs/content-tab";
import { businessAddress, userTable } from "@/db/schema";
import LocationTab from "./_tabs/location-tab";
import OpeningTimesRender from "./_tabs/opening-times-render";

import ImprintRender from "./_tabs/imprint";

interface ContentBusinessRenderProps {
    thisUser : typeof userTable.$inferSelect & {inserat, business };
    isOwn : boolean;
    setOpenLocation : (open : boolean, id : string, type : string) => void;
    setOpenOpeningTimes : (open : boolean) => void;
    foundAddresses : typeof businessAddress.$inferSelect[];
    foundOpeningTimes : {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    }
}


const ContentBusinessRender = ({ thisUser, isOwn, setOpenLocation, setOpenOpeningTimes, foundAddresses, foundOpeningTimes } :  ContentBusinessRenderProps ) => {

    const [tab, setTab] = useState("content");


    const foundInserate = thisUser?.inserat?.filter(inserat => inserat.isPublished === true)

    

    return (
        <View className="relative">
        <ScrollView
            className="py-2"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 16,
                gap: 16,
                height: 60,
                zIndex: 10, // Ensure it's above other content
            }}
        >
            {["content", "location", "openingTimes", "imprint"].map((item) => (
                <View key={item}>
                    <TouchableOpacity
                        onPress={() => setTab(item)}
                        className={cn(
                            "bg-[#181b27] px-4 py-4 rounded-md",
                            tab !== item && "bg-transparent"
                        )}
                    >
                        <Text className={cn(
                            "text-gray-200/80 text-base",
                            tab === item && "text-gray-200"
                        )}>
                            {item === "content" ? "Inhalte" :
                             item === "location" ? "Standort" :
                             item === "openingTimes" ? "Öffnungszeiten" :
                             "Impressum"}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    
        <View className="mt-8 px-2 pb-4 flex-1">
            {{
                content: <ContentTab username={thisUser?.name} foundInserate={foundInserate} />,
                location: <LocationTab
                    foundAddresses={foundAddresses}
                    isOwn={isOwn}
                    setOpenLocation={(value1, value2, value3) => {
                        setOpenLocation(value1, value2, value3);
                        console.log(value1, value2, value3);
                    }}
                />,
                openingTimes: <OpeningTimesRender foundTimes={thisUser?.business?.openingTimes} setOpenOpeningTimes={setOpenOpeningTimes} isOwn={isOwn} foundOpeningTimes={foundOpeningTimes} />,
                imprint: <ImprintRender imprint={thisUser?.business?.impressum} isOwn={isOwn} />,
            }[tab]}
        </View>
    </View>
    
     

    );
}

export default ContentBusinessRender;