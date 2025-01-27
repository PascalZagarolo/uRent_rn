import { SafeAreaView, ScrollView, Text, View } from "react-native";

import db from "@/db/drizzle";
import { images, inserat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";


import { getCurrentUserInseratPage } from "@/actions/retrieveUser/inserat-page/getCurrentUserInseratPage";
import * as SecureStorage from 'expo-secure-store';
import InseratRender from "./_components/inserat-render";

const InseratPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [thisInserat, setThisInserat] = useState<any>();
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null); // Add error state

  const [isFaved, setIsFaved] = useState<boolean>(false);

  useEffect(() => {
    try {
      const loadInserat = async () => {
        "use server"
        try {
          const thisInserat = await db.query.inserat.findFirst({
            where: eq(inserat.id, id),
            with: {
              user: {
                with: {
                  business: {
                    with: {
                      businessAddresses: true,
                    },
                  },
                  inserat: {
                    with: {
                      images: true,
                    },
                  },
                },
              },
              images: {
                orderBy: (created_at, { asc }) => [asc(images.position)],
              },
              address: true,
              priceprofiles: true,
              pkwAttribute: true,
              lkwAttribute: true,
              transportAttribute: true,
              trailerAttribute: true,
            },
          });
  
          setThisInserat(thisInserat);
        } catch (e) {
          console.error("Error loading Inserat:", e);
          setError("Fehler beim Laden des Inserats.");
        }
      };
  
      const loadUser = async () => {
        try {
          const authToken = await SecureStorage.getItemAsync("authToken");
          if (!authToken) {

          } else {
            const foundUser =
            await getCurrentUserInseratPage(authToken);
           
          if(foundUser) {
              setUser(foundUser);
              setIsFaved(user?.favourites
                ? user?.favourites?.some(
                    (favourites) => favourites?.inseratId === thisInserat?.id
                  )
                : false)
          }
          }
  
          
        } catch (e) {
          console.error("Error loading user:", e);
          setError("Fehler beim Laden des Benutzers.");
          setUser(null);
        }
      };
  
      const loadBoth = async () => {
        try {
          await loadUser();
          await loadInserat();
          
        } catch(e : any) {
          setError(e)
        }
      };
  
      loadBoth();
    } catch(e : any) {
      setError(String(e))
    }
   
  }, []);

  if (error) {
    // Render error state
    return (
      <SafeAreaView className="bg-[#161923] flex-1 h-full w-full">
        <ScrollView>
          <Text className="text-white">Fehler:</Text>
          <Text className="text-white mt-8">{String(error ?? "!!!!!!!")}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-[#161923] flex-1 h-full w-full">
      <ScrollView>
        {thisInserat ? (
          <InseratRender
            thisInserat={thisInserat}
            currentUserId={user?.id}
            isFaved={
              isFaved
            }
          />
        ) : (
          <Text className="text-white">Lade Inserat...</Text>
        )} 
      </ScrollView>
    </SafeAreaView>
  );
};

export default InseratPage;
