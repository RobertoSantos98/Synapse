import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { deckProps } from '../Services/BaralhoService';
import CardCover from './cardCover';
import { useEffect, useState } from 'react';
import UserService from '../Services/UserService';
import { User } from '../types/auth';
import { AvatarService } from '../Services/AvatarService';
import { router } from 'expo-router';
import { Skeleton } from './Skeleton';

export interface MiniDeckHorizontalProps  {
    title: string,
    decks: deckProps[]
}

export default function MiniDeckHorizontal({title, decks}: MiniDeckHorizontalProps) {
 return (
   <View className='pt-4'>
        <SectionHeader title={title} />

        <FlatList
            data={decks}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <RenderItemsMiniDecks deck={item}/>}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                gap: 12,
                paddingHorizontal: 24,
                paddingBottom: 8
            }}
        />

   </View>
  );
}

type SectionHeaderProps = {
    title: string
}
function SectionHeader({ title }: SectionHeaderProps) {
    return(
        <View className='flex-row px-6 pb-3 justify-between items-center'>
            <Text className='text-lg text-primary-950 font-poppinsBold'>{title}</Text>
            <TouchableOpacity className='flex-row gap-1 items-center'>
                <Text className='text-xs text-primary-600 tracking-tighter uppercase'>Todos</Text>
                <MaterialIcons name="arrow-forward-ios" size={10} color="#6366f1" />
            </TouchableOpacity>
        </View>
    )
}

const tamanhoWigth = Dimensions.get("window").width - 70

type RenderItemDecksProps = {
    deck: deckProps
}
function RenderItemsMiniDecks({deck}: RenderItemDecksProps) {

    const [loading, setLoading ] = useState<boolean>(true);
    
    const [ user, setUser ] = useState<User>();
    const nivel = deck.level === "facil" ? 1 : deck.level === "medio" ? 2 : 3;
    
    useEffect(() => {
        let isMounted = true;
        const handleUser = async () => {
            try {
                const response = await UserService.GetUserById(deck.userId);
                if(isMounted) setUser(response);
            } catch (error) {
                console.log("Erro ao buscar usuário: ", error)
            } finally{

                if(isMounted) setLoading(false);
            }
        }
        handleUser();

        return () => {
            isMounted = false;
        };
    }, [deck.userId]);


    if(loading){
        return(
            <Skeleton width={tamanhoWigth / 2} height={tamanhoWigth / 2 + 40}  />
        )
    }


    return (
        <TouchableOpacity 
            onPress={() => router.push(`/(telas)/biblioteca/${deck.id}`)}
            activeOpacity={0.8} 
            className='p-1 bg-white rounded-2xl shadow-sm relative border border-slate-100' 
            style={{width: tamanhoWigth / 2}}
        >

            <View className='h-32 border border-primary-100 rounded-xl overflow-hidden relative'>
                <CardCover themeId={deck.themeId} />
                <View className='absolute flex-row top-2 right-2 gap-1 bg-white/80 py-1 px-2 rounded-full border border-primary-100'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Fontisto key={index} name='fire' size={10} color={index < nivel ? "#f59e0b" : "#e0e7ff"} />
                    ))}
                </View>
            </View>

            <View className='p-2 gap-1'>
                <Text className='text-lg text-slate-800 font-poppinsBold' numberOfLines={1}>{deck.title}</Text>
                <Text className='text-xs text-slate-500' numberOfLines={1}>{deck.details}</Text>

                <View className='flex-row gap-1.5 mt-1 pt-2 items-center border-t border-slate-100'>
                    {user?.avatarUrl
                    ?   <Image source={{ uri: AvatarService.getAvatarUrl(user.avatarUrl)}} style={{width: 14, height: 14}} />
                    :   <MaterialIcons name='account-circle' color={"#6366f1"} size={14}/>}

                    <Text className='text-xs text-slate-400'>@{user?.usuario}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}