import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

export default function BackGroundLightHome() {
    const xml = `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- O padrão agora é muito maior (400x400) para evitar a percepção de grade -->
    <pattern id="book-pattern-chaotic" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
      
      <!-- Opacidade em 0.35 e cor slate-500 para boa visibilidade -->
      <g stroke="#64748b" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.35">
        
        <!-- Livros espalhados aleatoriamente com diferentes rotações (rotate) e tamanhos (scale) -->
        <g transform="translate(30, 40) rotate(15) scale(0.8)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        <g transform="translate(150, 20) rotate(-35) scale(0.6)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        <g transform="translate(320, 60) rotate(55) scale(0.9)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        <g transform="translate(80, 150) rotate(-15) scale(0.7)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        <g transform="translate(250, 130) rotate(80) scale(0.5)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        <g transform="translate(350, 210) rotate(-65) scale(0.8)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        <g transform="translate(50, 280) rotate(25) scale(0.6)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        <g transform="translate(180, 320) rotate(-85) scale(0.7)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        <g transform="translate(310, 350) rotate(10) scale(0.9)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        <g transform="translate(110, 380) rotate(-45) scale(0.5)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>

        <!-- Elementos "vazando" nas bordas do pattern para conectar as costuras invisíveis -->
        <g transform="translate(-10, 200) rotate(45) scale(0.8)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        <g transform="translate(390, 200) rotate(45) scale(0.8)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        <g transform="translate(200, -10) rotate(-20) scale(0.6)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        <g transform="translate(200, 390) rotate(-20) scale(0.6)">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </g>
        
      </g>
    </pattern>
  </defs>
  
  <!-- Fundo sólido slate-100 -->
  <rect width="100%" height="100%" fill="#f1f5f9" />
  <!-- Aplicação do padrão caótico de livros -->
  <rect width="100%" height="100%" fill="url(#book-pattern-chaotic)" />
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