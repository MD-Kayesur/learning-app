import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return <Stack />
}










// import { Tabs } from "expo-router";
// import React from "react";

// import { HapticTab } from "@/components/haptic-tab";
// import { Colors } from "@/constants/theme";
// import { useColorScheme } from "@/hooks/use-color-scheme";
// import { Ionicons } from "@expo/vector-icons";
// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarStyle: {
//           backgroundColor: Colors[colorScheme ?? "light"].background,
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//         },
//       }}
//     >
   
//       <Tabs.Screen
//         name="signup"
//         options={{
//           headerTitle: "signup",
//           title: "Signup",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="person-add-outline" size={28} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="my"
//         options={{
//           title: "My",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="person-circle-outline" size={28} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
