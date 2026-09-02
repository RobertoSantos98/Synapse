import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function ConfigurarSessao() {
    const insets = useSafeAreaInsets()

    const [quantidadeCards, setQuantidadeCards] = useState<number>(0);
    const [modoEstudo, setModoEstudo] = useState<string>("revisao");
    const [ordemEstudo, setOrdemEstudo] = useState<string>("aleatorio");



    const podeContinuar = quantidadeCards > 0;



    const handleQuandidadeCardsSomar = (valor: number) => {
        setQuantidadeCards(quantidadeCards + valor);
    }

    const handleQuandidadeCardsDiminuir = (valor: number) => {
        if (valor > quantidadeCards) {
            setQuantidadeCards(0);
            return
        }
        setQuantidadeCards(quantidadeCards - valor);
    }


    const modoEstudoSelecao = [
        { title: "Revisão", valor: "revisao" },
        { title: "Aprendizado", valor: "aprendizado" },
        { title: "Aleatório", valor: "aleatorio" },
    ];

    const ordemSelecao = [
        { title: "Aleatório", valor: "aleatorio" },
        { title: "Sequencial", valor: "seuqencial" },
    ];


    return (
        <View
            className="flex-1 bg-primary-100"
            style={{
                paddingTop: insets.top
            }}
        >


            <View className="px-5 pt-4 pb-5">

                <View className="flex-row items-center justify-between">

                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.8}
                        className="w-11 h-11 rounded-full bg-white/80 border border-slate-400 items-center justify-center"
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

                    <Text className="text-slate-700 text-3xl font-poppinsBold">
                        Configure sua sessão
                    </Text>

                    <Text className="text-slate-400 text-base mt-1">
                        Escolha as definições dessa sessão.
                    </Text>

                </View>

            </View>

            <View className='gap-6'>

                <View className=' mx-4 px-4 py-4 rounded-2xl gap-4 border border-primary-800 overflow-hidden'>

                    {/* <LinearGradient
                        colors={["#475569", "#334155"]}
                        style={StyleSheet.absoluteFill}
                        start={{x: 0, y: 1}}
                        end={{x:1, y: 0.5}}
                    /> */}
                    <LinearGradient
                        colors={["#6366f1", "#3730a3"]}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 1, y: 0.5 }}
                    />


                    <Text className='text-white text-lg font-bold'>Quantidade de cartas: </Text>

                    <View className='items-center flex-row gap-2 justify-center'>

                        <TouchableOpacity onPress={() => handleQuandidadeCardsDiminuir(10)} className='bg-primary-400 h-16 w-16 rounded-xl items-center justify-center mr-2'>
                            <Text className='text-white font-poppinsBold text-xl'>- 10</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleQuandidadeCardsDiminuir(1)} className='bg-orange-500 h-14 w-14 rounded-xl items-center justify-center'>
                            <Text className='text-white font-poppinsBold text-2xl'>-</Text>
                        </TouchableOpacity>

                        <View className='bg-white h-14 w-14 rounded-xl items-center justify-center'>
                            <Text className='font-bold text-base'>{quantidadeCards}</Text>
                        </View>

                        <TouchableOpacity onPress={() => handleQuandidadeCardsSomar(1)} className='bg-orange-500 h-14 w-14 rounded-xl items-center justify-center'>
                            <Text className='text-white font-poppinsBold text-2xl'>+</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleQuandidadeCardsSomar(10)} className='bg-primary-400 h-16 w-16 rounded-xl items-center justify-center ml-2'>
                            <Text className='text-white font-poppinsBold text-xl'>+ 10</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='bg-white mx-4 px-4 py-4 rounded-2xl gap-4 border border-slate-300 overflow-hidden'>


                    <Text className='text-slate-800 font-bold text-lg'>Modo de Estudo: </Text>

                    <View className='gap-2'>
                        {modoEstudoSelecao.map((item) => (
                            <TouchableOpacity key={item.valor}
                                activeOpacity={0.8}
                                onPress={() => setModoEstudo(item.valor)}
                                className='flex-row gap-4 items-center p-4 rounded-xl'
                                style={{
                                    borderWidth: 1,
                                    borderColor: modoEstudo === item.valor ? "#f97316" : "#e0e7ff",
                                    backgroundColor: modoEstudo === item.valor ? "#eef2ff" : "#fff"

                                }}
                            >
                                {modoEstudo === item.valor ? (
                                    <View className='bg-orange-500 h-4 w-4 rounded-full border border-orange-700' />
                                ) : (
                                    <View className='bg-primary-100 h-4 w-4 rounded-full border border-primary-100' />
                                )
                                }
                                <Text className='font-bold text-slate-600'>{item.title}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>

                </View>

                <View className='bg-white mx-4 px-4 py-4 rounded-2xl gap-4 border border-slate-300 overflow-hidden'>
                    <Text className='text-slate-800 font-bold text-lg'>Ordem: </Text>

                    <View className='gap-2'>
                        {ordemSelecao.map((item) => (
                            <TouchableOpacity key={item.valor}
                                onPress={() => setOrdemEstudo(item.valor)}
                                className='flex-row gap-4 items-center p-4 rounded-xl'
                                style={{
                                    borderWidth: 1,
                                    borderColor: ordemEstudo === item.valor ? "#f97316" : "#e0e7ff",
                                    backgroundColor: ordemEstudo === item.valor ? "#eef2ff" : "#fff"
                                }}
                            >
                                {ordemEstudo === item.valor ? (
                                    <View className='bg-orange-500 h-4 w-4 rounded-full ' />
                                ) : (
                                    <View className='bg-primary-100 h-4 w-4 rounded-full ' />
                                )
                                }
                                <Text className='font-bold text-slate-600'>{item.title}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>

                </View>

                <View
                    className="px-5 pt-3 bg-primary-100"
                    style={{
                        paddingBottom: insets.bottom + 12
                    }}
                >

                    <TouchableOpacity
                        disabled={!podeContinuar}
                        activeOpacity={0.85}
                        onPress={() => {
                            // Próxima etapa

                        }}
                        className={`
                            h-16 rounded-2xl
                            flex-row items-center justify-center
                            ${podeContinuar
                                ? 'bg-indigo-500'
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
    );
}