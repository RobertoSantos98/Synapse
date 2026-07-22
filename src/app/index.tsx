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
  Animated 
} from 'react-native';
import LogoSynapse from '../Assets/logo-component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function SignIn() {
  const slideUp = useRef(new Animated.Value(0)).current;

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-primary-900">
        
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} // Tirei o padding para a curva colar nas bordas
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          scrollEnabled={false} 
        >
          <Animated.View style={{ flex: 1, justifyContent: 'center', transform: [{ translateY: slideUp }] }}>
            
            {/* 1. O FUNDO CURVO (Absolute para não empurrar nada para baixo) */}
            {/* <View className='bg-primary-950 w-[900px] h-[450px] absolute -top-56 self-center rounded-b-full shadow-lg' /> */}

            {/* 2. LOGO E TEXTOS (No fluxo normal, centralizados) */}
            <View className='items-center mb-10 mt-12'>
              <LogoSynapse className={"w-32 h-32"} />
              <Text className='uppercase text-white text-3xl font-extrabold mt-4'>Synapse</Text>
              <Text className='text-primary-400 text-lg font-semibold mt-1'>Sua Arena de Estudo</Text>
            </View>

            {/* 3. FORMULÁRIO DE LOGIN (Com margem lateral para não colar na tela) */}
            <View className='items-center bg-slate-800 py-6 px-4 gap-6 rounded-3xl shadow-xl mx-4'>
              
              <View className='self-start px-2'>
                <Text className='text-slate-200 text-2xl font-extrabold'>Bem-Vindo de volta</Text>
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
                <LinearGradient colors={["#4338ca", "#312e81"]}  className='w-full' start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
                  <TouchableOpacity onPress={() => router.replace('/(tabs)/Home')} className='flex-row w-full gap-2 items-center justify-center py-4' activeOpacity={0.7}>
                    <Text className='text-white font-extrabold text-xl tracking-wider'>Entrar</Text>
                    <MaterialCommunityIcons name='arrow-right-thick' size={20} color={"#FFF"} />
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View className='flex-row items-center justify-center gap-4 px-2 py-2'>
                <View className='h-[1px] flex-1 bg-slate-700'/>
                <Text className='text-slate-400 text-xs font-bold uppercase'>Ou Continue Com</Text>
                <View className='h-[1px] flex-1 bg-slate-700'/>
              </View>

              <TouchableOpacity className='flex-row bg-slate-200 w-full py-4 rounded-xl items-center justify-center gap-3 active:bg-slate-300'>
                <MaterialCommunityIcons name='google' size={22} color={"#334155"} />
                <Text className='font-bold text-slate-800 text-lg'>Google</Text>
              </TouchableOpacity>

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