import CircuitBackground from '@/src/Assets/circuitBackGround';
import HeaderStack from '@/src/components/headerStack';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View } from 'react-native';

export default function BibliotecaComunidade() {
 return (
   <View className='flex-1'>
        <CircuitBackground/>

        <View className='bg-primary-600'>
            <HeaderStack title='Decks da Comunidade' />

            <View className='px-6 flex-row mb-4'>
                <TextInput
                    placeholder='Buscar Deck'
                    className='px-4 py-3 bg-slate-50 rounded-l-full flex-1'
                />
                <TouchableOpacity className='px-4 py-3 bg-slate-200 rounded-r-full border-l border-primary-200'>
                    <MaterialIcons name='search' size={18}/>
                </TouchableOpacity>
            </View>
        </View>


   </View>
  );
}