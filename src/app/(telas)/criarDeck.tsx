import CardCover from '@/src/components/cardCover';
import HeaderStack from '@/src/components/headerStack';
import { Theme, THEMES } from '@/themes-config';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BaralhoService } from '../Services/BaralhoService';
import { router } from 'expo-router';

const tamanhoCard = (Dimensions.get('window').width - 72) / 2;


export default function CriarDeck() {

    const [ titleDeck, setTitleDeck ] = useState("");
    const [ descricaoDeck, setDescricaoDeck ] = useState("");
    const [themeSelected, setThemeSelected] = useState<Theme>();
    const [nivelSelected, setNivelSelected ] = useState<"facil" | "medio" | "dificil">("facil");

    const [modalTema, setmodalTema] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const nivel = [
        {id: "facil", title: "Fácil"},
        {id: "medio", title: "Médio"},
        {id: "dificil", title: "Difícil"},
    ]

    async function handleCriarBaralho() {
        if(!titleDeck.trim()) return Alert.alert("Atenção", "Dê um nome ao seu baralho.")

        setIsLoading(true);

        try{
            const payLoad = {
                themeId: themeSelected?.id || 'default',
                title: titleDeck,
                details: descricaoDeck,
                level: nivelSelected,
            }


            await BaralhoService.Post(payLoad);

            Alert.alert("Seu Baralho foi criado!")
            setTitleDeck(""),
            setDescricaoDeck(""),
            setThemeSelected(undefined),

            router.back();

        } catch {
            Alert.alert("Erro", "Não foi possível conectar com o servior.")
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <View className='flex-1'>

            <ScrollView className='bg-primary-500'>

                <HeaderStack title='Criar Baralho' />

                <View className='bg-white rounded-2xl p-4 mx-6'>
                    <View className='rounded-xl overflow-hidden border border-primary-200' style={{ width: tamanhoCard, height: tamanhoCard + 40 }}>
                        <CardCover themeId={themeSelected?.id} />
                    </View>

                    <View className='py-4'>
                        <View className='py-2 gap-2'>
                            <Text className='text-slate-700 ml-2 font-bold'>Nome do Baralho:</Text>
                            <TextInput
                                className='border border-slate-200 bg-slate-50 rounded-xl py-4 px-2'
                                value={titleDeck}
                                onChangeText={setTitleDeck}
                            />
                        </View>
                        <View className='py-2 gap-2'>
                            <Text className='text-slate-700 ml-2 font-bold'>Descrição:</Text>
                            <TextInput
                                className='border border-slate-200 bg-slate-50 rounded-xl py-4 px-2'
                                value={descricaoDeck}
                                onChangeText={setDescricaoDeck}
                                placeholder="Ex: Phrasal verbs e vocabulário"
                            />
                        </View>
                        <View className='py-2 gap-2'>
                            <Text className='text-slate-700 ml-2 font-bold'>Nível:</Text>
                            <View className='flex-row justify-between'>
                                {nivel.map((n) => (
                                    <TouchableOpacity 
                                        key={n.id}
                                        onPress={() => setNivelSelected(n.id as "facil" | "medio" | "dificil")}
                                        style={{
                                            width: tamanhoCard / 2, 
                                            height: tamanhoCard / 2,
                                            backgroundColor: nivelSelected === n.id ? "#eef2ff"  : "#f8fafc" ,
                                            borderColor: nivelSelected === n.id ? "#6366f1"  : "#e2e8f0" ,
                                        }} 
                                        className='items-center justify-center rounded-xl border' 
                                    >
                                        <Text  style={{color: nivelSelected === n.id ? "#6366f1" : "#64748b" }} className='text-sm font-bold'>{n.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View className='py-2 gap-2'>
                            <Text className='text-slate-700 ml-2 font-bold'>Escolha um Tema:</Text>
                            <TouchableOpacity onPress={() => setmodalTema(!modalTema)} className='items-center py-2 px-2 bg-slate-50 rounded-xl border border-slate-200 flex-row' >
                                <Text className='flex-1'>{themeSelected?.title}</Text>
                                <View className='bg-slate-200 p-2 rounded-lg self-end'>
                                    <MaterialIcons name='keyboard-arrow-down' size={18} color={"#334155"} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleCriarBaralho} className='bg-primary-500 py-4 rounded-xl mt-4'>
                            <Text className='font-poppinsBold text-xl text-white text-center'>Criar</Text>
                        </TouchableOpacity>

                    </View>

                </View>


            </ScrollView>



            {modalTema && (
                <View className='absolute bottom-0 h-1/2 overflow-y-scroll z-20 w-full bg-slate-100 rounded-t-3xl border border-slate-200'>
                    <View className='py-2 border-b border-slate-200 justify-between px-4 items-end flex-row'>
                        <Text className='self-center font-bold'>Selecione o Tema</Text>
                        <TouchableOpacity onPress={() => setmodalTema(false)}>
                            <MaterialCommunityIcons name='close' size={24} />
                        </TouchableOpacity>
                    </View>

                    <View className='p-4 gap-2'>
                        {THEMES.map((t) => (
                            <TouchableOpacity onPress={() => [setThemeSelected(t), setmodalTema(false)]} key={t.id} className=' flex-row gap-6 items-center bg-white px-6 py-6 border border-slate-200 rounded-xl'>
                                <MaterialCommunityIcons name={t.icon} size={18} color={"#475569"}/>
                                <Text className='text-sm font-bold text-slate-600'>{t.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>
            )}

            {isLoading && (
                <View className='h-full w-full bg-white/60 absolute z-50 items-center gap-16 justify-center'>
                    <ActivityIndicator size={46} />
                    <Text className='text-xl font-poppinsBold'>Criando Baralho...</Text>
                </View>
            )}

        </View>
    );
}