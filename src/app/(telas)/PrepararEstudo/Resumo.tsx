import CalcularNivelDeck from '@/src/components/CalcularNivelDecks';
import CardCover from '@/src/components/cardCover';
import { deckProps } from '@/src/Services/BaralhoService';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ResumoSessaoProps {
    quantidadeCards: number;
    modoEstudo: string;
    ordemEstudo: string;
    decksEscolhidos: deckProps[];
}

export default function ResumoSessao() {

    const insets = useSafeAreaInsets();

    // TEMPORÁRIO
    // Depois estes dados devem vir do Context/Store da preparação.
    const quantidadeCards = 20;
    const modoEstudo = 'revisao';
    const ordemEstudo = 'aleatorio';

    // Exemplo temporário.
    const decksEscolhidos: deckProps[] = [];


    const formatarModo = (modo: string) => {
        const modos: Record<string, string> = {
            revisao: 'Revisão',
            aprendizado: 'Aprendizado',
            aleatorio: 'Aleatório'
        };

        return modos[modo] ?? modo;
    };


    const formatarOrdem = (ordem: string) => {
        const ordens: Record<string, string> = {
            aleatorio: 'Aleatória',
            sequencial: 'Sequencial'
        };

        return ordens[ordem] ?? ordem;
    };


    return (
        <View
            className="flex-1 bg-primary-100"
            style={{
                paddingTop: insets.top
            }}
        >

            {/* ============================================= */}
            {/* HEADER */}
            {/* ============================================= */}

            <View className="px-5 pt-4 pb-5">

                <View className="flex-row items-center justify-between">

                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.8}
                        className="w-11 h-11 rounded-full bg-white/80 border border-slate-300 items-center justify-center"
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
                            ETAPA 03 / 03
                        </Text>

                    </View>

                </View>


                <View className="mt-6">

                    <View className="flex-row items-center gap-2">

                        <View className="w-10 h-10 bg-primary-500 rounded-xl items-center justify-center">

                            <MaterialIcons
                                name="check"
                                size={23}
                                color="#fff"
                            />

                        </View>

                        <View>

                            <Text className="text-slate-700 text-3xl font-poppinsBold">
                                Tudo pronto!
                            </Text>

                            <Text className="text-slate-400 text-base">
                                Sua sessão está preparada
                            </Text>

                        </View>

                    </View>

                </View>

            </View>


            {/* ============================================= */}
            {/* CONTEÚDO */}
            {/* ============================================= */}

            <View className="flex-1 bg-slate-50 rounded-t-[32px] px-5 pt-6">


                {/* ========================================= */}
                {/* DECKS */}
                {/* ========================================= */}

                <View className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

                    {/* Header do card */}

                    <View className="flex-row items-center justify-between px-5 pt-5">

                        <View>

                            <Text className="text-slate-800 text-xl font-poppinsBold">
                                Seus decks
                            </Text>

                            <Text className="text-slate-400 text-sm mt-1">
                                {decksEscolhidos.length} selecionado
                                {decksEscolhidos.length !== 1 ? 's' : ''}
                            </Text>

                        </View>


                        <View className="w-10 h-10 rounded-xl bg-primary-50 items-center justify-center">

                            <MaterialIcons
                                name="collections-bookmark"
                                size={21}
                                color="#6366f1"
                            />

                        </View>

                    </View>


                    <View className="h-[1px] bg-slate-100 mx-5 my-4" />


                    {/* Lista */}

                    {decksEscolhidos.length > 0 ? (

                        <View className="px-5 pb-5 gap-3">

                            {decksEscolhidos.map((deck) => (

                                <View
                                    key={deck.id}
                                    className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl p-3"
                                >

                                    {/* Capa */}

                                    <View className="w-14 h-14 rounded-xl overflow-hidden">

                                        <CardCover
                                            themeId={deck.themeId}
                                        />

                                    </View>


                                    {/* Informações */}

                                    <View className="flex-1 ml-3">

                                        <Text
                                            numberOfLines={1}
                                            className="text-slate-700 font-poppinsBold"
                                        >
                                            {deck.title}
                                        </Text>

                                        <View className="flex-row items-center mt-1">

                                            <CalcularNivelDeck
                                                nivel={deck.level}
                                                size={10}
                                            />

                                            <Text className="text-xs text-slate-400 ml-2">
                                                {deck.details}
                                            </Text>

                                        </View>

                                    </View>


                                    <MaterialIcons
                                        name="check-circle"
                                        size={20}
                                        color="#6366f1"
                                    />

                                </View>

                            ))}

                        </View>

                    ) : (

                        <View className="px-5 pb-6 items-center">

                            <View className="w-12 h-12 bg-slate-100 rounded-full items-center justify-center">

                                <MaterialIcons
                                    name="style"
                                    size={24}
                                    color="#94a3b8"
                                />

                            </View>

                            <Text className="text-slate-400 mt-3">
                                Nenhum deck selecionado
                            </Text>

                        </View>

                    )}

                </View>


                {/* ========================================= */}
                {/* CONFIGURAÇÕES */}
                {/* ========================================= */}

                <View className="bg-white rounded-3xl border border-slate-200 mt-4 p-5">

                    <View className="flex-row items-center justify-between">

                        <View>

                            <Text className="text-slate-800 text-xl font-poppinsBold">
                                Configurações
                            </Text>

                            <Text className="text-slate-400 text-sm mt-1">
                                Confira os detalhes da sessão
                            </Text>

                        </View>

                        <View className="w-10 h-10 rounded-xl bg-orange-50 items-center justify-center">

                            <MaterialIcons
                                name="tune"
                                size={21}
                                color="#f97316"
                            />

                        </View>

                    </View>


                    <View className="h-[1px] bg-slate-100 my-4" />


                    {/* Quantidade */}

                    <View className="flex-row items-center justify-between">

                        <View className="flex-row items-center">

                            <View className="w-10 h-10 rounded-xl bg-primary-50 items-center justify-center">

                                <MaterialIcons
                                    name="style"
                                    size={20}
                                    color="#6366f1"
                                />

                            </View>

                            <View className="ml-3">

                                <Text className="text-slate-400 text-xs">
                                    QUANTIDADE
                                </Text>

                                <Text className="text-slate-700 font-bold">
                                    Cartas da sessão
                                </Text>

                            </View>

                        </View>

                        <Text className="text-primary-600 text-xl font-poppinsBold">
                            {quantidadeCards}
                        </Text>

                    </View>


                    {/* Modo */}

                    <View className="flex-row items-center justify-between mt-5">

                        <View className="flex-row items-center">

                            <View className="w-10 h-10 rounded-xl bg-primary-50 items-center justify-center">

                                <MaterialIcons
                                    name="school"
                                    size={20}
                                    color="#6366f1"
                                />

                            </View>

                            <View className="ml-3">

                                <Text className="text-slate-400 text-xs">
                                    MODO
                                </Text>

                                <Text className="text-slate-700 font-bold">
                                    Tipo de estudo
                                </Text>

                            </View>

                        </View>

                        <Text className="text-primary-600 font-poppinsBold">
                            {formatarModo(modoEstudo)}
                        </Text>

                    </View>


                    {/* Ordem */}

                    <View className="flex-row items-center justify-between mt-5">

                        <View className="flex-row items-center">

                            <View className="w-10 h-10 rounded-xl bg-primary-50 items-center justify-center">

                                <MaterialIcons
                                    name="shuffle"
                                    size={20}
                                    color="#6366f1"
                                />

                            </View>

                            <View className="ml-3">

                                <Text className="text-slate-400 text-xs">
                                    ORDEM
                                </Text>

                                <Text className="text-slate-700 font-bold">
                                    Exibição dos cards
                                </Text>

                            </View>

                        </View>

                        <Text className="text-primary-600 font-poppinsBold">
                            {formatarOrdem(ordemEstudo)}
                        </Text>

                    </View>

                </View>


                {/* ========================================= */}
                {/* PRONTO PARA COMEÇAR */}
                {/* ========================================= */}

                <View className="rounded-3xl mt-4 p-5 overflow-hidden">
                    <LinearGradient
                        colors={['#6366f1', '#4338ca']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />

                        <View className="flex-row items-center">

                            <View className="w-12 h-12 bg-white/15 rounded-2xl items-center justify-center">

                                <MaterialIcons
                                    name="local-fire-department"
                                    size={27}
                                    color="#fff"
                                />

                            </View>

                            <View className="flex-1 ml-4">

                                <Text className="text-white text-lg font-poppinsBold">
                                    Pronto para começar?
                                </Text>

                                <Text className="text-indigo-100 text-sm mt-0.5">
                                    Boa sessão de estudos!
                                </Text>

                            </View>

                        </View>
                </View>


            </View>


            {/* ============================================= */}
            {/* FOOTER */}
            {/* ============================================= */}

            <View
                className="absolute bottom-0 w-full px-4 flex-row gap-3"
                style={{
                    paddingBottom: insets.bottom + 8
                }}
            >

                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.8}
                    className="w-16 bg-white border border-slate-300 rounded-2xl items-center justify-center"
                >

                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="#94a3b8"
                    />

                </TouchableOpacity>


                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        // Criar/Iniciar sessão aqui

                        console.log({
                            decksEscolhidos,
                            quantidadeCards,
                            modoEstudo,
                            ordemEstudo
                        });

                        // router.push('/(telas)/Arena/Solo')
                    }}
                    className="flex-1 bg-primary-500 py-5 rounded-2xl"
                >

                    <View className="flex-row items-center justify-center">

                        <Text className="text-white font-poppinsBold text-xl uppercase">
                            Começar sessão
                        </Text>

                        <MaterialIcons
                            name="arrow-forward"
                            size={23}
                            color="#fff"
                            style={{
                                marginLeft: 8
                            }}
                        />

                    </View>

                </TouchableOpacity>

            </View>

        </View>
    );
}
