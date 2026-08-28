import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LoadingDeck from '../Assets/loadingDeck';
import { useEffect, useState } from 'react';


type TelaCarregamentoProps = {
    atual?: number;
    total?: number;
    percent?: number | null;
    mensagem: string;

}

export default function TelaCarregamento({ mensagem, percent, atual, total }: TelaCarregamentoProps) {
    const insets = useSafeAreaInsets();

    const [calcPercent, setCalcPercent] = useState<number | null>(null)


    const frases = [
        { id: 1, comment: "Preparando tudo por aqui..." },
        { id: 2, comment: "Farmando aura..." },
        { id: 3, comment: "Resolvendo as coisas..." }
    ]

    useEffect(() => {
        handlePercent();
    }, [atual]);

    const handlePercent = () => {
        if (atual && total) {
            setCalcPercent(Math.round(atual * 100 / total));
        }
    }


    return (
        <View className='bg-primary-500 flex-1 relative items-center justify-center' >

            <View className='items-center gap-2 mb-8'>
                <LoadingDeck height={320} width={320} />
                <Text className='text-primary-200 text-lg'>{mensagem}</Text>
            </View>


            <View className='absolute w-full gap-2 bottom-0 py-6 px-6 ' style={{ marginBottom: insets.bottom }}>
                <View className='flex-row justify-between'>
                    <Text className='text-2xl font-poppinsBold text-white'>Carregando</Text>
                    <ActivityIndicator size={18} color={"#fff"} />
                </View>
                <View className='h-4 bg-primary-400 rounded-full overflow-hidden border-2 border-primary-400'>
                    <View className='bg-orange-500 h-full rounded-r-full' style={{width: `${calcPercent ?? percent}%` as `${number}%`}} />
                </View>
            </View>
        </View>
    );
}

