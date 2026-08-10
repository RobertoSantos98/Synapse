import CardCover from '@/src/components/cardCover';
import { ExpoRoot, router, useLocalSearchParams } from 'expo-router';
import { use, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BaralhoService, {  deckProps } from '../../../Services/BaralhoService';
import { Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CardService, { CardProps } from '../../../Services/CardService';
import BackGroundLightHome from '@/src/Assets/backGround-lightHome';
import DetailCard from '@/src/components/DetailsCard';


const tamanhoCard = (Dimensions.get('window').width / 3);
const tamanhoCardAdc = (Dimensions.get('window').width / 2) + 20;

export default function Detalhes() {
    const insets = useSafeAreaInsets();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [deck, setDeck] = useState<deckProps | null>(null);
    const [isPrivate, setIsPrivate] = useState(true);
    const fogo: number = deck?.level === "facil" ? 1 : deck?.level ? 2 : 3;

    const [modalVisible, setModalVisible] = useState(false)


    const handleLoadDeck = async () => {
        const response = await BaralhoService.GetDeckById(id);
        setDeck(response)
    }


    useEffect(() => {
        handleLoadDeck();
    }, [])

    const [isLoadingCreateCard, setIsLoadingCreateCard] = useState(false);


    const [frenteCard, setFrenteCard] = useState("");
    const [versoCard, setVersoCard] = useState("");
    const [wrongAnswer, setWrongAnswer] = useState("");
    const [step, setStep] = useState(1);

    const handleCard = async () => {
        setIsLoadingCreateCard(true);

        try {

            const data: CardProps = {
                deckId: deck?.id,
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
                            <Text className='text-white text-2xl font-bold'>Cartas do Baralho</Text>
                            <TouchableOpacity className='flex-row bg-white p-2 items-center gap-2 rounded-lg' onPress={() => setModalVisible(true)}>
                                <MaterialCommunityIcons name='cards-outline' size={16} color={"#6366f1"} />
                                <Text className='text-primary-500 text-md font-bold'>Criar Carta</Text>
                            </TouchableOpacity>
                        </View>

                        {deck != null && deck.totalCards != 0 ? (
                            <FlatList
                                data={deck.cards}
                                keyExtractor={(c) => c.id || c.question}
                                renderItem={({ item }) => <RenderItemCardMeuDeck id={item.id} question={item.question} answer={item.answer} wrongAnswer={item.wrongAnswer} />}
                                horizontal
                                contentContainerStyle={{
                                    gap: 4,
                                    paddingHorizontal: 16
                                }}
                                showsHorizontalScrollIndicator={false}
                            />

                        ) : (
                            <View className='bg-white rounded-xl justify-center mx-6' style={{ width: tamanhoCard, height: tamanhoCard + 40 }}>
                                <Text className='font-bold text-center'>Você ainda não adicionou nenhuma carta</Text>
                            </View>
                        )}

                    </View>

                    <View className='p-4 m-2 rounded-xl bg-white gap-4'>
                        <Text className='text-lg font-bold'>Opções do Baralho</Text>

                        <View className='gap-2'>

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
                    <TouchableOpacity onPress={() => setModalVisible(false)} className='h-14' />
                    <View className='flex-1 backdrop-blur-md w-full bg-white/90 bottom-0 rounded-t-3xl border border-slate-400 pt-2 overflow-hidden' style={{ boxShadow: '0px -8px 10px rgba(0, 0, 0, 0.2)' }}>

                        <BackGroundLightHome />

                        <View className='p-4 gap-4'>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-2xl font-poppinsBold text-primary-500'>Criar Carta</Text>
                                <TouchableOpacity
                                    className='p-3 bg-slate-50 rounded-full border border-slate-200'
                                    style={{ boxShadow: '-1px 4px 8px rgba(0, 0, 0, 0.1)' }}
                                    onPress={() => setModalVisible(false)}>
                                    <MaterialCommunityIcons name='close' size={18} />
                                </TouchableOpacity>
                            </View>

                            <View className='items-center'>
                                <View className='bg-white border border-slate-400 rounded-xl justify-center p-2' style={{ height: tamanhoCardAdc * 1.5, width: tamanhoCardAdc, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3) ' }}>
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
                </View>

            </Modal>

        </View>
    );
}


const RenderItemCardMeuDeck = ({ id, question, answer, wrongAnswer }: CardProps) => {

    const card : CardProps = {
        id: id,
        question: question,
        answer: answer,
        wrongAnswer: wrongAnswer
    }

    return (
        <TouchableOpacity
            className='p-2 bg-white rounded-2xl items-center justify-center'
            style={{ width: tamanhoCard, height: tamanhoCard + 40, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.5)' }}
            onPress={() => <DetailCard {...card} />}
        >
            <Text className='text-center text-xs tracking-wider leading-normal font-poppinsBold'>{question}</Text>
        </TouchableOpacity>
    )
}