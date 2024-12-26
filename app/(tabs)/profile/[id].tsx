import db from "@/db/drizzle";
import { businessAddress, paymentMethods, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, SafeAreaView, ScrollView, Text, View } from "react-native";
import ProfileRender from "./_components/profile-render";
import LocationDialog from "./_components/business-render/_components/_tabs/_dialogs/location-dialog";
import LocationDialogDelete from "./_components/business-render/_components/_tabs/_dialogs/location-delete";
import LocationDialogEdit from "./_components/business-render/_components/_tabs/_dialogs/location-edit";
import OpeningTimesDialog from "./_components/business-render/_components/_tabs/_dialogs/opening-times-dialog";





const ProfilePage = () => {

    const { id } = useLocalSearchParams<{ id: string }>();

    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
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
                if (thisUser?.business?.businessAddresses?.length > 0) {
                    console.log(thisUser?.business?.businessAddresses)
                    setFoundAddresses(thisUser?.business?.businessAddresses);
                }
            } catch (e: any) {
                console.log(e);
                setUser(null);
            }
        }

        findUser();

    }, [])

    type openTypes = "edit" | "delete"

    const [showLocation, setShowLocation] = useState<{ open: boolean, id: string, type?: openTypes }>({ open: false, id: "", type: null });
    const [showOpeningTimes, setShowOpeningTimes] = useState<boolean>(false);
    const [foundAddresses, setFoundAddresses] = useState<any[] | null>([])

    const isOwner = user?.id === id;

    return (

        <View className=" bg-[#181b27] h-screen">
            <SafeAreaView className="">
                <View className="border-b border-gray-800 p-4 bg-[#181b27]">
                    <Text className="text-xl font-semibold text-gray-200">
                        {user?.isBusiness ? "Vermieterdetails" : "Nutzerdetails"}
                    </Text>
                </View>
            </SafeAreaView >


            {user && (
                <ProfileRender
                    thisUser={user}
                    isOwner={isOwner}
                    setOpenLocation={(value1, value2, value3) => {
                        setShowLocation({ open: value1, id: value2, type: value3 });
                        console.log(value1, value2, value3);
                    }}
                    setOpenOpeningTimes={(value) => setShowOpeningTimes(value)}
                    foundAddresses={foundAddresses}
                />
            )}


            <Modal
                animationType="slide"
                transparent={true}
                visible={showLocation.open || showOpeningTimes}
                onRequestClose={() => {
                    setShowLocation({ open: false, id: "", type: null });
                }}

            >
                {showOpeningTimes && (
                    <OpeningTimesDialog 
                    onClose={() => setShowOpeningTimes(false)}
                    />
                )}
                {!showLocation?.type && (
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
            </Modal>
        </View>

    );
}

export default ProfilePage;