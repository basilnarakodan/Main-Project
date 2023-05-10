import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar,TouchableOpacity,Image } from "react-native";
import { CourseCard, Separator } from "../components";
import { Colors, Fonts } from "../constants";
import { Display } from "../utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import basic from "../assets/images/basic.jpg"
import interview from "../assets/images/interview2.png"
import ds from "../assets/images/ds.jpg"
import { interviewData, codingData } from "../constants/resources/interviewData";
import * as Animatable from 'react-native-animatable';
import Entypo from "react-native-vector-icons/Entypo";

const ResourceScreen = ({ navigation }) => {

    return (
        <Animatable.View style={styles.container} animation={"fadeInUp"}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
                <Separator height={StatusBar.currentHeight} />
                <View style={styles.headerContainer}>
                    {/* <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} /> */}
                    <TouchableOpacity onPress={() => navigation.openDrawer()} activeOpacity={0.8}>
                        {/* <Entypo
                            name="menu"
                            size={32}
                            color={Colors.DEFAULT_GREEN}
                            style={{ marginRight: 10 }}
                        /> */}
                        <Image source={require('../assets/images/menu.png')} style={{width:30,height:30}}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Resource</Text>
                </View>
                <Separator height={15} />

                <CourseCard navigate={(items, title) => navigation.navigate("ResourceSingle", { items, title })} bgimage={basic} title="Basic Coding" items={codingData} />
                <CourseCard navigate={(items, title) => navigation.navigate("ResourceSingle", { items, title })} bgimage={interview} title="Interview Preparation" items={interviewData} />
                <CourseCard navigate={(items, title) => navigation.navigate("ResourceSingle", { items, title })} bgimage={ds} title="Data Structures" items={interviewData} />
                {/* <Separator height={100} /> */}
            </ScrollView>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.LIGHT_GREY
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: "center",
    },
});

export default ResourceScreen;