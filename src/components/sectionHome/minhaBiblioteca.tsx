import { Dimensions, Text, Touchable, TouchableOpacity, View } from 'react-native';
import TitleHome from '../titleHome';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MinhaBiblioteca() {

    const widthScreen = Dimensions.get('window').width
    const tamanhoCard = (widthScreen / 3) - 16


 return (
   <View>
        <TitleHome title='Minha Biblioteca' label='Ver Tudo' onPressLabel={() => {}} />

        <View className='px-4 py-2 gap-2 flex-row justify-center'>
            <TouchableOpacity style={{width: tamanhoCard, height: tamanhoCard + 28}} className='bg-emerald-50 border border-emerald-500 rounded-xl items-center justify-center'>
                <MaterialCommunityIcons name='plus-thick' size={28} color={"#10b981"} />
            </TouchableOpacity>

        </View>

   </View>
  );
}