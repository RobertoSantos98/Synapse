import HeaderStack from '@/src/components/headerStack';
import { AvatarService } from '@/src/Services/AvatarService';
import UserService from '@/src/Services/UserService';
import { User } from '@/src/types/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

export default function ListaAmigos() {

    const [ amigos, setAmigos ] = useState<User[]>([]);

    useEffect(() => {
        handleAmigos()
    }, [])

    const handleAmigos = async () => {
        try {
            const response = await UserService.GetUsers();
            setAmigos(response)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View className="flex-1 bg-primary-950">

            {/* HEADER */}
            <View className="bg-primary-500 rounded-b-[32px] pb-5">
                <HeaderStack title="Amigos" />

                <View className="px-5 mt-3">
                    <Text className="text-primary-100 text-xs font-poppinsBold tracking-widest">
                        RANKING SOCIAL
                    </Text>

                    <View className="flex-row items-center mt-1">
                        <MaterialCommunityIcons
                            name="lightning-bolt"
                            size={25}
                            color="#facc15"
                        />

                        <Text className="text-white text-2xl font-poppinsBold ml-1">
                            Sua Arena Social
                        </Text>
                    </View>

                    <Text className="text-primary-100 text-sm mt-1">
                        Veja quem está dominando o ranking.
                    </Text>
                </View>
            </View>


            {/* AÇÕES */}
            <View className="flex-row gap-3 px-4 mt-5">

                <TouchableOpacity
                    className="flex-1 bg-primary-800 border-2 border-primary-600 rounded-2xl py-3 px-3 flex-row items-center justify-center"
                >
                    <MaterialCommunityIcons
                        name="account-plus"
                        size={20}
                        color="#c7d2fe"
                    />

                    <Text className="text-primary-100 font-poppinsBold ml-2">
                        Adicionar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 bg-primary-800 border-2 border-primary-600 rounded-2xl py-3 px-3 flex-row items-center justify-center"
                >
                    <MaterialCommunityIcons
                        name="sword-cross"
                        size={20}
                        color="#facc15"
                    />

                    <Text className="text-primary-100 font-poppinsBold ml-2">
                        Solicitações
                    </Text>

                    <View className="ml-2 bg-red-500 rounded-full min-w-5 h-5 items-center justify-center">
                        <Text className="text-white text-xs font-bold">
                            2
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>


            {/* TÍTULO DO RANKING */}
            <View className="flex-row items-center justify-between px-5 mt-7 mb-3">

                <View className="flex-row items-center">
                    <MaterialCommunityIcons
                        name="trophy"
                        size={23}
                        color="#facc15"
                    />

                    <Text className="text-white text-xl font-poppinsBold ml-2">
                        Ranking
                    </Text>
                </View>

                <Text className="text-primary-300 text-xs font-poppinsBold">
                    {amigos.length} JOGADORES
                </Text>

            </View>


            {/* LISTA */}
            <FlatList
                data={amigos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <RenderItemAmigos
                        id={item.id}
                        posicao={index + 1}
                        nome={item.nome}
                        avatarUrl={item.avatarUrl}
                        pontos={item.experiencePoints}
                    />
                )}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 30,
                    gap: 10
                }}
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
}


type RenderItemAmigosProps = {
    id: string;
    posicao: number;
    nome: string;
    avatarUrl: string;
    pontos: number;
};


function RenderItemAmigos({
    id,
    posicao,
    nome,
    avatarUrl,
    pontos
}: RenderItemAmigosProps) {

    const isTopThree = posicao <= 3;

    const medalhas = {
        1: 'crown',
        2: 'medal',
        3: 'medal-outline'
    } as const;

    return (
        <TouchableOpacity
            onPress={()=> router.push({
                pathname: '/(telas)/Usuario/[id]',
                params: {id: id}
            })}
            activeOpacity={0.8}
            className={`
                flex-row items-center
                rounded-2xl
                px-3 py-3
                border
                ${isTopThree
                    ? 'bg-primary-800 border-primary-600'
                    : 'bg-primary-900 border-primary-800'
                }
            `}
        >

            {/* POSIÇÃO */}
            <View className="w-9 items-center justify-center">

                {posicao <= 3 ? (
                    <MaterialCommunityIcons
                        name={medalhas[posicao as 1 | 2 | 3]}
                        size={25}
                        color="#facc15"
                    />
                ) : (
                    <Text className="text-primary-400 text-lg font-poppinsBold">
                        {posicao}
                    </Text>
                )}

            </View>


            {/* AVATAR */}
            <View className="
                rounded-full
                overflow-hidden
                border-2
                border-primary-500
                bg-primary-100
                ml-2
            ">
                <Image
                    source={{
                        uri: AvatarService.getAvatarUrl(avatarUrl)
                    }}
                    width={55}
                    height={55}
                />
            </View>


            {/* INFORMAÇÕES */}
            <View className="flex-1 ml-3">

                <Text
                    className="text-white text-lg font-poppinsBold"
                    numberOfLines={1}
                >
                    {nome}
                </Text>

                <View className="flex-row items-center mt-1">

                    <MaterialCommunityIcons
                        name="fire"
                        size={15}
                        color="#fb923c"
                    />

                    <Text className="text-primary-300 text-xs ml-1">
                        Em atividade
                    </Text>

                </View>

            </View>


            {/* AURA */}
            <View className="items-end">

                <View className="flex-row items-center">

                    <MaterialCommunityIcons
                        name="star-four-points"
                        size={17}
                        color="#facc15"
                    />

                    <Text className="text-yellow-300 text-lg font-poppinsBold ml-1">
                        {pontos.toLocaleString('pt-BR')}
                    </Text>

                </View>

                <Text className="text-primary-400 text-[10px] font-bold tracking-wider">
                    PONTOS
                </Text>

            </View>

        </TouchableOpacity>
    );
}