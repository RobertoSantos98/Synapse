import HeaderStack from '@/src/components/headerStack';
import { useAuth } from '@/src/context/AuthContext';
import { AvatarService } from '@/src/Services/AvatarService';
import UserService from '@/src/Services/UserService';
import { AVATAR_SEEDS } from '@/src/utils/avatarSeeds';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import { useMemo, useRef } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function ConfiguracaoPerfil() {

    const { user, atualizarUser } = useAuth()


    const handleChangeAvatar = async (avatar: string) => {

        try {

            if (user) {
                console.log(user.id, avatar)
                var result = await UserService.ChangeAvatar(user.id, avatar);
                const novoUser = result;
                user.avatarUrl = novoUser.avatarUrl;
                atualizarUser(novoUser);
                Alert.alert("Avatar Atualizado!")
            }


        } catch (error: any) {
            Alert.alert("Erro", error.message);
        }


    }


    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoint = useMemo(() => ["50%"], []);
    const abrirBottomSheet = () => {
        bottomSheetRef.current?.snapToIndex(1);
    };
    const fecharBottomSheet = () => {
        bottomSheetRef.current?.close();
    };


    return (
        <View className='flex-1'>


            <View className='bg-primary-500 rounded-b-2xl'>
                <HeaderStack title='Editar Perfil' subTitle='Mude de avatar, Nome ou até mesmo seu usuário' />
            </View>

            <View className='py-8 gap-4'>
                <TouchableOpacity onPress={abrirBottomSheet} className='bg-white p-1 self-center flex-row items-center rounded-full mx-4 border border-slate-100 shadow-lg' activeOpacity={0.8}>
                    <View className='bg-primary-100 rounded-full self-start overflow-hidden border border-slate-300'>
                        <Image
                            source={{ uri: AvatarService.getAvatarUrl(user?.avatarUrl)}}
                            width={80} height={80}
                        />
                    </View>

                    <Text className='text-lg font-bold mx-4'>Clique para alterar o Avatar</Text>
                </TouchableOpacity>



            </View>


            <View>
                
                <TextInput  />
            </View>




            <BottomSheet ref={bottomSheetRef} snapPoints={snapPoint} index={-1} enablePanDownToClose>
                <BottomSheetView>

                    <View className='p-4 flex-1'>

                        <Text className='text-center text-lg font-poppinsBold mb-4'>Escolha o seu Avatar</Text>

                        <BottomSheetFlatList
                            data={AVATAR_SEEDS}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className='bg-primary-50 rounded-full border border-primary-500'
                                    onPress={() => handleChangeAvatar(item)}
                                >
                                    <Image
                                        source={{ uri: AvatarService.getAvatarUrl(item) }}
                                        style={{ width: 80, height: 80, borderRadius: 35 }}
                                    />
                                </TouchableOpacity>
                            )}
                            numColumns={4}
                            columnWrapperStyle={{
                                justifyContent: 'space-between',
                                marginBottom: 16
                            }}
                            contentContainerStyle={{
                                paddingBottom: 40
                            }}
                        />

                    </View>

                    <View style={{ height: 100 }} />
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
}