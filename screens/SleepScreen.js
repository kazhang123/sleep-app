import React from 'react';
import { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Button, Text, Alert } from 'react-native';

function SleepScreen(props) {
    const [time, setTime] = useState(new Date());
    const [timer, setTimer] = useState(new Date());
    const [test, setTest] = useState("")
    // const [test, setTest] = useState(props.test)

    useEffect(() => {
        let secTimer = setInterval( () => {
          setTime(new Date())
        },1000)
    
        return () => clearInterval(secTimer);
    }, []);

    useEffect(() => {
        let secTimer = setInterval( () => {
          setTimer(new Date())
        },1000)
    
        return () => clearInterval(secTimer);
    }, []);

    // useEffect(() => {
    //     setTest(props.test)
    // }, [props.test]);

    return (
        <ImageBackground 
            style={styles.background}
        >
            <Text style={styles.timer}>
                {`${pad(timer.getHours(), 2)}:${pad(timer.getMinutes(), 2)}:${pad(timer.getSeconds(), 2)}`}
            </Text>
            <Text style={{color: "white", fontSize: 30}}>{test}</Text>
            <Text style={styles.time}>{`${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}`}</Text>
            <Text style={styles.message}>goodnight</Text>
            <Button title="wake up" onPress={() => Alert.alert("Wake up", "Are you sure", [
                {text: "Yes", onPress: () => props.navigation.navigate("WelcomeScreen")},
                {text: "No", onPress: ()  => console.log("no pressed")}
            ])}/>
            <Image style={styles.logo}  source={require("../assets/koi-trans.png")} />
            {/* <View style={styles.login}/> */}
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