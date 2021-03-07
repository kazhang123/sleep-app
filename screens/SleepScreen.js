import React from 'react';
import { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Button, Text, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {Database} from '../Database'

function SleepScreen(props) {
    const [time, setTime] = useState(new Date());
    const [timer, setTimer] = useState({sec: 0, min: 0, hr: 0});
    
    useEffect(() => {
        let secTimer = setInterval( () => {
          setTime(new Date())
        },1000)
    
        return () => clearInterval(secTimer);
    }, []);

    const handleWakeUp = () => {
        var endSleep = false;
        var message = `Are you sure you want to wake up right now? You've only slept for ${timer.hr} hours`;
        if (timer.hr < 7) {
            Alert.alert("", message, [
                {text: "Yes", onPress: () => {
                    endSleep = true
                    Database.insertSleepDuration(timer.hr, timer.min)
                    setTimer({sec: 0, min: 0, hr: 0})
                    props.navigation.navigate("WelcomeScreen")
                }},
                {text: "No", onPress: ()  => console.log("no pressed")}])
        } else {
            Alert.alert("We're glad you've had a good night's sleep!")
        }
    }

    const startTimer = () => {
        run();
        setInterval(run, 1000)
    }

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
    
    return (
        <View style={styles.background}>
            {/* sleep duration timer */}
            <Text style={styles.smallTimer}>
                {`${pad(timer.hr, 2)}:${pad(timer.min, 2)}:${pad(timer.sec, 2)}`}
            </Text>
            
            <View>
                {/* Clock */}
                <Text style={styles.largeTimer}>{`${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}`}</Text>
                {/* Goodnight message */}
                <Text style={styles.message}>goodnight</Text>
            </View>

            {/* Wake up button */}
            <TouchableHighlight 
            style={styles.button}
            onPress={handleWakeUp}>
                <Text style={styles.buttonText}>Wake up</Text>
            </TouchableHighlight>

            {/* Koi image */}
            <Image style={{width: 300, height: 250}}  source={require("../assets/koi-trans.png")} />

            {/*Go to sleep button*/}
            <TouchableHighlight style={styles.button} onPress={startTimer}>
                <Text style={styles.buttonText}>I'm going to sleep</Text>
            </TouchableHighlight>

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
        justifyContent: 'space-around',
        alignItems: 'center',
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