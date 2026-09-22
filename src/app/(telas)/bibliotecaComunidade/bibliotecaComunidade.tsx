import BackGroundLightHome from '@/src/Assets/backGround-lightHome';
import CircuitBackground from '@/src/Assets/circuitBackGround';
import CardCover from '@/src/components/cardCover';
import HeaderStack from '@/src/components/headerStack';
import MiniDeckHorizontal from '@/src/components/MiniDeckHorizontal';
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
        <View className='flex-1 pb-6'>
            {/* <CircuitBackground /> */}
            <BackGroundLightHome />

            <ScrollView>

                <View className='bg-primary-500 rounded-b-2xl pb-4'>
                    <HeaderStack title='Decks da Comunidade' subTitle='Visite os decks compartilhados pela comunidade do Synapse' />

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

                {bibliotecaDecksNovos && (
                    <MiniDeckHorizontal title={"Últimos Decks Postados"} decks={bibliotecaDecksNovos}/>
                )}
                {bibliotecaDecksNovos && (
                    <MiniDeckHorizontal title={"Decks em alta"} decks={bibliotecaDecksNovos}/>
                )}
                {bibliotecaDecksNovos && (
                    <MiniDeckHorizontal title={"Mais Bem Avaliados"} decks={bibliotecaDecksNovos}/>
                )}




            </ScrollView>
        </View>
    );
}
