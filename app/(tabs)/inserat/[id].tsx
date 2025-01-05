import { SafeAreaView, ScrollView, Text, View } from "react-native";
import InseratRender from "./_components/inserat-render";
import db from "@/db/drizzle";
import { inserat, lkwAttribute, pkwAttribute, priceprofile, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { businessAddress } from '../../../db/schema';
import * as SecureStorage from 'expo-secure-store';
import { getCurrentUserInseratPage } from "@/actions/retrieveUser/inserat-page/getCurrentUserInseratPage";


const InseratPage =  () => {

    const { id } = useLocalSearchParams<{ id: string }>();

    const [thisInserat, setThisInserat] = useState<any>();
    const [user, setUser] = useState<typeof userTable.$inferSelect | null>();

    useEffect(() => {
        const loadInserat = async () => {
            const thisInserat = await db.query.inserat.findFirst({
                where : eq(
                    inserat.id, id
                ), with : {
                    user : {
                        with : {
                            business : {
                                with : {
                                    businessAddresses : true
                                }
                            },
                            inserat : {
                                with : {
                                    images : true,
                                }
                            },
                        }
                    },
                    
                    images : true,
                    address : true,
                    priceprofiles : true,
                    pkwAttribute : true,
                    lkwAttribute : true,
                    transportAttribute : true,
                    trailerAttribute : true,
                }
            })
            
            setThisInserat(thisInserat);
        }

        const loadUser = async () => {
            try {
                const authToken = await SecureStorage.getItemAsync('authToken');

                const foundUser = await getCurrentUserInseratPage(authToken);

                if(foundUser) {
                    setUser(foundUser as any);
                } else {
                    setUser(null);
                }

            } catch(e) {
                console.log(e);
                setUser(null);
            }
        }

        loadInserat();
        loadUser();
    }, [])

    
    
    return ( 
        <SafeAreaView className="bg-[#161923] flex-1">
            <ScrollView>
            {thisInserat && <InseratRender thisInserat={thisInserat} currentUserId={user?.id} 
            isFaved={user.favourites.some(favourites => favourites.inseratId == thisInserat?.id)} />}
            </ScrollView>
        </SafeAreaView>
     );
}
 
export default InseratPage;