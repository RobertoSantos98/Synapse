import BackGroundLightHome from '@/src/Assets/backGround-lightHome';
import BackgroundHome from '@/src/Assets/backgroundHome';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type acessoMenuProps = {
  id: number,
  title: string,
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  onPressButton: () => void
}

export default function Perfil() {

  const insets = useSafeAreaInsets()

  const widthCardsPerfil = Math.min((Dimensions.get('window').width - 64) / 2);

  const acessoMenu: acessoMenuProps[] = [
    { id: 1, title: "Lista de Amigos", icon: "account-details-outline", onPressButton: () => { } },
    { id: 2, title: "Ver Baralhos Salvos", icon: "cards-outline", onPressButton: () => { } },
    { id: 3, title: "Baixar Baralhos", icon: "arrow-down-bold-outline", onPressButton: () => { } },
    { id: 4, title: "Registro de Batalhas", icon: "axe-battle", onPressButton: () => { } },
    { id: 5, title: "Nos Avalie", icon: "emoticon-plus-outline", onPressButton: () => { } },
  ]


  return (
    <View style={{ flex: 1 }}>

      <ScrollView>
        <BackGroundLightHome />

        <View style={{ paddingTop: insets.top }} />

        <View className='px-6 py-2'>
          <View className='flex-row justify-between items-start mb-2'>

            <View className='rounded-full h-[90] w-[90] bg-emerald-500 items-center justify-center'>
              <Ionicons name='person' size={46} color={"#fff"} />
            </View>

            <View className='bg-slate-50 p-2 mt-2 border border-slate-200 rounded-full'>
              <Ionicons name='notifications-outline' size={24} />
            </View>
          </View>

          <View className='py-2 gap-2'>
            <View className='gap-1'>
              <Text className='text-4xl font-bold'>Roberto Santos</Text>
              <Text className='text-lg text-slate-500'>Nivel: <Text className='text-emerald-500 font-bold'>32</Text></Text>
            </View>

            <View className='py-2 justify-between items-center flex-row'>
              <TouchableOpacity className='bg-emerald-500 py-3 px-6 rounded-full flex-row items-center gap-2'>
                <MaterialCommunityIcons name='plus' color={"#FFF"} size={18} />
                <Text className='text-white font-bold text-sm'>Adicionar Amigo</Text>
              </TouchableOpacity>

              <TouchableOpacity className='bg-black py-3 px-6 rounded-full jutify-center items-center'>
                <Text className='text-white font-bold text-sm'>Alterar Avatar</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>


        <View className='bg-black mx-6 rounded-3xl p-4 h-52'>
          <Text className='text-white font-bold text-2xl'>Teste</Text>
        </View>

        <View className='px-6 py-4 flex-row flex-wrap gap-4'>

          {acessoMenu.map((item) => (
            <TouchableOpacity key={item.id} className='bg-slate-200 border border-slate-500/20 rounded-xl p-4 active:bg-slate-900 justify-between shadow-md' activeOpacity={0.7} style={{ width: widthCardsPerfil, height: widthCardsPerfil - 40 }}>
              <MaterialCommunityIcons name={item.icon} size={28} color={"#94a3b8"} />
              <Text className='self-end text-slate-500 text-sm'>{item.title}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity className='bg-red-50 border border-red-500/20 rounded-xl p-4 active:bg-slate-900 justify-between' activeOpacity={0.7} style={{ width: widthCardsPerfil, height: widthCardsPerfil - 40 }}>
            <MaterialCommunityIcons name='arrow-right-top-bold' size={28} color={"#ef4444"} />
            <Text className='self-end text-red-500 text-sm'>Deslogar</Text>
          </TouchableOpacity>

        </View>


        <View className='h-40' />


      </ScrollView>
    </View>
  );
}