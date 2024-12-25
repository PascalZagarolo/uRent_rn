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
import LocationDialogDelete from "./_components/business-render/_components/_tabs/_dialogs/location-dialog";

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
                if(thisUser?.business?.businessAddresses?.length > 0) {
                    console.log(thisUser?.business?.businessAddresses)
                    setFoundAddresses(thisUser?.business?.businessAddresses);
                }
            } catch(e : any) {
                console.log(e);
                setUser(null);
            }
        }
        
        findUser();

    },[])

    type openTypes = "edit" | "delete"

    const [showLocation, setShowLocation] = useState<{open : boolean, id : string, type?: openTypes }>({open : false, id : "", type : null});
    const [foundAddresses, setFoundAddresses] = useState<any[] | null>([])

    const isOwner = user?.id === id; 

    return ( 
        <View className="flex-1  bg-[#181b27]">
        <SafeAreaView className="">
            <ScrollView className="">
                
                {user && (
                    <ProfileRender 
                    thisUser={user}
                    isOwner={isOwner}
                    setOpenLocation={(value1, value2, value3) => setShowLocation({open : value1, id : value2, type: value3})}
                    foundAddresses={foundAddresses}
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
         
        {showLocation?.type != "delete"  && showLocation?.type != "edit" && (
             <LocationDialog 
             onClose={() => setShowLocation({open : false, id : ""})}
             onInsert = {(newOne) => setFoundAddresses([...foundAddresses, newOne])}
             />
        )}
        {showLocation?.type === "delete" && (
           <LocationDialogDelete 
           onClose={() => setShowLocation({open : false, id : ""})}
             onInsert = {(newOne) => console.log(newOne)}
           />
        )}
         
       </Modal>
        </View>
     );
}
 
export default ProfilePage;