import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface TitleHomeProps {
    title: string,
    label: string,
    onPressLabel: () => void
}

export default function TitleHome({title, label, onPressLabel}: TitleHomeProps) {
 return (
   <View className='px-4 py-2 flex-row justify-between'>
    <Text className='font-black'>{title}</Text>
    <TouchableOpacity className='flex-row gap-2 items-center'>
        <Text className='text-emerald-500 font-bold'>{label}</Text>
        <MaterialIcons name='double-arrow' color={"#10b981"} size={16}/>
    </TouchableOpacity>
   </View>
  );
}