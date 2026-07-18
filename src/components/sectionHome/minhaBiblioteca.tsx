import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TitleHome from '../titleHome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardCover from '../cardCover';

const widthScreen = Dimensions.get('window').width;

const tamanhoCard = (widthScreen - 72) / 3;

export default function MinhaBiblioteca() {
    const biblioteca = [
        { id: 1, themeId: 'tech', title: "Informática" },
        { id: 2, themeId: "languages", title: "Linguagem" },
        { id: 3, themeId: "science", title: "Ciências Humanas" },
        { id: 4, themeId: "languages", title: "Linguagem" },
        { id: 5, themeId: "science", title: "Ciências Humanas" },
        { id: 6, themeId: 'tech', title: "Informática" },
    ];

    return (
        <View className='mb-8'>
            <TitleHome title='Minha Biblioteca' label='Ver Tudo' onPressLabel={() => { }} />

            <View className='px-6 py-2 flex-row justify-between flex-wrap gap-y-4'>
                
                {biblioteca.slice(0, 5).map((item) => (
                    <RenderItemsCardBiblioteca key={item.id} id={item.id}themeId={item.themeId} title={item.title} />
                ))}

                <TouchableOpacity 
                    style={{ width: tamanhoCard, height: tamanhoCard + 28 }} 
                    className='bg-slate-50 border-2 border-dashed border-emerald-300 rounded-2xl items-center justify-center active:bg-emerald-50' 
                    activeOpacity={0.7}
                >
                    <View className="bg-emerald-100 p-2 rounded-full mb-2">
                        <MaterialCommunityIcons name='plus-thick' size={20} color={"#059669"} />
                    </View>
                    <Text className="text-emerald-700 text-xs font-bold">Novo</Text>
                </TouchableOpacity>


            </View>
        </View>
    );
}

type RenderItemsCardBibliotecaProps = {
    id: number,
    title: string,
    themeId: string,
}

const RenderItemsCardBiblioteca = ({ id, title, themeId }: RenderItemsCardBibliotecaProps) => {
    return (
        <TouchableOpacity 
            style={{ width: tamanhoCard, height: tamanhoCard + 28 }} 
            className='rounded-2xl overflow-hidden justify-end border border-slate-200 bg-slate-200 active:opacity-80' 
            activeOpacity={0.9}
        >
            <View className='absolute inset-0'>
                <CardCover themeId={themeId} iconSize={40} />
            </View>
            
            <LinearGradient colors={['transparent', "rgba(0,0,0,0.2)"]} style={StyleSheet.absoluteFill} />

            
            <View className='px-2 py-2 w-full'>
                <Text 
                    className='text-white text-xs font-bold text-center shadow-sm' 
                    numberOfLines={1}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}