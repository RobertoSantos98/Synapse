import { Image, Text, TouchableOpacity, Dimensions, View } from 'react-native';
import CardCover, { CardCoverProps } from './cardCover';


export interface cardShortHomeProps {
    id: number,
    themeId: string,
    title: string,
    detalhes: string,
    nivel: string,
    concluido: string
}

const widthTela = Dimensions.get('window').width;


export default function CardShortHome({ id, themeId, title, detalhes, nivel, concluido }: cardShortHomeProps) {
    return (
        <TouchableOpacity style={{width: widthTela - 120, boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)', }} className='bg-white rounded-2xl overflow-hidden border border-slate-200 my-2 mr-2' activeOpacity={0.7} >

            <View className='flex-row '>
                <View className='w-28 h-28 bg-slate-100'>
                    <CardCover themeId={themeId} iconSize={28} />
                </View>
                <View className='p-4 justify-between flex-1 '>
                    <View>
                        <Text className='text-lg font-bold text-slate-800' numberOfLines={1}>{title}</Text>
                        <Text className='text-xs text-slate-500 mt-0.5' numberOfLines={2}>{detalhes}</Text>
                    </View>

                    <View className='bg-red-100 py-1 px-2 border border-red-500 rounded-md self-end mt-2'>
                        <Text className='text-[10px] font-bold text-red-500 uppercase tracking-wider'>{nivel}</Text>
                    </View>
                </View>
            </View>

            <View className='bg-slate-300 w-full h-[4px] '>
                <View className='bg-emerald-500 h-[4px]' style={{ width: concluido }} />
            </View>

        </TouchableOpacity>
    );
}