import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface TitleHomeProps {
    title: string;
    label: string;
    onPressLabel: () => void;
}

export default function TitleHome({ title, label, onPressLabel }: TitleHomeProps) {
    return (
        <View className='px-6 pt-4 pb-3 flex-row justify-between items-end'>
            <Text className='font-black text-xl text-slate-800 tracking-wide'>{title}</Text>
            
            <TouchableOpacity 
                className='flex-row gap-1 items-center active:opacity-50'
                onPress={onPressLabel}
            >
                <Text className='text-emerald-600 font-bold text-sm'>{label}</Text>
                <MaterialIcons name='arrow-forward-ios' color={"#059669"} size={12}/>
            </TouchableOpacity>
        </View>
    );
}