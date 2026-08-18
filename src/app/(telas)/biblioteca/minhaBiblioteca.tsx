import CardCover from '@/src/components/cardCover';
import HeaderStack from '@/src/components/headerStack';
import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BaralhoService, { deckProps } from '../../../Services/BaralhoService';


const width = Dimensions.get('window').width
const tamanhoCard = (width - 52) / 2;


export default function MinhaBiblioteca() {
  const [isLoading, setIsLoading] = useState(true)

  const [menuAdicionar, setMenuAdicionar] = useState(true);
  const [menuMostrarDeck, setMenuMostrarDeck] = useState<"MeuDeck" | "Baixados">("MeuDeck");

  const filter = [
    { id: 1, title: "Todos" },
    { id: 2, title: "Informática" },
    { id: 3, title: "Linguagem" },
    { id: 4, title: "Ciêcias Humanas" },
    { id: 5, title: "Matemática" },
  ] as const;


  type FilterTitle = typeof filter[number]["title"];

  const [filterSelected, setFilterSelected] = useState<FilterTitle>("Todos");

  const [biblioteca, setBiblioteca] = useState<deckProps[]>([]);
  const [decksBaixados, setDecksBaixados] = useState<deckProps[]>([]);

  const handleBiblioteca = async () => {
    setIsLoading(true);

    try {
      const data = await BaralhoService.GetDeck();
      setBiblioteca(data);

      const dataDecksBaixados = await BaralhoService.GetDecksBaixados();
      setDecksBaixados(dataDecksBaixados);

    } catch (error) {

      Alert.alert("Ops!", "Algo saiu errado.");
      console.log("Erro: ", error);

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleBiblioteca();
  }, [])


  return (
    <View className='flex-1'>


      <ScrollView className='bg-primary-500 flex-1'>


        <HeaderStack title='Minha Biblioteca' />

        <View className='mx-8 my-4 p-1 bg-primary-600 rounded-2xl flex-row'>
          <TouchableOpacity
            className={`py-3 items-center rounded-xl flex-1 ${menuMostrarDeck === "MeuDeck" ? "bg-indigo-400" : "bg-indigo-600"
              }`}
            onPress={() => setMenuMostrarDeck("MeuDeck")}
            activeOpacity={0.8}
          >
            <Text className='text-white text-lg font-bold'>Meu Deck</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`py-3 items-center rounded-xl flex-1 ${menuMostrarDeck === "Baixados" ? "bg-indigo-400" : "bg-indigo-600"
              }`}
            onPress={() => setMenuMostrarDeck("Baixados")}
            activeOpacity={0.8}
          >
            <Text className='text-white text-lg font-bold'>Decks Baixados</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-1 bg-white mx-4 rounded-3xl p-2 mb-6'>

          <View className='flex-row p-2 mb-2 gap-2 justify-end items-center'>

            <View className='flex-1 items-start flex-row gap-2'>
              <LinearGradient pointerEvents='none' colors={["transparent", "transparent", "#fff"]} style={[StyleSheet.absoluteFill, { zIndex: 10 }]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
              <FlatList
                data={filter}
                keyExtractor={(i) => i.id.toString()}
                renderItem={(({ item }) => (
                  <TouchableOpacity
                    key={item.id}
                    className={`px-4 py-2 border border-slate-400 rounded-full ${filterSelected === item.title ? 'bg-primary-500' : ''
                      }`}
                    onPress={() => setFilterSelected(item.title)}
                  >
                    <Text className={`font-bold text-xs ${filterSelected === item.title ? "text-white" : "text-slate-500"}`}>{item.title}</Text>
                  </TouchableOpacity>
                )
                )}
                contentContainerStyle={{
                  gap: 8,
                  paddingRight: 24
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <TouchableOpacity onPress={() => router.push("/(telas)/criarDeck")} className='p-2 px-4 bg-primary-100 rounded-2xl border-2 border-primary-500'>
              <MaterialCommunityIcons name='plus-thick' size={24} color={"#4f46e5"} />
            </TouchableOpacity>
          </View>

          {menuMostrarDeck === "MeuDeck" ?
            <View className='flex-row flex-wrap gap-2'>
              {isLoading ?
                <View className='gap-8 flex-1 item-center justify-center'>
                  <ActivityIndicator size={46} />
                  <Text className='text-2xl text-center font-poppinsBlack'>Carregando...</Text>
                </View>
                :
                biblioteca.map((item) => (
                  <RenderItemsCardBiblioteca key={item.id} id={item.id} title={item.title} themeId={item.themeId} details={item.details} level={item.level} totalCards={item.totalCards} />
                ))}
            </View>
            :
            <View className='gap-2'>
              {decksBaixados.map((item) => (
                <RenderItemsCardBaixados key={item.id} id={item.id} title={item.title} themeId={item.themeId} details={item.details} level={item.level} totalCards={item.totalCards} />
              ))}
            </View>


          }


        </View>

      </ScrollView>
    </View>
  );
}



type RenderItemsCardBibliotecaProps = {
  id: string,
  themeId: string,
  title: string,
  details: string,
  level: string,
  totalCards: number | 0,
}

const RenderItemsCardBiblioteca = ({ id, title, themeId }: RenderItemsCardBibliotecaProps) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/(telas)/biblioteca/${id}`)}
      style={{ width: tamanhoCard, height: tamanhoCard + 42 }}
      className='rounded-2xl overflow-hidden flex-col border border-slate-300 bg-white active:bg-slate-50 shadow-sm'
      activeOpacity={0.7}
    >
      <View className='flex-1 w-full'>
        <CardCover themeId={themeId} />
      </View>

      <View className='h-12 px-2 justify-center items-center border-t border-slate-100 bg-white'>
        <Text
          className='text-slate-700 font-poppinsBold text-xs text-center'
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const RenderItemsCardBaixados = ({ title, themeId, details, totalCards, level }: RenderItemsCardBibliotecaProps) => {

  const nivel: number = level === "facil" ? 1 : level === "medio" ? 2 : 3;

  return (
    <TouchableOpacity
      style={{ height: 100 }}
      className='bg-white flex-row rounded-2xl overflow-hidden border border-slate-300 shadow-sm mb-1 active:bg-slate-50'
      activeOpacity={0.7}
    >
      <View className='w-28 h-full border-r border-slate-100'>
        <CardCover themeId={themeId} />
      </View>

      <View className='p-4 gap-2 relative flex-1 justify-center'>
        <View>
          <Text numberOfLines={2} className='text-slate-800 font-poppinsBold text-base w-5/6'>
            {title}
          </Text>
          <Text className='text-xs'>{details}</Text>
        </View>

        <View className='border border-slate-100 rounded-lg p-2'>
          <View className='flex-row justify-between'>
            <Text className='text-xs text-slate-400'>Total de Cartas: </Text>
            <Text className='text-xs text-slate-800 font-bold'>{totalCards}</Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className='text-xs text-slate-400'>Nível: </Text>
            <View className='flex-row gap-1'>
              {Array.from({ length: 3 }).map((_, index) => (
                <Fontisto key={index} name='fire' size={12} color={index <= nivel ? "#f59e0b" : "#e2e8f0"} />
              ))}
            </View>
          </View>
        </View>


      </View>

    </TouchableOpacity>
  )
}