import { Image, Text, TouchableOpacity, Dimensions, View } from 'react-native';
import CardCover from './cardCover';
import { Fontisto } from '@expo/vector-icons';


export interface cardShortHomeProps {
    id: number,
    themeId: string,
    title: string,
    detalhes: string,
    nivel: "facil" | "medio" | "dificil",
    concluido: string
}

const widthTela = Dimensions.get('window').width;


export default function CardShortHome({ id, themeId, title, detalhes, nivel, concluido }: cardShortHomeProps) {


    const estrelas: number = nivel === "facil" ? 1 : nivel === 'medio' ? 2 : 3;


    return (
        <TouchableOpacity style={{ width: widthTela - 120, boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)', }} className='bg-white rounded-2xl overflow-hidden border border-slate-200 my-2 mr-2' activeOpacity={0.7} >

            <View className='flex-row '>
                <View className='w-28 h-28 bg-slate-100'>
                    <CardCover themeId={themeId} iconSize={28} />
                </View>
                <View className='p-4 justify-between flex-1 '>
                    <View>
                        <Text className='text-lg font-bold text-slate-800' numberOfLines={1}>{title}</Text>
                        <Text className='text-xs text-slate-500 mt-0.5' numberOfLines={2}>{detalhes}</Text>
                    </View>

                    <View className='self-end bg-amber-50 rounded-lg px-2 flex-row items-center border border-amber-100'>
                        <Text className='text-[10px] text-amber-800'>Dificuldade: </Text>
                        <View className='self-end flex-row px-2 py-1 rounded-md gap-2'>
                            {
                                Array.from({ length: estrelas }).map((_, index) => (
                                    <Fontisto name='star' size={16} color={"#eab308"} className='text-shadow' />
                                ))
                            }
                        </View>
                    </View>
                </View>
            </View>

            <View className='bg-slate-300 w-full h-[4px] '>
                <View className='bg-emerald-500 h-[4px]' style={{ width: `${concluido}%` }} />
            </View>

        </TouchableOpacity>
    );
}