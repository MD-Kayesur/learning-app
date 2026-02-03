//import liraries
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// create a component
const NotFoundScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()} // Go back to previous screen
      />
      <Text>NotFoundScreen</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default NotFoundScreen;
