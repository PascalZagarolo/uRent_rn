import { useCallback, useEffect, useState } from 'react';
import { Image, View, StyleSheet, Animated, Easing, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from './(tabs)/AuthProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import 'react-native-get-random-values';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar'
// Prevent splash from auto-hiding
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
  const [fadeAnim] = useState(new Animated.Value(0));

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Wait for fonts
        if (!fontsLoaded) return;
        // Simulate loading delay (you can remove in prod)
        await new Promise(resolve => setTimeout(resolve, 1200));
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }).start();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={styles.splashContainer} onLayout={onLayoutRootView}>
        <Animated.Image
          source={require('../assets/images/splash.png')}
          style={[
            styles.logo,
            {
              opacity: fadeAnim,
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
            },
          ]}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <AuthProvider>
      <BottomSheetModalProvider>
        <ThemeProvider value={DefaultTheme}>
          <StatusBar style='light'/>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast config={toastConfig as any} />
        </ThemeProvider>
      </BottomSheetModalProvider>
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
