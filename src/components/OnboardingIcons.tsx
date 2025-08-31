import React from "react";
import { View, Image } from "react-native";

interface IconProps {
  size?: number;
}

export const OnboardingIcon1 = (props: IconProps) => {
  const size = props.size ?? 300;
  return (
    <View className="items-center justify-center">
      <Image
        source={require("../../assets/onboarding-13x.png")}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};

export const OnboardingIcon2 = (props: IconProps) => {
  const size = props.size ?? 300;
  return (
    <View className="items-center justify-center">
      <Image
        source={require("../../assets/onboarding-23x.png")}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};

export const OnboardingIcon3 = (props: IconProps) => {
  const size = props.size ?? 300;
  return (
    <View className="items-center justify-center">
      <Image
        source={require("../../assets/onboarding-33x.png")}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};
