import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache'

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
        
          {/* Protected routes */}
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              // Can add auth guard here
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
              // Can add auth guard here
            }}
          />

          {/* Modal routes */}
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
              headerTitle: "Settings",
            }}
          />
        </Stack>
      </ThemeProvider>
    </ClerkProvider>
  );
}
