import db from "@/db/drizzle";
import { businessAddress, paymentMethods, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import ProfileRender from "./_components/profile-render";
import { openingTimes } from '../../../db/schema';

const ProfilePage = () => {

    const { id } = useLocalSearchParams<{ id: string }>();

    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const findUser = async () => {
            try {
                const thisUser = await db.query.userTable.findFirst({
                    where : eq(userTable.id , id),
                    with : {
                        business : {
                            with : {
                                businessAddresses : true,
                                faqs : true,
                                openingTimes : true,
                                businessImages : true,
                            }
                        },
                        paymentMethods : true,
                    }
                });
    
                setUser(thisUser);
            } catch(e : any) {
                console.log(e);
                setUser(null);
            }
        }

        findUser();

    },[])

    

    return ( 
        <SafeAreaView className="flex-1  bg-[#181b27]">
            <ScrollView className="">
                {user && (
                    <ProfileRender 
                    thisUser={user}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
     );
}
 
export default ProfilePage;