import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TitleHome from '../titleHome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const widthScreen = Dimensions.get('window').width;

const tamanhoCard = (widthScreen - 72) / 3;

export default function MinhaBiblioteca() {
    const biblioteca = [
        { id: 1, img: "https://blog.singularityubrazil.com/wp-content/uploads/2021/05/iStock-1224500457.jpg", title: "Informática" },
        { id: 2, img: "https://thumbs.dreamstime.com/b/letras-brancas-quadradas-pontos-e-estrelas-molham-com-pilha-de-livros-composi%C3%A7%C3%A3o-qu%C3%ADmica-vidros-volta-ao-estudo-escolar-%C3%A0-240222649.jpg", title: "Linguagem" },
        { id: 3, img: "https://s4.static.brasilescola.uol.com.br/enem/2022/10/ciencias-da-natureza.jpg", title: "Ciências Humanas" },
        { id: 4, img: "https://thumbs.dreamstime.com/b/letras-brancas-quadradas-pontos-e-estrelas-molham-com-pilha-de-livros-composi%C3%A7%C3%A3o-qu%C3%ADmica-vidros-volta-ao-estudo-escolar-%C3%A0-240222649.jpg", title: "Linguagem" },
        { id: 5, img: "https://s4.static.brasilescola.uol.com.br/enem/2022/10/ciencias-da-natureza.jpg", title: "Ciências Humanas" },
        { id: 6, img: "https://blog.singularityubrazil.com/wp-content/uploads/2021/05/iStock-1224500457.jpg", title: "Informática" },
    ];

    return (
        <View className='mb-8'>
            <TitleHome title='Minha Biblioteca' label='Ver Tudo' onPressLabel={() => { }} />

            <View className='px-6 py-2 flex-row justify-between flex-wrap gap-y-4'>
                
                {biblioteca.slice(0, 5).map((item) => (
                    <RenderItemsCardBiblioteca key={item.id} id={item.id} img={item.img} title={item.title} />
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
    img: string,
}

const RenderItemsCardBiblioteca = ({ id, title, img }: RenderItemsCardBibliotecaProps) => {
    return (
        <TouchableOpacity 
            style={{ width: tamanhoCard, height: tamanhoCard + 28 }} 
            // rounded-2xl combina com o botão adicionar, border-slate-200 suaviza a borda no Light Theme
            className='rounded-2xl overflow-hidden justify-end border border-slate-200 bg-slate-200 active:opacity-80' 
            activeOpacity={0.9}
        >
            <Image source={{ uri: img }} style={[StyleSheet.absoluteFill, { objectFit: 'cover' }]} />
            
            {/* O gradiente agora vai de transparente até um preto forte (0.8) na base */}
            <LinearGradient colors={['transparent', "rgba(0,0,0,0.8)"]} style={StyleSheet.absoluteFill} />

            {/* Texto flutuando sobre o gradiente sem tarja cinza. 
                numberOfLines={1} evita que títulos longos quebrem o layout */}
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