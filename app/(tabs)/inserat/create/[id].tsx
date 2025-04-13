import { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import BasicDetails from "./_components/parts/basic-details";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getThisInserat } from "@/actions/inserat/getThisInserat";
import BasicDetails2 from "./_components/parts/basic-details-2";
import BasicDetails3 from "./_components/parts/basic-details-3";
import PriceDetails from "./_components/parts/price-details";
import ConditionsDetails from "./_components/parts/conditions-details";
import TimespanDetails from "./_components/parts/timespan-details";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import AddressDetails from "./_components/parts/address-details";

import PkwDetails from "./_components/parts/categories/pkw-details";
import ContactDetails from "./_components/parts/contact-details";
import PkwDetails2 from "./_components/parts/categories/pkw-details-2";
import LkwDetails from "./_components/parts/categories/lkw-details";
import LkwDetails2 from "./_components/parts/categories/lkw-details-2";
import TrailerDetails from "./_components/parts/categories/trailer-details";
import TrailerDetails2 from "./_components/parts/categories/trailer-details-2";
import TransportDetails from "./_components/parts/categories/transport-details";
import TransportDetails2 from "./_components/parts/categories/transport-details-2";
import { desc } from "drizzle-orm";
import FurtherDetails from "./_components/parts/categories/further-details";
import SaveInseratPage from "./_components/parts/save-inserat-page";
import AddressDetails2 from "./_components/parts/address-details-2";
import { pkwAttribute } from '../../../../db/schema';
import WeightAttributes from "./_components/parts/categories/weight-attributes";
import { cn } from "@/~/lib/utils";

const InseratCreationPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [thisInserat, setThisInserat] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(0);
    const router = useRouter();

    const basicDetailsRef = useRef(null);
    const basicDetails2Ref = useRef(null);
    const basicDetails3Ref = useRef(null);
    const priceDetails = useRef(null);
    const conditionsDetails = useRef(null);
    const timespanDetails = useRef(null);
    const addressDetails = useRef(null);
    const contactDetails = useRef(null);
    const furtherDetails = useRef(null);

    const pkwDetails = useRef(null);
    const pkwDetails2 = useRef(null);
    const lkwDetails = useRef(null);
    const lkwDetails2 = useRef(null);
    const transporterDetails = useRef(null);
    const transporterDetails2 = useRef(null);
    const anhaengerDetails = useRef(null);
    const anhaengerDetails2 = useRef(null);
    const weightDetails = useRef(null);

    const loadInserat = async () => {
        try {
            const foundInserat = await getThisInserat(id);
    
            setThisInserat(foundInserat);
            if (foundInserat) {
                setCategories(foundInserat);
            }
        } catch (e) {
            console.error("Error fetching the Inserat:", e);
        }
    };
    
    const setCategories = (foundInserat) => {
        const categoryMapping: { [key: string]: { title: string; components: { first: JSX.Element; second: JSX.Element } } } = {
            PKW: {
                title: "Pkw",
                components: {
                    first: <PkwDetails thisInserat={foundInserat} ref={pkwDetails} refetchInserat={refetchInserat} />,
                    second: <PkwDetails2 thisInserat={foundInserat} ref={pkwDetails2} refetchInserat={refetchInserat} />,
                },
            },
            LKW: {
                title: "Lkw",
                components: {
                    first: <LkwDetails thisInserat={foundInserat} ref={lkwDetails} refetchInserat={refetchInserat} />,
                    second: <LkwDetails2 thisInserat={foundInserat} ref={lkwDetails2} refetchInserat={refetchInserat} />,

                },
            },
            TRANSPORT: {
                title: "Transporter",
                components: {
                    first: <TransportDetails thisInserat={foundInserat} ref={transporterDetails} refetchInserat={refetchInserat} />,
                    second: <TransportDetails2 thisInserat={foundInserat} ref={transporterDetails2} refetchInserat={refetchInserat} />,
                },
            },
            TRAILER: {
                title: "Anhänger",
                components: {
                    first: <TrailerDetails thisInserat={foundInserat} ref={anhaengerDetails} refetchInserat={refetchInserat} />,
                    second: <TrailerDetails2 thisInserat={foundInserat} ref={anhaengerDetails2} refetchInserat={refetchInserat} />,
                },
            },
        };
    
        const category = categoryMapping[foundInserat.category];
        if (category) {
            setUsedTitle(category?.title ?? ""); // Assuming you have a state like `const [usedTitle, setUsedTitle] = useState("")`
            setUsedSegment({ firstSegment : category?.components.first, secondSegment : category?.components?.second}); // Assuming you have a state like `const [usedSegment, setUsedSegment] = useState({ first: null, second: null })`
        } else {
            console.warn("Unknown category:", foundInserat?.category);
        }
    };
    
    useEffect(() => {
        loadInserat();
    }, [id]);
    

   

    

    

    const [usedTitle, setUsedTitle] = useState<string>(""); // Initialize as an empty string
    const [usedSegment, setUsedSegment] = useState<{ firstSegment: JSX.Element | null; secondSegment: JSX.Element | null }>({
        firstSegment: null,
        secondSegment: null,
    });


    const refetchInserat = async () => {
        try {
            const foundInserat = await getThisInserat(id);
            
            setThisInserat(foundInserat);
            if (foundInserat) {
                setCategories(foundInserat);
            }
        } catch (e: any) {
            console.log("Fehler beim erhalten des Inserats");
        }

    }

    const pageRefs : { title : string, page : number }[] = [
        { title : "basicDetails1", page : 1 },
        { title : "basicDetails2", page : 2 },
        { title : "basicDetails3", page : 3 },
        { title : "priceDetails", page : 4 },
    ]
    
    const neededInputs : { name : string, description : string, page : number , isMissing : boolean }[] = [
        { name: "Titel", description : "Du hast noch keinen Titel angegeben.",
        page: Number(pageRefs.find(ref => ref.title === "basicDetails1")), isMissing : String(thisInserat?.title ?? "").trim() == "" },
        { name: "Beschreibung",
        description : "Du hast noch keine Beschreibung angegeben.", 
        page: Number(pageRefs.find(ref => ref.title === "basicDetails1")), 
        isMissing : String(thisInserat?.description ?? "").trim() == "" },
        { name : "Bilder", description : "Du hast noch keine Bilder hinzugefügt.", 
        page : Number(pageRefs.find(ref => ref.title === "basicDetails2")), isMissing : thisInserat?.images?.length < 1 },
        { name : "Kategorie", description : "Du hast noch keine Kategorie angegeben.", 
        page : Number(pageRefs.find(ref => ref.title === "basicDetails3")), isMissing : !thisInserat?.category },
       
        { name : "Fahrzeuganzahl", description : "Du hast noch keine Fahrzeuganzahl angegeben.",
        page : Number(pageRefs.find(ref => ref.title === "basicDetails3")), isMissing : thisInserat?.isMulti && (!thisInserat?.amount || thisInserat?.amount <= 1) },
        { name : "Preis", description : "Du hast noch keinen Preis angegeben.", 
        page : Number(pageRefs.find(ref => ref.title === "priceDetails")), isMissing : String(thisInserat?.price ?? "")?.trim() == "" },
        { name : "Addresse", description : "Du hast noch keine Addresse angegeben.", 
        page : Number(pageRefs.find(ref => ref.title === "basicDetails2")), isMissing : String(thisInserat?.address?.locationString ?? "")?.trim() == "" },
        { name : "Postleitzahl", description : "Du hast noch keine Postleitzahl angegeben.", 
        page : Number(pageRefs.find(ref => ref.title === "basicDetails2")), isMissing : String(thisInserat?.address?.postalCode ?? "")?.trim() == "" },

    ]
   

    const pageInfo = [
        {
            number: 0,
            title: "Grundlegende Details (1/2)",
            description: "Gebe die grundlegenden Details deines Inserats an, wie z.B. den Titel und Beschreibung.",
            segment: <BasicDetails thisInserat={thisInserat} ref={basicDetailsRef} refetchInserat={refetchInserat} />
        },
        {
            number: 1,
            title: "Bilder hochladen - Grundlegende Details (2/2)",
            description: `Halte hochgeladene Fotos, um sie zu verschieben.
            `,
            segment: <BasicDetails2 thisInserat={thisInserat} ref={basicDetails2Ref} refetchInserat={refetchInserat} />
        },
        {
            number: 2,
            title: "Zusätzliche Details",
            description: "Füge zusätzliche Details hinzu, wie Preis, Fahrzeugkategorie etc. um dein Inserat zu vervollständigen.",
            segment: <BasicDetails3 thisInserat={thisInserat} ref={basicDetails3Ref} refetchInserat={refetchInserat} />
        },
        {

            number: 3,
            title: "Preisdetails",
            description: "Gebe die Preisdetails deines Inserats an.",
            segment: <PriceDetails thisInserat={thisInserat} ref={priceDetails} refetchInserat={refetchInserat} />
        },
        {
            number: 4,
            title: "Rahmenbedingungen",
            description: "Gebe die Rahmenbedingungen deines Inserats an.",
            segment: <ConditionsDetails thisInserat={thisInserat} ref={conditionsDetails} refetchInserat={refetchInserat} />
        },
        {
            number: 5,
            title: "Zeitraum",
            description: `Gebe Zeitraum-Details deines Inserats an, wie z.B. die Mindestmietdauer.`,
            segment: <TimespanDetails thisInserat={thisInserat} ref={timespanDetails} refetchInserat={refetchInserat} />
        },
        {
            number: 6,
            title: "Addressdetails (1/2)",
            description: "Gebe an wo sich dein Inserat befindet, bzw. wo es abgeholt werden kann.",
            segment: <AddressDetails thisInserat={thisInserat} ref={addressDetails} refetchInserat={refetchInserat} />
        },
        {
            number: 7,
            title: "Addressdetails (2/2)",
            description: "Gebe an wo sich dein Inserat befindet, bzw. wo es abgeholt werden kann.",
            segment: <AddressDetails2 thisInserat={thisInserat} ref={addressDetails} refetchInserat={refetchInserat} />
        },
        {
            number: 8,
            title: "Kontaktdetails",
            description: "Gebe deine Kontaktdetails an, damit Interessenten dich auch ausserhalb von uRent kontaktieren können.",
            segment: <ContactDetails thisInserat={thisInserat} ref={contactDetails} refetchInserat={refetchInserat} />
        },
        {
            number: 9,
            title: usedTitle ? `${usedTitle ?? ""} Details (1/2)` : "Fahrzeugdetails",
            description: "Gebe spezifische Details zu deinem Fahrzeug an.",
            segment: usedSegment?.firstSegment
        },
        {
            number: 10,
            title: usedTitle ? `${usedTitle ?? ""} Details (2/2)` : "Fahrzeugdetails",
            description: "Gebe spezifische Details zu deinem Fahrzeug an.",
            segment: usedSegment?.secondSegment
        },
        {
            number: 11,
            title: usedTitle ? `${usedTitle ?? ""} Gewichtsdetails` : "Fahrzeugdetails",
            description: "Gebe Details zu deiner Nutzlast und Gesamtgewicht an.",
            segment: <WeightAttributes thisInserat={thisInserat} ref={weightDetails} refetchInserat={refetchInserat} />
        },
        {
            number: 12,
            title: usedTitle ? `${usedTitle ?? ""} Sonstige Details` : "Fahrzeugdetails",
            description: "Gebe spezifische Details zu deinem Fahrzeug an.",
            segment: <FurtherDetails thisInserat={thisInserat} ref={furtherDetails} refetchInserat={refetchInserat} />
        },
        {
            number: 13,
            title: "Inserat speichern",
            description: "Speichere dein Inserat um es jetzt oder später zu veröffentlichen.",
            segment: <SaveInseratPage thisInserat={thisInserat} neededInputs={neededInputs} setCurrentPage={setCurrentPage} refetchInserat={refetchInserat} />
        }
    ];

    const handleNext = () => {
        if (basicDetailsRef.current) {
            
            basicDetailsRef.current.onSave();
        }
        if (basicDetails2Ref.current) {
            basicDetails2Ref.current.onSave();
        }
        if (basicDetails3Ref.current) {
            basicDetails3Ref.current.onSave();
        }
        if (priceDetails.current) {
            priceDetails.current.onSave();
        }
        if (conditionsDetails.current) {
            conditionsDetails.current.onSave();
        }
        if (timespanDetails.current) {
            timespanDetails.current.onSave();
        }
        if (addressDetails.current) {
            addressDetails.current.onSave();
        }
        if (contactDetails.current) {
            contactDetails.current.onSave();
        }
        if (pkwDetails.current) {
            pkwDetails.current.onSave();
        }
        if (pkwDetails2.current) {
            pkwDetails2.current.onSave();
            //skip Weightpage on PKW..
            return setCurrentPage((prevPage) => prevPage + 2);
        }
        if (lkwDetails.current) {
            
            lkwDetails.current.onSave();
        }
        if (lkwDetails2.current) {
            lkwDetails2.current.onSave();
        }
        if (transporterDetails.current) {
            
            transporterDetails.current.onSave();
        }
        if (transporterDetails2.current) {
            transporterDetails2.current.onSave();
        }
        if (anhaengerDetails.current) {
            anhaengerDetails.current.onSave();
        }
        if (anhaengerDetails2.current) {
            anhaengerDetails2.current.onSave();
        }
        if(furtherDetails.current){
            furtherDetails.current.onSave();
        }
        if(weightDetails.current){
            weightDetails.current.onSave();
        }

        setCurrentPage((prevPage) => prevPage + 1);
    };

    

    

    return (
        <SafeAreaView className={cn(
            " flex flex-col w-full  h-full bg-[#161923] py-8",
            Platform.OS === "ios" ? "" : "pt-4"
        )} >
            <View className="p-4 py-12 flex flex-row items-center space-x-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="chevron-left" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-xl text-gray-200 font-semibold">
                    Inserat erstellen
                </Text>
            </View>
            <KeyboardAvoidingView

keyboardVerticalOffset={100}
behavior="height"
>
           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           <View  className="h-[85%]">
                
           <View className="px-4">
           <Text className="text-2xl font-semibold text-gray-200/90">
                        {String(pageInfo[currentPage]?.title ?? "")}
                    </Text>
                    <Text className="text-gray-200/60 text-xs">
                        {pageInfo[currentPage]?.description}

                    </Text>
                </View>
                <View className="px-4">
                    {pageInfo[currentPage]?.segment}
                </View>
          
        </View>
           </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <View className=" flex flex-row items-center justify-evenly w-full px-4 mt-auto ">
                {currentPage > 0 && (
                    <TouchableOpacity className=" w-4/12 p-4 flex-col justify-center items-center rounded-md"
                        onPress={() => setCurrentPage(currentPage - 1)}
                    >
                        <Text className="text-gray-200 text-base font-medium text-center">
                            Zurück
                        </Text>
                    </TouchableOpacity>
                )}
                {currentPage < pageInfo.length - 1 && (
                    <TouchableOpacity className="bg-indigo-800 w-8/12 p-4 flex-row justify-center ml-auto
                                 space-x-2 items-center rounded-md"
                        onPress={handleNext}>

                        <Text className="text-gray-200 text-sm font-medium text-center ">
                            Speichern & Weiter
                        </Text>
                        <View>
                            <FontAwesome name="chevron-right" size={16} color="#fff" />
                        </View>
                    </TouchableOpacity>
                )}
            </View>

        </SafeAreaView>
    );
};

export default InseratCreationPage;
