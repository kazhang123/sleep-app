import React from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';

function TrackerScreen(props) {
    return (
        <ImageBackground 
            style={styles.background}
        >
            <Image style={styles.logo}  source={require("../assets/shrek.png")} />
            <View style={styles.login}/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "blue",
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

export default TrackerScreen;