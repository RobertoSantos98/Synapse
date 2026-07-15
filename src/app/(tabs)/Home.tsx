import BackGroundLightHome from '@/src/Assets/backGround-lightHome';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {

    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top, flex: 1}}>

            <BackGroundLightHome/>

            <View className='flex-row justify-between items-center m-4 px-2 py-4 bg-slate-100/90 rounded-xl border border-slate-200/60'>
                <View>
                    <Text className='text-3xl font-extrabold'>Olá, <Text className='text-emerald-500'>Raphael!</Text></Text>
                    <Text className='text-sm text-slate-500'>Pronto para estudar hoje?</Text>
                </View>
                <TouchableOpacity className='rounded-full bg-slate-200 p-3 border border-slate-300'>
                    <Ionicons name='settings-sharp' size={22} color={"#000"} />
                </TouchableOpacity>
            </View>



            <View className='mx-6 my-2 rounded-xl gap-4 overflow-hidden p-4 relative shadow-emerald'>
                <LinearGradient colors={["#022c22", "#065f46"]}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} />

                <View className='flex-row justify-center gap-2'>
                    <View className='gap-1 items-center'>
                        <View className='flex-row gap-2 items-center'>
                            <AntDesign name='fire' color={"#10b981"} size={14} />
                            <Text className='text-white text-2xl font-bold'>5 dias</Text>
                        </View>
                        <Text className='text-slate-300'>Ofensivas Diária</Text>
                    </View>

                    <View className='w-[1px] h-2/3 bg-emerald-700 self-center' />

                    <View className='gap-1 items-center'>
                        <Text className='text-white text-2xl font-bold'>24 Cards</Text>
                        <Text className='text-slate-300'>Para Revisar Hoje</Text>
                    </View>

                    <View className='w-[1px] h-2/3 bg-emerald-700 self-center' />

                    <View className='gap-1 items-center'>
                        <Text className='text-white text-2xl font-bold'>~8 min</Text>
                        <Text className='text-slate-300'>Tempo Estimado</Text>
                    </View>

                </View>

                <View className='gap-2'>
                    <Text className='text-white font-bold '>Estudo Diário: <Text className='text-slate-300 font-normal'>15/30 Cards Revisados</Text>
                    </Text>

                    <View className='flex-row items-center gap-2'>
                        <View className='bg-emerald-950 h-2 flex-1 rounded-full'>
                            <View className='bg-emerald-500 h-2 rounded-full' style={{ width: "60%" }}>
                                <View className='absolute right-0 -top-1.5 itens-center bg-emerald-400 py-1 px-1.5 rounded-full'>
                                    <Text className='text-white self-center text-xs'>60%</Text>
                                </View>
                            </View>
                        </View>
                        <Text className='text-slate-300 text-xs'>30</Text>
                    </View>

                    <Text className='font-bold text-sm text-center text-white'>Quase lá! Mais 15 cards e você carimba o passaporte de hoje.</Text>
                </View>
            </View>

        </View>
    );
}