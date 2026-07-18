// themes-config.ts
import { ComponentProps } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type ThemeOption = {
    id: string;
    label: string;
    icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
    colors: readonly [string, string]; 
    iconColor: string; // <-- Nova propriedade
};


export const PREDEFINED_THEMES = [
    { 
        id: 'math', 
        label: 'Matemática', 
        icon: 'calculator-variant-outline', 
        // Fundo Indigo super claro, Ícone Indigo forte
        colors: ['#e0e7ff', '#c7d2fe'], 
        iconColor: '#4f46e5' 
    },
    { 
        id: 'tech', 
        label: 'Informática', 
        icon: 'laptop', 
        // Fundo Roxo claro, Ícone Roxo vibrante
        colors: ['#f3e8ff', '#e9d5ff'], 
        iconColor: '#9333ea' 
    },
    { 
        id: 'humanities', 
        label: 'Humanas', 
        icon: 'book-open-page-variant', 
        // Fundo Laranja/Âmbar claro, Ícone Laranja forte
        colors: ['#ffedd5', '#fed7aa'], 
        iconColor: '#ea580c' 
    },
    { 
        id: 'languages', 
        label: 'Idiomas', 
        icon: 'translate', 
        // Fundo Teal/Cyan claro, Ícone Teal forte
        colors: ['#ccfbf1', '#99f6e4'], 
        iconColor: '#0d9488' 
    }
];