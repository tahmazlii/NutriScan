import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import WelcomeScreen from "./screens/WelcomeScreen";  
import HomeScreen from "./screens/HomeScreen";  
import GroceryList from "./screens/GroceryList";  

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  GroceryList: undefined;
  Scanner: undefined;
  Recipes: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="GroceryList" component={GroceryList} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
