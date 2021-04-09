import React from 'react';
import { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Button, Text, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { sleepTimeInHours } from '../SleepTimeCalculator.js';
import {Database} from '../Database'
import Animated, { Easing } from 'react-native-reanimated';
import KoiPNG from '../assets/koi-trans.png';

function SleepScreen(props) {
    const [time, setTime] = useState(new Date());
    // const [timer, setTimer] = useState({sec: 0, min: 0, hr: 0});
    const [rotateValue, setRotateValue] = useState(new Animated.Value(0))
    var startSleepTime = new Date();
    
    // Large clock    
    useEffect(() => {
        let secTimer = setInterval( () => {
          setTime(new Date())
        }, 1000)
    
        return () => clearInterval(secTimer);
    }, []);

    // Small sleep timer
    useEffect(() => {
        setInterval( () => {
            run();
        }, 1000)
    }, []);

    var updatedSec = timer.sec;
    var updatedMin = timer.min;
    var updatedHr = timer.hr;

    const run = () => {
        if (updatedSec === 60) {
            updatedMin++;
            updatedSec = 0;
        }
        if (updatedMin === 60) {
            updatedHr++;
            updatedMin = 0;
        }
        updatedSec++;
        return setTimer({sec: updatedSec, min: updatedMin, hr: updatedHr})
    }

    // Koi animation
    useEffect(() => {
        StartImageRotate();
    }, []);
    
      function StartImageRotate() {
        rotateValue.setValue(0);
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true
        }).start();
      }
    
      const RotateData = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      });

    // Called when Wake up button is clicked
    const handleWakeUp = () => {
        var endSleep = false;

        var timeSinceFallingAsleep = sleepTimeInHours(startSleepTime, new Date());

        var message = "Are you sure you want to wake up right now? You\'ve only slept for " + timeSinceFallingAsleep + " hours";
        if (timeSinceFallingAsleep < 6) {
            Alert.alert("", message, [
                {text: "Yes", onPress: () => {
                    endSleep = true
                    startSleepTime = null
                    Database.insertSleepDuration(9, 20)
                    props.navigation.navigate("WelcomeScreen", {exitedSleepingMode: true})
                }},
                {text: "No", onPress: ()  => console.log("\'No\' pressed")}])
        } else {
            Alert.alert("We're glad you've had a good night's sleep!");
            props.navigation.navigate("WelcomeScreen");
        }
    }

    return (
        <View style={styles.background}>
            {/* Small timer
            <View style={{justifyContent: "center", flex: 1, alignItems: "center"}}>
                <Text style={styles.smallTimer}>
                {`${pad(timer.hr, 2)}:${pad(timer.min, 2)}:${pad(timer.sec, 2)}`}
                </Text>
            </View> */}
            
            <View style={{flex: 6, justifyContent: "space-around", alignItems: "center"}}>
                <View>
                    {/* Clock */}
                    <Text style={styles.largeTimer}>{`${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}`}</Text>
                    {/* Goodnight message */}
                    <Text style={styles.message}>goodnight</Text>
                </View>
                
                {/* Koi image */}
                <Animated.Image style={{transform: [{ rotate: RotateData }], width: 300, height: 250}}  source={KoiPNG} />

                {/* Wake up button */}
                <TouchableHighlight 
                style={styles.button}
                onPress={handleWakeUp}>
                    <Text style={styles.buttonText}>Wake up</Text>
                </TouchableHighlight>

            </View>
        </View>
    );
}

function pad(num, numDigits) {
    var s = num+"";
    while (s.length < numDigits) s = "0" + s;
    return s;
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#051C43', 
        flex: 1, 
        flexDirection: "column",
    },
    button: {
        marginRight:40,
        marginLeft:40,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'grey',
        borderRadius:10,
    },
    buttonText: {
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontWeight: "bold"
    },
    smallTimer: {
        color: "white",
        top: 85,
        fontSize: 20,
    },
    largeTimer: {
        color: "white",
        fontSize: 100,
    },
    message: {
        color: "white",
        fontSize: 30,
        fontStyle: "italic",
        textAlign: "center",
    }
})

export default SleepScreen;