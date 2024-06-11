import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Arcanum from "./componentes/ArcanumComponent";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Arcanum />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
