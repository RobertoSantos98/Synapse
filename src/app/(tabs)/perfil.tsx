import BackGroundLightHome from '@/src/Assets/backGround-lightHome';
import BackgroundHome from '@/src/Assets/backgroundHome';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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

  const widthCardsPerfil = ((Dimensions.get('window').width - 64) / 2);

  const acessoMenu: acessoMenuProps[] = [
    { id: 1, title: "Lista de Amigos", icon: "account-multiple-outline", onPressButton: () => { } },
    { id: 2, title: "Baralhos Salvos", icon: "cards-outline", onPressButton: () => { } },
    { id: 3, title: "Baixar Baralhos", icon: "cloud-download-outline", onPressButton: () => { } },
    { id: 4, title: "Histórico de Arena", icon: "sword-cross", onPressButton: () => { } },
    { id: 5, title: "Nos Avalie", icon: "star-outline", onPressButton: () => { } },
  ];


  return (
    <View style={{ flex: 1 }}>

      <ScrollView>
        <BackGroundLightHome />

        <View style={{ paddingTop: insets.top }} />

        <View className='px-6 py-4'>
          <View className='flex-row justify-between items-start mb-4'>

            <View className='rounded-full h-24 w-24 bg-primary-100 items-center justify-center border-4 border-white shadow-sm'>
              <Ionicons name='person' size={46} color={"#6366f1"} />
              <View className='bg-slate-800 absolute -bottom-2 px-3 rounded-full border-2 border-white '>
                <Text className='text-white font-poppinsBlack text-xs'>LVL 32</Text>
              </View>
            </View>

            <View className='bg-white p-2 mt-2 border shadow-sm border-slate-200 rounded-full'>
              <Ionicons name='notifications-outline' size={24} />
              <View className='absolute h-3 w-3 bg-primary-500 rounded-full right-0' />
            </View>
          </View>

          <View className='py-2 gap-2'>
            <View className='gap-1'>
              <View className='flex-row items-end gap-2'>
                <Text className='text-5xl tracking-tighter text-slate-900 font-jaro gap-2' style={{ textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 4 }}>Raphael Santos</Text>
                <Text className='text-2xl font-poppinsBold text-slate-300'>#1519</Text>
              </View>
            </View>

            <View className='py-4 flex-row gap-3'>
              <TouchableOpacity className='bg-primary-500 flex-1 py-3.5 rounded-xl flex-row justify-center items-center gap-2 active:bg-primary-600 shadow-sm shadow-primary-500/30'>
                <MaterialCommunityIcons name='account-plus' color={"#FFF"} size={20} />
                <Text className='text-white font-bold text-sm tracking-wider'>Adicionar Amigo</Text>
              </TouchableOpacity>

              <TouchableOpacity className='bg-white border border-slate-200 shadow-sm flex-1 py-3.5 rounded-xl justify-center items-center'>
                <Text className='text-slate-600 font-bold text-sm'>Alterar Avatar</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>


        <View className='mx-6 my-2 rounded-3xl overflow-hidden p-5 shadow-lg shadow-slate-900/10 border border-slate-200'>
          <LinearGradient
            colors={["#0f172a", "#1e293b"]}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          />

          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-white font-black text-lg'>Liga Atual</Text>
            <View className='bg-primary-500/20 px-2 py-1 rounded border border-primary-500/50'>
              <Text className='text-primary-400 font-bold text-xs uppercase tracking-widest'>Ouro III</Text>
            </View>
          </View>

          <View className='flex-row justify-between bg-white/5 rounded-2xl p-4 border border-white/5'>
            <View className='items-center'>
              <Text className='text-slate-400 text-xs font-semibold uppercase'>Duelos</Text>
              <Text className='text-white text-xl font-bold mt-1'>142</Text>
            </View>
            <View className='w-[1px] h-full bg-white/10' />
            <View className='items-center'>
              <Text className='text-slate-400 text-xs font-semibold uppercase'>Vitórias</Text>
              <Text className='text-primary-400 text-xl font-bold mt-1'>89</Text>
            </View>
            <View className='w-[1px] h-full bg-white/10' />
            <View className='items-center'>
              <Text className='text-slate-400 text-xs font-semibold uppercase'>Streak</Text>
              <Text className='text-amber-400 text-xl font-bold mt-1'>5🔥</Text>
            </View>
          </View>
        </View>

        <View className='px-6 py-6 flex-row flex-wrap justify-between gap-y-4'>

          {acessoMenu.map((item) => (
            <TouchableOpacity key={item.id} className='bg-white border border-slate-200 rounded-2xl p-4 active:bg-slate-100 justify-between shadow-sm' activeOpacity={0.7} style={{ width: widthCardsPerfil, height: widthCardsPerfil - 30 }}>
              <View className='bg-slate-50 self-start p-2.5 rounded-full border border-slate-100'>
                <MaterialCommunityIcons name={item.icon} size={24} color={"#6366f1"} />
              </View>
              <Text className='text-slate-500 font-bold text-sm' numberOfLines={2}>{item.title}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity className='bg-red-50 border border-rose-200 rounded-2xl p-4 active:bg-rose-100 justify-between' activeOpacity={0.7} style={{ width: widthCardsPerfil, height: widthCardsPerfil - 30 }}>
            <View className='bg-white p-2.5 rounded-full border border-rose-100 self-start'>
              <MaterialCommunityIcons name='logout' size={24} color={"#e11d48"} />
            </View>
            <Text className=' text-rose-600 text-sm'>Deslogar</Text>
          </TouchableOpacity>

        </View>


        <View className='h-40' />


      </ScrollView>
    </View>
  );
}