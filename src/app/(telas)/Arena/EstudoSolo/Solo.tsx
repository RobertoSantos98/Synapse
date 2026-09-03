import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import CircuitBackground from '@/src/Assets/circuitBackGround';
import HeaderStack from '@/src/components/headerStack';
import TelaCarregamento from '@/src/components/telaCarregamento';
import CardPrimary from '@/src/components/CardPrimary';

export default function PlaySolo() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mensagem, setMensagem] = useState('');
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    handleLoading();
  }, []);

  const handleLoading = async () => {
    setIsLoading(true);

    try {
      setPercent(0);
      setMensagem('Baixando os Cards...');
      await handleSimularApi();

      setPercent(0);
      setMensagem('Contando os Cards...');
      await handleSimularApi();

      setPercent(100);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimularApi = (): Promise<void> => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setPercent((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            resolve();
            return 100;
          }
          return prev + 1;
        });
      }, 20);
    });
  };

  if (isLoading) {
    return <TelaCarregamento mensagem={mensagem} percent={percent} />;
  }

  const card = {
    id: '1',
    deckId: '235452',
    category: 'JAVASCRIPT',
    question: 'O que é o Javascript?',
    answer: 'Uma linguagem de programação usada tanto no Front-End quanto no Back-End.',
    wrongAnswer: 'Um framework'
  };

  return (
    <View className="flex-1 bg-indigo-950">
      <CircuitBackground />

      <View className="flex-1">
        <HeaderStack title="Player Solo" />

        <View
          className="flex-1 px-6 justify-between"
          style={{ paddingBottom: Math.max(insets.bottom, 20) }}
        >
          {/* HEADER DE STATUS E PROGRESSO */}
          <View className="mt-2 gap-3">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-indigo-300/70 text-[10px] font-poppinsBold tracking-widest uppercase">
                  Progresso
                </Text>
                <Text className="text-white text-base font-poppinsBold">
                  Card 01 <Text className="text-indigo-300/50">/ 10</Text>
                </Text>
              </View>

              {/* BADGE DE AURA */}
              <View className="flex-row items-center gap-1.5 bg-indigo-900/60 border border-indigo-400/30 px-3.5 py-1.5 rounded-full shadow-sm">
                <MaterialIcons name="auto-awesome" size={14} color="#FDE047" />
                <Text className="text-indigo-100 text-xs font-poppinsBold">
                  120 Aura
                </Text>
              </View>
            </View>

            {/* BARRA DE PROGRESSO */}
            <View className="h-2 w-full bg-indigo-950/80 rounded-full overflow-hidden border border-indigo-800/40">
              <LinearGradient
                colors={['#818CF8', '#C084FC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ width: '10%', height: '100%' }}
              />
            </View>
          </View>

          {/* CARD PRINCIPAL (Sleeve / Flashcard) */}

          <CardPrimary card={card}/>


          {/* SELEÇÃO DE DIFICULDADE */}
          <View className="mb-3">
            <Text className="text-indigo-300/70 text-[10px] font-poppinsBold tracking-widest uppercase mb-2.5">
              Nível de Dificuldade
            </Text>

            <View className="flex-row gap-2.5">
              {/* FÁCIL */}
              <TouchableOpacity
                activeOpacity={0.75}
                className="flex-1 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl py-2.5 items-center justify-center active:bg-emerald-900/40"
              >
                <MaterialIcons name="check-circle-outline" size={18} color="#34D399" />
                <Text className="text-emerald-300 text-xs font-poppinsBold mt-1">
                  Fácil
                </Text>
                <Text className="text-emerald-400/70 text-[10px] font-poppinsMedium">
                  +10 Aura
                </Text>
              </TouchableOpacity>

              {/* MÉDIO */}
              <TouchableOpacity
                activeOpacity={0.75}
                className="flex-1 bg-amber-950/40 border border-amber-500/30 rounded-2xl py-2.5 items-center justify-center active:bg-amber-900/40"
              >
                <MaterialIcons name="remove-circle-outline" size={18} color="#FBBF24" />
                <Text className="text-amber-300 text-xs font-poppinsBold mt-1">
                  Médio
                </Text>
                <Text className="text-amber-400/70 text-[10px] font-poppinsMedium">
                  +20 Aura
                </Text>
              </TouchableOpacity>

              {/* DIFÍCIL */}
              <TouchableOpacity
                activeOpacity={0.75}
                className="flex-1 bg-rose-950/40 border border-rose-500/30 rounded-2xl py-2.5 items-center justify-center active:bg-rose-900/40"
              >
                <MaterialIcons name="error-outline" size={18} color="#F87171" />
                <Text className="text-rose-300 text-xs font-poppinsBold mt-1">
                  Difícil
                </Text>
                <Text className="text-rose-400/70 text-[10px] font-poppinsMedium">
                  +30 Aura
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* BOTÃO AÇÃO (VIRAR CARD) */}
          {/* <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsFlipped(!isFlipped)}
            className="h-14 w-full rounded-2xl overflow-hidden shadow-lg elevation-4"
          >
            <LinearGradient
              colors={['#818CF8', '#6366F1', '#4338CA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Text className="text-white text-base font-poppinsBold">
                {isFlipped ? 'Mostrar Pergunta' : 'Virar Card'}
              </Text>
              <MaterialIcons name="flip" size={20} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}