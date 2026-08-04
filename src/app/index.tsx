import React, { ComponentProps, useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import LogoSynapse from '../Assets/logo-component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import CircuitBackground from '../Assets/circuitBackGround';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import UserService from './Services/UserService';
import { useAuth } from '../context/AuthContext';


export default function SignIn() {
  const slideUp = useRef(new Animated.Value(0)).current;
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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


  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, [])
  const snapPoints = useMemo(() => ["80%"], [])

  const abrirBottomSheet = () => {
    bottomSheetRef.current?.expand();
  }
  const fecharBottomSheet = () => {
    bottomSheetRef.current?.close();
  }

  const handleLogin = async () => {
    setIsLoading(true)
    try {

      const userToken = await UserService.SignIn(email, password);
      await signIn(userToken)

    } catch (error: any) {
      Alert.alert("Error", "Algo de errado: ", error.message)

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
            <View className='items-center flex-1 bg-slate-800/80 px-6 gap-6 rounded-t-3xl shadow-xl'>

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
                value={email}
                onChangeText={setEmail}
              />

              <View className='gap-2 w-full'>
                <TextInputSignIn
                  icon='lock-outline'
                  placeholder='Digite sua Senha'
                  isPassword={true}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity className='self-end'>
                  <Text className='text-primary-500 text-sm font-bold mt-2 pr-2'>Esqueceu a Senha?</Text>
                </TouchableOpacity>
              </View>

              <View className='w-full rounded-xl overflow-hidden shadow-lg shadow-primary-500/30 border border-primary-500'>
                <LinearGradient colors={["#4338ca", "#312e81"]} className='w-full' start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  <TouchableOpacity
                    onPress={handleLogin}
                    className='flex-row w-full justify-center py-4'
                    activeOpacity={0.7}
                    disabled={isLoading}
                  >
                    {isLoading ? <ActivityIndicator size={22} color={"#fff"} /> : (
                      <View className='flex-row gap-2 items-center'>
                        <Text className='text-white font-extrabold text-xl tracking-wider'>Entrar</Text>
                        <MaterialCommunityIcons name='arrow-right' size={16} color={"#FFF"} />
                      </View>
                    )}
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
                <TouchableOpacity onPress={abrirBottomSheet}>
                  <Text className='text-primary-500 text-md'>Crie uma Grátis</Text>
                </TouchableOpacity>
              </View>

            </View>

          </Animated.View>
        </ScrollView>

        <BottomSheet
          index={-1}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          enablePanDownToClose
          backgroundStyle={{
            backgroundColor: "#1E293B",

          }}
          handleIndicatorStyle={{
            backgroundColor: "#F8FAFC",
            width: 50,
            height: 4,
          }}
        >
          <BottomSheetView>
            <CreateAcount />
          </BottomSheetView>

        </BottomSheet>

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
        className='ml-3 flex-1 text-white py-5 font-medium'
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

const CreateAcount = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const handleCreateUser = async () => {

    const data = {
      nome: nome,
      usuario: usuario,
      email: email,
      password: password
    }

    try {
      setIsLoading(true);

      const response = await UserService.PostUser(data);
      router.push("/(tabs)/Home")

    } catch (error) {
      console.log(error)

    } finally {
      setIsLoading(false);

    }



  }


  return (
    <View className='flex-1 gap-8'>
      <View className='gap-2 px-6'>
        <Text className='text-white text-2xl font-poppinsBold'>Criar Conta</Text>
        <Text className='text-slate-400 text-sm'>Crie uma conta gratuitamente agora mesmo. É Rápido!</Text>
      </View>

      <View className='px-6 gap-6'>
        <TextInputSignIn
          icon='account'
          placeholder='Digite seu Nome'
          value={nome}
          onChangeText={setNome}
        />
        <TextInputSignIn
          icon='account-box-multiple'
          placeholder='Digite seu Usuário'
          value={usuario}
          onChangeText={setUsuario}
        />
        <TextInputSignIn
          icon='email'
          placeholder='Digite seu Email'
          value={email}
          onChangeText={setEmail}
        />
        <TextInputSignIn
          icon='eye'
          placeholder='Digite sua Senha'
          isPassword={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          className='py-4 border border-primary-500 items-center rounded-xl overflow-hidden'
          disabled={isLoading}
          onPress={handleCreateUser}
        >
          <LinearGradient colors={["#4338ca", "#312e81"]} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
          {isLoading ? <ActivityIndicator size={22} color={"#fff"} /> : <Text className='text-xl font-bold text-white'>Criar</Text>}
        </TouchableOpacity>
      </View>


    </View>
  )
}