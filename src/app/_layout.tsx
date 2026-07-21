
  import '../../global.css';
  import { SafeAreaProvider } from 'react-native-safe-area-context';
  import { useFonts, Poppins_900Black, Poppins_700Bold } from '@expo-google-fonts/poppins'
  import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue'
  import { Jaro_400Regular } from '@expo-google-fonts/jaro'
  import * as SplashScreen from 'expo-splash-screen';

	import { Stack } from "expo-router";
// import as SplashScreenSecond from './SplashScreen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();


export default function Layout() {
  const [fontsLoaded] = useFonts({
    PoppinsBlack: Poppins_900Black,
    PoppinsBold: Poppins_700Bold,
    BebasNeue: BebasNeue_400Regular,
    Jaro: Jaro_400Regular

  });

  useEffect(()=> {
    if(fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if(!fontsLoaded) return null

	return (
    
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false}}>
          <Stack.Screen name='index'  />
          <Stack.Screen name='(tabs)'  />
        </Stack>
      </SafeAreaProvider>
    
	);
}
