import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PREDEFINED_THEMES } from '../Assets/Themes/themeOption';

interface CardCoverProps {
    themeId: string;
    iconSize?: number; 
}

export default function CardCover({ themeId, iconSize = 32 }: CardCoverProps) {
    const theme = PREDEFINED_THEMES.find(t => t.id === themeId) || PREDEFINED_THEMES[0];

    return (
        // O fundo fica transparente aqui, o gradiente faz o trabalho.
        <View className="flex-1 w-full h-full items-center justify-center">
            
            {/* Gradiente sutil em tons pastéis */}
            <LinearGradient 
                colors={theme.colors} 
                style={StyleSheet.absoluteFill}
                start={{ x: 0.1, y: 0.1 }} 
                end={{ x: 0.9, y: 0.9 }} 
            />
            
            {/* Ícone com a cor forte do tema */}
            <MaterialCommunityIcons 
                name={theme.icon} 
                size={iconSize} 
                color={theme.iconColor} 
            />

            
        </View>
    );
}