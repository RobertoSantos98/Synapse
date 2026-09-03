import { StudySoloSessionProvider } from "@/src/context/StudySoloSession";
import { Stack } from "expo-router";


export default function Layout() {
    return (
        <StudySoloSessionProvider>
            <Stack screenOptions={{ headerShown: false}}>
                {/* <Stack.Screen name="PrepararEstudo/prepararEstudos" />
                <Stack.Screen name="Solo" /> */}
            </Stack>
        </StudySoloSessionProvider>
    )
}