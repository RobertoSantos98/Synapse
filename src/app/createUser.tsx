import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ComponentProps, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import AuthService from '../Services/AuthService';
import { router } from 'expo-router';
import CircuitBackground from '../Assets/circuitBackGround';

export default function CreateUser() {

    const [isLoading, setIsLoading] = useState(false);

    const [nome, setNome] = useState("");
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const width = Dimensions.get("window").width


    const handlePost = async () => {

        if (!nome || !usuario || !email || !password) {
            Alert.alert("Preencha todos os campos");
            return;
        }

        const createuser = {
            nome: nome.trim(),
            usuario:usuario.trim(),
            email: email.trim().toLowerCase(),
            password
        }

        setIsLoading(true)

        try {
            await AuthService.CreateUser(createuser);

        } catch (error: any) {
            console.log("Erro: ", error.message)
        } finally {
            setIsLoading(false)
        }

    }


    return (
        <View className='flex-1 justify-center items-center'>

            <CircuitBackground/>

            <View className='bg-slate-900 border border-primary-300 items-center justify-center' style={{width: 650, borderRadius: 9999}}>

                <View style={{width: width - 48, height: "70%" , gap: 16, alignItems: 'center', justifyContent: 'center' }}>
                    <View className='mb-4'>
                        <Text className='text-2xl font-poppinsBold text-slate-100'>Seja Bem-Vindo!</Text>
                        <Text className='text-sm text-slate-300'>Crie seu login para acessar o app.</Text>
                    </View>

                    <TextInputSignIn
                        icon='account'
                        placeholder='Nome'
                        value={nome}
                        onChangeText={setNome}
                    />

                    <TextInputSignIn
                        icon='account-details'
                        placeholder='Usuário'
                        value={usuario}
                        onChangeText={setUsuario}
                    />

                    <TextInputSignIn
                        icon='email'
                        placeholder='Email'
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInputSignIn
                        icon='lock-outline'
                        isPassword
                        placeholder='Senha'
                        value={password}
                        onChangeText={setPassword}
                    />

                    <View className='w-full rounded-xl overflow-hidden shadow-lg shadow-primary-500/30 border border-primary-500'>
                        <LinearGradient colors={["#4338ca", "#312e81"]} className='w-full' start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                            <TouchableOpacity onPress={() => handlePost()} className='flex-row w-full gap-2 items-center justify-center py-4' activeOpacity={0.7}>
                                {isLoading ? <ActivityIndicator size={22} color={"#fff"} /> :
                                    <View className='flex-row gap-2 items-center'>
                                        <Text className='text-white font-extrabold text-xl tracking-wider'>Criar Conta</Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                <TouchableOpacity className='py-4 mx-4 rounded-2xl flex-row gap-2 items-center' onPress={() => router.back()}>
                    <MaterialCommunityIcons name='arrow-left' color={"#c7d2fe"} size={18} />
                    <Text className='text-lg text-primary-200 text-center'>Volta para tela de Login</Text>
                </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}





interface TextInputSignInProps extends TextInputProps {
    icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
    isPassword?: boolean;
}

export const TextInputSignIn = ({ icon, isPassword = false, ...rest }: TextInputSignInProps) => {
    const [hidePassword, setHidePassword] = useState(isPassword);

    return (
        <View className='flex-row bg-slate-900 px-4 border border-slate-700 items-center w-full rounded-xl focus:border-primary-500'>
            <MaterialCommunityIcons name={icon} size={24} color={"#64748b"} />

            <TextInput
                className='ml-3 flex-1 text-white py-4 font-medium'
                placeholderTextColor="#64748b"
                secureTextEntry={hidePassword}
                {...rest}
            />

            {isPassword && (
                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} className="p-2">
                    <MaterialCommunityIcons
                        name={hidePassword ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color={"#64748b"}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}