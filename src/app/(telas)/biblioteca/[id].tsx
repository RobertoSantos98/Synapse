import CardCover from '@/src/components/cardCover';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BaralhoService, { deckProps } from '../../../Services/BaralhoService';
import { Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CardService, { CardProps } from '../../../Services/CardService';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import CardPrimary from '@/src/components/CardPrimary';
import { LinearGradient } from 'expo-linear-gradient';


const tamanhoCard = (Dimensions.get('window').width / 3);
const tamanhoCardAdc = (Dimensions.get('window').width / 1.5);

export default function Detalhes() {
    const insets = useSafeAreaInsets();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [deck, setDeck] = useState<deckProps | null>(null);
    const [isPrivate, setIsPrivate] = useState(true);

    const fogo: number = deck?.level === "facil" ? 1 : deck?.level ? 2 : 3;

    const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);

    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const snap = useMemo(() => ["70%", "95%"], []);

    const bottomSheetRefNovoCard = useRef<BottomSheetModal>(null);
    const snapNovoCard = useMemo(() => ["90%", "95%"], []);

    function abrirSheet() {
        bottomSheetRef.current?.present();
    }
    function abrirSheetNovoCard() {
        bottomSheetRefNovoCard.current?.present();
    }


    const handleLoadDeck = async () => {
        const response = await BaralhoService.GetDeckById(id);
        setDeck(response)
    }


    useEffect(() => {
        handleLoadDeck();
    }, [])


    function handleSelectedCard(card: CardProps) {
        setSelectedCard(card);
        abrirSheet();
    }


    return (
        <BottomSheetModalProvider>
            <View className='flex-1'>
                <ScrollView className=''>

                    <View className='h-80'>
                        <View className='absolute z-20 w-full justify-between flex-row p-4' style={{ marginTop: insets.top }}>
                            <TouchableOpacity className='bg-white p-4 rounded-full border border-slate-200' onPress={() => router.back()}>
                                <MaterialIcons name='arrow-back-ios-new' size={18} color={"#6366f1"} />
                            </TouchableOpacity>
                            <TouchableOpacity className='bg-white p-4 rounded-full border border-slate-200' onPress={() => BaralhoService.DownloadDeck(id)}>
                                <MaterialCommunityIcons name='download-box' size={18} color={"#6366f1"} />
                            </TouchableOpacity>
                        </View>
                        <CardCover themeId={deck ? deck.themeId : "default"} />
                    </View>

                    <View className='bg-primary-500 py-2 rounded-t-3xl -top-6 h-full' style={{ boxShadow: '0px -3px 8px rgba(0, 0, 0, 0.2)' }}>

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
                                        <MaterialIcons name={isPrivate ? 'lock' : 'lock-open'} color={"#6366f1"} />
                                    </View>
                                </TouchableOpacity>
                                <Text className='text-xs font-bold text-slate-400'>{isPrivate ? "Privado" : "Público"}</Text>
                            </View>
                        </View>

                        <View className='py-4'>

                            <View className='px-6 py-4 flex-row justify-between'>
                                <View className='flex-row gap-2 items-center'>
                                    <Text className='text-primary-200 text-2xl font-bold'>Cartas do Baralho: </Text>
                                    <Text className='text-xl font-bold text-white'>{deck?.totalCards}</Text>
                                </View>
                                <TouchableOpacity className='flex-row bg-white p-2 items-center gap-2 rounded-lg' onPress={abrirSheetNovoCard}>
                                    <MaterialCommunityIcons name='cards-outline' size={16} color={"#6366f1"} />
                                    <Text className='text-primary-500 text-md font-bold'>Criar Carta</Text>
                                </TouchableOpacity>
                            </View>

                            {deck != null && deck.totalCards != 0 ? (
                                <FlatList
                                    data={deck.cards}
                                    keyExtractor={(c) => c.id || c.question}
                                    renderItem={({ item }) => <RenderItemCardMeuDeck card={item} setSelectedCard={() => handleSelectedCard(item)} />}
                                    horizontal
                                    contentContainerStyle={{
                                        gap: 4,
                                        paddingHorizontal: 16,
                                        paddingVertical: 8
                                    }}
                                    showsHorizontalScrollIndicator={false}
                                />

                            ) : (
                                <View className='bg-white rounded-xl justify-center mx-6' style={{ width: tamanhoCard, height: tamanhoCard + 40 }}>
                                    <Text className='font-bold text-center'>Você ainda não adicionou nenhuma carta</Text>
                                </View>
                            )}

                        </View>

                        <View className='py-4 px-2 m-2 rounded-xl bg-white gap-4'>

                            <View className='flex-row gap-2 items-center'>
                                <MaterialCommunityIcons name='file-settings-outline' size={18} color={"#64748b"} />
                                <Text className='text-lg text-slate-500 font-bold'>Opções do Criador</Text>
                            </View>



                            <View className='flex-row gap-2 mb-2'>

                                <TouchableOpacity className='bg-slate-50 border border-slate-200 gap-4 p-4 rounded-2xl flex-1 shadow-sm'>
                                    <View className='bg-primary-50 rounded-full p-2 self-start border border-primary-200'>
                                        <MaterialCommunityIcons name='account' size={18} color={"#6366f1"} />
                                    </View>
                                    <Text className='text-base text-black self-end'>Ver Perfil do Criador</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className='bg-slate-50 border border-slate-200 gap-4 p-4 rounded-2xl flex-1 shadow-sm'>
                                    <View className='bg-primary-50 rounded-full p-2 self-start border border-primary-200'>
                                        <MaterialCommunityIcons name='thumb-up' size={18} color={"#6366f1"} />
                                    </View>
                                    <Text className='text-base text-black self-end'>Curtir</Text>
                                </TouchableOpacity>

                            </View>

                            <View className='h-0.5 bg-slate-200 my-2 mx-4 rounded-full' />

                            <View className='flex-row gap-2 items-center'>
                                <MaterialCommunityIcons name='account-settings-outline' size={18} color={"#64748b"} />
                                <Text className='text-lg text-slate-500 font-bold'>Opções do Criador</Text>
                            </View>


                            <View className='flex-row gap-2'>

                                <TouchableOpacity className='bg-slate-50 border border-slate-200 gap-4 p-4 rounded-2xl flex-1 shadow-sm'>
                                    <View className='bg-primary-50 rounded-full p-2 self-start border border-primary-200'>
                                        <MaterialCommunityIcons name='file-edit' size={18} color={"#6366f1"} />
                                    </View>
                                    <Text className='text-base text-black self-end'>Editar Informações</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className='bg-slate-50 border border-slate-200 gap-4 p-4 rounded-2xl flex-1 shadow-sm'>
                                    <View className='bg-rose-50 rounded-full p-2 self-start border border-rose-200'>
                                        <MaterialCommunityIcons name='delete' size={18} color={"#f43f5e"} />
                                    </View>
                                    <Text className='text-base text-black self-end'>Excluir Baralho</Text>
                                </TouchableOpacity>


                            </View>

                        </View>


                    </View>

                </ScrollView>

                <BottomSheetModal
                    ref={bottomSheetRefNovoCard}
                    snapPoints={snapNovoCard}
                    enablePanDownToClose
                    enableDynamicSizing={false}
                >
                    <BottomSheetView>
                        <CriarNovoCard deckId={deck?.id} />
                    </BottomSheetView>
                </BottomSheetModal>

                <BottomSheetModal
                    ref={bottomSheetRef}
                    snapPoints={snap}
                    enablePanDownToClose
                    enableDynamicSizing={false}
                    backgroundStyle={{ backgroundColor: "#6366f1" }}
                    handleIndicatorStyle={{ backgroundColor: "#fff", width: 60 }}
                >
                    {selectedCard && (
                        <BottomSheetView>
                            <RenderCardDetail card={selectedCard} />
                        </BottomSheetView>
                    )}
                </BottomSheetModal>

            </View>

        </BottomSheetModalProvider>
    );
}

type RenderItemCardMeuDeckProps = {
    card: CardProps,
    setSelectedCard: () => void
}

const RenderItemCardMeuDeck = ({ card, setSelectedCard }: RenderItemCardMeuDeckProps) => {


    return (
        <View>
            <TouchableOpacity
                className='p-2 bg-white rounded-2xl items-center justify-center'
                style={{ width: tamanhoCard, height: tamanhoCard + 40, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.5)' }}
                onPress={setSelectedCard}
            >
                <Text className='text-center text-xs tracking-wider leading-normal font-poppinsBold'>{card.question}</Text>

            </TouchableOpacity>
        </View>
    )
}



type CriarNovoCardProps = {
    deckId?: string
}

function CriarNovoCard({ deckId }: CriarNovoCardProps) {

    const [isLoadingCreateCard, setIsLoadingCreateCard] = useState(false);



    const [frenteCard, setFrenteCard] = useState("");
    const [versoCard, setVersoCard] = useState("");
    const [wrongAnswer, setWrongAnswer] = useState("");
    const [step, setStep] = useState(1);

    const handleCard = async () => {
        setIsLoadingCreateCard(true);

        try {

            const data: CardProps = {
                deckId: deckId,
                question: frenteCard,
                answer: versoCard,
                wrongAnswer: wrongAnswer
            }

            const response = await CardService.PostCard(data);
            Alert.alert("Sucesso!", "Card Criado com sucesso");
            setFrenteCard("");
            setVersoCard("");
            setWrongAnswer("");
            setStep(1);

        } catch (error: any) {
            console.log("Erro: ", error.message);

        } finally {

            setIsLoadingCreateCard(false);

        }
    }

    return (
        <View className='flex-1 backdrop-blur-md w-full bg-white/90 pt-2' >

            <View className='px-4 gap-4'>
                <View className='flex-row justify-between items-center'>
                    <Text className='text-2xl font-poppinsBold text-primary-500'>Criar Carta</Text>
                </View>

                <View className='items-center'>
                    <View className='bg-white border border-slate-400 rounded-xl justify-center p-2' style={{ height: tamanhoCardAdc * 1.3, width: tamanhoCardAdc, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3) ' }}>
                        <Text className='text-center font-bold text-xl tracking-wider leading-normal'>
                            {step === 1 ? frenteCard : step === 2 ? versoCard : wrongAnswer}
                        </Text>
                    </View>
                </View>

                {(() => {
                    switch (step) {
                        case 1:
                            return (
                                <View className='p-4 border border-slate-200 rounded-xl gap-2 bg-white'>
                                    <Text className='font-bold text-md text-slate-900'>Digite a Frente da Carta: </Text>
                                    <TextInput
                                        className='border border-primary-200 rounded-2xl px-4 py-6 bg-slate-50'
                                        style={{ boxShadow: '-1px 4px 10px rgba(0, 0, 0, 0.1)' }}
                                        value={frenteCard}
                                        onChangeText={setFrenteCard}
                                    />
                                </View>
                            )
                        case 2:
                            return (
                                <View className='p-4 border border-slate-200 rounded-xl gap-2 bg-white'>
                                    <Text className='font-bold text-md text-slate-900'>Digite o Verso da Carta: </Text>
                                    <TextInput
                                        className='border border-primary-200 rounded-2xl px-4 py-6 bg-slate-50'
                                        style={{ boxShadow: '-1px 4px 10px rgba(0, 0, 0, 0.1)' }}
                                        value={versoCard}
                                        onChangeText={setVersoCard}
                                    />
                                </View>
                            )
                        case 3:
                            return (
                                <View className='p-4 border border-slate-200 rounded-xl gap-2 bg-white'>
                                    <Text className='font-bold text-md text-slate-900'>Digite uma resposta Errada para Jogar: </Text>
                                    <TextInput
                                        className='border border-primary-200 rounded-2xl px-4 py-6 bg-slate-50'
                                        style={{ boxShadow: '-1px 4px 10px rgba(0, 0, 0, 0.1)' }}
                                        value={wrongAnswer}
                                        onChangeText={setWrongAnswer}
                                    />
                                </View>
                            )

                        default:
                            return null
                    }
                })()
                }

                <View className='flex-row gap-2'>
                    <TouchableOpacity
                        onPress={() => step != 1 ? setStep(step - 1) : setStep(1)}
                        className='py-4 w-1/6 bg-white items-center justify-center rounded-xl border border-slate-200' style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <MaterialCommunityIcons name='arrow-left' size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => step === 1 ? setStep(2) : step === 2 ? setStep(3) : step === 3 ? handleCard() : setStep(1)}
                        disabled={isLoadingCreateCard}
                        className='flex-1 bg-primary-500 py-4 rounded-xl items-center border border-primary-600'
                        style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
                    >
                        <Text className='text-2xl font-bold text-white'>{isLoadingCreateCard ?
                            <ActivityIndicator size={28} color={"#fff"} /> :
                            step != 3 ? "Virar" : "Criar"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


type RenderCardDetailProps = {
    card: CardProps
}

function RenderCardDetail({ card }: RenderCardDetailProps) {
    return (
        <View className='flex-1' >
            <View className='mx-4 my-2 gap-4'>
                <Text className='font-poppinsBold text-base tracking-wider text-white'>Detalhes: </Text>
                <CardPrimary card={card} />
            </View>
        </View>
    )
}