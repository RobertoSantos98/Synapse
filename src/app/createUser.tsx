import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ComponentProps, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import AuthService from '../Services/AuthService';
import { router } from 'expo-router';

export default function CreateUser() {

    const height = Dimensions.get('window').height;

    const [isLoading, setIsLoading] = useState(false);

    const [nome, setNome] = useState("");
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


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
        <View className='bg-primary-100 flex-1 justify-center'>
            <View className='bg-primary-800 absolute top-0 ' style={{ height: height / 2, width: "100%" }} />

            <View className='bg-slate-900/80 mx-4 p-4 rounded-2xl gap-4 -top-14'>
                <View className='mb-4'>
                    <Text className='text-2xl font-poppinsBold text-slate-100'>Sejá Bem-Vindo!</Text>
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

                <View className='w-full rounded-xl overflow-hidden shadow-lg shadow-primary-500/30'>
                    <LinearGradient colors={["#4338ca", "#312e81"]} className='w-full' start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                        <TouchableOpacity onPress={() => handlePost()} className='flex-row w-full gap-2 items-center justify-center py-4' activeOpacity={0.7}>
                            {isLoading ? <ActivityIndicator size={22} color={"#fff"} /> :
                                <View className='flex-row gap-2'>
                                    <Text className='text-white font-extrabold text-xl tracking-wider'>Criar Conta</Text>
                                    <MaterialCommunityIcons name='arrow-right' size={16} color={"#FFF"} />
                                </View>
                            }
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

            </View>

            <TouchableOpacity className='py-4 mx-4 rounded-2xl' onPress={() => router.back()}>
                <Text className='text-xl text-primary-500 text-center'>Volta para tela de Login</Text>
            </TouchableOpacity>
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