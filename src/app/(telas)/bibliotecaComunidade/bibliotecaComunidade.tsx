import BackGroundLightHome from '@/src/Assets/backGround-lightHome';
import CircuitBackground from '@/src/Assets/circuitBackGround';
import CardCover from '@/src/components/cardCover';
import HeaderStack from '@/src/components/headerStack';
import BaralhoService, { deckProps } from '@/src/Services/BaralhoService';
import UserService from '@/src/Services/UserService';
import { User } from '@/src/types/auth';
import { Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function BibliotecaComunidade() {

    const [bibliotecaDecksNovos, setBibliotecaDecksNovos] = useState<deckProps[]>();

    useEffect(() => {
        const handleNovosDeck = async () => {
            try {
                const decksNovos = await BaralhoService.GetDeck();

                setBibliotecaDecksNovos(decksNovos);


            } catch (error) {
                console.log("Erro: " + error)
                throw error
            }
        }
        handleNovosDeck();
    }, [])


    return (
        <View className='flex-1'>
            {/* <CircuitBackground /> */}
            <BackGroundLightHome />

            <ScrollView>

                <View className='bg-primary-600'>
                    <HeaderStack title='Decks da Comunidade' />

                    <View className='px-6 flex-row mb-4'>
                        <TextInput
                            placeholder='Buscar Deck'
                            className='px-4 py-3 bg-slate-50 rounded-l-full flex-1'
                        />
                        <TouchableOpacity className='px-4 py-3 bg-slate-200 rounded-r-full border-l border-primary-200'>
                            <MaterialIcons name='search' size={18} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='py-2'>

                    <View className='px-6 py-4 flex-row justify-between'>
                        <Text className='text-primary-950 font-poppinsBold text-2xl'>Últimos Decks Postados</Text>
                        <TouchableOpacity className='flex-row gap-1 items-center'>
                            <Text className='uppercase text-primary-500 tracking-tighter font-bold text-sm'>Todos</Text>
                            <MaterialIcons name='arrow-forward-ios' color={"#6366f1"} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={bibliotecaDecksNovos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <RenderItemsDecks id={item.id} title={item.title} themeId={item.themeId} details={item.details} level={item.level} totalCards={item.totalCards} isPrivate={item.isPrivate} userId={item.userId} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingVertical: 8,
                            gap: 16
                        }}
                    />
                </View>

                


            </ScrollView>
        </View>
    );
}

const tamanhoCard = Dimensions.get('window').width - 70;

const RenderItemsDecks = (deck: deckProps) => {

    const nivel: number = deck.level === "facil" ? 1 : deck.level === "medio" ? 2 : 3;
    const [user, setUser] = useState<User>();

    const handleUser = async () => {
        const user = await UserService.GetUserById(deck.userId);
        setUser(user);
    }

    useEffect(() => {
        handleUser();
    }, [])


    return (
        <TouchableOpacity className='p-1 bg-white rounded-2xl' style={{ width: tamanhoCard, boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)" }}>
            <View className='h-36 rounded-xl overflow-hidden border border-primary-300'>
                <CardCover themeId={deck.themeId} />
            </View>

            <View className='px-2 py-2'>
                <Text className='text-lg font-poppinsBold'>{deck.title}</Text>
                <Text className='text-sm text-slate-600'>{deck.details}</Text>
            </View>


            <View className='flex-row mb-2 mx-2 gap-2'>

                <View className='flex-row gap-2 border border-slate-200 bg-slate-50 rounded-full py-1.5 px-2 items-center'>
                    <Text className='text-xs font-bold text-slate-600 tracking-wide'>Nível</Text>
                    <View className='flex-row gap-1'>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Fontisto name='fire' size={11} color={index <= nivel ? "#f59e0b" : "#c7d2fe"} />
                        ))}
                    </View>
                </View>

                <View className='flex-row gap-2 items-center px-2 bg-slate-50 rounded-full border border-slate-200'>
                    <MaterialCommunityIcons name='account' size={14} color={"#4f46e5"} />
                    <Text className='text-xs text-slate-600 tracking-wide'>{user ? user.usuario : "nullo"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}