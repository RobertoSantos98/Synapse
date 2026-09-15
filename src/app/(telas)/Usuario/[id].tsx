import { AvatarService } from '@/src/Services/AvatarService';
import UserService from '@/src/Services/UserService';
import { User } from '@/src/types/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Usuario() {
  const insets = useSafeAreaInsets()

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    handleUser();
  }, []);

  const handleUser = async () => {
    try {
      const response = await UserService.GetUserById(id);
      console.log(response)
      setUser(response);

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  }

  if (isLoading) return (<View><Text>Carregando...</Text></View>);
  if (!user) return (<View><Text>Usuário não encontrado.</Text></View>)


  return (
    <View className='flex-1 bg-primary-950' >

      <View className='flex-row bg-primary-500 pb-28 px-4' style={{ paddingTop: insets.top }}>
        <TouchableOpacity className='flex-1 items-center flex-row gap-2 bg-primary-400 rounded-xl py-4 justify-center'>
          <MaterialCommunityIcons name='account-plus' size={18} color={"#fff"} />
          <Text className='text-white font-bold'>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View className='items-center -top-14'>

        <View className='bg-primary-200 rounded-full overflow-hidden w-30 h-30 border-2 border-white relative'>
          {user.avatarUrl ? (
            <Image source={{ uri: AvatarService.getAvatarUrl(user.avatarUrl) }} width={100} height={100} />
          ) : (
            <MaterialCommunityIcons name='account' size={100} />
          )}

          <View className='absolute bg-black self-center -bottom-1 z-50 px-2 rounded-full border border-white'>
            <Text className='text-xs text-white font-poppinsBold'>{user.level}</Text>
          </View>

        </View>

        <Text className='text-2xl font-poppinsBold text-white'>{user.nome}</Text>
        <Text className='text-lg text-primary-300'>@{user.usuario}</Text>
      </View>

      <View className='px-6 py-4 bg-primary-900 rounded-2xl gap-2'>

        <View className='flex-row justify-between'>
          <Text className='text-slate-300'>Pontos de Experiência</Text>
          <View className='flex-row gap-2'>
            <MaterialCommunityIcons name="star-four-points" size={17} color="#facc15" />
            <Text className='text-white font-bold'>{user.experiencePoints}</Text>
          </View>
        </View>

        <View className='h-px w-full bg-primary-700 rounded-full my-1' />
       
        <View className='flex-row justify-between'>
          <Text className='text-slate-300'>Sequências</Text>
          <View className='flex-row gap-2'>
            <Text className='text-white font-bold'>10</Text>
          </View>
        </View>

      </View>

    </View>
  );
}