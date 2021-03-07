import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Button } from 'react-native';

const SleepScreen = (props) => {
    return (
        <ImageBackground 
            style={styles.background}
        >
            <Button title="go to sleep" onPress={() => props.navigation.navigate("WelcomeScreen")} />
            <Image style={styles.logo}  source={require("../assets/shrek.png")} />
            <View style={styles.login}/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#051C43",
        justifyContent: "flex-end"
    },
    login:{
        backgroundColor: "green",
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

export default SleepScreen;