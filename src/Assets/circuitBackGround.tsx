import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Rect, Path, G, Circle } from 'react-native-svg';

export default function CircuitBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice">
        
        {/* Fundo Principal */}
        <Rect width="100%" height="100%" fill="#312e81" />

        {/* Linhas principais do circuito (Mais grossas) */}
        <G fill="none" stroke="#1e1b4b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          {/* Topo Esquerda */}
          <Path d="M-20,150 L150,150 L250,250 L400,250 L500,150 L600,150" />
          <Circle cx="600" cy="150" r="16" fill="#1e1b4b" />
          
          <Path d="M200,-20 L200,120 L280,200 L450,200" />
          <Circle cx="450" cy="200" r="16" fill="#1e1b4b" />

          {/* Topo Direita */}
          <Path d="M1100,400 L900,400 L800,500 L650,500" />
          <Circle cx="650" cy="500" r="16" fill="#1e1b4b" />
          
          <Path d="M950,-20 L950,250 L850,350 L850,550 L700,700" />
          <Circle cx="700" cy="700" r="16" fill="#1e1b4b" />

          {/* Base Esquerda */}
          <Path d="M-20,1600 L200,1600 L300,1500 L450,1500 L550,1400 L650,1400" />
          <Circle cx="650" cy="1400" r="16" fill="#1e1b4b" />
          
          <Path d="M150,1950 L150,1750 L280,1620 L280,1450" />
          <Circle cx="280" cy="1450" r="16" fill="#1e1b4b" />

          {/* Base Direita */}
          <Path d="M1100,1700 L850,1700 L750,1600 L600,1600 L500,1500" />
          <Circle cx="500" cy="1500" r="16" fill="#1e1b4b" />
          
          <Path d="M850,1950 L850,1850 L950,1750 L950,1550" />
          <Circle cx="950" cy="1550" r="16" fill="#1e1b4b" />
        </G>

        {/* Linhas secundárias e detalhes (Mais finas e sutilmente mais claras que a linha principal) */}
        <G fill="none" stroke="#23215e" strokeWidth="4">
          <Path d="M 50,400 L 120,400 L 150,430 L 150,550" />
          <Circle cx="150" cy="550" r="8" fill="#23215e"/>
          
          <Path d="M 100,50 L 150,50 L 180,20 L 250,20" />
          <Circle cx="250" cy="20" r="8" fill="#23215e"/>

          <Path d="M 1050,1100 L 950,1100 L 900,1150 L 900,1250" />
          <Circle cx="900" cy="1250" r="8" fill="#23215e"/>
          
          <Path d="M 980,800 L 880,800 L 850,770 L 850,650" />
          <Circle cx="850" cy="650" r="8" fill="#23215e"/>

          <Path d="M 350,1800 L 450,1800 L 500,1750 L 600,1750" />
          <Circle cx="600" cy="1750" r="8" fill="#23215e"/>
        </G>

      </Svg>
    </View>
  );
}