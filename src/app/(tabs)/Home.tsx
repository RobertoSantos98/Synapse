import BackGroundLightHome from '@/src/Assets/backGround-lightHome';
import BackgroundHome from '@/src/Assets/backgroundHome';
import CardShortHome, { cardShortHomeProps } from '@/src/components/cardShortHome';
import ContinuarEstudando from '@/src/components/sectionHome/continuarEstudando';
import MinhaBiblioteca from '@/src/components/sectionHome/minhaBiblioteca';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {

    const insets = useSafeAreaInsets();


    const ofensivaDiaria = 5;
    const cardsParaRevisarHoje = 24;
    const tempoEstimado = 8;

    const cardsRevisadosHoje = 10;
    const metaDiariaCards = 30;

    const porcentagemProgresso = Math.min(
        Math.round((cardsRevisadosHoje / metaDiariaCards) * 100),
        100
    )

    const continuarEstudando: cardShortHomeProps[] = [
        { id: 1, img: "https://img.magnific.com/vetores-gratis/ilustracao-de-escola-de-ingles-desenhada-a-mao_23-2149491453.jpg", title: "Inglês", detalhes: "Estudo da escola", nivel: "Intermediário", concluido: "40%" },
        { id: 2, img: "https://img.magnific.com/vetores-gratis/ilustracao-de-escola-de-ingles-desenhada-a-mao_23-2149491453.jpg", title: "Inglês", detalhes: "Estudo da escola 2", nivel: "Fácil", concluido: "20%" },
        { id: 3, img: "https://img.magnific.com/vetores-gratis/ilustracao-de-escola-de-ingles-desenhada-a-mao_23-2149491453.jpg", title: "Inglês", detalhes: "Estudo da escola 3", nivel: "Médio", concluido: "80%" },
        // {id: 2, img: "",title: "", detalhes: "", nivel: ""},
        // {id: 3, img: "",title: "", detalhes: "", nivel: ""},
    ]

    const [contentHeight, setContentHeight] = useState(0);

    return (
        <View style={{ flex: 1 }}>


            <ScrollView>
                <BackGroundLightHome />

                <View style={{ paddingTop: insets.top }} />


                {/* CABEÇALHO CLARO */}
                <View className='flex-row justify-between items-center px-6 pt-6 pb-2'>
                    <View>
                        <Text className='text-3xl font-extrabold text-slate-900 tracking-tight'>
                            Olá, <Text className='text-emerald-500'>Raphael!</Text>
                        </Text>
                        <Text className='text-sm text-slate-500 font-medium mt-1'>
                            Pronto para estudar hoje?
                        </Text>
                    </View>

                    {/* Botão sutil e flutuante */}
                    <TouchableOpacity className='rounded-full bg-white shadow-sm p-3 border border-slate-200 active:bg-slate-50'>
                        <Ionicons name='settings-sharp' size={22} color={"#64748b"} />
                    </TouchableOpacity>
                </View>



                <View className='mx-6 my-2 rounded-xl gap-4 overflow-hidden p-4 relative shadow-emerald'>
                    <LinearGradient colors={["#065f46", "#022c22",]}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} />

                    <View className='flex-row justify-center gap-2'>
                        <View className='gap-1 items-center'>
                            <View className='flex-row gap-2 items-center'>
                                <AntDesign name='fire' color={"#10b981"} size={14} />
                                <Text className='text-white text-2xl font-bold'>{ofensivaDiaria} dias</Text>
                            </View>
                            <Text className='text-slate-300'>Ofensiva Diária</Text>
                        </View>

                        <View className='w-[1px] h-2/3 bg-emerald-700 self-center' />

                        <View className='gap-1 items-center'>
                            <Text className='text-white text-2xl font-bold'>{cardsParaRevisarHoje} Cards</Text>
                            <Text className='text-slate-300'>Para Revisar Hoje</Text>
                        </View>

                        <View className='w-[1px] h-2/3 bg-emerald-700 self-center' />

                        <View className='gap-1 items-center'>
                            <Text className='text-white text-2xl font-bold'>~{tempoEstimado} min</Text>
                            <Text className='text-slate-300'>Tempo Estimado</Text>
                        </View>

                    </View>

                    <View className='gap-2'>
                        <Text className='text-white font-bold '>Estudo Diário: <Text className='text-slate-300 font-normal'>{cardsRevisadosHoje}/{metaDiariaCards} Cards Revisados</Text>
                        </Text>

                        <View className='flex-row items-center gap-2'>
                            <View className='bg-emerald-950 h-2 flex-1 rounded-full'>
                                <View className='bg-emerald-500 h-2 rounded-full' style={{ width: `${porcentagemProgresso}%` }}>
                                    <View className='absolute right-0 -top-1.5 itens-center bg-emerald-400 py-1 px-1.5 rounded-full'>
                                        <Text className='text-white self-center text-xs'>{porcentagemProgresso}%</Text>
                                    </View>
                                </View>
                            </View>
                            <Text className='text-slate-300 text-xs'>30</Text>
                        </View>

                        <Text className='font-bold text-sm text-center text-white'>Quase lá! Mais {cardsParaRevisarHoje} cards e você carimba o passaporte de hoje.</Text>
                    </View>
                </View>

                <ContinuarEstudando continuarEstudando={continuarEstudando} />

                <MinhaBiblioteca />






                <View style={{ paddingBottom: 120 }} />
            </ScrollView>


        </View>

    );
}