import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import CircuitBackground from '@/src/Assets/circuitBackGround';
import HeaderStack from '@/src/components/headerStack';
import TelaCarregamento from '@/src/components/telaCarregamento';
import CardPrimary from '@/src/components/CardPrimary';
import BaralhoService, { deckProps } from '@/src/Services/BaralhoService';
import { useStudySoloSession } from '@/src/context/StudySoloSession';
import CardService, { CardProps, DificuldadeCardProps } from '@/src/Services/CardService';
import { router } from 'expo-router';

export default function PlaySolo() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mensagem, setMensagem] = useState('');
  const [percent, setPercent] = useState<number>(0);

  const [decksPartida, setDecksPartida] = useState<deckProps[]>([]);
  const [cardsDaPardida, setCardsDaPartida] = useState<CardProps[]>([]);
  const [cardAtual, setCardAtual] = useState<CardProps>();

  const [progresso, setProgresso] = useState({
    atual: 0, total: 0, message: "", porcentagem: 0
  });

  const { decksEscolhidos } = useStudySoloSession()

  useEffect(() => {
    handleDecksJogo(decksEscolhidos);
  }, []);

  const handleDecksJogo = async (decks: deckProps[]) => {
    try {
      setIsLoading(true);
      const response = await BaralhoService.HandleDecksJogo(decks, (atual, total, message, porcentagem) => { setProgresso({ atual, total, message, porcentagem }) })
      setDecksPartida(response);

      const totalCards = response.flatMap(deck => deck.cards).filter((card): card is CardProps => card !== undefined);

      setProgresso({ atual: 0, total: totalCards.length, message: "Embaralhando as Cartas...", porcentagem: 60 });

      const cardsEmbaralhados = embaralhar(totalCards);

      setProgressoTotalCard(cardsEmbaralhados.length);

      setCardsDaPartida(cardsEmbaralhados);

      setCardAtual(cardsEmbaralhados[0]);

    } catch (error) {
      console.log("Erro: ", error)
    } finally {
      setIsLoading(false);
    }
  }


  // Gerenciar Estudo

  const [progressoCard, setProgressoCard] = useState<number>(1);
  const [progressoTotalCard, setProgressoTotalCard] = useState<number>(0);
  const [pontosTotalPartida, setPontosTotalPartida] = useState<number>(0);
  const [porcentagemBarraProgresso, setPorcentagemBarraProgresso ] = useState<string>("0")




  const handleProximaPergunta = async (dificuldade: DificuldadeCardProps) => {

    if (cardAtual != undefined) {
      await CardService.HandleDificuldadePessoalCard(dificuldade, cardAtual.id);
      setCardAtual(cardsDaPardida[progressoCard])
      setProgressoCard(progressoCard + 1);

      const pontos = dificuldade === DificuldadeCardProps.Facil ? 10 : dificuldade === DificuldadeCardProps.Medio ? 20 : 30;

      setPontosTotalPartida(pontosTotalPartida + pontos)

      setPorcentagemBarraProgresso(String(Math.min(progressoCard / progressoTotalCard * 100, 100)))
    }

    if(progressoCard === progressoTotalCard + 1) {
      
      router.back()
    }
  }



  if (isLoading) {
    return <TelaCarregamento mensagem={progresso.message} atual={progresso.atual} total={progresso.total} />;
  }

  function embaralhar<T>(array: T[]): T[] {
    const novoArray = [...array]

    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [novoArray[i], novoArray[j] = novoArray[j], novoArray[i]];
    }

    return novoArray
  }



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
                  Card {progressoCard} <Text className="text-indigo-300/50">/ {progressoTotalCard}</Text>
                </Text>
              </View>

              {/* BADGE DE AURA */}
              <View className="flex-row items-center gap-1.5 bg-indigo-900/60 border border-indigo-400/30 px-3.5 py-1.5 rounded-full shadow-sm">
                <MaterialIcons name="auto-awesome" size={14} color="#FDE047" />
                <Text className="text-indigo-100 text-xs font-poppinsBold">
                  {pontosTotalPartida} Aura
                </Text>
              </View>
            </View>

            {/* BARRA DE PROGRESSO */}
            <View className="h-2 w-full bg-indigo-950/80 rounded-full overflow-hidden border border-indigo-800/40">
              <LinearGradient
                colors={['#818CF8', '#C084FC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ width: `${porcentagemBarraProgresso}%`, height: '100%' }}
              />
            </View>
          </View>

          {/* CARD PRINCIPAL (Sleeve / Flashcard) */}

          {cardAtual && (<CardPrimary card={cardAtual} />)}


          {/* SELEÇÃO DE DIFICULDADE */}
          <View className="mb-3">
            <Text className="text-indigo-300/70 text-[10px] font-poppinsBold tracking-widest uppercase mb-2.5">
              Nível de Dificuldade
            </Text>

            <View className="flex-row gap-2.5">
              {/* FÁCIL */}
              <TouchableOpacity
                onPress={() => handleProximaPergunta(DificuldadeCardProps.Facil)}
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
                onPress={() => handleProximaPergunta(DificuldadeCardProps.Medio)}
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
                onPress={() => handleProximaPergunta(DificuldadeCardProps.Dificil)}
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