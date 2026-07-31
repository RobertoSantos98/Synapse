import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { CardProps } from '../app/Services/CardService';
import { useLocalSearchParams } from 'expo-router';

export default function DetailCard({card}: {card: CardProps}) {

 return (
   <View className='flex-1 absolute'>

        <TouchableOpacity className='h-24' />

        <Modal className='flex-1 bg-white'>
            <Text>Teste</Text>
        </Modal>
   </View>
  );
}