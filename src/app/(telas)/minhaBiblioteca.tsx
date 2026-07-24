import CardCover from '@/src/components/cardCover';
import HeaderStack from '@/src/components/headerStack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const width = Dimensions.get('window').width
const tamanhoCard = (width - 56) / 3;



export default function MinhaBiblioteca() {


  const [menuAdicionar, setMenuAdicionar] = useState(true)

  const [menuMostrarDeck, setMenuMostrarDeck] = useState<"MeuDeck" | "Curtidos">("MeuDeck");

  const biblioteca = [
    { id: 1, themeId: 'tech', title: "Informática" },
    { id: 2, themeId: "languages", title: "Linguagem" },
    { id: 3, themeId: "science", title: "Ciências Humanas" },
    { id: 4, themeId: "languages", title: "Linguagem" },
    { id: 5, themeId: "science", title: "Ciências Humanas" },
    { id: 6, themeId: 'tech', title: "Informática" },
    { id: 7, themeId: 'tech', title: "Informática" },
    { id: 10, themeId: "languages", title: "Linguagem" },
    { id: 9, themeId: "science", title: "Ciências Humanas" },
    { id: 11, themeId: "science", title: "Ciências Humanas" },
    { id: 8, themeId: "languages", title: "Linguagem" },
    { id: 12, themeId: 'tech', title: "Informática" },
  ];


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
            className={`py-3 items-center rounded-xl flex-1 ${menuMostrarDeck === "Curtidos" ? "bg-indigo-400" : "bg-indigo-600"
              }`}
            onPress={() => setMenuMostrarDeck("Curtidos")}
            activeOpacity={0.8}
          >
            <Text className='text-white text-lg font-bold'>Decks Curtidos</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-1 bg-white mx-4 rounded-3xl p-2 mb-6'>

          <View className='flex-row p-2 mb-2 gap-2 justify-end items-center'>
              <View className='flex-1 items-start'>
                <TouchableOpacity className='px-4 py-2 border border-slate-400 rounded-full'>
                  <Text className='font-bold'>Todos</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity className='p-2 bg-slate-200 rounded-full border border-slate-300'>
                <MaterialCommunityIcons name='plus' size={24}  />
              </TouchableOpacity>
          </View>

          {menuMostrarDeck === "MeuDeck" ?
            <View className='flex-row flex-wrap gap-2'>
              {biblioteca.map((item) => (
                <RenderItemsCardBiblioteca key={item.id} id={item.id} title={item.title} themeId={item.themeId} />
              ))}
            </View>
            :
            <View className='gap-2'>
              {biblioteca.map((item) => (
                <RenderItemsCardCurtidos key={item.id} id={item.id} title={item.title} themeId={item.themeId} />
              ))}
            </View>


          }


        </View>

      </ScrollView>
    </View>
  );
}



type RenderItemsCardBibliotecaProps = {
  id: number,
  title: string,
  themeId: string,
}

const RenderItemsCardBiblioteca = ({ id, title, themeId }: RenderItemsCardBibliotecaProps) => {
  return (
    <TouchableOpacity
      style={{ width: tamanhoCard, height: tamanhoCard + 28 }}
      className='rounded-2xl overflow-hidden justify-end border border-slate-200 bg-slate-200 active:opacity-80'
      activeOpacity={0.9}
    >
      <View className='absolute inset-0'>
        <CardCover themeId={themeId} />
      </View>

      <LinearGradient colors={['transparent', "rgba(0,0,0,0.1)"]} style={StyleSheet.absoluteFill} />


      <View className='px-2 py-2 w-full'>
        <Text
          className='text-primary-900 text-xs font-bold text-center'
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const RenderItemsCardCurtidos = ({ title, themeId }: RenderItemsCardBibliotecaProps) => {
  return (
    <TouchableOpacity className='bg-primary-100 flex-row rounded-xl overflow-hidden border border-primary-200 shadow-lg' style={{ height: tamanhoCard }}>

      <LinearGradient colors={['transparent', "rgba(0,0,0,0.1)"]} style={StyleSheet.absoluteFill} />

      <View style={{ width: tamanhoCard }}>
        <CardCover themeId={themeId} />
      </View>

      <View className='p-4'>
        <Text className='text-primary-500 font-poppinsBold text-lg'>{title}</Text>

      </View>

    </TouchableOpacity>
  )
}