import BackGroundLightHome from '@/src/Assets/backGround-lightHome';
import HeaderStack from '@/src/components/headerStack';
import MiniDeckHorizontal from '@/src/components/MiniDeckHorizontal';
import BaralhoService, { deckProps } from '@/src/Services/BaralhoService';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {  ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function BibliotecaComunidade() {

    const connected = true;

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

                {connected ? (
                        bibliotecaDecksNovos && (
                            <>
                            <MiniDeckHorizontal title={"Últimos Decks Postados"} decks={bibliotecaDecksNovos}/>
                            <MiniDeckHorizontal title={"Decks em alta"} decks={bibliotecaDecksNovos}/>
                            <MiniDeckHorizontal title={"Mais Bem Avaliados"} decks={bibliotecaDecksNovos}/>
                            </>
                        )
                    
                ) : (
                    <View className='items-center justify-center gap-8 mt-28 bg-slate-100 border border-slate-200 mx-4 p-8 shadow-lg rounded-2xl'>

                        <FontAwesome5 name='sad-tear' size={74} color={"#f43f5e"}  />

                        <View className='items-center'>
                            <Text className='text-3xl font-poppinsBold text-slate-700'>Puxa!</Text>
                            <Text className='text-lg font-bold text-slate-400'>Parece que você não está conectado.</Text>
                        </View>

                        <TouchableOpacity className='rounded-full border border-primary-300 bg-primary-50 py-2 px-8 '>
                            <Text className='text-lg text-primary-600 font-bold'>Tentar conectar</Text>
                        </TouchableOpacity>
                    </View>
                )
                }





            </ScrollView>
        </View>
    );
}
