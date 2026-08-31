import { Text, TouchableOpacity, View } from 'react-native';
import { CardProps } from '../Services/CardService';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

interface CardPrimaryProps {
    card: CardProps,
}

export default function CardPrimary({ card }: CardPrimaryProps) {

    const [isFlipped, setIsFlipped] = useState(false);

    const rotation = useSharedValue(0);

    const frontAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { perspective: 1000 },
                { rotateY: `${rotation.value}deg` },
            ],
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { perspective: 1000 },
                { rotateY: `${rotation.value + 180}deg` },
            ],
        };
    });

    function handlePress() {
        rotation.value = withTiming(
            isFlipped ? 0 : 180,
            {
                duration: 600,
            }
        );

        setIsFlipped(!isFlipped);
    }

    return (
        <View className="w-full my-4 min-h-[320px] max-h-[380px]">

            {/* FRENTE */}
            <Animated.View
                style={[
                    frontAnimatedStyle,
                    {
                        backfaceVisibility: 'hidden',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    },
                ]}
            >
                <TouchableOpacity
                    activeOpacity={0.95}
                    onPress={handlePress}
                    className="w-full h-full rounded-3xl overflow-hidden border border-indigo-200/30 shadow-2xl elevation-8 bg-white"
                >
                    <LinearGradient
                        colors={['#FFFFFF', '#EEF2FF']}
                        style={{
                            flex: 1,
                            padding: 24,
                            justifyContent: 'space-between',
                        }}
                    >

                        {/* TOPO */}
                        <View className="flex-row justify-between items-center">

                            <View className="bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-200/50">
                                <Text className="text-indigo-700 text-[11px] font-poppinsBold uppercase tracking-wider">
                                    Pergunta
                                </Text>
                            </View>

                            <Text className="text-indigo-300 font-poppinsBold text-2xl">
                                #01
                            </Text>

                        </View>

                        {/* CORPO */}
                        <View className="items-center justify-center my-auto px-2">

                            <Text className="text-indigo-950 text-2xl text-center font-poppinsBold leading-snug">
                                {card.question}
                            </Text>

                            <View className="w-10 h-1 bg-indigo-400/40 rounded-full my-4" />

                            <Text className="text-indigo-400 text-xs text-center font-poppinsRegular">
                                Toque no card para revelar
                            </Text>

                        </View>

                        {/* RODAPÉ */}
                        <View className="flex-row items-center justify-center gap-1">

                            <MaterialIcons
                                name="touch-app"
                                size={14}
                                color="#818CF8"
                            />

                            <Text className="text-indigo-400/80 text-[11px] font-poppinsMedium">
                                Toque para alternar
                            </Text>

                        </View>

                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>


            {/* VERSO */}
            <Animated.View
                style={[
                    backAnimatedStyle,
                    {
                        backfaceVisibility: 'hidden',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    },
                ]}
            >
                <TouchableOpacity
                    activeOpacity={0.95}
                    onPress={handlePress}
                    className="w-full h-full rounded-3xl overflow-hidden border border-indigo-200/30 shadow-2xl elevation-8 bg-white"
                >
                    <LinearGradient
                        colors={['#EEF2FF', '#E0E7FF']}
                        style={{
                            flex: 1,
                            padding: 24,
                            justifyContent: 'space-between',
                        }}
                    >

                        {/* TOPO */}
                        <View className="flex-row justify-between items-center">

                            <View className="bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-200/50">
                                <Text className="text-indigo-700 text-[11px] font-poppinsBold uppercase tracking-wider">
                                    Resposta
                                </Text>
                            </View>

                            <Text className="text-indigo-300 font-poppinsBold text-2xl">
                                #01
                            </Text>

                        </View>

                        {/* CORPO */}
                        <View className="items-center justify-center my-auto px-2">

                            <Text className="text-indigo-950 text-2xl text-center font-poppinsBold leading-snug">
                                {card.answer}
                            </Text>

                            <View className="w-10 h-1 bg-indigo-400/40 rounded-full my-4" />

                            <Text className="text-indigo-400 text-xs text-center font-poppinsRegular">
                                Toque para voltar à pergunta
                            </Text>

                        </View>

                        {/* RODAPÉ */}
                        <View className="flex-row items-center justify-center gap-1">

                            <MaterialIcons
                                name="touch-app"
                                size={14}
                                color="#818CF8"
                            />

                            <Text className="text-indigo-400/80 text-[11px] font-poppinsMedium">
                                Toque para alternar
                            </Text>

                        </View>

                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>

        </View>
    );
}