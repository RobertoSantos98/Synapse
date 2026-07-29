import CardCover from '@/src/components/cardCover';
import { router, useLocalSearchParams } from 'expo-router';
import { use, useEffect, useState } from 'react';
import { Dimensions, FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BaralhoService, deckProps } from '../../Services/BaralhoService';
import { Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardProps } from '../../Services/CardService';


const tamanhoCard = (Dimensions.get('window').width / 3);

export default function Detalhes() {
    const insets = useSafeAreaInsets();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [deck, setDeck] = useState<deckProps | null>(null);
    const [isPrivate, setIsPrivate] = useState(true);
    const fogo : number = deck?.level === "facil" ? 1 : deck?.level ? 2 : 3 ;

    const [ modalVisible, setModalVisible] = useState(false)


    const handleLoadDeck = async () => {
        const response = await BaralhoService.GetDeckById(id);
        setDeck(response)
    }


    useEffect(() => {
        handleLoadDeck();
    }, [])


    return (
        <View className='flex-1'>
            <ScrollView className=''>

                <View className='h-80'>
                    <View className='absolute z-20 w-full justify-between flex-row p-4' style={{ marginTop: insets.top }}>
                        <TouchableOpacity className='bg-white p-4 rounded-full border border-slate-200' onPress={() => router.back()}>
                            <MaterialIcons name='arrow-back-ios-new' size={24} color={"#6366f1"} />
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-white p-4 rounded-full border border-slate-200'>
                            <Ionicons name='heart' size={24} color={"#6366f1"} />
                        </TouchableOpacity>
                    </View>
                    <CardCover themeId={deck ? deck.themeId : "default"} />
                </View>

                <View className='bg-primary-500 py-2 rounded-t-3xl -top-6 h-full'>

                    <View className='flex-row p-4 mx-2 justify-between items-start rounded-2xl bg-white border border-primary-600'>
                        <View className='flex-1 gap-1'>
                            <Text className='text-2xl font-poppinsBlack text-primary-500 tracking-wider' numberOfLines={1}>{deck?.title}</Text>
                            <Text className='text-slate-700 text-lg' numberOfLines={2}>{deck?.details}</Text>
                            <View className='flex-row gap-2 items-center'>
                                <View className='flex-row gap-1'>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <Fontisto
                                            key={index}
                                            name='fire'
                                            size={12}
                                            // Pinta de laranja se estiver dentro do nível, senão, cinza claro
                                            color={index < fogo ? "#f59e0b" : "#e2e8f0"}
                                        />
                                    ))}
                                </View>
                                <Text className='text-slate-400 text-sm'>Dificuldade</Text>
                            </View>
                        </View>

                        <View className='items-center justify-center gap-2'>
                            <TouchableOpacity className='border border-primary-300 bg-primary-500 w-12 rounded-full p-1' style={{ alignItems: isPrivate ? "flex-start" : "flex-end" }} onPress={() => setIsPrivate(!isPrivate)} activeOpacity={0.9} >
                                <View className='h-6 w-6 rounded-full items-center justify-center' style={{ backgroundColor: isPrivate ? "#fff" : "#a5b4fc" }} >
                                    <MaterialIcons name={isPrivate? 'lock' : 'lock-open'} color={"#6366f1"} />
                                </View>
                            </TouchableOpacity>
                            <Text className='text-xs font-bold text-slate-400'>{isPrivate ? "Privado" : "Público"}</Text>
                        </View>
                    </View>

                    <View className='p-4'>
                        <View className='p-2'>
                            <Text className='text-white text-2xl font-bold'>Cartas do Baralho</Text>
                        </View>
                        {deck != null && deck.totalCards != 0 ? (
                            <FlatList
                                data={deck.cards}
                                keyExtractor={(c) => c.id}
                                renderItem={({ item }) => <RenderItemCardMeuDeck id={item.id} question={item.question} answer={item.answer} wrongAnswer={item.wrongAnswer} />}
                                horizontal
                            />

                        ) : (
                            <View className='bg-white rounded-xl justify-center' style={{ width: tamanhoCard, height: tamanhoCard + 40 }}>
                                <Text className='font-bold text-center'>Você ainda não adicionou nenhuma carta</Text>
                            </View>
                        )}

                    </View>

                    <View className='p-4 m-2 rounded-xl bg-white gap-4'>
                        <Text className='text-lg font-bold'>Opções do Baralho</Text>

                        <View className='gap-2'>
                            <TouchableOpacity className='bg-primary-50 border border-primary-500 p-4 rounded-lg items-center' onPress={() => setModalVisible(true)}>
                                <Text className='text-xl font-poppinsBold text-primary-500'>Criar Carta</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='bg-primary-50 border border-primary-500 p-4 rounded-lg items-center'>
                                <Text className='text-xl font-poppinsBold text-primary-500'>Editar Informações</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='bg-rose-50 border border-red-500 p-4 rounded-lg items-center'>
                                <Text className='text-xl font-poppinsBold text-red-500'>Excluir Baralho</Text>
                            </TouchableOpacity>

                        </View>

                    </View>


                </View>

            </ScrollView>

            <Modal 
                visible={modalVisible}
                animationType='slide'
                transparent={true}
            >
                <View className='flex-1 justify-end'>
                    <TouchableOpacity onPress={() => setModalVisible(false)} className='flex-1 bg-black/10' />
                    <View className='h-2/3 w-full bg-white bottom-0 rounded-t-2xl'>

                    </View>
                    
                </View>

            </Modal>

        </View>
    );
}


const RenderItemCardMeuDeck = ({ id, question, answer, wrongAnswer }: CardProps) => {
    return (
        <TouchableOpacity className='p-2 bg-white rounded-2xl items-center justify-center' style={{ width: tamanhoCard, height: tamanhoCard + 40 }}>
            <Text className='text-center text-md font-poppinsBold'>{question}</Text>
        </TouchableOpacity>
    )
}