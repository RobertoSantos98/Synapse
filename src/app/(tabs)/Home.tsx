import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {

    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top }}>
            <View className='flex-row justify-between items-center p-6'>
                <View>
                    <Text className='text-3xl font-extrabold'>Olá, Raphael!</Text>
                    <Text className='text-sm text-slate-500'>Pronto para estudar hoje?</Text>
                </View>
                <TouchableOpacity className='rounded-full bg-slate-300 p-3'>
                    <Ionicons name='settings-sharp' size={22} color={"#000"} />
                </TouchableOpacity>
            </View>

            <View className='bg-emerald-900 mx-6 my-2 p-2 rounded-xl '>

                <View className='flex-row justify-center gap-2'>
                    <View className='gap-1 items-center'>
                        <View className='flex-row gap-2 items-center'>
                            <AntDesign name='fire' color={"#10b981"} size={14} />
                            <Text className='text-white text-2xl font-bold'>5 dias</Text>
                        </View>
                        <Text className='text-slate-300'>Ofensivas Diária</Text>
                    </View>

                    <View className='w-[1px] h-2/3 bg-emerald-700 self-center'/>

                    <View className='gap-1 items-center'>
                        <Text className='text-white text-2xl font-bold'>24 Cards</Text>
                        <Text className='text-slate-300'>Para Revisar Hoje</Text>
                    </View>

                    <View className='w-[1px] h-2/3 bg-emerald-700 self-center'/>

                    <View className='gap-1 items-center'>
                        <Text className='text-white text-2xl font-bold'>~8 min</Text>
                        <Text className='text-slate-300'>Tempo Estimado</Text>
                    </View>
                    
                </View>
            </View>

        </View>
    );
}