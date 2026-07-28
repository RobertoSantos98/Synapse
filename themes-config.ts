import { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type Theme = {
  id: string;
  title: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
};

export const THEMES: Theme[] = [
  {
    id: "math",
    title: "Matemática",
    icon: "calculator-variant-outline",
  },
  {
    id: "languages",
    title: "Linguagens",
    icon: "translate",
  },
  {
    id: "tech",
    title: "Informática",
    icon: "laptop",
  },
  {
    id: "science",
    title: "Ciências",
    icon: "flask-outline",
  },
];

export function getTheme(themeId: string) {
  return (
    THEMES.find(theme => theme.id === themeId) ?? {
      id: "default",
      title: "Outro",
      icon: "book-open-page-variant" as const,
    }
  );
}