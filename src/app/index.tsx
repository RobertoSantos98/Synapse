import React, { ComponentProps, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInputProps
} from 'react-native';
import LogoSynapse from '../Assets/logo-component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function SignIn() {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-slate-900"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className='justify-center items-center mb-4'>
            <View className='bg-slate-950 p-6 items-center gap-6 justify-center rounded-3xl shadow-lg'>
              <View className='items-center'>
                <LogoSynapse className={"w-32 h-32"} />
              </View>

              <View className='items-center gap-2'>
                <Text className='uppercase text-white text-2xl font-extrabold'>Synapse</Text>
                <Text className='text-emerald-500 text-lg font-semibold'>Sua Arena de Estudo</Text>
              </View>
            </View>
          </View>

          <View className='items-center w-full bg-slate-800 py-6 px-4 gap-6 rounded-2xl shadow-xl'>
            
            <View className='self-start'>
              <Text className='text-slate-200 text-2xl font-extrabold'>Bem-Vindo de volta</Text>
              <Text className='text-slate-400 text-sm'>Entre com seu usuário e senha</Text>
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
                <Text className='text-slate-400 text-sm font-bold mt-1'>Esqueceu a Senha?</Text>
              </TouchableOpacity>
            </View>

            <View className='w-full rounded-xl overflow-hidden shadow-lg shadow-emerald-500/30'>
              <LinearGradient colors={["#10b981", "#047857"]} className='w-full rounded-xl' start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
                <TouchableOpacity onPress={() => router.replace('/(tabs)/Home')} className='flex-row w-full gap-2 items-center justify-center py-4' activeOpacity={0.7}>
                  <Text className='text-white font-extrabold text-xl tracking-wider'>Entrar</Text>
                  <MaterialCommunityIcons name='arrow-right-thick' size={20} color={"#FFF"} />
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <View className='flex-row items-center justify-center gap-2 px-6 py-2'>
              <View className='h-[1px] flex-1 bg-slate-600'/>
              <Text className='text-slate-400 text-sm font-bold uppercase'>Ou Continue Com</Text>
              <View className='h-[1px] flex-1 bg-slate-600'/>
            </View>

            <View className="w-full">
              <TouchableOpacity className='flex-row bg-slate-200 w-full py-4 rounded-xl items-center justify-center gap-3 active:bg-slate-300'>
                <MaterialCommunityIcons name='google' size={22} color={"#334155"} />
                <Text className='font-bold text-slate-800 text-lg'>Google</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
        
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

interface TextInputSignInProps extends TextInputProps {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  isPassword?: boolean;
}

export const TextInputSignIn = ({ icon, isPassword = false, ...rest }: TextInputSignInProps) => {
  const [hidePassword, setHidePassword] = useState(isPassword);

  return (
    <View className='flex-row bg-slate-900 px-4 border border-slate-700 items-center w-full rounded-xl focus:border-emerald-500'>
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