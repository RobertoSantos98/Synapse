import BackGroundLightHome from '@/src/Assets/backGround-lightHome';
import { cardShortHomeProps } from '@/src/components/cardShortHome';
import ContinuarEstudando from '@/src/components/sectionHome/continuarEstudando';
import DashBoard from '@/src/components/sectionHome/dashboard';
import DecksAmigos from '@/src/components/sectionHome/decksAmigos';
import MinhaBiblioteca from '@/src/components/sectionHome/minhaBiblioteca';
import ProcurarDecks from '@/src/components/sectionHome/procurarDecks';
import { useAuth } from '@/src/context/AuthContext';
import UserService from '@/src/Services/UserService';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {

    const insets = useSafeAreaInsets();

    const ofensivaDiaria = 5;
    const cardsParaRevisarHoje = 24;
    const tempoEstimado = 8;

    const cardsRevisadosHoje = 10;
    const [metaDiariaCards, setMetaDiariaCards] = useState<number>(0);

    const porcentagemProgresso = Math.min(
        Math.round((cardsRevisadosHoje / metaDiariaCards) * 100),
        100
    )

    const continuarEstudando: cardShortHomeProps[] = [
        { id: 1, themeId: 'math', title: "Matemática", detalhes: "Estudo da escola", nivel: "medio", concluido: 40 },
        { id: 2, themeId: 'languages', title: "Inglês", detalhes: "Estudo da escola 2", nivel: "facil", concluido: 20 },
        { id: 3, themeId: 'languages', title: "Inglês", detalhes: "Estudo da escola 3", nivel: "medio", concluido: 80 },
        { id: 4, themeId: 'tech', title: "Informática", detalhes: "Estudo da faculdade", nivel: "medio", concluido: 60 },
        { id: 5, themeId: 'science', title: "Ciências", detalhes: "Estudo para erudição pessoal", nivel: "dificil", concluido: 10 },

    ]

    return (
        <View style={{ flex: 1 }}>


            <ScrollView>
                <BackGroundLightHome />

                <View style={{ paddingTop: insets.top }} />

                <HandleHomeLoading setMetaDiaria={setMetaDiariaCards} />

                <View className="flex-row justify-between items-center px-6 pt-2 pb-4">
                    <View className="flex-1">
                        <Text className="text-4xl text-slate-900 tracking-wide">
                            Olá,{" "}
                            <Text className="text-primary-500 font-jaro">
                                Raphael!
                            </Text>
                        </Text>

                        <Text className="text-sm text-slate-500 font-medium mt-1">
                            Pronto para avançar hoje?
                        </Text>
                    </View>


                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="rounded-full bg-white shadow-md p-3 border border-slate-200"
                    >
                        <Ionicons
                            name="settings-sharp"
                            size={20}
                            color="#64748b"
                        />
                    </TouchableOpacity>
                </View>


                <View className="mx-6 my-4 rounded-3xl overflow-hidden shadow-primary">
                    <LinearGradient
                        colors={["#4338ca", "#3730a3", "#312e81"]}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />

                    <View className="p-5 gap-5">

                        {/* Topo */}
                        <View className="flex-row justify-between items-start">

                            <View>
                                <Text className="text-indigo-200 text-xs font-semibold uppercase tracking-wider">
                                    Missão de hoje
                                </Text>

                                <Text className="text-white text-2xl font-bold mt-1">
                                    {cardsRevisadosHoje}/{metaDiariaCards} cartas
                                </Text>

                                <Text className="text-indigo-200 text-sm mt-1">
                                    Continue avançando no seu objetivo
                                </Text>
                            </View>

                            {/* Ofensiva */}
                            <View className="flex-row items-center bg-orange-400/15 px-3 py-2 rounded-full">
                                <AntDesign
                                    name="fire"
                                    size={15}
                                    color="#f59e0b"
                                />

                                <Text className="text-orange-300 font-bold ml-1">
                                    {ofensivaDiaria}
                                </Text>
                            </View>

                        </View>

                        {/* Progresso */}
                        <View className="gap-2">

                            <View className="flex-row justify-between">
                                <Text className="text-indigo-100 text-sm">
                                    Progresso diário
                                </Text>

                                <Text className="text-white text-sm font-bold">
                                    {porcentagemProgresso}%
                                </Text>
                            </View>

                            <View className="h-2.5 bg-indigo-950/60 rounded-full overflow-hidden">
                                <View
                                    className="h-full bg-orange-500 rounded-full"
                                    style={{
                                        width: `${porcentagemProgresso}%`
                                    }}
                                />
                            </View>

                        </View>

                        <View className="flex-row gap-3">

                            <View className="flex-1 bg-white/10 rounded-2xl p-3">
                                <Text className="text-indigo-200 text-xs">
                                    Restantes
                                </Text>

                                <Text className="text-white text-lg font-bold mt-1">
                                    {Math.max(metaDiariaCards - cardsRevisadosHoje, 0)} cartas
                                </Text>
                            </View>

                            <View className="flex-1 bg-white/10 rounded-2xl p-3">
                                <Text className="text-indigo-200 text-xs">
                                    Tempo estimado
                                </Text>

                                <Text className="text-white text-lg font-bold mt-1">
                                    ~{tempoEstimado} min
                                </Text>
                            </View>

                        </View>

                        <View className="flex-row items-center gap-2">

                            <Text className="text-indigo-100 text-sm flex-1">
                                Mais{" "}
                                <Text className="text-white font-bold">
                                    {Math.max(metaDiariaCards - cardsRevisadosHoje, 0)} cartas
                                </Text>
                                {" "}e a missão de hoje está completa.
                            </Text>
                        </View>

                    </View>
                </View>

                <ContinuarEstudando continuarEstudando={continuarEstudando} />

                <MinhaBiblioteca />

                <ProcurarDecks />

                <DecksAmigos />

                <DashBoard />



                <View style={{ paddingBottom: 120 }} />
            </ScrollView>


        </View>

    );
}


type HandleHomeLoadingProps = {
    setMetaDiaria: (number: number) => void
}

function HandleHomeLoading({setMetaDiaria} : HandleHomeLoadingProps) {

    const { user } = useAuth();

    const [statusOnline, setStatusOnline] = useState<boolean>(false);
    const [tentandoConectar, setTentandoConectar] = useState<boolean>(true);

    useEffect(() => {
        handleLoading()
    }, [])

    const handleLoading = async () => {
        try {
            if(user){
                const response = await UserService.GetUserById(user?.id);
                setMetaDiaria(response.metaDiaria);
                setStatusOnline(true);

                console.log("Usuario Atualizado: ", user)
            }
        } catch (error: any) {
            Alert.alert("Erro! Tente Novamente", error.message)
            
        } finally{
            setTentandoConectar(false);
            console.log(tentandoConectar)
        }
    }


    return (
        <View className='justify-center mx-4 my-2 items-end'>
            <View className='flex-row'>
                <Text className='text-slate-400 text-sm font-bold'>Status: </Text>
                <TouchableOpacity 
                    className='px-2'
                    onPress={handleLoading}
                    disabled={statusOnline}   
                >
                    {tentandoConectar ?
                        <ActivityIndicator color={"#6366f1"} /> :
                        <Text
                            className='text-base font-bold'
                            style={{
                                color: statusOnline ? "#22c55e" : "#ef4444"
                            }}>{statusOnline ? "Conectado" : "Offline"}</Text>
                    }
                </TouchableOpacity>
            </View>
            {!statusOnline && !tentandoConectar &&(
                <Text className='text-xs text-slate-400'>Clique para tentar novamente</Text>
            )}
        </View>
    )
}