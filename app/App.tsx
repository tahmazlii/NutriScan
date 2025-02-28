import React from "react";
import { View, StyleSheet } from "react-native";
import MainScreen from "./MainScreen"; // Import the screen

const App = () => {
  return (
    <View style={styles.container}>
      <MainScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;