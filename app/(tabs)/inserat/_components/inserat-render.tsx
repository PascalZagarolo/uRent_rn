import { booking, inserat } from "@/db/schema";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated, Dimensions, Image, Modal, Platform, Text, TouchableOpacity, View } from "react-native";
import { format } from "date-fns";

import { Drawer } from 'react-native-drawer-layout';

import { useRouter } from "expo-router";
import InseratOptions from "./inserat-options";
import InseratPriceProfiles from "./inserat-price-profiles";
import InseratConditions from "./inserat-conditions";
import InseratContactOptions from "./inserat-contact-options";
import InseratDescription from "./inserat-description";
import InseratAttributes from "./inserat-attributes";
import InseratProfile from "./inserat-profile";
import InseratMoreContent from "./inserat-user-more-content";
import BookingCalendar from "./dialogs/booking-calendar";

import { useCallback, useRef, useState } from "react";
import BookingDialog from "./dialogs/booking-dialog";
import { GestureDetector, Gesture, GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import ImageCarousel from "./image-carousel";
import ReportModalInserat from "./report/report-modal";


interface InseratRenderProps {
    thisInserat: typeof inserat.$inferSelect & { user, address, images };
    currentUserId?: string;
    inseratBookings: typeof booking.$inferSelect[];
    isFaved: boolean;
}

const SWIPE_DISTANCE = Platform.OS === 'android' ? 50 : 100; // Higher = harder to swipe
const MAX_Y_SCROLL_DISTANCE_TO_ALLOW_SWIPE = 100; // Lower = harder to swipe
const { width } = Dimensions.get('window'); // Device width for horizontal swipe

const InseratRender: React.FC<InseratRenderProps> = ({
    thisInserat,
    currentUserId,
    inseratBookings,
    isFaved
}) => {

    const [showBookings, setShowBookings] = useState(false);
    const [showReport, setShowReport] = useState(false);

    const matchingIcon = (usedCategory: string) => {
        switch (usedCategory) {
            case "PKW":
                return <FontAwesome5 name="car" size={20} color="white" />;
            case "LKW":
                return <FontAwesome name="truck" size={20} color="white" />;
            case "TRANSPORT":
                return <MaterialCommunityIcons name="van-utility" size={20} color="white" />;
            case "TRAILER":
                return <MaterialCommunityIcons name="truck-trailer" size={20} color="white" />;

        }
    }














    function separatePrice(priceString) {
        // Remove the currency symbol and trim any extra spaces
        let price = priceString.replace('€', '').trim();

        // Split the price into integer and decimal parts
        let [integerPart, decimalPart] = price.split('.');

        // If there is no decimal part, set it to '00'
        if (!decimalPart) {
            decimalPart = '00';
        }

        // Return the integer and decimal parts
        return {
            integerPart: integerPart,
            decimalPart: decimalPart
        };
    }

    let { integerPart, decimalPart } = separatePrice(thisInserat?.price);

    const router = useRouter()
    ///////////////////////////////////////
    const [currentIndex, setCurrentIndex] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current; // For smooth transition of images
    const touchX = useRef(0);
    const touchY = useRef(0);



    const onSwipeTab = useCallback((direction) => {
        let newIndex = currentIndex;
        if (direction === 'next' && currentIndex < thisInserat?.images?.length - 1) {
            newIndex++;
        } else if (direction === 'previous' && currentIndex > 0) {
            newIndex--;
        }

        // Animation zur nächsten oder vorherigen Seite
        Animated.spring(translateX, {
            toValue: -newIndex * width, // Bewegt sich zur neuen Position
            useNativeDriver: false, // Setze `false`, um `_value` korrekt zu verwenden
        }).start();

        setCurrentIndex(newIndex);
    }, [currentIndex, thisInserat?.images?.length, translateX]);

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: false } // Wichtig: setze `false`, um `translateX._value` zu verwenden
    );

    const onHandlerStateChange = useCallback((event) => {
        if (event.nativeEvent.state === State.END) {
            const { translationX } = event.nativeEvent;

            if (translationX < -50) {
                onSwipeTab('next');
            } else if (translationX > 50) {
                onSwipeTab('previous');
            } else {
                // Falls der Swipe zu klein ist, springt das Bild zurück
                Animated.spring(translateX, {
                    toValue: -currentIndex * width,
                    useNativeDriver: false,
                }).start();
            }
        }
    }, [onSwipeTab, currentIndex, translateX]);

    return (
        <View className="h-full w-full">

            <View>
                <View className="">
                    <TouchableOpacity className="p-4 flex flex-row items-center" onPress={() => { router.push("/") }}>
                        <MaterialCommunityIcons className="w-4 h-4 text-gray-200" name="arrow-left" color={"white"} size={24} />
                        <Text className="text-sm ml-4 text-gray-200/80">
                            Zurück zur Startseite
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="p-4 py-4 w-full flex flex-row bg-[#1D1F2B] items-center">
                    <View className="w-2/12">
                        {matchingIcon(thisInserat?.category)}
                    </View>
                    <Text className="text-lg font-semibold text-gray-200 w-10/12 break-all line-clamp-1" numberOfLines={1}>
                        {thisInserat?.title}
                    </Text>
                </View>
                <View className="flex flex-row items-center px-2  mb-4">
                    <View>
                        <Text className="text-gray-200/60 text-sm font-medium">
                            <Text className="font-normal">erstellt am: </Text>{format(new Date(thisInserat?.createdAt), "dd.MM.yyyy")}
                        </Text>
                    </View>
                </View>

                <View className="w-full">
                    {thisInserat?.images?.length > 0 && <ImageCarousel images={thisInserat.images} />}
                </View>
                <View className="ml-auto ">
                    <TouchableOpacity className="mr-8 flex flex-row w-full underline items-center mt-2 space-x-2 rounded-md"
                    onPress={() => setShowReport(true)}
                    >
                        <MaterialCommunityIcons name="alert-circle" size={16} color={"gray"} />
                        <Text className="text-sm text-gray-200/60 underline">
                            Anzeige melden
                        </Text>
                    </TouchableOpacity>
                </View>
                <BookingCalendar
                    setShowBookings={setShowBookings}
                />
                <View className="px-4 ">
                    <View className="bg-[#252836] rounded-md">
                        <View className="p-4 flex flex-row items-center">
                            <View className="mr-4">
                                <FontAwesome name="map-marker" size={24} color="red" className="mr-4" />
                            </View>
                            <Text className="flex flex-row text-base font-semibold items-center w-full break-all line-clamp-1 text-gray-200" numberOfLines={1}>
                                {thisInserat?.address?.postalCode} | {thisInserat?.address?.locationString}
                            </Text>
                        </View>
                        <View className="px-4 flex justify-end ml-auto items-center">
                            <Text className="text-gray-200 font-semibold text-xl items-center">
                                {integerPart}.<Text className="text-sm">{decimalPart}</Text> <Text className="text-gray-200/60 font-normal text-sm">/Tag</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="py-2">
                    <InseratOptions
                        inseratId={thisInserat?.id}
                        currentUserId={currentUserId}
                        inseratUserId={thisInserat?.userId}
                        isFaved={isFaved}
                    />
                </View>
                <View>
                    <InseratPriceProfiles
                        thisInserat={thisInserat}
                    />
                </View>
                <View className="p-4">
                    <InseratConditions
                        thisInserat={thisInserat}
                    />
                </View>
                <View className="p-4">
                    <InseratContactOptions
                        thisInserat={thisInserat}
                    />
                </View>
                <View className="p-4">
                    <InseratDescription
                        description={thisInserat?.description}
                    />
                </View>
                <View className="">
                    <InseratAttributes
                        thisInserat={thisInserat}
                    />
                </View>

                <View className="p-4">
                    <InseratProfile
                        thisUser={thisInserat.user}
                    />
                </View>

                <View className="p-4 px-6">
                    <InseratMoreContent
                        username={thisInserat.user.name}
                        foundInserat={thisInserat.user.inserat}
                    />
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showBookings || showReport}
                onRequestClose={() => {
                    setShowBookings(false);
                }}

            >
                {showBookings && (
                    <BookingDialog
                        thisInserat={thisInserat}
                        receivedBookings={inseratBookings}
                        onClose={() => setShowBookings(false)}
                    />
                )}
                {showReport && (
                    <ReportModalInserat
                        onClose={() => setShowReport(false)}
                    />
                )}
            </Modal>


        </View>
    );
}

export default InseratRender;