import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { Colors, Images, Fonts } from "../constants";
import { Display } from "../utils";

const SplashScreen = ({ navigation }) => {

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         navigation.navigate("Welcome");
    //     },1500)
    // },[])

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent />
            <Image
                source={Images.PLATE}
                resizeMode="contain"
                style={styles.image}
            ></Image>
            <Text style={styles.titleText}>FooDelivery</Text>
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
    },
    titleText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 32,
        fontFamily: Fonts.POPPINS_LIGHT,
    }
});

export default SplashScreen;