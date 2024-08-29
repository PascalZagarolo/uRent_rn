import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from './(tabs)/AuthProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ActiveStatus from '@/components/ActiveStatus';
import { useDrawerSettings } from '@/store';
import { Drawer } from 'react-native-drawer-layout';
import { Text, View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
    {...props}
    activeOpacity={8}
    style={{ 
      borderLeftColor: 'green', 
      margin: 4, // Remove any margins
      width: '96%', // Make the Toast span the full width
      height: 100, // Set the height
       // Ensure no padding
    }}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 0, backgroundColor: '#131620' }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: 'white', // Updated from 'textColor' to 'color',
        // Ensure no padding
      }}
      text2NumberOfLines={2}
      text2Style= {{
        fontSize: 12,
        
      }}
      
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};

export default function RootLayout(props) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }







  return (
    <AuthProvider>
      <BottomSheetModalProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>


          </Stack>
          <Toast config={toastConfig as any} />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </AuthProvider>
  );
}