import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, SafeAreaView, Text, Image, Button, Switch, SwitchComponent } from 'react-native';
import SleepScreen from './SleepScreen';
import { Database } from '../Database'
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native'
import { calculateSleepTime, getFormattedTime } from '../utils/sleepUtils'

const WelcomeScreen = (props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [sleepTime, setSleepTime] = useState({hours: 0, minutes: 0})
    const isFocused = useIsFocused();

    const setSleepCallback = (startTime, endTime) => {
        let startDate = startTime ? new Date(startTime.replace(" ", "T")) : new Date();
        let endDate = endTime ? new Date(endTime.replace(" ", "T")) : new Date();
        let hours = calculateSleepTime(startDate, endDate);
        setSleepTime(getFormattedTime(hours));
    }

    async function turnOnSleepMode() {
        try {
            // Database.insertStartTime()
            //     .then(() => {
            //         console.log("line 34");
            //         props.navigation.navigate("SleepScreen");
            //     });
            await Database.insertStartTime();
            // await Database.test();

            props.navigation.navigate("SleepScreen");
        } catch(e) {
            console.log("error occurred inserting start time" + e);
        }
    };

    useEffect(() => {
        Database.getLastSleep(setSleepCallback);
    }, [isFocused]);

    return (
        <ImageBackground style={styles.background}>
            <View style={styles.container}>
                <Text style={{alignSelf: "flex-start", position: "absolute", color: "white", fontSize: 20, top: "40%"}}>{`You last slept for ${sleepTime.hours} hours ${sleepTime.minutes} minutes`}</Text>
                <Text style={styles.text}>Turn on Sleep Mode</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#fcc381" }}
                    thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={turnOnSleepMode}
                    value="false"
                />
                <Button style={{alignSelf: "flex-start", position: "absolute", top: "80%"}} title="tracker" onPress={() => props.navigation.navigate("TrackerScreen")}/>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#04204d",
        justifyContent: "flex-end"
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        padding: 5,
        color: "white",
        fontSize: 20,
    },
    hairline: {
        backgroundColor: '#A2A2A2',
        height: 1,
    }
})
export default WelcomeScreen;