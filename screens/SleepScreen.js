import React from 'react';
import { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Button, Text, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

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
        props.navigation.navigate("WelcomeScreen")
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
        <ImageBackground 
            style={styles.background}
        >
            <Text style={styles.timer}>
                {`${pad(timer.hr, 2)}:${pad(timer.min, 2)}:${pad(timer.sec, 2)}`}
            </Text>
            <Text style={styles.time}>{`${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}`}</Text>
            <Text style={styles.message}>goodnight</Text>
            <TouchableHighlight 
            style={styles.button}
            onPress={() => Alert.alert("Are you sure you want to wake up right", "Are you sure", [
                {text: "Yes", onPress: handleWakeUp},
                {text: "No", onPress: ()  => console.log("no pressed")}
            ])}>
                <Text style={styles.buttonText}>Wake up</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={startTimer}>
                <Text style={styles.buttonText}>I'm going to sleep</Text>
            </TouchableHighlight>
            {/* <Button title="I'm going to sleep" onPress={start}/> */}
            <Image style={styles.logo}  source={require("../assets/koi-trans.png")} />
        </ImageBackground>
    );
}

function pad(num, numDigits) {
    var s = num+"";
    while (s.length < numDigits) s = "0" + s;
    return s;
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#051C43",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    button: {
        marginRight:40,
        marginLeft:40,
        marginTop:10,
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
    logo: {
        width: 250,
        height: 250,
        position: "absolute",
        bottom: 100
    },
    time: {
        color: "white",
        top: 300,
        fontSize: 100
    },
    timer: {
        color: "white",
        top: 50
    },
    message: {
        color: "white",
        top: 320,
        fontSize: 30,
        fontStyle: "italic"
    }

})

export default SleepScreen;