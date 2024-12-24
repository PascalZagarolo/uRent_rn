import db from "@/db/drizzle";
import { businessAddress, paymentMethods, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, SafeAreaView, ScrollView, Text, View } from "react-native";
import ProfileRender from "./_components/profile-render";
import { openingTimes, business } from '../../../db/schema';
import { useAuth } from "../AuthProvider";
import LocationDialog from "./_components/business-render/_components/_tabs/_dialogs/location-dialog";

const ProfilePage = () => {

    const { id } = useLocalSearchParams<{ id: string }>();

    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const findUser = async () => {
            try {
                const thisUser = await db.query.userTable.findFirst({
                    where : eq(userTable.id , id),
                    with : {
                        inserat : {
                            with : {
                                images : true,
                                address : true
                            }
                        },
                        business : {
                            with : {
                                businessAddresses : true,
                                faqs : true,
                                openingTimes : true,
                                businessImages : true,
                            }
                        },
                        paymentMethods : true,
                    },
                   
                });
    
                setUser(thisUser);
            } catch(e : any) {
                console.log(e);
                setUser(null);
            }
        }

        findUser();

    },[])

    const [showLocation, setShowLocation] = useState<{open : boolean, id : string }>({open : false, id : ""});

    const isOwner = user?.id === id; 

    return ( 
        <View className="flex-1  bg-[#181b27]">
        <SafeAreaView className="">
            <ScrollView className="">
                {user && (
                    <ProfileRender 
                    thisUser={user}
                    isOwner={isOwner}
                    setOpenLocation={(value1, value2) => setShowLocation({open : value1, id : value2})}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
         <Modal
         animationType="slide"
         transparent={true}
         visible={showLocation.open}
         onRequestClose={() => {
           setShowLocation({open : false, id : ""});
         }}
 
       >
         
         <LocationDialog 
         onClose={() => setShowLocation({open : false, id : ""})}
         />
         
       </Modal>
        </View>
     );
}
 
export default ProfilePage;