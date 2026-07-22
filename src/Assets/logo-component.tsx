import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface LogoProps {
  className?: string;
}

export default function LogoSynapse({ className = 'w-24 h-24' }: LogoProps) {
  const logoXml = `
    <svg viewBox="0 0 512 512" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- Fundo da logo (Mantido o Slate 900 para combinar com o fundo do app) -->
      <rect width="512" height="512" rx="100" fill="#0f172a" />
      
      <!-- Carta Esquerda (Nova paleta Indigo) -->
      <g transform="translate(100, 140) rotate(-15)">
        <!-- Sombra da carta (Indigo 950) -->
        <rect x="8" y="8" width="180" height="260" rx="24" fill="#1e1b4b" />
        <!-- Corpo da carta (Indigo 900) e Borda (Indigo 500) -->
        <rect width="180" height="260" rx="24" fill="#312e81" stroke="#6366f1" stroke-width="12" />
        <!-- Detalhes internos (Indigo 500) -->
        <circle cx="90" cy="130" r="40" fill="#6366f1" opacity="0.15" />
        <line x1="40" y1="130" x2="140" y2="130" stroke="#6366f1" stroke-width="4" opacity="0.3" />
      </g>
      
      <!-- Carta Direita (Slate escuro para contraste, com borda Indigo Claro) -->
      <g transform="translate(260, 100) rotate(15)">
        <rect x="8" y="8" width="180" height="260" rx="24" fill="#0f172a" />
        <rect width="180" height="260" rx="24" fill="#1e293b" stroke="#818cf8" stroke-width="12" />
        <path d="M 90 90 L 90 170 M 50 130 L 130 130" stroke="#818cf8" stroke-width="8" stroke-linecap="round" opacity="0.3" />
      </g>
      
      <!-- Raio Central (Manteve-se o Âmbar/Laranja para criar um contraste 3D perfeito com o Indigo) -->
      <circle cx="256" cy="256" r="90" fill="#f59e0b" opacity="0.15" />
      <path d="M 310 100 L 190 270 L 260 270 L 170 440 L 340 240 L 270 240 Z" fill="#f59e0b" stroke="#0f172a" stroke-width="8" stroke-linejoin="round" />
      
      <!-- Partículas flutuantes (Mistura de Âmbar e os novos tons de Indigo) -->
      <circle cx="150" cy="190" r="10" fill="#f59e0b" />
      <circle cx="360" cy="350" r="14" fill="#fbbf24" />
      <!-- Antigo emerald-500 mudou para indigo-500 -->
      <circle cx="310" cy="420" r="8" fill="#6366f1" />
      <!-- Antigo emerald-400 mudou para indigo-400 -->
      <circle cx="190" cy="110" r="12" fill="#818cf8" />
      <circle cx="210" cy="350" r="6" fill="#f59e0b" opacity="0.6" />
    </svg>
  `;

  return (
    <View className={className}>
      <SvgXml xml={logoXml} width="100%" height="100%" />
    </View>
  );
}