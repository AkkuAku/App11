import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import SelectionScreen from "./screens/SelectionScreen";
import LoginScreen from "./screens/LoginScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import PersonalInfoScreen from "./screens/PersonalInfoScreen"; // Импорт нового экрана
import RegisterScreen from './screens/RegisterScreen'; 
import Welcomepage from './screens/Welcomepage'; 
import Main from './screens/Main'; 
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "Вход" }} />
        <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} options={{ title: "Личная информация" }} /> 
        <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Регистрация' }} />
        <Stack.Screen name="Welcomepage" component={Welcomepage}  />
        <Stack.Screen name="Main" component={Main}  />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
