import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

// ✅ Define navigation types
type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Scanner: undefined;
  GroceryList: undefined;
  Recipes: undefined;
};

type HomeScreenProps = StackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NutriScan Dashboard</Text>

      {/* ✅ Styled Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Scanner")}>
        <Text style={styles.buttonText}>Scan Barcode</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("GroceryList")}>
        <Text style={styles.buttonText}>Grocery List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Recipes")}>
        <Text style={styles.buttonText}>Recipes</Text>
      </TouchableOpacity>
    </View>
  );
};

// 🔹 Styled buttons
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2E7D32",
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center", // ✅ Button text should be centered
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
