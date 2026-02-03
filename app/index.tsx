import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  // const handlePress = () => {
  //   // Alert.alert("Hello!", "Welcome to Home Screen");
  //   //  console.log("object")
  //     alert("Button Pressed");
  //     navigate("/hi");
  // };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/image.png")}
      />

      <Text style={styles.title}>Home Screen</Text>

      <Pressable
        onPress={() => router.push("/(tabs)/hi")}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        android_ripple={{ color: "rgba(255,255,255,0.2)", borderless: false }}
      >
        <Text style={styles.buttonText}>Press Me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4299e1",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: "#2c5282",
    transform: [{ scale: 0.96 }],
    shadowOpacity: 0.2,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
