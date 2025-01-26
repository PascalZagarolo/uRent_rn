import { SafeAreaView, ScrollView, Text, View } from "react-native";
import InseratRender from "./_components/inserat-render";
import db from "@/db/drizzle";
import { images, inserat, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import { getCurrentUserInseratPage } from "@/actions/retrieveUser/inserat-page/getCurrentUserInseratPage";

const InseratPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [thisInserat, setThisInserat] = useState<any>();
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const loadInserat = async () => {
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
        if (!authToken) throw new Error("No auth token found");

        const foundUser: Awaited<ReturnType<typeof getCurrentUserInseratPage>> =
          await getCurrentUserInseratPage(authToken);
         
        if(foundUser) {
            setUser(foundUser);
        }
      } catch (e) {
        console.error("Error loading user:", e);
        setError("Fehler beim Laden des Benutzers.");
        setUser(null);
      }
    };

    loadInserat();
    loadUser();
  }, [id]); // Add `id` to dependencies

  if (error) {
    // Render error state
    return (
      <SafeAreaView className="bg-[#161923] flex-1 h-full w-full">
        <ScrollView>
          <Text className="text-white">Fehler:</Text>
          <Text className="text-white">{error}</Text>
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
              user?.favourites
                ? user?.favourites.some(
                    (favourites) => favourites.inseratId === thisInserat?.id
                  )
                : false
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
