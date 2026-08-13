import { ActivityIndicator, Text, View } from 'react-native';

export default function SplashScreenAuth() {
 return (
   <View className='flex-1 gap-8 justify-center items-center'>
    <ActivityIndicator size={48} />
    <Text className='text-4xl font-black'>Carregando...</Text>
   </View>
  );
}