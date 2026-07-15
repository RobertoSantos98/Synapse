import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

export default function BackgroundNeural() {
  const xml = `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="neural-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <g stroke="#334155" stroke-width="1" fill="#475569" opacity="0.35">
            <line x1="20" y1="20" x2="60" y2="40" />
            <line x1="60" y1="40" x2="80" y2="10" />
            <line x1="60" y1="40" x2="35" y2="85" />
            <line x1="35" y1="85" x2="90" y2="75" />
            <line x1="90" y1="75" x2="110" y2="40" />
            <line x1="-10" y1="50" x2="20" y2="20" />
            <circle cx="20" cy="20" r="2" />
            <circle cx="60" cy="40" r="3.5" />
            <circle cx="80" cy="10" r="1.5" />
            <circle cx="35" cy="85" r="2.5" />
            <circle cx="90" cy="75" r="2" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#0f172a" />
      <rect width="100%" height="100%" fill="url(#neural-pattern)" />
    </svg>
  `;

  return (
    // absolute inset-0 faz a View esticar para todos os cantos da tela
    // pointerEvents="none" garante que ela não bloqueie os cliques
    <View className="absolute top-0 bottom-0 left-0 right-0" pointerEvents="none">
      <SvgXml xml={xml} width="100%" height="100%" />
    </View>
  );
}