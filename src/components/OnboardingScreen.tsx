import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import {
  OnboardingIcon1,
  OnboardingIcon2,
  OnboardingIcon3,
} from "./OnboardingIcons";

const { width } = Dimensions.get("window");

interface OnboardingData {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const onboardingData: OnboardingData[] = [
  {
    id: 1,
    icon: <OnboardingIcon1 />,
    title: "Compra ahora y\npaga después",
    description:
      "Compra tus productos favoritos, pagando\nen cuotas flexibles.",
  },
  {
    id: 2,
    icon: <OnboardingIcon2 />,
    title: "Gestiona tus\ncompras y cuotas",
    description:
      "Gestiona tus compras y realiza tus pagos\nsin complicaciones.",
  },
  {
    id: 3,
    icon: <OnboardingIcon3 />,
    title: "Un nuevo mundo\nde compras",
    description:
      "Únete al futuro, y descubre la comodidad\ny flexibilidad de comprar con Finity.",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);
  const progress = useRef(new Animated.Value(0)).current; // 0..1 para slide actual
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Config
  const AUTO_SCROLL_INTERVAL = 4000; // ms
  const LOOP = true; // volver al inicio al terminar
  const BAR_TOTAL_WIDTH = 90; // ancho total disponible (suma de barras + gaps) si se usa cálculo, opcional
  const BAR_WIDTH = 40; // ancho de cada barra de fondo
  const BAR_HEIGHT = 4; // alto de la barra
  const BAR_GAP = 8; // separación entre barras

  // Inicia animación cada vez que cambia currentIndex
  useEffect(() => {
    startProgressAnimation();
    // limpiar al desmontar
    return () => animationRef.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const startProgressAnimation = () => {
    progress.setValue(0);
    animationRef.current?.stop();
    animationRef.current = Animated.timing(progress, {
      toValue: 1,
      duration: AUTO_SCROLL_INTERVAL,
      easing: Easing.linear,
      useNativeDriver: false, // width animada
    });
    animationRef.current.start(({ finished }) => {
      if (!finished) return;
      let next = currentIndex + 1;
      if (next >= onboardingData.length) {
        if (LOOP) {
          next = 0;
        } else {
          return; // detener
        }
      }
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setCurrentIndex(next);
    });
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    if (pageNum !== currentIndex) {
      animationRef.current?.stop();
      setCurrentIndex(pageNum);
    }
  };

  const handleLogin = () => {
    console.log("Navegando a login...");
  };

  const handleRegister = () => {
    console.log("Navegando a registro...");
  };

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <View className="flex-1">
        {/* Top dots indicator */}
        <View className="flex-row justify-center mt-20 mb-6">
          {onboardingData.map((_, index) => {
            const isPast = index < currentIndex;
            const isCurrent = index === currentIndex;
            // Animated width para el slide actual
            const animatedWidth = isCurrent
              ? progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, BAR_WIDTH],
                })
              : undefined;
            return (
              <View
                key={index}
                style={{
                  width: BAR_WIDTH,
                  height: BAR_HEIGHT,
                  borderRadius: BAR_HEIGHT / 2,
                  backgroundColor: "#2e2e2e",
                  overflow: "hidden",
                  marginHorizontal: BAR_GAP / 2,
                }}
              >
                {isPast && (
                  <View
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      right: 0,
                      backgroundColor: "#B6FF3B", // primary
                    }}
                  />
                )}
                {isCurrent && (
                  <Animated.View
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: animatedWidth,
                      backgroundColor: "#B6FF3B",
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>

        {/* Scrollable content */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          className="flex-1"
        >
          {onboardingData.map((item, index) => (
            <View key={item.id} className="px-8" style={{ width }}>
              <View className="flex-1 justify-center items-center">
                {/* Icon container */}
                <View className="w-80 h-80 rounded-full bg-[#EFFFD6] items-center justify-center mb-12">
                  {item.icon}
                </View>

                {/* Title */}
                <Text className="text-white text-3xl font-bold text-center mb-6 leading-10">
                  {item.title}
                </Text>

                {/* Description */}
                <Text className="text-gray-300 text-base text-center leading-6 px-4">
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Bottom section with buttons */}
        <View className="px-8 pb-8">
          {/* Login Button */}
          <TouchableOpacity
            className="bg-primary py-4 rounded-full mb-4"
            onPress={handleLogin}
          >
            <Text className="text-black text-lg font-semibold text-center">
              Ingresar
            </Text>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity
            className="bg-white py-4 rounded-full mb-6"
            onPress={handleRegister}
          >
            <Text className="text-black text-lg font-semibold text-center">
              Registrarme
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
