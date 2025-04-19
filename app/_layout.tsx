import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from './(tabs)/AuthProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import Entypo from '@expo/vector-icons/Entypo';

// Prevent splash screen from auto-hiding immediately
SplashScreen.preventAutoHideAsync();

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      activeOpacity={8}
      style={{
        borderLeftColor: 'green',
        margin: 4,
        width: '96%',
        height: 100,
      }}
      contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: '#131620' }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
      }}
      text2Style={{ fontSize: 12 }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{ fontSize: 17 }}
      text2Style={{ fontSize: 15 }}
    />
  ),
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...Entypo.font, // load Entypo icons
  });

  useEffect(() => {
    async function prepare() {
      try {
        
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appIsReady]);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }

  return (
    <AuthProvider>
      {appIsReady ? (
        <BottomSheetModalProvider>
        <ThemeProvider value={DarkTheme}>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }} />
            <Toast config={toastConfig as any} />
          </View>
        </ThemeProvider>
      </BottomSheetModalProvider>
      ) : (
        <View>
          <Text>
            aijsdaijdjiajiops
          </Text>
        </View>
      )}
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#1F2332',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
});
