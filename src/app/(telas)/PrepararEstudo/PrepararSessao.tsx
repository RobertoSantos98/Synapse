import CardCover from "@/src/components/cardCover";
import { useStudySoloSession } from "@/src/context/StudySoloSession";
import BaralhoService, { deckProps } from "@/src/Services/BaralhoService";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const CARD_WIDTH = Dimensions.get('window').width * 0.78;


export default function PrepararSessao() {


    const insets = useSafeAreaInsets();

    const { decksEscolhidos, adicionarDeck, removerDeck, proximoStep } = useStudySoloSession();
    const [decksBiblioteca, setDecksBiblioteca] = useState<deckProps[]>([]);
    const [busca, setBusca] = useState('');

    const handleDecksBiblioteca = async () => {
        try {
            const result = await BaralhoService.GetDeck();
            setDecksBiblioteca(result);
        } catch (error) {
            console.log('Erro ao carregar decks:', error);
        }
    };

    const handleDecksEscolhidos = (deck: deckProps) => {
        const jaExiste = decksEscolhidos.some(d => d.id === deck.id);
         if(jaExiste) {
            removerDeck(deck.id);
         } else{
             adicionarDeck(deck)
         }

    }

    useEffect(() => {
        handleDecksBiblioteca();
    }, []);


    const decksFiltrados = decksBiblioteca.filter(deck =>
        deck.title
            ?.toLowerCase()
            .includes(busca.toLowerCase())
    );

    const podeContinuar = decksEscolhidos.length > 0;

    return (
        <View
            className="flex-1 bg-primary-900"
            style={{
                paddingTop: insets.top
            }}
        >

            {/* ===================================================== */}
            {/* HEADER */}
            {/* ===================================================== */}

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
                            ETAPA 01 / 03
                        </Text>
                    </View>

                </View>

                <View className="mt-6">

                    <Text className="text-white text-3xl font-poppinsBold">
                        Monte sua sessão
                    </Text>

                    <Text className="text-slate-400 text-base mt-1">
                        Escolha os decks que você quer estudar.
                    </Text>

                </View>

            </View>


            {/* ===================================================== */}
            {/* CONTEÚDO */}
            {/* ===================================================== */}

            <View className="flex-1 bg-slate-50 rounded-t-[32px] overflow-hidden">

                {/* ================================================= */}
                {/* DECKS SELECIONADOS */}
                {/* ================================================= */}

                <View className="px-5 pt-6">

                    <View className="flex-row items-end justify-between">

                        <View>
                            <Text className="text-slate-900 text-xl font-poppinsBold">
                                Sua sessão
                            </Text>

                            <Text className="text-slate-400 text-sm mt-1">
                                Selecione até 4 decks
                            </Text>
                        </View>

                        <View className="bg-indigo-100 px-3 py-1.5 rounded-full">
                            <Text className="text-indigo-600 font-bold">
                                {decksEscolhidos.length}/4
                            </Text>
                        </View>

                    </View>


                    {/* SLOTS */}

                    <View className="flex-row mt-5 gap-3">

                        {Array.from({ length: 4 }).map((_, index) => {

                            const deck = decksEscolhidos[index];

                            return (
                                <View
                                    key={index}
                                    className="flex-1"
                                >

                                    {deck ? (

                                        <TouchableOpacity
                                            activeOpacity={0.85}
                                            onPress={() =>
                                                handleDecksEscolhidos(deck)
                                            }
                                            className="h-28 rounded-2xl overflow-hidden border-2 border-indigo-500"
                                        >

                                            <CardCover
                                                themeId={deck.themeId}
                                            />

                                            {/* Overlay */}

                                            <LinearGradient
                                                colors={[
                                                    'transparent',
                                                    'rgba(15,23,42,0.9)'
                                                ]}
                                                className="absolute inset-0"
                                            />

                                            {/* Check */}

                                            <View className="absolute top-2 right-2 bg-indigo-500 w-6 h-6 rounded-full items-center justify-center">

                                                <MaterialIcons
                                                    name="check"
                                                    size={15}
                                                    color="#fff"
                                                />

                                            </View>

                                            <Text
                                                numberOfLines={1}
                                                className="absolute bottom-2 left-2 right-2 text-white text-xs font-bold"
                                            >
                                                {deck.title}
                                            </Text>

                                        </TouchableOpacity>

                                    ) : (

                                        <View className="h-28 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100 items-center justify-center">

                                            <View className="w-8 h-8 rounded-full bg-white items-center justify-center">

                                                <MaterialIcons
                                                    name="add"
                                                    size={20}
                                                    color="#94a3b8"
                                                />

                                            </View>

                                            <Text className="text-[10px] text-slate-400 font-bold mt-1">
                                                VAZIO
                                            </Text>

                                        </View>

                                    )}

                                </View>
                            );

                        })}

                    </View>

                </View>


                {/* ================================================= */}
                {/* DIVISOR */}
                {/* ================================================= */}

                <View className="h-[1px] bg-slate-200 mx-5 mt-6" />


                {/* ================================================= */}
                {/* BIBLIOTECA */}
                {/* ================================================= */}

                <View className="flex-1 mt-5">

                    <View className="px-5">

                        <View className="flex-row items-center justify-between">

                            <View>
                                <Text className="text-slate-900 text-xl font-poppinsBold">
                                    Minha biblioteca
                                </Text>

                                <Text className="text-slate-400 text-sm mt-1">
                                    Toque em um deck para selecionar
                                </Text>
                            </View>

                            <MaterialIcons
                                name="auto-awesome"
                                size={22}
                                color="#6366f1"
                            />

                        </View>


                        {/* BUSCA */}

                        <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 mt-4 h-12">

                            <MaterialIcons
                                name="search"
                                size={21}
                                color="#94a3b8"
                            />

                            <TextInput
                                value={busca}
                                onChangeText={setBusca}
                                placeholder="Buscar deck..."
                                placeholderTextColor="#94a3b8"
                                className="flex-1 ml-3 text-base text-slate-800"
                            />

                            {busca.length > 0 && (
                                <TouchableOpacity
                                    onPress={() => setBusca('')}
                                >
                                    <MaterialIcons
                                        name="close"
                                        size={20}
                                        color="#94a3b8"
                                    />
                                </TouchableOpacity>
                            )}

                        </View>

                    </View>


                    {/* LISTA */}

                    <FlatList
                        data={decksFiltrados}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 20,
                            paddingVertical: 16,
                            gap: 14
                        }}
                        renderItem={({ item }) => (
                            <RenderDeck
                                deck={item}
                                selecionado={decksEscolhidos.some(
                                    deck => deck.id === item.id
                                )}
                                pressionado={() =>
                                    handleDecksEscolhidos(item)
                                }
                            />
                        )}
                    />

                </View>


                {/* ================================================= */}
                {/* BOTÃO */}
                {/* ================================================= */}

                <View
                    className="px-5 pt-3 bg-slate-50"
                    style={{
                        paddingBottom: insets.bottom + 12
                    }}
                >

                    <TouchableOpacity
                        disabled={!podeContinuar}
                        activeOpacity={0.85}
                        onPress={() => {
                            // Próxima etapa
                            proximoStep()
                        }}
                        className={`
                            h-16 rounded-2xl
                            flex-row items-center justify-center
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
    );
}


/* ============================================================= */
/* CARD DA BIBLIOTECA */
/* ============================================================= */

type RenderDeckProps = {
    deck: deckProps;
    selecionado: boolean;
    pressionado: () => void;
};

function RenderDeck({
    deck,
    selecionado,
    pressionado
}: RenderDeckProps) {

    const nivel =
        deck.level === 'facil'
            ? 1
            : deck.level === 'medio'
                ? 2
                : 3;

    return (

        <TouchableOpacity
            activeOpacity={0.85}
            onPress={pressionado}
            style={{
                width: CARD_WIDTH,
                borderWidth: 2,
                borderColor: selecionado
                    ? '#6366f1'
                    : '#e2e8f0',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 4
                },
                shadowOpacity: selecionado ? 0.18 : 0.08,
                shadowRadius: 8,
                elevation: selecionado ? 5 : 2
            }}
            className="bg-white rounded-3xl overflow-hidden"
        >

            {/* CAPA */}

            <View className="h-40 overflow-hidden">

                <CardCover
                    themeId={deck.themeId}
                />

                {/* Gradient */}

                <LinearGradient
                    colors={[
                        'transparent',
                        'rgba(15,23,42,0.8)'
                    ]}
                    className="absolute inset-0"
                />

                {/* Selecionado */}

                {selecionado && (

                    <View className="absolute top-3 right-3 bg-indigo-600 w-9 h-9 rounded-full items-center justify-center">

                        <MaterialIcons
                            name="check"
                            size={20}
                            color="#fff"
                        />

                    </View>

                )}

            </View>


            {/* INFORMAÇÕES */}

            <View className="p-4">

                <Text
                    numberOfLines={1}
                    className="text-lg font-poppinsBold text-slate-900"
                >
                    {deck.title}
                </Text>

                <Text
                    numberOfLines={2}
                    className="text-sm text-slate-500 mt-1 leading-5"
                >
                    {deck.details}
                </Text>


                {/* FOOTER */}

                <View className="flex-row items-center justify-between mt-4">

                    {/* NÍVEL */}

                    <View className="flex-row items-center bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1.5">

                        <Text className="text-xs font-bold text-indigo-500 mr-2">
                            NÍVEL
                        </Text>

                        <View className="flex-row gap-1">

                            {Array.from({ length: 3 }).map(
                                (_, index) => (
                                    <Fontisto
                                        key={index}
                                        name="fire"
                                        size={11}
                                        color={
                                            index < nivel
                                                ? '#f59e0b'
                                                : '#c7d2fe'
                                        }
                                    />
                                )
                            )}

                        </View>

                    </View>


                    {/* CARTAS */}

                    <View className="flex-row items-center">

                        <MaterialIcons
                            name="style"
                            size={16}
                            color="#94a3b8"
                        />

                        <Text className="text-xs text-slate-400 font-bold ml-1">
                            {deck.totalCards ?? 0} cartas
                        </Text>

                    </View>

                </View>

            </View>

        </TouchableOpacity>
    );
}

