import { useStudySoloSession } from '@/src/context/StudySoloSession';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ConfigurarSessaoProps { }

export default function ConfigurarSessao() {

    const insets = useSafeAreaInsets();

    const { proximoStep, voltarStep, modoEstudo, setModoEstudo, ordemEstudo, setOrdemEstudo, quantidadeCards, handleQuantidade } = useStudySoloSession();

    const podeContinuar = quantidadeCards > 0;


    const modoEstudoSelecao = [
        {
            title: 'Revisão',
            valor: 'revisao',
            icon: 'refresh',
            description: 'Revise o que já aprendeu'
        },
        {
            title: 'Aprendizado',
            valor: 'aprendizado',
            icon: 'school',
            description: 'Aprenda novos conteúdos'
        },
        {
            title: 'Aleatório',
            valor: 'aleatorio',
            icon: 'shuffle',
            description: 'Uma mistura dos seus cards'
        }
    ];

    const ordemSelecao = [
        {
            title: 'Aleatório',
            valor: 'aleatorio',
            icon: 'shuffle'
        },
        {
            title: 'Sequencial',
            valor: 'sequencial',
            icon: 'format-list-numbered'
        }
    ];

    return (
        <ScrollView>
            <View
                className="flex-1 bg-primary-100"
                style={{
                    paddingTop: insets.top
                }}
            >

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <View className="px-5 pt-4 pb-6">

                    <View className="flex-row items-center justify-between">

                        <TouchableOpacity
                            onPress={() => router.back()}
                            activeOpacity={0.8}
                            className="w-11 h-11 rounded-full bg-white border border-slate-200 items-center justify-center"
                        >
                            <MaterialIcons
                                name="arrow-back-ios-new"
                                size={17}
                                color="#64748b"
                            />
                        </TouchableOpacity>

                        <View className="items-end">

                            <Text className="text-xs font-bold text-indigo-500 tracking-widest">
                                PREPARAR
                            </Text>

                            <Text className="text-slate-400 font-bold">
                                ETAPA 02 / 03
                            </Text>

                        </View>

                    </View>


                    <View className="mt-6">

                        <Text className="text-slate-800 text-3xl font-poppinsBold">
                            Configure sua sessão
                        </Text>

                        <Text className="text-slate-500 text-base mt-1">
                            Defina como será sua partida de estudos.
                        </Text>

                    </View>

                </View>


                {/* ================================================= */}
                {/* CONTEÚDO */}
                {/* ================================================= */}

                <View className="flex-1 bg-slate-50 rounded-t-[32px] overflow-hidden">

                    <View className="px-5 pt-6 gap-5">


                        {/* ================================================= */}
                        {/* QUANTIDADE */}
                        {/* ================================================= */}

                        <View className="rounded-3xl overflow-hidden p-5">

                            <LinearGradient
                                colors={['#6366f1', '#4338ca']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                style={StyleSheet.absoluteFill}
                            />

                            <View className="flex-row items-center justify-between">

                                <View>

                                    <Text className="text-indigo-200 text-xs font-bold tracking-widest">TAMANHO DA SESSÃO</Text>

                                    <Text className="text-white text-xl font-poppinsBold mt-1">Quantidade de cartas</Text>

                                </View>

                                <View className="bg-white/15 w-11 h-11 rounded-full items-center justify-center">

                                    <MaterialIcons name="style" size={22} color="#fff" />

                                </View>

                            </View>


                            {/* CONTROLE */}

                            <View className="flex-row items-center justify-center mt-6">

                                <TouchableOpacity
                                    onPress={() => handleQuantidade(-10)}
                                    activeOpacity={0.8}
                                    className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 items-center justify-center"
                                >
                                    <Text className="text-white font-bold">
                                        -10
                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    onPress={() => handleQuantidade(-1)}
                                    activeOpacity={0.8}
                                    className="w-12 h-12 rounded-xl bg-orange-500 items-center justify-center ml-2"
                                >
                                    <MaterialIcons name="remove" size={22} color="#fff" />
                                </TouchableOpacity>


                                <View className="mx-3 w-24 h-20 rounded-2xl bg-white items-center justify-center">

                                    <Text className="text-indigo-600 text-3xl font-poppinsBold">
                                        {quantidadeCards}
                                    </Text>

                                    <Text className="text-slate-400 text-[10px] font-bold tracking-widest">
                                        CARTAS
                                    </Text>

                                </View>


                                <TouchableOpacity
                                    onPress={() => handleQuantidade(1)}
                                    activeOpacity={0.8}
                                    className="w-12 h-12 rounded-xl bg-orange-500 items-center justify-center mr-2"
                                >
                                    <MaterialIcons name="add" size={22} color="#fff" />
                                </TouchableOpacity>


                                <TouchableOpacity
                                    onPress={() => handleQuantidade(10)}
                                    activeOpacity={0.8}
                                    className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 items-center justify-center"
                                >
                                    <Text className="text-white font-bold">
                                        +10
                                    </Text>
                                </TouchableOpacity>

                            </View>


                        </View>


                        {/* ================================================= */}
                        {/* MODO DE ESTUDO */}
                        {/* ================================================= */}

                        <View>

                            <View className="flex-row items-center justify-between mb-3">

                                <View>

                                    <Text className="text-slate-800 text-xl font-poppinsBold">
                                        Modo de estudo
                                    </Text>

                                    <Text className="text-slate-400 text-sm">
                                        Como você quer estudar?
                                    </Text>

                                </View>

                                <MaterialIcons name="psychology" size={23} color="#6366f1" />

                            </View>


                            <View className="gap-2">

                                {modoEstudoSelecao.map(item => {

                                    const selecionado =
                                        modoEstudo === item.valor;

                                    return (

                                        <TouchableOpacity
                                            key={item.valor}
                                            activeOpacity={0.85}
                                            onPress={() =>
                                                setModoEstudo(item.valor)
                                            }
                                            className={`
                                            rounded-2xl p-4
                                            flex-row items-center
                                            border-2
                                            ${selecionado
                                                    ? 'bg-indigo-50 border-indigo-500'
                                                    : 'bg-white border-slate-200'
                                                }
                                        `}
                                        >

                                            {/* ÍCONE */}

                                            <View
                                                className={`
                                                w-11 h-11 rounded-xl
                                                items-center justify-center
                                                ${selecionado
                                                        ? 'bg-indigo-500'
                                                        : 'bg-slate-100'
                                                    }
                                            `}
                                            >

                                                <MaterialIcons
                                                    name={item.icon as any} size={21}
                                                    color={
                                                        selecionado
                                                            ? '#fff'
                                                            : '#94a3b8'
                                                    }
                                                />

                                            </View>


                                            {/* TEXTO */}

                                            <View className="flex-1 ml-3">

                                                <Text
                                                    className={`
                                                    font-poppinsBold text-base
                                                    ${selecionado
                                                            ? 'text-indigo-600'
                                                            : 'text-slate-700'
                                                        }
                                                `}
                                                >
                                                    {item.title}
                                                </Text>

                                                <Text className="text-xs text-slate-400 mt-0.5">
                                                    {item.description}
                                                </Text>

                                            </View>


                                            {/* CHECK */}

                                            <View
                                                className={`
                                                w-6 h-6 rounded-full
                                                items-center justify-center
                                                ${selecionado
                                                        ? 'bg-orange-500'
                                                        : 'border-2 border-slate-200'
                                                    }
                                            `}
                                            >

                                                {selecionado && (
                                                    <MaterialIcons
                                                        name="check"
                                                        size={15}
                                                        color="#fff"
                                                    />
                                                )}

                                            </View>

                                        </TouchableOpacity>

                                    );

                                })}

                            </View>

                        </View>


                        {/* ================================================= */}
                        {/* ORDEM */}
                        {/* ================================================= */}

                        <View>

                            <View className="flex-row items-center justify-between mb-3">

                                <View>

                                    <Text className="text-slate-800 text-xl font-poppinsBold">
                                        Ordem das cartas
                                    </Text>

                                    <Text className="text-slate-400 text-sm">
                                        Escolha como elas aparecerão.
                                    </Text>

                                </View>

                                <MaterialIcons
                                    name="sort"
                                    size={23}
                                    color="#6366f1"
                                />

                            </View>


                            <View className="flex-row gap-3">

                                {ordemSelecao.map(item => {

                                    const selecionado =
                                        ordemEstudo === item.valor;

                                    return (

                                        <TouchableOpacity
                                            key={item.valor}
                                            activeOpacity={0.85}
                                            onPress={() =>
                                                setOrdemEstudo(item.valor)
                                            }
                                            className={`
                                            flex-1
                                            rounded-2xl
                                            p-4
                                            border-2
                                            items-center
                                            ${selecionado
                                                    ? 'bg-indigo-50 border-indigo-500'
                                                    : 'bg-white border-slate-200'
                                                }
                                        `}
                                        >

                                            <View
                                                className={`
                                                w-12 h-12
                                                rounded-2xl
                                                items-center justify-center
                                                ${selecionado
                                                        ? 'bg-indigo-500'
                                                        : 'bg-slate-100'
                                                    }
                                            `}
                                            >

                                                <MaterialIcons
                                                    name={item.icon as any}
                                                    size={23}
                                                    color={
                                                        selecionado
                                                            ? '#fff'
                                                            : '#94a3b8'
                                                    }
                                                />

                                            </View>


                                            <Text
                                                className={`
                                                mt-3
                                                font-poppinsBold
                                                ${selecionado
                                                        ? 'text-indigo-600'
                                                        : 'text-slate-600'
                                                    }
                                            `}
                                            >
                                                {item.title}
                                            </Text>


                                            {selecionado && (

                                                <View className="absolute top-3 right-3">

                                                    <MaterialIcons
                                                        name="check-circle"
                                                        size={18}
                                                        color="#f97316"
                                                    />

                                                </View>

                                            )}

                                        </TouchableOpacity>

                                    );

                                })}

                            </View>

                        </View>

                    </View>


                    {/* ================================================= */}
                    {/* BOTÃO */}
                    {/* ================================================= */}

                    <View
                        className="mt-auto px-5 pt-4 bg-slate-50 flex-row gap-2"
                        style={{
                            paddingBottom: insets.bottom + 12
                        }}
                    >
                        <TouchableOpacity 
                            onPress={voltarStep}
                            className='h-16 items-center justify-center bg-white border border-slate-200 rounded-2xl w-2/12'>
                            <MaterialIcons name='arrow-back' size={22}  />
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={!podeContinuar}
                            activeOpacity={0.85}
                            onPress={() => {
                                proximoStep()
                            }}
                            className={`
                            h-16
                            flex-1
                            rounded-2xl
                            flex-row
                            items-center
                            justify-center
                            ${podeContinuar
                                    ? 'bg-indigo-600'
                                    : 'bg-slate-300'
                                }
                        `}
                        >

                            <Text className="text-white text-lg font-poppinsBold">
                                Continuar
                            </Text>

                            <MaterialIcons
                                name="arrow-forward"
                                size={22}
                                color="#fff"
                                style={{
                                    marginLeft: 8
                                }}
                            />

                        </TouchableOpacity>

                    </View>

                </View>




            </View>
        </ScrollView>
    );
}
