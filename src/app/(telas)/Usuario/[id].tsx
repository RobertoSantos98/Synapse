import MiniDeckHorizontal from '@/src/components/MiniDeckHorizontal';
import { AvatarService } from '@/src/Services/AvatarService';
import BaralhoService, { deckProps } from '@/src/Services/BaralhoService';
import UserService from '@/src/Services/UserService';
import { User } from '@/src/types/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Usuario() {
  const insets = useSafeAreaInsets()

  const [user, setUser] = useState<User | null>(null);
  const [decksUsuario, setDecksUsuario] = useState<deckProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    handleUser();
  }, []);

  const handleUser = async () => {
    try {
      const response = await UserService.GetUserById(id);
      const decks = await BaralhoService.GetDeck();
      console.log(response)
      setUser(response);
      setDecksUsuario(decks);

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  }


  if (isLoading) return <LoadingProfile />;
  if (!user) return (<View><Text>Usuário não encontrado.</Text></View>);

  const titleBaralhos = `Baralhos de ${user.nome}`

  const pontosTotalDoNivel = (user.pontosAtuais ? user.pontosAtuais : 0) + (user.pontosNecessarios ? user.pontosNecessarios : 0);

  const percentNivel = Math.min(((user.pontosAtuais ?? 0) / pontosTotalDoNivel) * 100, 100)

  return (
    <ScrollView>
      <View className='flex-1 bg-primary-50 pb-10' >

        <View className='mb-8'>

          <View className='h-96 w-full bg-white rounded-br-full overflow-hidden'>

            <LinearGradient
              colors={["#6366f1", "#4338ca"]}
              style={StyleSheet.absoluteFill}
            />

            <View className='flex-row pt-6 pb-8 px-4 justify-around' style={{ marginTop: insets.top }}>

              <Text className='text-white text-base'>Total de Duelos: {user.totalDuelos}</Text>
              <Text className='text-white text-base'>Vitórias: {user.wins}</Text>
              <Text className='text-white text-base'>Derrotas: {user.losses}</Text>

            </View>

            <View className='ml-8'>

              <View className='items-center justify-start flex-row gap-4 '>

                <View className='relative'>
                  <View className='bg-primary-50 rounded-full w-32 h-32 border-2 border-white items-center justify-center overflow-hidden'>
                    {user.avatarUrl ? (
                      <Image source={{ uri: AvatarService.getAvatarUrl(user.avatarUrl) }} width={105} height={105} />
                    ) : (
                      <MaterialCommunityIcons name='account' size={105} />
                    )}

                  </View>

                  <View className='absolute bg-black self-center -bottom-1 z-50 px-4 rounded-full border-2 border-white'>
                    <Text className='text-xs text-white font-poppinsBold'>{user.level}</Text>
                  </View>

                </View>

                <View>
                  <Text className='text-2xl font-poppinsBold text-white'>{user.nome}</Text>
                  <Text className='text-sm text-primary-200'>@{user.usuario}</Text>
                </View>
              </View>

              <View className='mt-8 gap-4'>

                <View className='flex-row gap-2 items-center'>
                  <View className='bg-orange-400 rounded-full p-1'>
                    <MaterialCommunityIcons name="star-four-points" size={22} color="#fff" />
                  </View>

                  <Text className='text-white font-bold'>{user.experiencePoints}</Text>
                </View>

                <View className='flex-row gap-2 items-center'>
                  <View className='bg-orange-400 rounded-full p-1'>
                    <MaterialCommunityIcons name="fire" size={22} color="#fff" />
                  </View>

                  <Text className='text-white font-bold'>10</Text>
                </View>

              </View>


            </View>
          </View>

          <View className=' items-center justify-center gap-2 pb-4 absolute -bottom-2 right-12'>
            <TouchableOpacity className='p-4 bg-orange-400/20 rounded-full' activeOpacity={0.8}>
              <View className='items-center bg-orange-400 rounded-full h-20 w-20 justify-center'>
                <MaterialCommunityIcons name='account-plus' size={24} color={"#fff"} />
              </View>
            </TouchableOpacity>
            <Text className='text-slate-500 text-base font-poppinsBold'>Adicionar Amigo</Text>
          </View>


        </View>


        <View className='bg-white border border-slate-200 mx-2 my-4 rounded-2xl p-4 gap-2'>

          <View className='flex-row justify-between'>
            <Text className='text-sm text-slate-400'>Nivel Atual:
              <Text className='text-orange-400 text-base font-poppinsBlack'> {user.level}</Text>
            </Text>

            <Text className='text-sm text-slate-400'>{user.pontosAtuais}/
              <Text className='text-base text-slate-500 font-poppinsBold'>{pontosTotalDoNivel}</Text>
            </Text>
          </View>


          <View className='bg-orange-100 rounded-full overflow-hidden'>
            <View className='bg-orange-400 h-2' style={{ width: `${percentNivel}%` }} />
          </View>


        </View>

        <View className='flex-row py-4 mx-4'>

          <View className='gap-2 flex-1 items-center'>
            <Text className='text-center text-xl font-poppinsBold text-slate-600'>44</Text>
            <Text className='text-slate-400'>Decks Curtidos</Text>
          </View>

          <View className='w-0.5 bg-primary-400 my-2 mx-4 rounded-full' />

          <View className='gap-2 flex-1 items-center'>
            <Text className='text-center text-xl font-poppinsBold text-slate-600'>12</Text>
            <Text className='text-slate-400'>Decks Criados</Text>
          </View>

          <View className='w-0.5 bg-primary-400 my-2 mx-4 rounded-full' />

          <View className='gap-2 flex-1 items-center'>
            <Text className='text-center text-xl font-poppinsBold text-slate-600'>96</Text>
            <Text className='text-slate-400'>Curtidas</Text>
          </View>

        </View>


        {decksUsuario && (
          <MiniDeckHorizontal title={titleBaralhos} decks={decksUsuario} />
        )}

        <View className='py-4 gap-4'>
          <TouchableOpacity className='bg-slate-50 mx-2 rounded-2xl py-4 border border-slate-300 shadow-sm'>
            <Text className='text-slate-800 font-poppinsBold text-lg tracking-wide text-center'>Compartilhar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-red-50 mx-2 rounded-2xl py-4 border border-red-300 shadow-sm'>
            <Text className='text-red-500 font-poppinsBold text-lg tracking-wide text-center'>Denunciar {user.nome}</Text>
          </TouchableOpacity>
        </View>



      </View>

    </ScrollView>
  );
}











const AnimatedView = Animated.View;

function LoadingProfile() {
  const width = Dimensions.get('window').width;

  // O círculo é 2x maior que a tela.
  // Como o centro fica no canto superior esquerdo,
  // apenas 1/4 dele fica visível.
  const circleSize = width * 2;

  const rotation = useSharedValue(0);

  const orbitSize = circleSize * 0.55;

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 5000,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <View className="flex-1 bg-primary-50">

      {/* CÍRCULO PRINCIPAL */}
      <View
        className="absolute"
        style={{
          width: circleSize,
          height: circleSize,
          left: -circleSize / 2,
          top: -circleSize / 2,
        }}
      >

        {/* FUNDO */}
        <View className="w-full h-full rounded-full overflow-hidden">

          <LinearGradient
            colors={["#6366f1", "#4338ca"]}
            style={StyleSheet.absoluteFill}
          />

          <AnimatedView
            style={[
              {
                position: 'absolute',
                width: orbitSize,
                height: orbitSize,

                // centraliza a órbita dentro do círculo grande
                left: (circleSize - orbitSize) / 2,
                top: (circleSize - orbitSize) / 2,
              },
              animatedStyle,
            ]}
          >
            {/* Perfil 1 */}
            <View
              className="absolute bg-primary-50 rounded-full items-center justify-center"
              style={{
                width: 100,
                height: 100,
                top: 0,
                left: orbitSize / 2 - 40,
              }}
            >
              <MaterialCommunityIcons
                name="account"
                size={35}
                color="#6366f1"
              />
            </View>

            {/* Perfil 2 */}
            <View
              className="absolute bg-primary-50 rounded-full"
              style={{
                width: 100,
                height: 100,
                top: orbitSize / 2 - 40,
                right: 0,
              }}
            />

            {/* Perfil 3 */}
            <View
              className="absolute bg-primary-50 rounded-full"
              style={{
                width: 100,
                height: 100,
                bottom: 0,
                left: orbitSize / 2 - 40,
              }}
            />

            {/* Perfil 4 */}
            <View
              className="absolute bg-orange-400 rounded-full"
              style={{
                width: 100,
                height: 100,
                top: orbitSize / 2 - 40,
                left: 0,
              }}
            />

          </AnimatedView>

        </View>

      </View>

      {/* LOADING */}
      <View className="flex-1 items-center gap-8">

        <View className='absolute bottom-80 gap-8'>
          <ActivityIndicator
            size={90}
            color="#fb923c"
          />

          <Text className="font-poppinsBold text-orange-400 text-2xl">
            Procurando...
          </Text>
        </View>


      </View>

    </View>
  );
}