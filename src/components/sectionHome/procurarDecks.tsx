import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TitleHome from '../titleHome';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import BaralhoService, { deckProps } from '@/src/Services/BaralhoService';
import CardCover from '../cardCover';
import { router } from 'expo-router';
import UserService from '@/src/Services/UserService';
import { User } from '@/src/types/auth';
import { LinearGradient } from 'expo-linear-gradient';

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
        <View className='bg-primary-500 py-8 border-t border-b border-primary-600 my-2'>

            <View className='mx-4 p-2 bg-white rounded-3xl' style={{boxShadow: "2px 8px 8px rgba(0, 0, 0, 0.2)"}}> 
                <Image
                    source={require("../../Assets/img-heroComunity.jpg")}
                    style={{height: 160, width: "100%"}}
                    className='object-cover rounded-2xl'
                />
                <View className='mt-4 mb-2 px-4 gap-2 w-2/3 self-center '>
                    <Text className='text-xl font-poppinsBold text-center'>Decks da Comunidade</Text>
                    <Text className='text-center text-sm text-slate-600'>Explore e compartilhe baralhos criados por outros usuários</Text>
                    <TouchableOpacity className='overflow-hidden rounded-full mt-2 py-2 border border-primary-400 '
                        onPress={() => router.push('/(telas)/bibliotecaComunidade/bibliotecaComunidade')}
                    >
                        <LinearGradient
                            colors={["#6366f1", "#3b82f6"]}
                            style={StyleSheet.absoluteFill}
                            start={{x: 0, y: 1}}
                        />
                        <Text className='font-bold text-lg text-white text-center'>Clique Aqui</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
}


// export const RenderItemComunidadeDecks = (deck: deckProps) => {

//     const nivel: number = deck.level === "facil" ? 1 : deck.level === "medio" ? 2 : 3;

//     return (
//         <TouchableOpacity 
//             className='rounded-2xl p-1 bg-white border border-slate-200 overflow-hidden' 
//             style={{ width: tamanhoCard, boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.5)" }}
//             onPress={() => router.push(`/(telas)/biblioteca/${deck.id}`)}    
//         >
//             <View className='rounded-xl overflow-hidden h-36 border border-primary-200'>
//                 <CardCover themeId={deck.themeId} />
//             </View>

//             <View className='px-2 py-2'>
//                 <Text className='text-lg font-poppinsBold'>{deck.title}</Text>
//                 <Text className='text-sm text-slate-600'>{deck.details}</Text>
//             </View>

//             <View className='flex-row mb-2 mx-2'>
//                 <View className='flex-row gap-2 border border-slate-200 bg-primary-50 rounded-full py-1.5 px-2 items-center'>
//                     <Text className='text-xs font-bold text-slate-600 tracking-wide'>Nível</Text>
//                     <View className='flex-row gap-1'>
//                         {Array.from({ length: 3 }).map((_, index) => (
//                             <Fontisto name='fire' key={index} size={12} color={index <= nivel ? "#f59e0b" : "#c7d2fe"} />
//                         ))}
//                     </View>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     )
// }