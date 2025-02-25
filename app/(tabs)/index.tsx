import React, { useEffect, useState } from 'react';
import { Image, Platform, Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';


import { useRouter } from 'expo-router';


import { useAuth } from './AuthProvider';

export default function HomeScreen() {
  const router = useRouter();
  const currentUser = useAuth();
  const [hasRendered, setHasRendered] = useState(false);

  // Set `hasRendered` to true after the first render
  useEffect(() => {
    setHasRendered(true);
  }, []);

  useEffect(() => {
   
    if (hasRendered && currentUser) {
      router.push(`/mainpage`);
    }
  }, [hasRendered, currentUser, router]);

  if (!currentUser) {
    return (
      <View className="flex-1 items-center justify-center bg-[#1F2332]">
        {/* <View className="flex flex-col items-center">
          <Text className="text-xl font-semibold text-gray-200">
            Willkommen auf
          </Text>
          <Text className="text-4xl font-semibold text-gray-200">
            uRent
          </Text>
        </View>
        <View className="mt-4 w-full px-24">
          <View>
            <TouchableOpacity
              className="px-8 py-4 rounded-md w-full bg-white justify-center"
              onPress={() => {
                router.push(`/login`);
              }}
            >
              <Text className="justify-center text-gray-800 text-center font-semibold">
                Loslegen
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              className="py-4 rounded-md w-full justify-center"
              onPress={() => {
                router.push(`/mainpage`);
              }}
            >
              <Text className="justify-center text-xs text-gray-200 text-center font-semibold">
                Ohne Konto fortfahren..
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    );
  }

  // Return null temporarily if waiting for navigation
  return null;
}
