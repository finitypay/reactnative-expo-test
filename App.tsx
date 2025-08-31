import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import OnboardingScreen from "./src/components/OnboardingScreen";
import "./global.css";

export default function App() {
  return (
    <View className="flex-1 bg-dark">
      <StatusBar style="light" />
      <OnboardingScreen />
    </View>
  );
}
