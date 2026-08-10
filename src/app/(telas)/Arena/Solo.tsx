import CircuitBackground from '@/src/Assets/circuitBackGround';
import HeaderStack from '@/src/components/headerStack';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CardProps } from '@/src/Services/CardService';
import TelaCarregamento from '@/src/components/telaCarregamento';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const tamanhoCard = (Dimensions.get('window').width - 48)


export default function PlaySolo() {

    const [isLoading, setIsLoading] = useState(false);
    if (isLoading) return <TelaCarregamento />

    const cards = {
        id: "1",
        deckId: "235452",
        question: "O que é o Javascript?",
        answer: "Uma linguagem usada tanto no front quanto no Back-End",
        wrongAnswer: "Uma linguagem de marcação usada nos aplicativos mobiles junto com .Net."
    }


    return (
        <View className='flex-1'>
            <CircuitBackground />

            <View className='flex-1 relative'>
                <HeaderStack title='Player Solo' />

                <View className='px-6 py-4'>
                    <View>
                        <View
                            className='bg-white border-2 border-primary-500 rounded-2xl items-center justify-center'
                            style={{ width: tamanhoCard, height: tamanhoCard, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)" }}
                        >
                            <Text className='text-2xl font-bold'>{cards.question}</Text>
                        </View>

                    </View>

                    <View className='flex-row rounded-3xl overflow-hidden mt-8 border border-primary-500 justify-center'>
                        <LinearGradient colors={["#6366f1", "#4338ca"]} style={StyleSheet.absoluteFill} />

                        <TouchableOpacity
                            style={{ width: tamanhoCard / 3, height: tamanhoCard / 5 }}
                            className='items-center justify-center active:bg-green-500 rounded-l-3xl'
                        >
                            <Text className='text-green-500 font-bold text-xl'>Fácil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: tamanhoCard / 3, height: tamanhoCard / 5 }}
                            className='items-center justify-center active:bg-yellow-500 '
                        >
                            <Text className='text-yellow-500 font-bold text-xl'>Médio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: tamanhoCard / 3, height: tamanhoCard / 5 }}
                            className='items-center justify-center active:bg-red-500 rounded-r-3xl'
                        >
                            <Text className='text-rose-500 font-bold text-xl'>Difícil</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='absolute bottom-0 w-full'>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className='py-8 overflow-hidden rounded-t-full items-center border border-black'
                    >
                        <LinearGradient colors={["#6366f1", "#4338ca"]} style={StyleSheet.absoluteFill} />
                        <Text className='text-2xl font-poppinsBold text-white'>Virar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}
