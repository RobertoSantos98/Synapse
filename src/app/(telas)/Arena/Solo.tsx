import CircuitBackground from '@/src/Assets/circuitBackGround';
import HeaderStack from '@/src/components/headerStack';
import TelaCarregamento from '@/src/components/telaCarregamento';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const tamanhoCard = Dimensions.get('window').width - 48;

export default function PlaySolo() {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [mensagem, setMensagem] = useState("");
    const [percent, setPercent] = useState<number>(0);

    useEffect(() => {
        handleLoading();
    }, []);

    const handleLoading = async () => {
        setIsLoading(true);

        try {
            setPercent(0);

            setMensagem("Baixando seus Cards...");
            await handleSimularApi();

            setPercent(0);

            setMensagem("Farmando Aura...");
            await handleSimularApi();

            setPercent(0);

            setMensagem("Contando os Cards...");
            await handleSimularApi();

            setPercent(100);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSimularApi = (): Promise<void> => {
        return new Promise((resolve) => {

            const interval = setInterval(() => {

                setPercent((prev) => {

                    if (prev >= 100) {
                        clearInterval(interval);
                        resolve();
                        return 100;
                    }

                    return prev + 1;
                });

            }, 30);
        });
    };

    if (isLoading) {
        return (
            <TelaCarregamento
                mensagem={mensagem}
                percent={percent}
            />
        );
    }

    const cards = {
        id: "1",
        deckId: "235452",
        question: "O que é o Javascript?",
        answer: "Uma linguagem usada tanto no front quanto no Back-End",
        wrongAnswer: "Uma linguagem de marcação usada nos aplicativos mobiles junto com .Net."
    };

    return (
        <View className="flex-1">

            <CircuitBackground />

            <View className="flex-1">

                <HeaderStack title="Player Solo" />

                <View className="flex-1 px-6">

                    {/* STATUS DA PARTIDA */}
                    <View className="flex-row items-center justify-between mt-4 mb-5">

                        <View>
                            <Text className="text-indigo-200 text-xs font-poppinsBold">
                                PROGRESSO
                            </Text>

                            <Text className="text-white text-lg font-poppinsBold">
                                Card 01 / 10
                            </Text>
                        </View>

                        <View className="flex-row items-center bg-indigo-950/80 border border-indigo-400/40 px-4 py-2 rounded-full">
                            <Text className="text-yellow-300 text-base mr-1">
                                ✦
                            </Text>

                            <Text className="text-indigo-100 font-poppinsBold">
                                120 Aura
                            </Text>
                        </View>

                    </View>

                    {/* PROGRESSO */}
                    <View className="h-1.5 bg-indigo-950 rounded-full overflow-hidden mb-7">

                        <LinearGradient
                            colors={["#818cf8", "#c084fc"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                width: '10%',
                                height: '100%',
                            }}
                        />

                    </View>

                    {/* CARD */}
                    <View
                        style={[
                            styles.card,
                            {
                                width: tamanhoCard,
                                height: tamanhoCard,
                            }
                        ]}
                    >

                        <LinearGradient
                            colors={[
                                "rgba(255,255,255,0.98)",
                                "rgba(238,242,255,0.98)"
                            ]}
                            style={StyleSheet.absoluteFill}
                        />

                        {/* LABEL */}
                        <View className="absolute top-5 left-5 bg-indigo-100 px-3 py-1 rounded-full">
                            <Text className="text-indigo-700 text-xs font-poppinsBold">
                                PERGUNTA
                            </Text>
                        </View>

                        {/* NÚMERO */}
                        <View className="absolute top-5 right-5">
                            <Text className="text-indigo-200 text-5xl font-poppinsBold">
                                01
                            </Text>
                        </View>

                        {/* CONTEÚDO */}
                        <View className="flex-1 items-center justify-center px-8">

                            <Text className="text-indigo-500 text-sm font-poppinsBold mb-4">
                                JAVASCRIPT
                            </Text>

                            <Text
                                className="text-indigo-950 text-3xl text-center font-poppinsBold"
                            >
                                {cards.question}
                            </Text>

                            <View className="w-12 h-1 bg-indigo-500 rounded-full mt-6 mb-5" />

                            <Text className="text-gray-400 text-sm text-center font-poppins">
                                Você sabe a resposta?
                            </Text>

                        </View>

                    </View>

                    {/* DIFICULDADE */}
                    <View className="mt-7">

                        <Text className="text-indigo-200 text-xs font-poppinsBold mb-3">
                            NÍVEL DE DIFICULDADE
                        </Text>

                        <View className="flex-row gap-3">

                            {/* FÁCIL */}
                            <TouchableOpacity
                                activeOpacity={0.75}
                                className="flex-1 bg-indigo-950/80 border border-green-400/40 rounded-2xl py-3 items-center"
                            >
                                <Text className="text-green-400 text-lg font-poppinsBold">
                                    ✓
                                </Text>

                                <Text className="text-green-300 font-poppinsBold">
                                    Fácil
                                </Text>

                                <Text className="text-indigo-300 text-xs mt-1">
                                    +10 Aura
                                </Text>
                            </TouchableOpacity>

                            {/* MÉDIO */}
                            <TouchableOpacity
                                activeOpacity={0.75}
                                className="flex-1 bg-indigo-950/80 border border-yellow-400/40 rounded-2xl py-3 items-center"
                            >
                                <Text className="text-yellow-400 text-lg font-poppinsBold">
                                    ~
                                </Text>

                                <Text className="text-yellow-300 font-poppinsBold">
                                    Médio
                                </Text>

                                <Text className="text-indigo-300 text-xs mt-1">
                                    +20 Aura
                                </Text>
                            </TouchableOpacity>

                            {/* DIFÍCIL */}
                            <TouchableOpacity
                                activeOpacity={0.75}
                                className="flex-1 bg-indigo-950/80 border border-red-400/40 rounded-2xl py-3 items-center"
                            >
                                <Text className="text-red-400 text-lg font-poppinsBold">
                                    !
                                </Text>

                                <Text className="text-red-300 font-poppinsBold">
                                    Difícil
                                </Text>

                                <Text className="text-indigo-300 text-xs mt-1">
                                    +30 Aura
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                    {/* ESPAÇAMENTO */}
                    <View className="flex-1" />

                    {/* VIRAR */}
                    <View className="pb-6 pt-5">

                        <TouchableOpacity
                            activeOpacity={0.85}
                            className="h-16 rounded-2xl overflow-hidden"
                        >

                            <LinearGradient
                                colors={["#818cf8", "#6366f1", "#4338ca"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={StyleSheet.absoluteFill}
                            />

                            <View className="flex-1 flex-row items-center justify-center">

                                <Text className="text-white text-xl font-poppinsBold">
                                    Virar
                                </Text>

                                <Text className="text-white text-xl ml-3">
                                    ↻
                                </Text>

                            </View>

                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        overflow: 'hidden',
        borderRadius: 24,

        borderWidth: 1,
        borderColor: 'rgba(199, 210, 254, 0.8)',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,

        elevation: 10,
    },
});