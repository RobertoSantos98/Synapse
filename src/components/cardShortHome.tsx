import { Image, Text, TouchableOpacity, Dimensions, View } from 'react-native';


export interface cardShortHomeProps {
    id: number,
    img: string,
    title: string,
    detalhes: string,
    nivel: string,
    concluido: string
}

const widthTela = Dimensions.get('window').width;


export default function CardShortHome({ id, img, title, detalhes, nivel, concluido }: cardShortHomeProps) {
    return (
        <TouchableOpacity style={{width: widthTela - 120, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', }} className='bg-white rounded-2xl overflow-hidden border border-slate-200 my-2 mr-2' activeOpacity={0.7} >

            <View className='flex-row '>
                <Image source={{ uri: img }} className='w-28 h-28' />
                <View className='p-4 justify-around flex-1'>
                    <Text className='text-lg font-bold'>{title}</Text>
                    <Text className='text-sm text-slate-500'>{detalhes}</Text>
                    <Text>{nivel}</Text>
                </View>
            </View>

            <View className='bg-slate-300 w-full h-[4px] '>
                <View className='bg-emerald-500 h-[4px]' style={{ width: concluido }} />
            </View>

        </TouchableOpacity>
    );
}