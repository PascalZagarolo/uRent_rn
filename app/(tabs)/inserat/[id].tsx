import { SafeAreaView, ScrollView, Text, View } from "react-native";
import InseratRender from "./_components/inserat-render";
import db from "@/db/drizzle";
import { inserat, lkwAttribute, pkwAttribute, priceprofile } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { businessAddress } from '../../../db/schema';


const InseratPage =  () => {

    const { id } = useLocalSearchParams<{ id: string }>();

    const [thisInserat, setThisInserat] = useState<any>();

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

        loadInserat();
    }, [])

    
    return ( 
        <SafeAreaView className="bg-[#161923] flex-1">
            <ScrollView>
            {thisInserat && <InseratRender thisInserat={thisInserat} />}
            </ScrollView>
        </SafeAreaView>
     );
}
 
export default InseratPage;