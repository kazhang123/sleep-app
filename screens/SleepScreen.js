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
        <View style={styles.background}>
            {/* Small top timer */}
            <Text style={styles.smallTimer}>
                {`${pad(timer.getHours(), 2)}:${pad(timer.getMinutes(), 2)}:${pad(timer.getSeconds(), 2)}`}
            </Text>

            {/* Wake up button */}
            <Button title="wake up" onPress={() => Alert.alert("Wake up", "Are you sure", [
                {text: "Yes", onPress: () => props.navigation.navigate("WelcomeScreen")},
                {text: "No", onPress: ()  => console.log("no pressed")}
                ])}/>

            <View>
                {/* Large timer */}
                <Text style={styles.largeTimer}>{`${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}`}</Text>
                {/* Goodnight message */}
                <Text style={styles.message}>goodnight</Text>
            </View>

            {/* Koi image */}
            <Image style={{width: 300, height: 250}} source={require("../assets/koi-trans.png")} />
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