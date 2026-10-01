import HeaderStack from '@/src/components/headerStack';
import { useAuth } from '@/src/context/AuthContext';
import { AvatarService } from '@/src/Services/AvatarService';
import UserService from '@/src/Services/UserService';
import { AVATAR_SEEDS } from '@/src/utils/avatarSeeds';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useRef, useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'; // 💡 Importação limpa do TextInput nativo

export default function ConfiguracaoPerfil() {
    const { user, atualizarUser } = useAuth();

    // 💡 Inicializando com os dados reais para evitar envio de campos vazios
    const [novoNome, setNovoNome] = useState<string>("");
    const [usuario, setUsuario] = useState<string>("");
    const [metaDiaria, setMetaDiaria] = useState<string>("");

    // Alimenta os campos assim que o usuário carregar
    useEffect(() => {
        if (user) {
            setNovoNome(user.nome || "");
            setUsuario(user.usuario || "");
            setMetaDiaria(user.metaDiaria?.toString() || "");
        }
    }, [user]);

    const handleChangeAvatar = async (avatar: string) => {
        try {
            if (user) {
                const result = await UserService.ChangeAvatar(user.id, avatar);
                user.avatarUrl = result.avatarUrl;
                atualizarUser(result);
                Alert.alert("Sucesso", "Avatar Atualizado!");
                fecharBottomSheet(); // 💡 Fecha automaticamente ao escolher
            }
        } catch (error: any) {
            Alert.alert("Erro", error.message);
        }
    };

    const handleSalvarAlteracoes = async () => {
        // Aqui você implementará a rota de salvar dados textuais usando novoNome, usuario, metaDiaria
        Alert.alert("Sucesso", "Perfil atualizado!");
    };

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoint = useMemo(() => ["50%"], []);
    
    // 💡 Corrigido de 1 para 0 (já que seu snapPoint só tem 1 posição)
    const abrirBottomSheet = () => bottomSheetRef.current?.snapToIndex(0); 
    const fecharBottomSheet = () => bottomSheetRef.current?.close();

    return (
        <View className='flex-1 bg-slate-50'>
            <View className='bg-primary-500 rounded-b-2xl'>
                <HeaderStack title='Editar Perfil' subTitle='Mude de avatar, nome ou usuário' />
            </View>

            <View className='py-8 gap-4 mx-4 flex-1'>
                <TouchableOpacity 
                    onPress={abrirBottomSheet} 
                    className='bg-white p-2 self-center flex-row items-center rounded-full border border-slate-100 shadow-md mb-4' 
                    activeOpacity={0.8}
                >
                    <View className='bg-primary-100 rounded-full overflow-hidden border border-slate-200'>
                        {user?.avatarUrl ? (
                            <Image
                                source={{ uri: AvatarService.getAvatarUrl(user.avatarUrl) }}
                                style={{ width: 80, height: 80 }}
                            />
                        ) : (
                            <MaterialCommunityIcons name='account' size={80} color={"#6366f1"} />
                        )}
                    </View>
                    <Text className='text-sm font-bold mx-4 text-slate-700'>Alterar Avatar</Text>
                </TouchableOpacity>

                <TextInputModerno title="Nome" text={novoNome} setText={setNovoNome} placeholder="Digite seu nome" />
                <TextInputModerno title="Usuário" text={usuario} setText={setUsuario} placeholder="Digite seu usuário" />
                <TextInputModerno title="Meta Diária" text={metaDiaria} setText={setMetaDiaria} placeholder="Ex: 2000" numeros={true} />

                <TouchableOpacity 
                    onPress={handleSalvarAlteracoes}
                    className='py-4 items-center rounded-2xl border border-primary-900 overflow-hidden mt-4'
                >
                    <LinearGradient colors={["#3730a3", "#6366f1"]} style={[StyleSheet.absoluteFill]} />
                    <Text className='text-base font-bold text-slate-50'>Salvar Alterações</Text>
                </TouchableOpacity>
            </View>

            <BottomSheet ref={bottomSheetRef} snapPoints={snapPoint} index={-1} enablePanDownToClose detached={true} bottomInset={-100}>
                {/* 💡 Removido BottomSheetView para evitar bugs de tamanho na lista */}
                <BottomSheetFlatList
                    data={AVATAR_SEEDS}
                    keyExtractor={(item) => item}
                    ListHeaderComponent={() => (
                        <Text className='text-center text-lg font-bold my-4 text-slate-800'>Escolha o seu Avatar</Text>
                    )}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className='bg-slate-50 rounded-full border border-slate-200 p-1 shadow-sm'
                            onPress={() => handleChangeAvatar(item)}
                        >
                            <Image
                                source={{ uri: AvatarService.getAvatarUrl(item) }}
                                style={{ width: 70, height: 70, borderRadius: 35 }}
                            />
                        </TouchableOpacity>
                    )}
                    numColumns={4}
                    columnWrapperStyle={{
                        justifyContent:'space-evenly',
                        marginBottom: 16
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingBottom: 40
                    }}
                />
            </BottomSheet>
        </View>
    );
}

type TextInputModernoProps = {
    text: string;
    setText: (text: string) => void;
    title?: string | null;
    placeholder?: string;
    numeros?: boolean;
}

export function TextInputModerno({ text, setText, title, placeholder, numeros }: TextInputModernoProps) {
    const [selecionado, setSelecionado] = useState<boolean>(false);

    return (
        <View
            className="rounded-2xl h-[76px] px-4 justify-center shadow-sm"
            style={{
                borderWidth: 2,
                borderColor: selecionado ? "#6366f1" : "#e2e8f0",
                backgroundColor: selecionado ? "#f8fafc" : "#ffffff",
            }}
        >
            {title && (
                <Text className="text-slate-400 font-bold text-xs mb-0.5">{title}</Text>
            )}
            <TextInput
                style={{ fontFamily: 'poppinsBold' }}
                className="text-base text-slate-800 p-0"
                onFocus={() => setSelecionado(true)}
                onBlur={() => setSelecionado(false)}
                onChangeText={setText}
                value={text}
                placeholder={placeholder}
                placeholderTextColor="#cbd5e1"
                keyboardType={numeros ? "numeric" : "default"}
            />
        </View>
    );
}
