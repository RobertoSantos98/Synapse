import { Ionicons, Octicons } from "@expo/vector-icons";
import { Color, Tabs } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Layout() {

    const insets = useSafeAreaInsets();


    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    overflow: "visible",
                    height: 70,
                    bottom: insets.bottom + 8,
                    borderRadius: 35,
                    backgroundColor: "#FFF",
                    marginHorizontal: 16,
                    borderTopWidth: 0,
                    elevation: 8,      // Android
                    shadowOpacity: 0.15, // iOS
                    shadowRadius: 10,
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    
                },
                
            }}

        >

            <Tabs.Screen name="Home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Octicons
                            name={focused ? "home-fill" : "home"}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="arena"
                options={{
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            style={{
                                top: -10,
                                width: 80,
                                height: 80,
                                borderRadius: 999,
                                backgroundColor: "#10b981",
                                justifyContent: "center",
                                alignSelf: "center",
                                alignItems: 'center'
                            }}
                        >
                            <Octicons name="book" size={30} color="#fff" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Tabs.Screen name="perfil"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Octicons
                            name={focused ? "person-fill" : "person"}
                            size={size}
                            color={color}
                        />

                    )
                }}
            />

        </Tabs>
    )
}