import { Text, TouchableOpacity, Dimensions, View } from 'react-native';
import CardCover from './cardCover';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

export interface cardShortHomeProps {
    id: number;
    themeId: string;
    title: string;
    detalhes: string;
    nivel: "facil" | "medio" | "dificil";
    concluido: number;
}

const tamanhoCard = (Dimensions.get('window').width - 60);

export default function CardShortHome({ themeId, title, detalhes, nivel, concluido }: cardShortHomeProps) {

    // Mapeamento numérico da dificuldade
    const estrelas: number = nivel === "facil" ? 1 : nivel === 'medio' ? 2 : 3;

    return (
        <TouchableOpacity
            style={{ width: tamanhoCard }}
            // Removida a sombra inline (boxShadow) e substituída por shadow-sm do Tailwind
            className='bg-white rounded-2xl overflow-hidden border border-slate-200 my-2 mr-4 shadow-sm active:bg-slate-50'
            activeOpacity={0.7}
        >
            <View className='flex-row m-1'>

                {/* CAPA DA MATÉRIA (Largura fixa para não esmagar o texto) */}
                <View className='rounded-xl overflow-hidden' style={{height: tamanhoCard / 3, width: tamanhoCard / 3}}>
                    <CardCover themeId={themeId} />
                </View>

                {/* CONTEÚDO */}
                <View className='py-3 px-4 flex-1 justify-between'>

                    <View>
                        <Text className='text-base font-poppinsBold text-slate-800 leading-tight' numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className='text-xs text-slate-500 mt-1' numberOfLines={2}>
                            {detalhes}
                        </Text>
                    </View>

                    <View className='flex-row items-end justify-between mt-3'>

                        {/* ESTRELAS COM CONTEXTO (Sempre renderiza 3, pintando as ativas) */}
                        <View className=' gap-1 border border-slate-200 rounded-xl py-2 px-4'>

                            <Text className='text-xs font-bold text-slate-500'>Nível:</Text>
                            <View className='flex-row gap-1 '>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <Fontisto
                                        key={index}
                                        name='fire'
                                        size={12}
                                        // Pinta de laranja se estiver dentro do nível, senão, cinza claro
                                        color={index < estrelas ? "#f59e0b" : "#e2e8f0"}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* FALSO BOTÃO (Apenas visual) - Usa o primary-50 para combinar com o Indigo */}
                        <View className='rounded-full pl-3 pr-1.5 py-1.5 bg-primary-50 flex-row gap-0.5 items-center border border-primary-100'>
                            <Text className='text-primary-600 font-bold text-[11px] uppercase tracking-wide'>
                                Estudar
                            </Text>
                            <MaterialIcons name='keyboard-arrow-right' size={16} color={"#4f46e5"} />
                        </View>

                    </View>
                </View>
            </View>

            {/* BARRA DE PROGRESSO POLIDA */}
            <View className='bg-slate-100 w-full h-1'>
                <View
                    className='bg-orange-500 h-full rounded-r-full'
                    style={{ width: `${concluido}%` }}
                />
            </View>

        </TouchableOpacity>
    );
}