import { ComponentProps } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Record mapeia uma string (chave) para o nome de um ícone válido (valor)
export const THEME_ICONS: Record<string, ComponentProps<typeof MaterialCommunityIcons>['name']> = {
    'math': 'calculator-variant-outline',
    'languages': 'translate',
    'tech': 'laptop',
    'science': 'flask-outline',
    // Um ícone padrão de livro caso o backend envie uma matéria nova que o app ainda não conhece
    'default': 'book-open-page-variant' 
};