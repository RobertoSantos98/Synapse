import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME_ICONS } from '../../themes-config'; // Importe o dicionário

interface CardCoverProps {
    themeId: string;
}

export default function CardCover({ themeId }: CardCoverProps) {
    // Busca o ícone pela chave. Se a chave não existir, usa o ícone 'default'
    const iconName = THEME_ICONS[themeId] || THEME_ICONS['default'];

    return (
        // Usando o seu tema Indigo do Tailwind: Fundo primário clarinho e borda suave
        <View className="flex-1 w-full h-full bg-primary-50 items-center justify-center border border-primary-200/10">
            
            <MaterialCommunityIcons 
                name={iconName} 
                size={48} 
                // A cor principal do seu app (Ex: o Hexadecimal do primary-500)
                color="#6366f1" 
            />
            
        </View>
    );
}