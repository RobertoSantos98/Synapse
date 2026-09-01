import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function ConfigurarSessao() {
    const insets = useSafeAreaInsets()

    const [quantidadeCards, setQuantidadeCards] = useState<number>(0);
    const [modoEstudo, setModoEstudo] = useState<string>("revisao");
    const [ordemEstudo, setOrdemEstudo] = useState<string>("aleatorio");






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
            className="flex-1 bg-primary-950"
            style={{
                paddingTop: insets.top
            }}
        >


            <View className="px-5 pt-4 pb-5">

                <View className="flex-row items-center justify-between">

                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.8}
                        className="w-11 h-11 rounded-full bg-white/10 border border-white/10 items-center justify-center"
                    >
                        <MaterialIcons
                            name="arrow-back-ios-new"
                            size={17}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    <View className="items-end">
                        <Text className="text-xs font-bold text-indigo-300 tracking-widest">
                            PREPARAR
                        </Text>

                        <Text className="text-white font-bold">
                            ETAPA 02 / 03
                        </Text>
                    </View>

                </View>

                <View className="mt-6">

                    <Text className="text-white text-3xl font-poppinsBold">
                        Configure sua sessão
                    </Text>

                    <Text className="text-slate-400 text-base mt-1">
                        Escolha as definições dessa sessão.
                    </Text>

                </View>

            </View>

            <View className='gap-6'>

                <View className='bg-primary-500 mx-4 px-4 py-4 rounded-2xl gap-4 border border-primary-300'>
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

                <View className='bg-primary-500 mx-4 px-4 py-4 rounded-2xl gap-4 border border-primary-300'>
                    <Text className='text-white font-bold text-lg'>Modo de Estudo: </Text>

                    <View className='gap-2'>
                        {modoEstudoSelecao.map((item) => (
                            <TouchableOpacity key={item.valor}
                                onPress={() => setModoEstudo(item.valor)}
                                className='flex-row gap-4 items-center p-4 rounded-xl'
                                style={{
                                    borderWidth: 1,
                                    borderColor: modoEstudo === item.valor ? "#f97316" : "#4f46e5",
                                }}
                            >
                                {modoEstudo === item.valor ? (
                                        <View className='bg-orange-500 h-4 w-4 rounded-full ' />
                                    ) : (
                                        <View className='bg-primary-100 h-4 w-4 rounded-full ' />
                                    )
                                }
                                <Text className='font-bold text-primary-100'>{item.title}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>

                </View>
                
                <View className='bg-primary-500 mx-4 px-4 py-4 rounded-2xl gap-4 border border-primary-300'>
                    <Text className='text-white font-bold text-lg'>Ordem: </Text>

                    <View className='gap-2'>
                        {ordemSelecao.map((item) => (
                            <TouchableOpacity key={item.valor}
                                onPress={() => setOrdemEstudo(item.valor)}
                                className='flex-row gap-4 items-center p-4 rounded-xl'
                                style={{
                                    borderWidth: 1,
                                    borderColor: ordemEstudo === item.valor ? "#f97316" : "#4f46e5",
                                }}
                            >
                                {ordemEstudo === item.valor ? (
                                        <View className='bg-orange-500 h-4 w-4 rounded-full ' />
                                    ) : (
                                        <View className='bg-primary-100 h-4 w-4 rounded-full ' />
                                    )
                                }
                                <Text className='font-bold text-primary-100'>{item.title}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>

                </View>

            </View>

        </View>
    );
}