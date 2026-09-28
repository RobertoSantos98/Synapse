import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';

interface SkeletonProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function Skeleton({ className, width, height }: SkeletonProps) {
  // Inicializa o valor compartilhado da animação (opacidade)
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    // Cria o efeito de pulsação infinito usando a API do Reanimated 4
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 650 }),
        withTiming(0.3, { duration: 650 })
      ),
      -1, // -1 significa loop infinito
      true // Faz o inverso ao retornar (efeito vai e volta suave)
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[animatedStyle, { width, height }]}
      // Estilização padrão cinza aceitando classes customizadas do NativeWind
      className={`bg-neutral-200 dark:bg-neutral-800 rounded-xl ${className || ''}`}
    />
  );
}
