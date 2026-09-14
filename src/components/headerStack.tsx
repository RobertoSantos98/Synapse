import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


    type HeaderStackProps = {
        title: string
    }

export default function HeaderStack({title}: HeaderStackProps) {
    const insets = useSafeAreaInsets()

    return (
        <View className='' style={{ paddingTop: insets.top }} >
            <View className='flex-row items-center px-4 py-8 relative justify-center'>
                <TouchableOpacity className='absolute p-3 border border-slate-200/40 rounded-full left-4 shadow-sm' onPress={() => router.back()} >
                    <MaterialIcons name='arrow-back-ios-new' size={16} color={"#FFF"} />
                </TouchableOpacity>

                <Text className=' text-xl font-poppinsBold text-white '>{title}</Text>
            </View>

        </View>
    );
}