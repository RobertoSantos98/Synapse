import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


    type HeaderStackProps = {
        title: string,
        subTitle?: string
    }

export default function HeaderStack({title, subTitle}: HeaderStackProps) {
    const insets = useSafeAreaInsets()

    return (
        <View className='' style={{ paddingTop: insets.top }} >
            <View className='flex-row items-center px-4 py-8 justify-center gap-4'>
                <TouchableOpacity className='p-3 border border-slate-200/40 rounded-full shadow-sm' onPress={() => router.back()} >
                    <MaterialIcons name='arrow-back-ios-new' size={16} color={"#FFF"} />
                </TouchableOpacity>

                <View className='flex-1 gap-1'>
                    <Text className=' text-xl font-poppinsBold text-white '>{title}</Text>
                    { subTitle && (
                        <Text className='text-xs text-slate-300 font-bold tracking-wide' numberOfLines={1}>{subTitle}</Text>
                    )}
                </View>

            </View>

        </View>
    );
}