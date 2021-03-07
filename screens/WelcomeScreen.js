import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Button } from 'react-native';
import SleepScreen from './SleepScreen';

const WelcomeScreen = ({navigation}) => {
    const navigation = useNavigation()
    return (
        <ImageBackground 
            style={styles.background}
        >
            <Button title="go to sleep" onPress={() => navigation.navigate("SleepScreen")} />
            <Image style={styles.logo}  source={require("../assets/shrek.png")} />
            <View style={styles.login}/>
        </ImageBackground>
    );
}


// const Sleep = (navigation) => {
//     return SleepScreen
// }
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