import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { CardProps } from '../Services/CardService';
import { useLocalSearchParams } from 'expo-router';

export default function DetailCard(card: CardProps) {

 return (
   <Modal className='flex-1 absolute'>

        <TouchableOpacity className='h-24' />

        <View className='flex-1 bg-white'>
            <Text>Teste</Text>
        </View>
   </Modal>
  );
}