import { cn } from "@/~/lib/utils";
import { useState } from "react";
import { Button, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import ContentTab from "./_tabs/content-tab";
import { businessAddress, userTable } from "@/db/schema";
import LocationTab from "./_tabs/location-tab";
import OpeningTimesRender from "./_tabs/opening-times-render";
import { openingTimes } from '../../../../../../db/schema';
import ImprintRender from "./_tabs/imprint";

interface ContentBusinessRenderProps {
    thisUser : typeof userTable.$inferSelect;
    isOwn : boolean;
    setOpenLocation : (open : boolean, id : string, type : string) => void;
    setOpenOpeningTimes : (open : boolean) => void;
    foundAddresses : typeof businessAddress.$inferSelect[];
}


const ContentBusinessRender = ({ thisUser, isOwn, setOpenLocation, setOpenOpeningTimes, foundAddresses } :  ContentBusinessRenderProps ) => {

    const [tab, setTab] = useState("content");


    const foundInserate = thisUser?.inserat?.filter(inserat => inserat.isPublished === true)

    

    return (

        
            <View >
                <ScrollView
                    className="py-2"
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
                >
                    <View>
                        <TouchableOpacity
                            onPress={() => { setTab("content"); }}
                            className={cn(
                                "bg-[#181b27] px-4 py-4 rounded-md",
                                tab !== "content" && "bg-transparent"
                            )}
                        >
                            <Text className={cn(
                                "text-gray-200/80 text-base",
                                tab === "content" && "text-gray-200"
                            )}>
                                Inhalte
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => { setTab("location"); }}
                            className={cn(
                                "bg-[#181b27] px-4 py-4 rounded-md",
                                tab !== "location" && "bg-transparent"
                            )}
                        >
                            <Text className={cn(
                                "text-gray-200/80 text-base",
                                tab === "location" && "text-gray-200"
                            )}>
                                Standort
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => { setTab("openingTimes"); }}
                            className={cn(
                                "bg-[#181b27] px-4 py-4 rounded-md",
                                tab !== "openingTimes" && "bg-transparent"
                            )}
                        >
                            <Text className={cn(
                                "text-gray-200/80 text-base",
                                tab === "openingTimes" && "text-gray-200"
                            )}>
                                Öffnungszeiten
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => { setTab("imprint"); }}
                            className={cn(
                                "bg-[#181b27] px-4 py-4 rounded-md",
                                tab !== "imprint" && "bg-transparent"
                            )}
                        >
                            <Text className={cn(
                                "text-gray-200/80 text-base",
                                tab === "imprint" && "text-gray-200"
                            )}>
                                Impressum
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View className="mt-8 px-2 pb-4" >
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
                        openingTimes: <OpeningTimesRender foundTimes={thisUser?.business?.openingTimes} setOpenOpeningTimes={setOpenOpeningTimes} isOwn={isOwn}/>,
                        imprint: <ImprintRender imprint={thisUser?.business?.impressum} isOwn={isOwn} />,
                    }[tab]}
                </View>
            </View>
     

    );
}

export default ContentBusinessRender;