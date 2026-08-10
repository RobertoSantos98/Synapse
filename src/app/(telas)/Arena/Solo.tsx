import CircuitBackground from '@/src/Assets/circuitBackGround';
import HeaderStack from '@/src/components/headerStack';
import { Text, View } from 'react-native';
import { CardProps } from '@/src/Services/CardService';
import TelaCarregamento from '@/src/components/telaCarregamento';
import { useState } from 'react';

export default function PlaySolo() {
    
    const [ isLoading, setIsLoading ] = useState(true);
    if(isLoading) return <TelaCarregamento/>

    const cards = []


 return (
   <View className='flex-1'>
        <CircuitBackground/>

        <View>
            <HeaderStack title='Player Solo' />

            <View className='px-6 py-4'>
                <View>
                    
                </View>
            </View>
        </View>

   </View>
  );
}
