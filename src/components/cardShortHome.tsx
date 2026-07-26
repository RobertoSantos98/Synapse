import { Image, Text, TouchableOpacity, Dimensions, View, StyleSheet } from 'react-native';
import CardCover from './cardCover';
import { Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


export interface cardShortHomeProps {
    id: number,
    themeId: string,
    title: string,
    detalhes: string,
    nivel: "facil" | "medio" | "dificil",
    concluido: number
}

const widthTela = Dimensions.get('window').width;


export default function CardShortHome({ id, themeId, title, detalhes, nivel, concluido }: cardShortHomeProps) {


    const estrelas: number = nivel === "facil" ? 1 : nivel === 'medio' ? 2 : 3;


    return (
        <TouchableOpacity style={{ width: widthTela - 60, boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)', }} className='bg-white rounded-2xl overflow-hidden border border-slate-200 my-2 mr-2' activeOpacity={0.7} >



            <View className='flex-row '>
                <View className='w-32 h-full border-r border-primary-200'>
                    <CardCover themeId={themeId} />
                    <LinearGradient colors={["rgba(0,0,0,0.1)", "transparent",'transparent', ]} style={StyleSheet.absoluteFill} />
                </View>

                <View className='py-2 px-4 gap-1 flex-1 '>
                    <View>
                        <Text className='text-lg font-poppinsBold tracking-wide text-slate-800' numberOfLines={1}>{title}</Text>
                        <Text className='text-xs text-slate-500 mt-0.5' numberOfLines={2}>{detalhes}</Text>
                    </View>

                    <View className='self-start rounded-lg flex-row items-center'>
                        <View className='self-end flex-row py-1 rounded-md gap-2'>
                            {
                                Array.from({ length: estrelas }).map((_, index) => (
                                    <Fontisto name='star' size={12} color={"#eab308"} className='text-shadow' />
                                ))
                            }
                        </View>
                    </View>

                    <View className='items-end'>
                        <TouchableOpacity className='rounded-full pl-4 pr-2 py-2 bg-primary-500 flex-row gap-1 items-center'>
                            <Text className='text-white font-bold text-sm'>Estudar</Text>
                            <MaterialIcons name='keyboard-arrow-right' size={16} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View className='bg-slate-300 w-full h-[4px] '>
                <View className='bg-orange-500 h-[4px]' style={{ width: `${concluido}%` }} />
            </View>

        </TouchableOpacity>
    );
}