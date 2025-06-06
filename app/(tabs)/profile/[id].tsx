import db from "@/db/drizzle";
import { businessAddress, paymentMethods, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {  Text, TouchableOpacity, View } from "react-native";
import ProfileRender from "./_components/profile-render";
import LocationDialog from "./_components/business-render/_components/_tabs/_dialogs/location-dialog";
import LocationDialogDelete from "./_components/business-render/_components/_tabs/_dialogs/location-delete";
import LocationDialogEdit from "./_components/business-render/_components/_tabs/_dialogs/location-edit";
import OpeningTimesDialog from "./_components/business-render/_components/_tabs/_dialogs/opening-times-dialog";


import BannerDialog from "./_components/business-render/_components/_tabs/_dialogs/banner-dialog";
import SwitchProfileDialog from "./_components/business-render/_components/_tabs/_dialogs/switch-profile-dialog";

import { useAuth } from "../AuthProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import placeholderPicture from "@/assets/images";
import ImageDialog from "./_components/business-render/_components/_tabs/_dialogs/image-dialog";
import { Modal } from "react-native";
import ReportModalProfile from "./_components/business-render/_components/_report/report-modal";
import * as SecureStorage from 'expo-secure-store';
import { getCurrentUser } from "@/actions/getCurrentUser";





const ProfilePage = () => {

    const { id } = useLocalSearchParams<{ id: string }>();

    const [user, setUser] = useState<any | null>(null);
    
    const [currentUser, setCurrentUser] = useState(null)

    const loadCurrentUser = async () => {
        try {
             const authToken = await SecureStorage.getItemAsync("authToken");
             const currentUser = await getCurrentUser(authToken);
             if(currentUser) {
                setCurrentUser(currentUser)
             } else {
                setCurrentUser(null)
             }
        } catch(e : any) {
            console.log(e);
            setCurrentUser(null);
        }
    }

    const findUser = async () => {
        try {
            const thisUser = await db.query.userTable.findFirst({
                where: eq(userTable.id, id),
                with: {
                    inserat: {
                        with: {
                            images: true,
                            address: true
                        }
                    },
                    business: {
                        with: {
                            businessAddresses: true,
                            faqs: true,
                            openingTimes: true,
                            businessImages: true,
                        }
                    },
                    paymentMethods: true,
                },

            });

            setUser(thisUser);
            setImageUrl(thisUser?.image)
            if (thisUser?.business?.businessAddresses?.length > 0) {
                
                setFoundAddresses(thisUser?.business?.businessAddresses);
            }

            if(thisUser?.business?.openingTimes) {
                setFoundOpeningTimes({
                    monday : thisUser?.business?.openingTimes?.monday,
                    tuesday : thisUser?.business?.openingTimes?.tuesday,
                    wednesday : thisUser?.business?.openingTimes?.wednesday,
                    thursday : thisUser?.business?.openingTimes?.thursday,
                    friday : thisUser?.business?.openingTimes?.friday,
                    saturday : thisUser?.business?.openingTimes?.saturday,
                    sunday : thisUser?.business?.openingTimes?.sunday,
                })
            }

            if(thisUser) {
                setImageUrl(thisUser?.image)
            }

            if(thisUser?.isBusiness) {
                setBannerUrl(thisUser?.business.businessImages[0]?.url)
            }
        } catch (e: any) {
            console.log(e);
            setUser(null);
        }
    }

   

    useEffect(() => {
        findUser();
        loadCurrentUser();
    }, [])

    

    const onReload = async () => {
        await findUser();
        await loadCurrentUser();
    }

    type openTypes = "edit" | "delete"

    const [showLocation, setShowLocation] = useState<{ open: boolean, id: string, type?: openTypes }>({ open: false, id: "", type: null });
    const [showOpeningTimes, setShowOpeningTimes] = useState<boolean>(false);
    const [foundAddresses, setFoundAddresses] = useState<any[] | null>([])
    const [foundOpeningTimes, setFoundOpeningTimes] = useState<any | null>({
        monday : null,
        tuesday : null,
        wednesday : null,
        thursday : null,
        friday : null,
        saturday : null,
        sunday : null
    })
    const [openDialogImage, setOpenDialogImage] = useState<boolean>(false);
    const [openDialogBanner, setOpenDialogBanner] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [bannerUrl, setBannerUrl] = useState<string | null>(null);
    const [switchProfile, setSwitchProfile] = useState<boolean>(false);
    const [showReport, setShowReport] = useState<boolean>(false);

    const isOwner = user?.id == currentUser?.id;

    

    const router = useRouter();

    return (
<SafeAreaView className=" bg-[#181b27]">
        <View className=" bg-[#181b27] h-full w-full sm:max-w-[600px] mx-auto">
            
                <View className="border-b border-gray-800 p-4 bg-[#181b27] space-x-4 flex flex-row items-center">
                    <TouchableOpacity className="" onPress={() => {router.back()}}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color={"white"} />
                    </TouchableOpacity>
                    <Text className="text-xl font-semibold text-gray-200">
                        {user?.isBusiness ? "Vermieterdetails" : "Nutzerdetails"}
                    </Text>
                </View>
           


                {user && (
                <ProfileRender
                    thisUser={user}
                    currentUser = {currentUser}
                    isOwner={isOwner}
                    setOpenLocation={(value1, value2, value3) => {
                        setShowLocation({ open: value1, id: value2, type: value3 });
                        console.log(value1, value2, value3);
                    }}
                    bannerUrl = {bannerUrl}
                    imageUrl = {imageUrl}
                    setOpenOpeningTimes={(value) => setShowOpeningTimes(value)}
                    setOpenDialogImage={(value) => setOpenDialogImage(value)}
                    setOpenDialogBanner={(value) => setOpenDialogBanner(value)}
                    setOpenSwitchProfile={(value) => setSwitchProfile(value)}
                    setOpenReportModal={(value) => setShowReport(value)}
                    foundAddresses={foundAddresses}
                    foundOpeningTimes={foundOpeningTimes}
                />
            )}


            <Modal
                animationType="slide"
                transparent={true}
                visible={showLocation.open || showOpeningTimes || openDialogImage || openDialogBanner || switchProfile || showReport}
                onRequestClose={() => {
                    setShowLocation({ open: false, id: "", type: null });
                }}

            >
               
              {switchProfile && (
                    <SwitchProfileDialog 
                    onClose={() => setSwitchProfile(false)}
                    onReload={onReload}
                    />
                )}
                {openDialogBanner && (
                    <BannerDialog 
                    onClose={() => setOpenDialogBanner(false)}
                    imageUrl={bannerUrl}
                    setImageUrl={(newOne) => setBannerUrl(newOne)}
                    />
                )} 
                {openDialogImage && (
                    <ImageDialog 
                    imageUrl={imageUrl ? imageUrl : placeholderPicture}
                    onClose={() => {
                        setOpenDialogImage(false);
                        setImageUrl(user?.image)
                    }}
                    setImageUrl={(newOne) => setImageUrl(newOne)}
                    />
                    
                )}
                {showOpeningTimes && (
                    <OpeningTimesDialog 
                    onClose={() => setShowOpeningTimes(false)}
                    foundTimes={foundOpeningTimes}
                    setFoundTimes={(newOne) => setFoundOpeningTimes(newOne)}
                    />
                )}
                {(!showLocation?.type && showLocation.open) && (
                    <LocationDialog
                        onClose={() => setShowLocation({ open: false, id: "" })}
                        onInsert={(newOne) => setFoundAddresses([...foundAddresses, newOne])}
                    />
                )}
                
                {showLocation?.type == "delete" && (
                    <LocationDialogDelete
                        locationId={showLocation.id}
                        onClose={() => setShowLocation({ open: false, id: "" })}
                        onDelete={(newOne) => setFoundAddresses([...foundAddresses.filter(address => address.id !== newOne.id)])}
                    />
                )}
                {showLocation?.type == "edit" && (
                    <LocationDialogEdit
                        onClose={() => setShowLocation({ open: false, id: "" })}
                        onEdit={(newOne) => setFoundAddresses([...foundAddresses.map(address => address.id === newOne.id ? newOne : address)])}
                        prefilledAddress={foundAddresses.find(address => address.id === showLocation.id)}
                    />
                )}   
               {showReport && (
                <ReportModalProfile 
                reportedUserId={id}
                currentUserId={currentUser?.id}
                onClose={() => setShowReport(false)}
                />
               )}
            </Modal>
        </View>
        </SafeAreaView>
    );
}

export default ProfilePage;