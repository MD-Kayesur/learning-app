import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SignOutButton } from "./component/SignOutButton";

export default function Home() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require("../assets/images/image.png")}
      />

      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link className="mt-3o" href="/(auth)/signin">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/signup">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});
