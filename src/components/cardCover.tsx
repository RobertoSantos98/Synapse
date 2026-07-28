import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getTheme } from "../../themes-config";
import { View } from "react-native";

interface CardCoverProps { themeId: string; }

export default function CardCover({ themeId }: CardCoverProps) {
  const theme = getTheme(themeId);

  return (
    <View className="flex-1 w-full h-full bg-primary-50 items-center justify-center border border-primary-200/10">
      <MaterialCommunityIcons
        name={theme.icon}
        size={48}
        color="#6366f1"
      />
    </View>
  );
}