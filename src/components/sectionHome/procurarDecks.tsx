import { Alert, Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TitleHome from '../titleHome';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import BaralhoService, { deckProps } from '@/src/Services/BaralhoService';
import CardCover from '../cardCover';
import { router } from 'expo-router';
import UserService from '@/src/Services/UserService';
import { User } from '@/src/types/auth';

const tamanhoCard = Dimensions.get('window').width - 80;

export default function ProcurarDecks() {

    const [decksComunidade, setDecksComunidade] = useState<deckProps[]>();

    const handleBiblioteca = async () => {

        try {
            const data = await BaralhoService.GetDeck();
            setDecksComunidade(data);

        } catch (error) {
            Alert.alert("Ops!", "Algo saiu errado.");
            console.log("Erro: ", error)
        } finally {

        }
    }

    useEffect(() => {
        handleBiblioteca();
    }, [])

    return (
        <View className='bg-primary-500 py-4'>

            <View className='px-6 py-3 flex-row justify-between items-end'>
                <Text className='font-poppinsBold text-lg text-slate-100 tracking-wide'>Decks Da Comunidade</Text>

                <TouchableOpacity
                    className='flex-row gap-1 items-center active:opacity-50 bg-white rounded-full px-3 py-1'
                    onPress={() => router.push('/(telas)/bibliotecaComunidade/bibliotecaComunidade')}
                >
                    <Text className='text-primary-600 font-bebas tracking-wider text-lg'>Ver Tudo</Text>
                    <MaterialIcons name='arrow-forward-ios' color={"#4f46e5"} size={12} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={decksComunidade}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <RenderItemComunidadeDecks isPrivate={item.isPrivate} userId={item.userId} id={item.id} title={item.title} themeId={item.themeId} details={item.details} level={item.level} totalCards={item.totalCards} />}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    gap: 8
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}


const RenderItemComunidadeDecks = (deck: deckProps) => {

    const nivel: number = deck.level === "facil" ? 1 : deck.level === "medio" ? 2 : 3;

    return (
        <TouchableOpacity 
            className='rounded-2xl p-1 bg-white border border-slate-200 overflow-hidden' 
            style={{ width: tamanhoCard, boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.5)" }}
            onPress={() => router.push(`/(telas)/biblioteca/${deck.id}`)}    
        >
            <View className='rounded-xl overflow-hidden h-36 border border-primary-200'>
                <CardCover themeId={deck.themeId} />
            </View>

            <View className='px-2 py-2'>
                <Text className='text-lg font-poppinsBold'>{deck.title}</Text>
                <Text className='text-sm text-slate-600'>{deck.details}</Text>
            </View>

            <View className='flex-row mb-2 mx-2'>
                <View className='flex-row gap-2 border border-slate-200 bg-primary-50 rounded-full py-1.5 px-2 items-center'>
                    <Text className='text-xs font-bold text-slate-600 tracking-wide'>Nível</Text>
                    <View className='flex-row gap-1'>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Fontisto name='fire' key={index} size={12} color={index <= nivel ? "#f59e0b" : "#c7d2fe"} />
                        ))}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}