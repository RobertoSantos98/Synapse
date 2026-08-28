import { Fontisto } from '@expo/vector-icons';
import { View } from 'react-native';

type CalcularNivelProps = {
    nivel: string,
    size: number
}

export default function CalcularNivelDeck({nivel, size}: CalcularNivelProps) {

    const nivelCalculado = nivel === "facil" ? 1 : nivel === "medio" ? 2 : 3;

 return (
   <View className='flex-row gap-1 '>
        {Array.from({length: 3}).map((_, index) => (
            <Fontisto
                name='fire' size={size} color={ nivelCalculado >= index ?  "#f97316" : "#c7d2fe"} key={index}
            />
        ))}
   </View>
  );
}