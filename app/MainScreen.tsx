import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to NutriScan</Text>
      <Text style={styles.subtitle}>Your Personal Grocery Tracking App</Text>
      
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9", // Light green background
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E7D32", // Dark green
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#4CAF50", // Slightly lighter green
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#94D1BE",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MainScreen;