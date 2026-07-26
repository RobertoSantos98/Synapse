import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import TitleHome from '../titleHome';
import CardCover from '../cardCover';
import { Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';


const tamanhoCard = (Dimensions.get('window').width - 64)

export default function DecksAmigos() {

    const deckAmigos = [
        { id: 1, amigo: "Kaike", themeId: 'math', title: "Matemática", detalhes: "Estudo da escola", nivel: "medio" },
        { id: 2, amigo: "Diego", themeId: 'languages', title: "Inglês", detalhes: "Estudo da escola 2", nivel: "facil", },
        { id: 3, amigo: "Pedro", themeId: 'languages', title: "Inglês", detalhes: "Estudo da escola 3", nivel: "medio", },
        { id: 4, amigo: "Marcelo", themeId: 'tech', title: "Informática", detalhes: "Estudo da faculdade", nivel: "medio", },
        { id: 5, amigo: "Valdinha", themeId: 'science', title: "Ciências", detalhes: "Estudo para erudição pessoal", nivel: "dificil", },

    ]


    return (
        <View>
            <TitleHome title='Decks de Amigos' label='Ver Mais' onPressLabel={() => { }} />


            <View>
                <FlatList
                    data={deckAmigos}
                    renderItem={({ item }) => <RenderDeckAmigos amigo={item.amigo} themeId={item.themeId} title={item.title} detalhes={item.detalhes} nivel={item.detalhes} />}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        gap: 8
                    }}
                />
            </View>
        </View>
    );
}

type renderDeckAmigosProps = {
    amigo: string,
    themeId: string,
    title: string,
    detalhes: string,
    nivel: string,
}

const RenderDeckAmigos = ({ amigo, themeId, title, detalhes, nivel }: renderDeckAmigosProps) => {

    const nivelfogo: number = nivel === 'facil' ? 1 : nivel === 'medio' ? 2: 3;

    return (
        <TouchableOpacity className='bg-white rounded-2xl p-1 flex-row' style={{ width: tamanhoCard }}>

            <View className='rounded-xl overflow-hidden' style={{ width: tamanhoCard / 3, height: tamanhoCard / 3 }}>
                <CardCover themeId={themeId} />
            </View>

            <View className='px-4 py-2 flex-1 justify-between'>
                <View className='flex-row items-start justify-between'>
                    <View>
                        <Text className='text-lg font-poppinsBold' numberOfLines={1}>{title}</Text>
                        <Text className='text-xs text-slate-500' numberOfLines={2}>{detalhes}</Text>
                    </View>
                    <View className='px-2 py-2 bg-primary-50 rounded-full border border-primary-500'>
                        <MaterialIcons name='keyboard-double-arrow-right' size={14} color={"#6366f1"} />
                    </View>
                </View>

                <View className='flex-row justify-between items-end gap-4'>
                    <View className='border border-primary-50 rounded-xl p-2 flex-1'>
                        <Text className='text-xs tracking-wide' numberOfLines={1}>Deck de: </Text>
                        <Text className='font-poppinsBold text-primary-950'>{amigo}</Text>
                    </View>
                    <View className='border border-primary-50 rounded-xl p-2 gap-1 flex-1 h-full'>
                        <Text className='text-xs tracking-wide'>Nível: </Text>
                        <View className='flex-row gap-1'>
                            {Array.from({length: 3}).map((_, index)=> (
                                <Fontisto
                                    name='fire'
                                    size={12}
                                    color={index < nivelfogo ? "#f59e0b" : "#e2e8f0"}
                                />
                            ))}
                        </View>
                    </View>

                </View>
            </View>

        </TouchableOpacity>
    )
}