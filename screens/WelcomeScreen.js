import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Button } from 'react-native';
import SleepScreen from './SleepScreen';

function WelcomeScreen(props) {
    return (
        <ImageBackground 
            style={styles.background}
        >
            <Button title="go to sleep" onPress={() => props.navigation.navigate("SleepScreen", {
                test: Math.random()
            })} />
            <Image style={styles.logo}  source={require("../assets/shrek.png")} />
            <View style={styles.login}/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "tomato",
        justifyContent: "flex-end"
    },
    login:{
        backgroundColor: "yellow",
        width: "100%",
        height: 100,  
    },
    logo: {
        width: 100,
        height: 100,
        position: "absolute",
        top: 70
    }
})
export default WelcomeScreen;