import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { Colors, Images, Fonts } from "../constants";
import { Display } from "../utils";
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         navigation.navigate("Main");
    //     },2200)
    // },[])

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent />
            <Image
                source={require('../assets/images/app.png')}
                resizeMode="contain"
                style={styles.image}
                animation={'zoomIn'}
                duration={2000}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.DEFAULT_GREEN,
    },
    image: {
        height: Display.setHeight(15),
        width: Display.setWidth(40),
        marginBottom: 10,
    },
    titleText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 32,
        fontFamily: Fonts.POPPINS_LIGHT,
    }
});

export default SplashScreen;