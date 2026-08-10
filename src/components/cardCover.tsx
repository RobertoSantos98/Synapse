import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getTheme } from "../../themes-config";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CardCoverProps { themeId: string; }

export default function CardCover({ themeId }: CardCoverProps) {
  const theme = getTheme(themeId);

  return (
    <View className="flex-1 w-full h-full bg-primary-100 items-center justify-center">
      <LinearGradient colors={["#eef2ff", "#e0e7ff"]} style={StyleSheet.absoluteFill} />
      <MaterialCommunityIcons
        name={theme.icon}
        size={48}
        color="#6366f1"
      />
    </View>
  );
}