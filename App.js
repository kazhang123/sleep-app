import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight, Button, Alert, Dimensions } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import SleepScreen from './screens/SleepScreen';
import TrackerScreen from './screens/TrackerScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import useDatabase from './useDatabase';
import { useEffect, useState } from 'react/cjs/react.production.min';
import { Database } from './Database';

export default function App() {
  const Stack = createStackNavigator();
  // const [isLoading, setIsLoading] = useState(true);
  // console.log(Dimensions.get("screen"));
  // const [isDBLoadingComplete, setIsDBLoadingComplete] = useState(false);

  // useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync(); //don't let the splash screen hide
  
        await Database.setupDatabaseAsync()
        // let isDBLoadingComplete = false;
        // isDBLoadingComplete = useDatabase();
      
        // if (isDBLoad ingComplete) {
        //   setIsLoading(false);
          SplashScreen.hideAsync();
        // }
      } catch (e) {
        console.warn(e);
      } 
    }

    prepare();
  // })

  // async function prepare() {
  //   try {
  //     await SplashScreen.preventAutoHideAsync(); //don't let the splash screen hide

  //     let isDBLoadingComplete = false;
  //     isDBLoadingComplete = useDatabase();
      
  //     if (isDBLoadingComplete) {
  //       // setIsLoading(false);
  //       SplashScreen.hideAsync();
  //     }
  //   } catch (e) {
  //     console.warn(e);
  //   }     
  // }

  // prepare();
  // useEffect(() => {
  //   prepare();
  // },[isLoading]);

  // if (isLoading) {
  //   return null;
  // }
  // if (!isDBLoadingComplete) {
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
  // return (
  //   <View style={styles.container}/>
  // );
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
