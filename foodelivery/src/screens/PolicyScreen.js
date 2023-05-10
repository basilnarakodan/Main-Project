import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Separator } from "../components";
import { Colors, Fonts } from "../constants";
import { Display } from "../utils";
import Ionicons from "react-native-vector-icons/Ionicons";

const PolicyScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
                <Separator height={StatusBar.currentHeight} />
                <View style={styles.headerContainer}>
                    <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} />
                    <Text style={styles.headerTitle}>Reviews</Text>
                </View>
                <Separator height={25} />

                <View style={styles.headContainer}>
                    <Text style={styles.heading}>PLACEMENT PROCEDURE</Text>
                    <Text style={styles.heading}>GUIDELINES  & POLICY – CGPU CET </Text>
                    <Text>(w.e.f. 2021)</Text>
                    <Text style={styles.heading}>COLLEGE OF ENGINEERING TRIVANDRUM</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.subHeading}>Procedure</Text>
                </View>
                
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:Colors.DEFAULT_WHITE,
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
    headContainer: {
        marginHorizontal: 15,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        fontSize: 15,
        fontFamily:Fonts.POPPINS_MEDIUM,
    },
    subHeading: {
        // fontSize: 13,
        fontFamily:Fonts.POPPINS_MEDIUM,
        textDecorationLine:"underline",
    },
    textContainer: {
        marginTop: 20,
        paddingVertical:25,
        borderTopColor:Colors.DEFAULT_GREY,
        borderTopWidth:1,
    }
});

export default PolicyScreen;