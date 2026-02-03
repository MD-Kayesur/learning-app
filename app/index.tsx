/* eslint-disable import/no-duplicates */
 import { Text } from "react-native";
import { Image, StyleSheet,   View } from "react-native";
 
export default function Home() {
 
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require("../assets/images/image.png")}
      />
<Text style={{ color: "white", fontSize: 20 }}>Home Screen</Text>
       
     
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
