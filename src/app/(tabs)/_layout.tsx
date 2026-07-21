import { Ionicons, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { BottomTabBarButtonProps } from "expo-router/build/react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          position: 'absolute',
          height: 70,
          backgroundColor: '#FFF',
          paddingBottom: 8,
          paddingTop: 8,
          marginBottom: insets.bottom + 4,
          marginHorizontal: 16,
          borderRadius: 999
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Octicons
              name={focused ? "home-fill" : "home"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="arena"
        options={{
          title: "Arena",
          tabBarButton: BotaoPersonalizado
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const BotaoPersonalizado = ({
  onPress,
  onLongPress,
  accessibilityState,
  accessibilityLabel,
  testID,
  style,
}: BottomTabBarButtonProps) => {
  
  return (

    <View className="items-center justify-center overflow-hidden h-[100px] w-[100px] rounded-full border-2 border-white bottom-4" >

      <LinearGradient colors={["#10b981", "#047857"]} style={[StyleSheet.absoluteFill]} />

      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress ?? undefined}
        accessibilityState={accessibilityState}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        activeOpacity={0.8}
        style={[
          style,
          {
            width: 90,
            height: 90,
            borderRadius: 999,
            backgroundColor: "#10b981",
            justifyContent: "center",
            alignItems: "center",
            position: 'absolute',
          },
        ]}
      >
        <Ionicons name="book" size={28} color="#FFF" />
        <Text className="text-white">Estudar</Text>
      </TouchableOpacity>
    // </View>
  );
};