import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


    // Está sem fundo, seguindo o background que a tela que incorporar esse componente terá.


    type HeaderStackProps = {
        title: string
    }

export default function HeaderStack({title}: HeaderStackProps) {
    const insets = useSafeAreaInsets()

    return (
        <View className='' style={{ paddingTop: insets.top }} >
            <View className='flex-row items-center px-4 py-8 relative justify-center'>
                <TouchableOpacity className='absolute p-4 bg-slate-100/20 border border-slate-200/40 rounded-full left-4 shadow-sm' onPress={() => router.back()} >
                    <MaterialIcons name='arrow-back-ios-new' size={16} color={"#FFF"} />
                </TouchableOpacity>

                <Text className=' text-2xl font-poppinsBold text-white '>{title}</Text>
            </View>

        </View>
    );
}