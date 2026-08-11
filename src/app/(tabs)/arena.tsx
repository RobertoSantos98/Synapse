import CircuitBackground from '@/src/Assets/circuitBackGround';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Arena() {

  const tamanhoPodium = (Dimensions.get('window').width - 38) / 3;
  const tamanhoMenu = (Dimensions.get('window').width - 48) / 2;


  return (
    <View className=' flex-1 '>
      <CircuitBackground />

      <ScrollView>

        <View className='py-8' style={{ marginTop: useSafeAreaInsets().top }}>
          <Text className='text-3xl font-poppinsBold text-center text-white'>Podium</Text>
        </View>

        <View className='px-4 pt-2 flex-row items-end justify-center'>
          <View className='items-center gap-4'>
            <View className='bg-white h-20 w-20 rounded-full' />
            <Text className='text-white font-bold  text-center'>Jussara</Text>
            <View className='bg-primary-400 pr-2 flex-row h-40 rounded-t-xl items-center justify-center' style={{ width: tamanhoPodium }}>
              <Text className='text-6xl font-poppinsBold text-white'>2</Text>
            </View>
          </View>

          <View className='items-center gap-4'>
            <View className='bg-white h-20 w-20 rounded-full' />
            <Text className='text-white font-bold  text-center'>Eren</Text>
            <View className='bg-primary-600 pr-2 flex-row h-60 rounded-t-xl items-center justify-center border border-primary-300' style={{ width: tamanhoPodium, boxShadow: '-2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
              <Text className='text-6xl font-poppinsBold text-white'>1</Text>
            </View>
          </View>

          <View className='items-center gap-4'>
            <View className='bg-white h-20 w-20 rounded-full' />
            <Text className='text-white font-bold  text-center'>Mikasa</Text>
            <View className='bg-primary-400 pr-2 flex-row h-28 rounded-t-xl items-center justify-center' style={{ width: tamanhoPodium }}>
              <Text className='text-6xl font-poppinsBold text-white'>3</Text>
            </View>
          </View>

        </View>

        <View className='bg-white mx-2 py-6 px-4 rounded-2xl gap-2'>
          <Text className='text-primary-500 font-poppinsBold text-center text-2xl pb-6'>Arena</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            className='overflow-hidden rounded-3xl border-2 border-primary-600 px-4 py-4 gap-2'
            onPress={() => router.push('/(telas)/Arena/Solo')}
          >
            <LinearGradient colors={[ "#818cf8", "#4f46e5"]} style={StyleSheet.absoluteFill} start={{x: 1, y: 0}} end={{x:0, y: 1}} />
            <View className='p-4 bg-primary-400 rounded-3xl self-start'>
              <MaterialCommunityIcons name='book-open-page-variant-outline' size={24} color={"#fff"} />
            </View>
              <View>
                <Text className='text-xl text-slate-100 font-poppinsBold'>Estudo Solo</Text>
                <Text className='text-xs text-slate-300 tracking-wider'>Estude sozinho os cards que mais tem dificuldades.</Text>
              </View>
          </TouchableOpacity>


          <TouchableOpacity
            activeOpacity={0.8}
            className='overflow-hidden rounded-3xl border-2 border-primary-600 px-4 py-4 gap-2'
            
          >
            <LinearGradient colors={[ "#818cf8", "#4f46e5"]} style={StyleSheet.absoluteFill} start={{x: 1, y: 0}} end={{x:0, y: 1}} />
              <View className='flex-row justify-between'>
                <View className='p-4 bg-primary-400 rounded-3xl self-start'>
                  <MaterialCommunityIcons name='account-box-multiple-outline' size={24} color={"#fff"} />
                </View>
                <View className='py-1 px-3 border border-primary-600 bg-primary-500 self-start rounded-full'>
                  <Text className='text-primary-100 text-xs'>2 - 4</Text>
                </View>
              </View>
              <View>
                <Text className='text-xl text-slate-200 font-poppinsBold'>Estudo em Grupo</Text>
                <Text className='text-xs text-slate-300 tracking-wider'>Convide amigos para estudarem juntos</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            className='overflow-hidden rounded-3xl border-2 border-primary-600 px-4 py-4 gap-2'
            
          >
            <LinearGradient colors={[ "#818cf8", "#4f46e5"]} style={StyleSheet.absoluteFill} start={{x: 1, y: 0}} end={{x:0, y: 1}} />
              <View className='flex-row justify-between'>
                <View className='p-4 bg-primary-400 rounded-3xl self-start'>
                  <MaterialCommunityIcons name='sword-cross' size={24} color={"#fff"} />
                </View>
                <View className='py-1 px-3 border border-primary-600 bg-primary-500 self-start rounded-full'>
                  <Text className='text-primary-100 text-xs'>~ 2</Text>
                </View>
              </View>
              <View>
                <Text className='text-xl text-slate-200 font-poppinsBold'>Duelar</Text>
                <Text className='text-xs text-slate-300 tracking-wider'>Desafie amigos em duelos de 1 x 1 </Text>
              </View>
          </TouchableOpacity>



        </View>

        <View className='h-40' />

      </ScrollView>
    </View>
  );
}