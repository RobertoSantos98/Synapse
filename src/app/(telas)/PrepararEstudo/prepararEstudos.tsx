import CardCover from '@/src/components/cardCover';
import BaralhoService, { deckProps } from '@/src/Services/BaralhoService';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tamanhoCard = Dimensions.get('window').width - 80;

export default function PrepararEstudos() {

    const insets = useSafeAreaInsets();

    const [decksEscolhidos, setDecksEscolhidos] = useState<deckProps[]>([]);

    const [decksBiblioteca, setDecksBiblioteca] = useState<deckProps[]>([]);

    const handleDecksBibliotecas = async () => {
        const result = await BaralhoService.GetDeck();
        setDecksBiblioteca(result);
    }

    useEffect(() => {
        handleDecksBibliotecas();
    }, [])


    const handleDecksEscolhidos = (deckId: deckProps) => {

        const jaEscolhido = decksEscolhidos.some(deck => deck.id === deckId.id)

        if (jaEscolhido) {
            const deckremovido = decksEscolhidos.filter(deck => deck !== deckId);
            setDecksEscolhidos(deckremovido);
            return
        }

        setDecksEscolhidos([...decksEscolhidos, deckId])
        console.log("deck adicionado: ", deckId.title)
    }

    return (
        <View className='relative flex-1 bg-primary-500' style={{ paddingTop: insets.top }}>

            <View className='mx-4 gap-6 my-6'>
                <View>
                    <TouchableOpacity onPress={() => router.back()} className='bg-white/30 rounded-full p-3 border border-white/80 self-start'>
                        <MaterialIcons name='arrow-back-ios-new' size={12} color={"#fff"} />
                    </TouchableOpacity>
                </View>
                <Text className='text-2xl font-bold text-white'>Escolha até 4 Decks para estudar</Text>

                <View className='bg-white rounded-lg py-2 px-4 flex-row gap-4'>
                    <MaterialIcons name='search' size={22} color={"#000"} className='self-center' />
                    <TextInput className='text-lg flex-1' placeholder='Procurar' />
                </View>

                <View className='gap-4 bg-primary-600 rounded-2xl p-4'>
                    <View>
                        <Text className='text-primary-200'>Decks Selecionados: </Text>
                    </View>

                    <View>
                        {decksEscolhidos.length > 0 ? (
                            <FlatList
                                data={decksEscolhidos}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => <RenderDecksEscolhidos themeId={item.themeId} title={item.title} deck={item} />}
                                horizontal
                                contentContainerStyle={{
                                    gap: 4
                                }}
                            />
                        ) : (
                            <View className='h-32 justify-center'>
                                <Text className='text-white text-2xl font-bold text-center'>Nenhum deck selecionado.</Text>
                            </View>
                        )}
                    </View>
                </View>

            </View>

            <View className='flex-1 bg-white rounded-t-3xl'>

                <View className='my-4 gap-2'>

                    <Text className='text-xl font-bold mx-4 mt-2'>Minha Biblioteca</Text>

                    <FlatList
                        data={decksBiblioteca}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <RenderCards deck={item} pressionado={() => handleDecksEscolhidos(item)} />}
                        contentContainerStyle={{
                            gap: 8,
                            paddingHorizontal: 16,
                            paddingVertical: 8
                        }}
                    />
                </View>


            </View>


            <View className='absolute bottom-0 flex-row w-full'>
                <TouchableOpacity 
                    onPress={() => router.push('/(telas)/Arena/Solo')}
                    className='flex-1 m-4 bg-orange-500 rounded-xl py-6' style={{ marginBottom: insets.bottom + 8 }}>
                    <Text className='text-center text-xl font-bold text-white'>Estudar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


type deckEscolhasProps = {
    pressionado?: () => void
    deck: deckProps
}
type deckEscolhidosProps = {
    themeId: string,
    title?: string,
    pressionado?: () => void
    deck: deckProps
}


const RenderCards = ({ deck, pressionado }: deckEscolhasProps) => {

    const [escolhido, setEscolhido] = useState(false);

    const nivel: number = deck.level === "facil" ? 1 : deck.level === "medio" ? 2 : 3;

    const handleOnPress = () => {
        pressionado && pressionado()
        setEscolhido(!escolhido)
    }

    return (
        <TouchableOpacity
            style={{
                borderWidth: 2,
                borderColor: escolhido ? "#6366f1" : "#eef2ff",
                borderRadius: 12,
                width: tamanhoCard, boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)"
            }}
            className='rounded-lg p-1 bg-white overflow-hidden'
            onPress={handleOnPress}
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

function RenderDecksEscolhidos({ themeId, title }: deckEscolhidosProps) {
    return (
        <View className='h-32 w-24 rounded-lg border border-primary-900 overflow-hidden relative'>
            <CardCover themeId={themeId} />
            <Text className='text-xs texte-black absolute bottom-2 font-bold self-center'>{title}</Text>
        </View>
    )
}