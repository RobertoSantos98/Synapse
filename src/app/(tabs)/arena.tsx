import CircuitBackground from '@/src/Assets/circuitBackGround';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Arena() {

  const tamanhoPodium = (Dimensions.get('window').width - 38) / 3


 return (
   <View className=' flex-1 '>
    <CircuitBackground/>

    <ScrollView>

      <View className='py-8' style={{marginTop: useSafeAreaInsets().top}}>
        <Text className='text-3xl font-poppinsBold text-center text-white'>Podium</Text>
      </View>

      <View className='px-4 pt-2 flex-row items-end justify-center'>
        <View className='items-center gap-4'>
          <View className='bg-white h-20 w-20 rounded-full'/>
          <Text className='text-white font-bold  text-center'>Jussara</Text>
          <View className='bg-primary-400 pr-2 flex-row h-40 rounded-t-xl items-center justify-center' style={{width: tamanhoPodium}}>
            <Text className='text-6xl font-poppinsBold text-white'>2</Text>
          </View>
        </View>

        <View className='items-center gap-4'>
          <View className='bg-white h-20 w-20 rounded-full'/>
          <Text className='text-white font-bold  text-center'>Eren</Text>
          <View className='bg-primary-600 pr-2 flex-row h-60 rounded-t-xl items-center justify-center border border-primary-300' style={{width: tamanhoPodium, boxShadow: '-2px 2px 8px rgba(0, 0, 0, 0.5)'}}>
            <Text className='text-6xl font-poppinsBold text-white'>1</Text>
          </View>
        </View>

        <View className='items-center gap-4'>
          <View className='bg-white h-20 w-20 rounded-full'/>
          <Text className='text-white font-bold  text-center'>Mikasa</Text>
          <View className='bg-primary-400 pr-2 flex-row h-28 rounded-t-xl items-center justify-center' style={{width: tamanhoPodium}}>
            <Text className='text-6xl font-poppinsBold text-white'>3</Text>
          </View>
        </View>

      </View>

      <View className='bg-white mx-2 py-6 px-4 rounded-2xl gap-2'>
        <Text className='text-primary-500 font-poppinsBold text-center text-2xl pb-6'>Arena</Text>

        <TouchableOpacity className='overflow-hidden px-4 py-4 rounded-xl flex-row border border-primary-200 h-32 items-center'>
          <LinearGradient colors={["#e0e7ff", "#eef2ff"]} style={StyleSheet.absoluteFill} />
          <View className='w-1/4 items-center'>
            <MaterialCommunityIcons name='book-open-page-variant-outline' size={48} color={"#6366f1"}/>
          </View>

          <View className='justify-center flex-1 px-4'>
            <Text className='text-xl text-slate-600 font-poppinsBold'>Estudo Solo</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className='overflow-hidden px-4 py-4 rounded-xl flex-row border border-primary-200 h-32 items-center'>
          <LinearGradient colors={["#e0e7ff", "#eef2ff"]} style={StyleSheet.absoluteFill} />
          <View className='w-1/4 items-center'>
            <MaterialCommunityIcons name='account-box-multiple-outline' size={48} color={"#6366f1"}/>
          </View>

          <View className='justify-center flex-1 px-4'>
            <Text className='text-xl text-slate-600 font-poppinsBold'>Estudo em Grupo</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className='overflow-hidden px-4 py-4 rounded-xl flex-row border border-primary-200 h-32 items-center'>
          <LinearGradient colors={["#e0e7ff", "#eef2ff"]} style={StyleSheet.absoluteFill} />
          <View className='w-1/4 items-center'>
            <MaterialCommunityIcons name='sword-cross' size={48} color={"#6366f1"}/>
          </View>

          <View className='justify-center flex-1 px-4'>
            <Text className='text-xl text-slate-600 font-poppinsBold'>Duelar</Text>
          </View>
        </TouchableOpacity>



      </View>

      <View className='h-40' />

    </ScrollView>
   </View>
  );
}