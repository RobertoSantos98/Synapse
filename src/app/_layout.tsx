
import '../../global.css';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Poppins_900Black, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue'
import { Jaro_400Regular } from '@expo-google-fonts/jaro'
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { Stack, useRouter, useSegments } from "expo-router";
// import as SplashScreenSecond from './SplashScreen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();


function InitialLayout(){
  const { userToken, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if(isLoading) return

    const inTabsGroup = segments[0] === '(tabs)';

    if(!userToken && inTabsGroup){
      router.replace('/');

    } else if(userToken && !inTabsGroup) {
      router.replace('/(tabs)/Home');

    }

  }, [userToken, isLoading, segments]);

  return(
    <Stack screenOptions={{ headerShown: false}}>
      <Stack.Screen name='index' />
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name="(telas)"/>
    </Stack>
  );

}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    PoppinsBlack: Poppins_900Black,
    PoppinsBold: Poppins_700Bold,
    BebasNeue: BebasNeue_400Regular,
    Jaro: Jaro_400Regular

  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>

        <AuthProvider>
          <InitialLayout/>
        </AuthProvider>
        
      </SafeAreaProvider>
    </GestureHandlerRootView>

  );
}
