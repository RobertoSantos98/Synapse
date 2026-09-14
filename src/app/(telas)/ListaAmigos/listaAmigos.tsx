import HeaderStack from '@/src/components/headerStack';
import { AvatarService } from '@/src/Services/AvatarService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

export default function ListaAmigos() {

    const amigos: RenderItemAmigosProps[] = [
        { id: 1, nome: "Gustavo", avatarUrl: "Gustavo", pontos: 2345 },
        { id: 2, nome: "Jessica", avatarUrl: "Jessica", pontos: 2303 },
        { id: 3, nome: "Nivolas", avatarUrl: "Nivolas", pontos: 2014 },
        { id: 4, nome: "Cassio", avatarUrl: "Cassio", pontos: 1234 },
        { id: 5, nome: "Paulo", avatarUrl: "Paul", pontos: 254 },
    ]



    return (
        <View className='flex-1'>
            <View className='bg-primary-500'>
                <HeaderStack title='Lista de Amigos' />
            </View>

            <View className='bg-primary-500 mx-2 my-4 rounded-2xl border-4 border-primary-900'>
                <FlatList
                    data={amigos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <RenderItemAmigos id={item.id} nome={item.nome} avatarUrl={item.avatarUrl} pontos={item.pontos} />}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                        gap: 4
                    }}
                />

            </View>


        </View>

    );
}

type RenderItemAmigosProps = {
    id: number,
    nome: string,
    avatarUrl: string,
    pontos: number
}

function RenderItemAmigos({ id, nome, avatarUrl, pontos }: RenderItemAmigosProps) {

    const posicao = 1;

    return (
        <TouchableOpacity className='relative flex-row bg-primary-100 items-center  rounded-full border-2 border-primary-800 overflow-hidden'>
            <View className='gap-2 p-1 flex-1 flex-row items-center'>
                <View className='py-1 px-3 bg-primary-800 rounded-full border-2 border-primary-600 h-11 w-11 items-center justify-center'>
                    <Text className='text-2xl text-white font-poppinsBold'>{id}</Text>
                </View>

                <View >
                    <Image source={{ uri: AvatarService.getAvatarUrl(avatarUrl) }} width={35} height={35} />
                </View>

                <Text className='text-xl text-primary-800 font-poppinsBold' numberOfLines={1}>{nome}</Text>
            </View>


            <View className='items-center bg-primary-300 pr-4 flex-row w-20 absolute h-full right-0'>
                <MaterialCommunityIcons name='star' color={"#facc15"} size={30} className='-left-4' />
                <Text className='text-lg font-bold text-white'>{pontos}</Text>
            </View>
        </TouchableOpacity>
    )
}