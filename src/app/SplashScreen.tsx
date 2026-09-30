import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function SplashScreenAuth({ onFinish }) {
  // Animation Shared Values
  const cardLeftTranslateX = useSharedValue(-150);
  const cardLeftOpacity = useSharedValue(0);
  
  const cardRightTranslateX = useSharedValue(150);
  const cardRightOpacity = useSharedValue(0);

  const lightningScale = useSharedValue(2);
  const lightningOpacity = useSharedValue(0);
  
  const shockwaveScale = useSharedValue(0.2);
  const shockwaveOpacity = useSharedValue(0);

  const orbScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  useEffect(() => {
    // 1. Cards Slide In with Spring
    cardLeftTranslateX.value = withSpring(-18, { damping: 12, stiffness: 90 });
    cardLeftOpacity.value = withTiming(1, { duration: 400 });

    cardRightTranslateX.value = withDelay(
      150,
      withSpring(18, { damping: 12, stiffness: 90 })
    );
    cardRightOpacity.value = withDelay(150, withTiming(1, { duration: 400 }));

    // 2. Lightning Bolt Strike & Shockwave Impact
    lightningScale.value = withDelay(
      450,
      withSpring(1, { damping: 10, stiffness: 120 })
    );
    lightningOpacity.value = withDelay(450, withTiming(1, { duration: 200 }));

    shockwaveScale.value = withDelay(
      480,
      withTiming(2.2, { duration: 800, easing: Easing.out(Easing.quad) })
    );
    shockwaveOpacity.value = withDelay(
      480,
      withSequence(
        withTiming(0.8, { duration: 100 }),
        withTiming(0, { duration: 700 })
      )
    );

    // 3. Floating Orbs Reveal
    orbScale.value = withDelay(
      600,
      withSpring(1, { damping: 8, stiffness: 100 })
    );

    // 4. Text Fade In
    textOpacity.value = withDelay(750, withTiming(1, { duration: 500 }));
    textTranslateY.value = withDelay(
      750,
      withSpring(0, { damping: 14, stiffness: 100 })
    );

    // 5. Callback to main app after animation completes (e.g. 2.5s)
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Animated Styles
  const cardLeftStyle = useAnimatedStyle(() => ({
    opacity: cardLeftOpacity.value,
    transform: [
      { translateX: cardLeftTranslateX.value },
      { translateY: 10 },
      { rotate: '-12deg' },
    ],
  }));

  const cardRightStyle = useAnimatedStyle(() => ({
    opacity: cardRightOpacity.value,
    transform: [
      { translateX: cardRightTranslateX.value },
      { translateY: -10 },
      { rotate: '12deg' },
    ],
  }));

  const lightningStyle = useAnimatedStyle(() => ({
    opacity: lightningOpacity.value,
    transform: [{ scale: lightningScale.value }],
  }));

  const shockwaveStyle = useAnimatedStyle(() => ({
    opacity: shockwaveOpacity.value,
    transform: [{ scale: shockwaveScale.value }],
  }));

  const orbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: orbScale.value }],
  }));

  const textContainerStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#1e1b4b" /> */}

      {/* Main Logo Graphic Group */}
      <View style={styles.logoContainer}>
        {/* Shockwave Energy Ring */}
        <Animated.View style={[styles.shockwave, shockwaveStyle]} />

        {/* Floating Orbs */}
        <Animated.View style={[styles.orb, styles.orbYellow1, orbStyle]} />
        <Animated.View style={[styles.orb, styles.orbPurple1, orbStyle]} />
        <Animated.View style={[styles.orb, styles.orbYellow2, orbStyle]} />
        <Animated.View style={[styles.orb, styles.orbPurple2, orbStyle]} />

        {/* Left Card (= Symbol) */}
        <Animated.View style={[styles.card, styles.cardLeft, cardLeftStyle]}>
          <View style={styles.equalIconContainer}>
            <View style={styles.equalBar} />
            <View style={styles.equalBar} />
          </View>
        </Animated.View>

        {/* Right Card (+ Symbol) */}
        <Animated.View style={[styles.card, styles.cardRight, cardRightStyle]}>
          <Text style={styles.plusSymbol}>+</Text>
        </Animated.View>

        {/* Central Lightning Bolt SVG */}
        <Animated.View style={[styles.lightningContainer, lightningStyle]}>
          <Svg width={140} height={180} viewBox="0 0 100 130" fill="none">
            <Defs>
              <LinearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#fffbeb" />
                <Stop offset="30%" stopColor="#fde047" />
                <Stop offset="70%" stopColor="#f59e0b" />
                <Stop offset="100%" stopColor="#d97706" />
              </LinearGradient>
            </Defs>
            <Path
              d="M 62 4 L 18 68 L 48 68 L 32 124 L 84 52 L 52 52 L 62 4 Z"
              fill="url(#boltGrad)"
              stroke="#78350f"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </Svg>
        </Animated.View>
      </View>

      {/* Title & Tagline */}
      <Animated.View style={[styles.textContainer, textContainerStyle]}>
        <Text style={styles.title}>SYNAPSE</Text>
        <Text style={styles.tagline}>CONNECT • EMPOWER • ACCELERATE</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1b4b', // Indigo 900 (Use #3730a3 for Indigo 800)
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: 130,
    height: 160,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  cardLeft: {
    backgroundColor: '#2e1065',
  },
  cardRight: {
    backgroundColor: '#1e293b',
  },
  equalIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(199, 210, 254, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  equalBar: {
    width: 24,
    height: 4,
    backgroundColor: '#c7d2fe',
    borderRadius: 2,
  },
  plusSymbol: {
    fontSize: 52,
    fontWeight: 'bold',
    color: 'rgba(191, 219, 254, 0.7)',
  },
  lightningContainer: {
    zIndex: 20,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 15,
  },
  shockwave: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#f59e0b',
  },
  orb: {
    position: 'absolute',
    borderRadius: 50,
    zIndex: 15,
  },
  orbYellow1: {
    top: 10,
    left: 20,
    width: 18,
    height: 18,
    backgroundColor: '#f59e0b',
  },
  orbYellow2: {
    bottom: 20,
    right: 25,
    width: 24,
    height: 24,
    backgroundColor: '#f1c40f',
  },
  orbPurple1: {
    top: -5,
    right: 60,
    width: 26,
    height: 26,
    backgroundColor: '#8b5cf6',
  },
  orbPurple2: {
    bottom: 30,
    left: 15,
    width: 16,
    height: 16,
    backgroundColor: '#a855f7',
  },
  textContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 3,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '700',
    color: '#a5b4fc',
    marginTop: 8,
    letterSpacing: 2,
  },
});
