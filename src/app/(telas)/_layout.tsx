import { Stack } from "expo-router";




export default function Layout(){
    return(
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="biblioteca/minhaBiblioteca" options={{}} />
            <Stack.Screen name="Arena/Solo" />

            
        </Stack>
    )
}