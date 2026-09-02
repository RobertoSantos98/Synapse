import CalcularNivelDeck from '@/src/components/CalcularNivelDecks';
import CardCover from '@/src/components/cardCover';
import BaralhoService, { deckProps } from '@/src/Services/BaralhoService';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfigurarSessao from './configurarSessao';
import ResumoSessao from './Resumo';
import { StudySoloSessionProvider, useStudySoloSession } from '@/src/context/StudySoloSession';
import PrepararSessao from './PrepararSessao';


export default function PrepararEstudos() {
    
    
    return(
        <StudySoloSessionProvider>
            <Preparacao/>
        </StudySoloSessionProvider>
    )
    
}

function Preparacao(){


    const { step } = useStudySoloSession();


    if(step === 1 ) return <PrepararSessao/>

    if(step === 2 ) return <ConfigurarSessao/>

    return <ResumoSessao/>

}



