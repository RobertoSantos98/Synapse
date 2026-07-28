import CardCover from '@/src/components/cardCover';
import HeaderStack from '@/src/components/headerStack';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const tamanhoCard = (Dimensions.get('window').width - 72) / 2;

export default function CriarDeck() {
    return (
        <View className='flex-1'>

            <ScrollView className='bg-primary-500'>

                <HeaderStack title='Criar Baralho' />

                <View className='bg-white rounded-2xl p-4 mx-6'>
                    <View className='rounded-xl overflow-hidden border border-primary-200' style={{ width: tamanhoCard, height: tamanhoCard + 40 }}>
                        <CardCover />
                    </View>

                    <View className='py-4'>
                        <View className='py-2 gap-2'>
                            <Text className='text-slate-700 ml-2 font-bold'>Nome do Baralho:</Text>
                            <TextInput
                                className='border border-slate-200 bg-slate-50 rounded-xl py-4 px-2'
                            />
                        </View>
                        <View className='py-2 gap-2'>
                            <Text className='text-slate-700 ml-2 font-bold'>Descrição:</Text>
                            <TextInput
                                className='border border-slate-200 bg-slate-50 rounded-xl py-4 px-2'
                            />
                        </View>
                        <View className='py-2 gap-2'>
                            <Text className='text-slate-700 ml-2 font-bold'>Nível:</Text>
                            <TouchableOpacity className=' py-2 px-2 bg-slate-50 rounded-xl border border-slate-200 flex-row' >
                                <Text className='flex-1'>{}</Text>
                                <View className='bg-slate-200 p-2 rounded-lg self-end'>
                                    <MaterialIcons name='keyboard-arrow-down' size={18} color={"#334155"} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View className='py-2 gap-2'>
                            <Text className='text-slate-700 ml-2 font-bold'>Escolha um Tema:</Text>
                            <TouchableOpacity className=' py-2 px-2 bg-slate-50 rounded-xl border border-slate-200 flex-row' >
                                <Text className='flex-1'>{}</Text>
                                <View className='bg-slate-200 p-2 rounded-lg self-end'>
                                    <MaterialIcons name='keyboard-arrow-down' size={18} color={"#334155"} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity className='bg-primary-500 py-4 rounded-xl mt-4'>
                            <Text className='font-poppinsBold text-xl text-white text-center'>Criar</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </ScrollView>



        </View>
    );
}