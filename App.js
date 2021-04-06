import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight, Button, Alert, Dimensions } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SleepScreen from './screens/SleepScreen';
import TrackerScreen from './screens/TrackerScreen';
import * as SplashScreen from 'expo-splash-screen';
import useDatabase from './useDatabase'
import { useCallback, useEffect, useState } from 'react/cjs/react.production.min';


export default function App() {
  // const [isAppReady, setIsAppReady] = useState(false);
  const Stack = createStackNavigator();
  // console.log(Dimensions.get("screen"));
  // useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync(); //don't let the splash screen hide

        const isDBLoadingComplete = useDatabase();
      
        if (isDBLoadingComplete) {
          SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      }     
    }

    prepare();
  // }, [])
  
  // const onLayoutRootView = useCallback(async () => {
  //   if (isAppReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [isAppReady]);

  // if (!isAppReady) {
  //   return null;
  // }

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
        <Stack.Screen 
          name="TrackerScreen"
          component={TrackerScreen}
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
