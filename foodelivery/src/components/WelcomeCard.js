import React from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import { Fonts,Images } from "../constants";
import { Display } from "../utils";

const WelcomeCard=({title,content,image})=>{
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={Images[image]} resizeMode="contain"/>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.contentText}>{content}</Text>
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:Display.setWidth(100)
    },
    image:{
        height:Display.setHeight(30),
        width:Display.setWidth(60),
    },
    titleText:{
        fontFamily:Fonts.POPPINS_BOLD,
        fontSize:22,
    },
    contentText:{
        fontFamily:Fonts.POPPINS_LIGHT,
        fontSize:18,
        textAlign:"center",
        marginHorizontal:20,
    },
});

export default WelcomeCard;