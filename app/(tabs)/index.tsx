import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/image.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>About Me</Text>

          <View style={styles.infoCard}>
            <Text style={styles.name}>Md Kayesur</Text>
            <Text style={styles.role}>Mearn Stack Developer</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Currently Learning</Text>
            <Text style={styles.infoText}>• React Native App Development</Text>
            <Text style={styles.infoText}>• Expo Router & Navigation</Text>
            <Text style={styles.infoText}>• State Management with Zustand</Text>
            <Text style={styles.infoText}>• Native Modules Integration</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.infoText}>• JavaScript/TypeScript</Text>
            <Text style={styles.infoText}>• React.js & Next.js</Text>
            <Text style={styles.infoText}>• Node.js & Express</Text>
            <Text style={styles.infoText}>• MongoDB & REST APIs </Text>
            <Text style={styles.infoText}>• Git & GitHub</Text>
            <Text style={styles.infoText}>• CSS/Styled Components</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Projects</Text>
            <Text style={styles.infoText}>
              • E-commerce Mobile App (React Native)
            </Text>
            <Text style={styles.infoText}>
              • Social Media Dashboard (Next.js)
            </Text>
            <Text style={styles.infoText}>
              • Task Management Tool (MERN Stack)
            </Text>
            <Text style={styles.infoText}>• Weather App with Live Updates</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Goals 2024</Text>
            <Text style={styles.infoText}>
              • Build and publish my first mobile app
            </Text>
            <Text style={styles.infoText}>• Master React Native ecosystem</Text>
            <Text style={styles.infoText}>
              • Publish apps to Play Store & App Store
            </Text>
            <Text style={styles.infoText}>
              • Contribute to open source projects
            </Text>
            <Text style={styles.infoText}>• Learn React Native animations</Text>
            <Text style={styles.infoText}>• Build a portfolio of 5+ apps</Text>
            <Text style={styles.infoText}>• Attend developer conferences</Text>

            <View style={styles.divider} />

          
            <Text style={styles.footerText}>
              Last updated: {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: 500,
    backgroundSize: "contain",
  },
  scrollView: {
    flex: 1,
    borderRadius: 15,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30, // Extra padding at bottom for better scrolling
  },
  overlay: {
    flex: 1,

    backgroundColor: "rgba(45, 120, 163, 0.6)",
    padding: 20,
    minHeight: "100%", // Ensure overlay covers full content
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 25,
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  infoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
    fontStyle: "italic",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
    marginTop: 5,
  },
  infoText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
    marginLeft: 10,
    lineHeight: 20,
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#fff",
    textAlign: "center",
    padding: 15,
    backgroundColor: "rgba(52, 152, 219, 0.8)",
    borderRadius: 10,
    marginBottom: 15,
    lineHeight: 22,
  },
  contactInfo: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  contactText: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  footer: {
    backgroundColor: "rgba(41, 128, 185, 0.8)",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 5,
  },
});
