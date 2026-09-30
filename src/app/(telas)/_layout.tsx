import { Stack } from "expo-router";




export default function Layout(){
    return(
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="biblioteca/minhaBiblioteca" />
            <Stack.Screen name="ListaAmigos/listaAmigos" />
            <Stack.Screen name="Usuario/[id]" />
            <Stack.Screen name="ConfiguracaoPerfil" />
        </Stack>
    )
}