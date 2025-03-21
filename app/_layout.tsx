
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // Import StatusBar from Expo
import { View } from "react-native";
import './globals.css';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={false} translucent={true} style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}


