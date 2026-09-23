import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TitleHome from '../titleHome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardCover from '../cardCover';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import BaralhoService, { deckProps } from '@/src/Services/BaralhoService';

const widthScreen = Dimensions.get('window').width;

const tamanhoCard = (widthScreen - 58) / 3;

export default function MinhaBiblioteca() {

    const [ biblioteca, setBiblioteca ] = useState<deckProps[]>([]);

    const handleBiblioteca = async () => {
        try {
            const response = await BaralhoService.GetDecksBaixados();
            setBiblioteca(response)
            
        } catch (error: any) {
            Alert.alert("Erro ao Acessar a biblioteca", error.message)
        }
    }

    useEffect(() => {
        handleBiblioteca()
    }, [])



    return (
        <View className='mb-4 '>
            <TitleHome title='Minha Biblioteca' label='Ver Tudo' onPressLabel={() => router.push('/(telas)/biblioteca/minhaBiblioteca')} />

            <View className='px-3 mx-3 rounded-2xl py-3 flex-row justify-between flex-wrap gap-y-4 bg-white shadow-lg'>
                
                {biblioteca.slice(0, 5).map((item) => (
                    <RenderItemsCardBiblioteca key={item.id} id={item.id} themeId={item.themeId} title={item.title} />
                ))}

                <TouchableOpacity 
                    style={{ width: tamanhoCard, height: tamanhoCard + 42 }} 
                    className='bg-slate-50 border-2 border-dashed border-primary-300 rounded-2xl items-center justify-center active:bg-primary-50' 
                    activeOpacity={0.7}
                    onPress={() => router.push('/(telas)/criarDeck')}
                >
                    <View className="bg-primary-100 p-2 rounded-full mb-2">
                        <MaterialCommunityIcons name='plus-thick' size={20} color={"#4338ca"} />
                    </View>
                    <Text className="text-primary-700 text-xs font-bold">Novo</Text>
                </TouchableOpacity>


            </View>
        </View>
    );
}

type RenderItemsCardBibliotecaProps = {
    id: string;
    title: string;
    themeId: string;
}

const RenderItemsCardBiblioteca = ({ id, title, themeId }: RenderItemsCardBibliotecaProps) => {
    return (
        <TouchableOpacity 
            style={{ width: tamanhoCard, height: tamanhoCard + 42 }} 
            className='rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm active:bg-slate-50 flex-col' 
            activeOpacity={0.7}
            onPress={() => router.push(`/(telas)/biblioteca/${id}`)}
        >
            {/* PARTE SUPERIOR: Apenas a Capa com o Ícone (ocupa o espaço principal) */}
            <View className='flex-1 w-full'>
                <CardCover themeId={themeId} />
            </View>
            
            {/* PARTE INFERIOR: Base sólida branca para o texto não brigar com o ícone */}
            <View className='h-10 px-1 justify-center items-center border-t border-slate-100 bg-white'>
                <Text 
                    className='text-slate-700 text-[11px] font-bold text-center' 
                    numberOfLines={1}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}