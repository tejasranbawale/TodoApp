import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen.js';
import SignupScreen from '../screens/SignupScreen';
// import LoginScreen from '../screens/LoginScreen.js';
// import SignupScreen from '../screens/SignupScreen.js';

const Stack = createNativeStackNavigator();

export default function Authstack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
