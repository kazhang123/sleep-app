import React from 'react';
import { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Button, Text, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { sleepTimeInHours } from '../SleepTimeCalculator.js';
import { CountUp } from 'use-count-up'

function SleepScreen(props) {
    const [time, setTime] = useState(new Date());
    const [timer, setTimer] = useState({sec: 0, min: 0, hr: 0});

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

    // Called when Wake up button is clicked
    const handleWakeUp = () => {
        var endSleep = false;

        var timeSinceFallingAsleep = sleepTimeInHours(startSleepTime, new Date());

        var message = "Are you sure you want to wake up right now? You\'ve only slept for " + timeSinceFallingAsleep + " hours";
        if (timeSinceFallingAsleep < 6) {
            Alert.alert("", message, [
                {text: "Yes", onPress: () => {
                    endSleep = true
                    startSleepTime = null;
                    props.navigation.navigate("WelcomeScreen")
                }},
                {text: "No", onPress: ()  => console.log("\'No\' pressed")}])
        }
    }

    return (
        <View style={styles.background}>
            {/* Small timer */}
            <View style={{justifyContent: "center", flex: 1, alignItems: "center"}}>
                <Text style={styles.smallTimer}>
                {`${pad(timer.hr, 2)}:${pad(timer.min, 2)}:${pad(timer.sec, 2)}`}
                </Text>
            </View>
            
            <View style={{flex: 6, justifyContent: "space-around", alignItems: "center"}}>
                <View>
                    {/* Clock */}
                    <Text style={styles.largeTimer}>{`${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}`}</Text>
                    {/* Goodnight message */}
                    <Text style={styles.message}>goodnight</Text>
                </View>
                
                {/* Koi image */}
                <Image style={{width: 300, height: 250}}  source={require("../assets/koi-trans.png")} />

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
        paddingRight : 10
    },
    login:{
        backgroundColor: "green",
        width: "100%",
        height: 100,  
    },
    smallTimer: {
        color: "white",
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