import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight, Button, Alert, Dimensions } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SleepScreen from './screens/SleepScreen';
import TrackerScreen from './screens/TrackerScreen';


export default function App() {
  const Stack = createStackNavigator();

  // console.log(Dimensions.get("screen"));
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="SleepScreen"
          component={SleepScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C81A1',
    flexDirection: "row",

    alignItems: 'center',
    justifyContent: 'center',
  },
});
