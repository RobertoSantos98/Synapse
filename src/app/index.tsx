import React, { ComponentProps, useState, useEffect, useRef } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInputProps,
  Animated,
  ActivityIndicator
} from 'react-native';
import LogoSynapse from '../Assets/logo-component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import CircuitBackground from '../Assets/circuitBackGround';
import UserService from '../Services/UserService';

export default function SignIn() {
  const slideUp = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        Animated.timing(slideUp, {
          toValue: -120, // Ajustado para subir de forma suave
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    );

    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(slideUp, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);

    const payload = {
      email: email,
      password: password
    }

    try {
      const response = await UserService.Logar(payload);

      router.replace("/(tabs)/Home");

    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-primary-900">

        <CircuitBackground />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} // Tirei o padding para a curva colar nas bordas
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          <Animated.View style={{ flex: 1, justifyContent: 'center', transform: [{ translateY: slideUp }] }}>

            <View className='items-center py-6 mb-8 mt-12'>
              <LogoSynapse className={"w-32 h-32"} />
              <Text className='uppercase text-white text-3xl font-extrabold mt-4'>Synapse</Text>
              <Text className='text-primary-400 text-lg font-semibold mt-1'>Sua Arena de Estudo</Text>
            </View>

            {/* 3. FORMULÁRIO DE LOGIN (Com margem lateral para não colar na tela) */}
            <View className='items-center flex-1 bg-slate-800 px-6 gap-6 rounded-t-3xl shadow-xl'>

              <View className='py-4'>
                <View className='h-1 w-16 rounded-full bg-slate-700' />
              </View>

              <View className='self-start px-2 gap-1'>
                <Text className='text-slate-200 text-2xl font-extrabold'>Bem-Vindo de Volta!</Text>
                <Text className='text-slate-400 text-sm mt-1'>Entre com seu usuário e senha</Text>
              </View>

              <TextInputSignIn
                icon='email'
                placeholder='Digite seu usuário'
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <View className='gap-2 w-full'>
                <TextInputSignIn
                  icon='lock-outline'
                  placeholder='Digite sua Senha'
                  isPassword={true}
                />
                <TouchableOpacity className='self-end'>
                  <Text className='text-primary-500 text-sm font-bold mt-2 pr-2'>Esqueceu a Senha?</Text>
                </TouchableOpacity>
              </View>

              <View className='w-full rounded-xl overflow-hidden shadow-lg shadow-primary-500/30'>
                <LinearGradient colors={["#4338ca", "#312e81"]} className='w-full' start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  <TouchableOpacity onPress={() => router.replace('/(tabs)/Home')} className='flex-row w-full gap-2 items-center justify-center py-4' activeOpacity={0.7}>
                    {isLoading? <ActivityIndicator size={22} color={"#fff"} /> : 
                      <View className='flex-row gap-2'>
                        <Text className='text-white font-extrabold text-xl tracking-wider'>Entrar</Text>
                        <MaterialCommunityIcons name='arrow-right' size={16} color={"#FFF"} />
                      </View>
                    }
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View className='flex-row items-center justify-center gap-4 px-2 py-2'>
                <View className='h-[1px] flex-1 bg-slate-700' />
                <Text className='text-slate-400 text-xs font-bold uppercase'>Ou Continue Com</Text>
                <View className='h-[1px] flex-1 bg-slate-700' />
              </View>

              <TouchableOpacity className='flex-row bg-slate-200 w-full py-4 rounded-xl items-center justify-center gap-3 active:bg-slate-300'>
                <MaterialCommunityIcons name='google' size={22} color={"#334155"} />
                <Text className='font-bold text-slate-800 text-lg'>Google</Text>
              </TouchableOpacity>

              <View className='flex-row py-2'>
                <Text className='text-slate-400 text-md'>Não tem uma conta? </Text>
                <TouchableOpacity>
                  <Text className='text-primary-500 text-md'>Crie uma Grátis</Text>
                </TouchableOpacity>
              </View>

            </View>

          </Animated.View>
        </ScrollView>

      </View>
    </TouchableWithoutFeedback>
  );
}

// ... componente TextInputSignIn continua igual

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